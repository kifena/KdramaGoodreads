"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { X, Plus, Loader2, Search, Check } from "lucide-react";
import { createClient } from "../../supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Image from "next/image";

interface Tag {
  id: string;
  name: string;
}

interface Drama {
  id: string;
  title: string;
  year?: number;

  description?: string;
  tags?: { id: string; name: string }[];
}

interface AddDramaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDramaAdded?: () => void;
}

export default function AddDramaDialog({
  open,
  onOpenChange,
  onDramaAdded,
}: AddDramaDialogProps) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [userComment, setUserComment] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [newTagName, setNewTagName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("manual");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Drama[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedDrama, setSelectedDrama] = useState<Drama | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchTags = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("drama_tags")
          .select("id, name")
          .order("name");

        if (error) throw error;
        setAvailableTags(data || []);
      } catch (error) {
        console.error("Error fetching tags:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (open) {
      fetchTags();
      resetForm();
      setActiveTab("search"); // Default to search tab when opening
    }
  }, [open, supabase]);

  const handleAddTag = async () => {
    if (!newTagName.trim()) return;

    try {
      // Check if tag already exists
      const existingTag = availableTags.find(
        (tag) => tag.name.toLowerCase() === newTagName.trim().toLowerCase(),
      );

      if (existingTag) {
        // If tag exists but not selected, select it
        if (!selectedTags.includes(existingTag.id)) {
          setSelectedTags([...selectedTags, existingTag.id]);
        }
      } else {
        // Create new tag
        const { data, error } = await supabase
          .from("drama_tags")
          .insert({ name: newTagName.trim() })
          .select("id, name")
          .single();

        if (error) throw error;

        if (data) {
          setAvailableTags([...availableTags, data]);
          setSelectedTags([...selectedTags, data.id]);
        }
      }

      setNewTagName("");
    } catch (error) {
      console.error("Error adding tag:", error);
    }
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);

    try {
      // Insert drama
      const { data: dramaData, error: dramaError } = await supabase
        .from("dramas")
        .insert({
          title: title.trim(),
          year: year || null,
          description: description.trim() || null,
          poster_url: posterUrl.trim() || null,
          web_scraped: false,
        })
        .select("id")
        .single();

      if (dramaError) throw dramaError;

      // Add tags if any are selected
      if (selectedTags.length > 0 && dramaData) {
        const tagRelations = selectedTags.map((tagId) => ({
          drama_id: dramaData.id,
          tag_id: tagId,
        }));

        const { error: tagError } = await supabase
          .from("drama_tag_relations")
          .insert(tagRelations);

        if (tagError) throw tagError;
      }

      // Add to user's library
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user && dramaData) {
        await supabase.from("user_dramas").insert({
          user_id: user.id,
          drama_id: dramaData.id,
          status: "plan_to_watch",
        });

        // Add user comment if provided
        if (userComment.trim()) {
          await supabase.from("drama_comments").insert({
            drama_id: dramaData.id,
            user_id: user.id,
            comment: userComment.trim(),
          });
        }
      }

      // Reset form and close dialog
      resetForm();
      onOpenChange(false);

      // Notify parent component
      if (onDramaAdded) onDramaAdded();
    } catch (error) {
      console.error("Error adding drama:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchResults([]);

    try {
      // Search for dramas by title
      const { data: dramas, error } = await supabase
        .from("dramas")
        .select("id, title, year, poster_url, description")
        .ilike("title", `%${searchQuery.trim()}%`)
        .order("title");

      if (error) throw error;

      // Fetch tags for each drama
      if (dramas && dramas.length > 0) {
        const dramaIds = dramas.map((drama) => drama.id);
        const { data: tagRelations, error: tagError } = await supabase
          .from("drama_tag_relations")
          .select(
            `
            drama_id,
            tags:tag_id(id, name)
          `,
          )
          .in("drama_id", dramaIds);

        if (tagError) throw tagError;

        // Group tags by drama ID
        const tagsByDramaId = (tagRelations || []).reduce(
          (acc, relation) => {
            if (!acc[relation.drama_id]) {
              acc[relation.drama_id] = [];
            }
            acc[relation.drama_id].push(relation.tags);
            return acc;
          },
          {} as Record<string, { id: string; name: string }[]>,
        );

        // Add tags to each drama
        const dramasWithTags = dramas.map((drama) => ({
          ...drama,
          tags: tagsByDramaId[drama.id] || [],
        }));

        setSearchResults(dramasWithTags);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching dramas:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectDrama = (drama: Drama) => {
    setSelectedDrama(drama);
    // Populate form fields with selected drama data
    setTitle(drama.title);
    setYear(drama.year || "");
    setDescription(drama.description || "");
    setPosterUrl(drama.poster_url || "");

    // Set selected tags if available
    if (drama.tags && drama.tags.length > 0) {
      const tagIds = drama.tags.map((tag) => tag.id);
      setSelectedTags(tagIds);
    } else {
      setSelectedTags([]);
    }
  };

  const handleAddToLibrary = async (drama: Drama) => {
    setIsSubmitting(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // Check if drama is already in user's library
      const { data: existingEntry } = await supabase
        .from("user_dramas")
        .select("*")
        .eq("user_id", user.id)
        .eq("drama_id", drama.id)
        .single();

      if (!existingEntry) {
        // Add to user's library
        await supabase.from("user_dramas").insert({
          user_id: user.id,
          drama_id: drama.id,
          status: "plan_to_watch",
        });
      }

      // Add user comment if provided
      if (userComment.trim()) {
        await supabase.from("drama_comments").insert({
          drama_id: drama.id,
          user_id: user.id,
          comment: userComment.trim(),
        });
      }

      // Reset form and close dialog
      resetForm();
      onOpenChange(false);

      // Notify parent component
      if (onDramaAdded) onDramaAdded();
    } catch (error) {
      console.error("Error adding drama to library:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setYear("");
    setDescription("");
    setUserComment("");
    setPosterUrl("");
    setSelectedTags([]);
    setNewTagName("");
    setSearchQuery("");
    setSearchResults([]);
    setSelectedDrama(null);
  };

  const getRandomColor = (tagName: string) => {
    const colors = [
      "bg-pink-400",
      "bg-blue-400",
      "bg-purple-400",
      "bg-green-400",
      "bg-yellow-400",
      "bg-red-400",
      "bg-indigo-400",
    ];

    const hash = tagName
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center">Add New K-Drama</DialogTitle>
          <DialogDescription className="text-center">
            Search for an existing drama or add a new one manually
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="search"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">Search Database</TabsTrigger>
            <TabsTrigger value="manual">Add Manually</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-4 mt-4">
            <div className="flex gap-2">
              <Input
                placeholder="Search for a K-Drama..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.trim().length > 0) {
                    // Use a debounce to avoid too many requests
                    const timeoutId = setTimeout(() => {
                      handleSearch();
                    }, 300);
                    return () => clearTimeout(timeoutId);
                  }
                }}
                className="flex-1"
              />
              <Button
                onClick={handleSearch}
                disabled={isSearching || !searchQuery.trim()}
                variant="outline"
              >
                {isSearching ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Search size={16} />
                )}
              </Button>
            </div>

            {searchResults.length > 0 ? (
              <div className="max-h-[400px] overflow-y-auto space-y-3">
                {searchResults.map((drama) => (
                  <div
                    key={drama.id}
                    className={`p-3 border rounded-md flex gap-3 cursor-pointer transition-colors ${selectedDrama?.id === drama.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"}`}
                    onClick={() => handleSelectDrama(drama)}
                  >
                    <div className="relative w-16 h-24 flex-shrink-0 overflow-hidden rounded-sm">
                      {drama.poster_url ? (
                        <Image
                          src={drama.poster_url}
                          alt={drama.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-kdrama-pink to-kdrama-blue flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {drama.title.substring(0, 2)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{drama.title}</h4>
                      {drama.year && (
                        <p className="text-sm text-gray-500">{drama.year}</p>
                      )}
                      {drama.tags && drama.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {drama.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag.id}
                              className={`${getRandomColor(tag.name)} text-white text-xs px-2 py-0.5 rounded-full`}
                            >
                              {tag.name}
                            </span>
                          ))}
                          {drama.tags.length > 3 && (
                            <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                              +{drama.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <Button
                      size="sm"
                      className="self-center bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToLibrary(drama);
                      }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting && selectedDrama?.id === drama.id ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Plus size={16} />
                      )}
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            ) : searchQuery && !isSearching ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No dramas found</p>
                <p className="text-sm text-gray-400 mt-1">
                  Try a different search term or add a new drama manually
                </p>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("manual")}
                  className="mt-4"
                >
                  Add Manually
                </Button>
              </div>
            ) : null}

            {selectedDrama && (
              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium mb-2">Selected Drama</h4>
                <div className="flex gap-3">
                  <div className="relative w-20 h-30 flex-shrink-0 overflow-hidden rounded-sm">
                    {selectedDrama.poster_url ? (
                      <Image
                        src={selectedDrama.poster_url}
                        alt={selectedDrama.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-kdrama-pink to-kdrama-blue flex items-center justify-center">
                        <span className="text-white font-bold">
                          {selectedDrama.title.substring(0, 2)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{selectedDrama.title}</h4>
                    {selectedDrama.year && (
                      <p className="text-sm text-gray-500">
                        {selectedDrama.year}
                      </p>
                    )}
                    {selectedDrama.description && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {selectedDrama.description}
                      </p>
                    )}
                    <div className="mt-2">
                      <Label htmlFor="selectedDramaComment">
                        Add your comment
                      </Label>
                      <Textarea
                        id="selectedDramaComment"
                        value={userComment}
                        onChange={(e) => setUserComment(e.target.value)}
                        placeholder="Share your thoughts about this drama"
                        rows={2}
                        className="mt-1"
                      />
                    </div>
                    <Button
                      className="mt-2 bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500"
                      onClick={() => handleAddToLibrary(selectedDrama)}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="mr-2 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <Check size={16} className="mr-2" />
                          Add to Library
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="manual" className="space-y-4 mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Drama title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  value={year}
                  onChange={(e) =>
                    setYear(e.target.value ? parseInt(e.target.value) : "")
                  }
                  placeholder="Release year"
                  min={1990}
                  max={new Date().getFullYear() + 1}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="posterUrl">Poster URL</Label>
                <Input
                  id="posterUrl"
                  value={posterUrl}
                  onChange={(e) => setPosterUrl(e.target.value)}
                  placeholder="https://example.com/poster.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Synopsis (visible to everyone)
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief synopsis or plot summary of the drama"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="userComment">
                  Your Comment (visible to others)
                </Label>
                <Textarea
                  id="userComment"
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  placeholder="Share your thoughts about this drama"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedTags.map((tagId) => {
                    const tag = availableTags.find((t) => t.id === tagId);
                    if (!tag) return null;

                    return (
                      <span
                        key={tag.id}
                        className={`${getRandomColor(tag.name)} text-white text-sm px-3 py-1 rounded-full flex items-center gap-1`}
                      >
                        {tag.name}
                        <button
                          type="button"
                          onClick={() => toggleTag(tag.id)}
                          className="hover:bg-white/20 rounded-full p-0.5"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    );
                  })}
                </div>

                <div className="flex gap-2">
                  <Input
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    placeholder="Add a tag"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={handleAddTag}
                    variant="outline"
                    size="icon"
                  >
                    <Plus size={16} />
                  </Button>
                </div>

                {availableTags.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground mb-1">
                      Available tags:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {availableTags
                        .filter((tag) => !selectedTags.includes(tag.id))
                        .map((tag) => (
                          <button
                            key={tag.id}
                            type="button"
                            onClick={() => toggleTag(tag.id)}
                            className="bg-gray-100 hover:bg-gray-200 text-xs px-2 py-0.5 rounded-full"
                          >
                            {tag.name}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter className="sm:justify-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!title.trim() || isSubmitting}
                  className="bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    "Add Drama"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
