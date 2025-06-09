"use client";

import {
  Heart,
  ThumbsUp,
  Trash2,
  Plus,
  X,
  Info,
  Loader2,
  Frown,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { createClient } from "../../supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

type DramaStatus =
  | "liked"
  | "loved"
  | "dropped"
  | "watching"
  | "plan_to_watch"
  | null;

interface DramaCardProps {
  id: string;
  title: string;
  year?: number;
  posterUrl?: string;
  tags?: { id: string; name: string }[];
  userStatus?: DramaStatus;
  inLibrary?: boolean;
  onStatusChange?: (id: string, status: DramaStatus) => void;
  onAddToLibrary?: (id: string) => void;
  description?: string;
}

export default function DramaCard({
  id,
  title,
  year,
  posterUrl,
  tags = [],
  userStatus = null,
  inLibrary = false,
  onStatusChange,
  onAddToLibrary,
  description = "",
}: DramaCardProps) {
  console.log(`DramaCard ${title} - posterUrl:`, posterUrl);
  const [status, setStatus] = useState<DramaStatus>(userStatus);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dramaDetails, setDramaDetails] = useState<{
    description: string;
    tags: { id: string; name: string }[];
    comments: {
      id: string;
      user_id: string;
      comment: string;
      created_at: string;
      user_name?: string;
    }[];
  }>({ description, tags, comments: [] });
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    // If we don't have a description and the dialog is opened, fetch the drama details
    if (isDialogOpen && !description) {
      fetchDramaDetails();
    }
  }, [isDialogOpen]);

  const fetchDramaDetails = async () => {
    try {
      // Run all queries in parallel for better performance
      const [dramaResult, tagResult, commentResult] = await Promise.all([
        // Fetch drama details
        supabase.from("dramas").select("description").eq("id", id).single(),

        // Fetch tags if not provided
        supabase
          .from("drama_tag_relations")
          .select(`tags:tag_id(id, name)`)
          .eq("drama_id", id),

        // Fetch comments (10 most recent)
        supabase
          .from("drama_comments")
          .select("id, user_id, comment, created_at")
          .eq("drama_id", id)
          .order("created_at", { ascending: false })
          .limit(10),
      ]);

      const { data: dramaData, error: dramaError } = dramaResult;
      const { data: tagData, error: tagError } = tagResult;
      const { data: commentData, error: commentError } = commentResult;

      if (dramaError) throw dramaError;
      if (tagError) throw tagError;
      if (commentError) throw commentError;

      // Process tags immediately
      const formattedTags = tagData?.map((item) => item.tags) || [];

      // Only fetch user data if we have comments
      let formattedComments = [];
      if (commentData && commentData.length > 0) {
        const userIds = commentData.map((comment) => comment.user_id);

        // Fetch user names for comments
        const { data: userData } = await supabase
          .from("users")
          .select("id, name, full_name")
          .in("id", userIds);

        // Create a map for quick user lookup
        const userMap = new Map();
        if (userData) {
          userData.forEach((user) => {
            userMap.set(
              user.id,
              user.name || user.full_name || "Anonymous User",
            );
          });
        }

        formattedComments = commentData.map((comment) => ({
          ...comment,
          user_name: userMap.get(comment.user_id) || "Anonymous User",
        }));
      }

      setDramaDetails({
        description: dramaData?.description || "",
        tags: formattedTags.length > 0 ? formattedTags : tags,
        comments: formattedComments,
      });
    } catch (error) {
      console.error("Error fetching drama details:", error);
    }
  };

  const handleStatusChange = async (newStatus: DramaStatus) => {
    // If already loading, don't process another request
    if (isLoading) return;

    setIsLoading(true);

    // If clicking the same status, remove it
    if (status === newStatus) {
      newStatus = null;
    }

    setStatus(newStatus);

    if (onStatusChange) {
      onStatusChange(id, newStatus);
    } else {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        if (newStatus === null) {
          await supabase
            .from("user_dramas")
            .delete()
            .eq("user_id", user.id)
            .eq("drama_id", id);
        } else {
          await supabase.from("user_dramas").upsert(
            {
              user_id: user.id,
              drama_id: id,
              status: newStatus,
            },
            { onConflict: "user_id,drama_id" },
          );
        }
      } catch (error) {
        console.error("Error updating drama status:", error);
      }
    }

    setIsLoading(false);
  };

  const handleAddToLibrary = async () => {
    if (isLoading) return;

    setIsLoading(true);

    if (onAddToLibrary) {
      onAddToLibrary(id);
    } else {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        await supabase.from("user_dramas").upsert({
          user_id: user.id,
          drama_id: id,
          status: "plan_to_watch",
        });

        setStatus("plan_to_watch");

        // Using the toast system would be better here, but we'll keep it simple for now
        // This component would need to be updated to use useToast() in a future update
      } catch (error) {
        console.error("Error adding drama to library:", error);
      }
    }

    setIsLoading(false);
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

    // Simple hash function to get consistent colors for the same tag
    const hash = tagName
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't open dialog if clicking on action buttons
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }
    setIsDialogOpen(true);
  };

  return (
    <>
      <div
        className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white flex flex-col cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        <div className="relative aspect-[2/3] overflow-hidden rounded-md">
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized={false}
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-kdrama-pink to-kdrama-blue flex items-center justify-center">
              <span className="text-white font-bold">
                {(title && title.substring(0, 2)) || "??"}
              </span>
            </div>
          )}
        </div>

        <div className="p-3">
          <h3 className="font-medium text-kdrama-text truncate">{title}</h3>
          {year && <p className="text-sm text-gray-500">{year}</p>}

          {tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1 max-w-full overflow-hidden">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag.id}
                  className={`${getRandomColor(tag.name)} text-white text-xs px-2 py-0.5 rounded-full truncate max-w-[90px]`}
                  title={tag.name}
                >
                  {tag.name}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full flex-shrink-0">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Drama Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md md:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-center">{title}</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative aspect-[2/3] overflow-hidden rounded-md">
              {posterUrl ? (
                <Image
                  src={posterUrl}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized={false}
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-kdrama-pink to-kdrama-blue flex items-center justify-center">
                  <span className="text-white font-bold">
                    {(title && title.substring(0, 2)) || "??"}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {year && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Year</h4>
                  <p>{year}</p>
                </div>
              )}

              {dramaDetails.description && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Synopsis
                  </h4>
                  <p className="text-sm">{dramaDetails.description}</p>
                </div>
              )}

              {/* Comments section temporarily removed */}

              {dramaDetails.tags.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Tags</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {dramaDetails.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className={`${getRandomColor(tag.name)} text-white text-xs px-2 py-0.5 rounded-full`}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex space-x-2 pt-4">
                {!inLibrary ? (
                  <Button
                    onClick={handleAddToLibrary}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add to Library
                  </Button>
                ) : (
                  <div className="flex space-x-2 flex-wrap gap-2">
                    <Button
                      onClick={() => handleStatusChange("liked")}
                      disabled={isLoading}
                      variant={status === "liked" ? "default" : "outline"}
                      className={status === "liked" ? "bg-blue-500" : ""}
                      size="sm"
                    >
                      <ThumbsUp size={16} className="mr-2" />
                      Like
                    </Button>
                    <Button
                      onClick={() => handleStatusChange("loved")}
                      disabled={isLoading}
                      variant={status === "loved" ? "default" : "outline"}
                      className={status === "loved" ? "bg-pink-500" : ""}
                      size="sm"
                    >
                      <Heart size={16} className="mr-2" />
                      Love
                    </Button>
                    <Button
                      onClick={() => handleStatusChange("dropped")}
                      disabled={isLoading}
                      variant={status === "dropped" ? "default" : "outline"}
                      className={status === "dropped" ? "bg-red-500" : ""}
                      size="sm"
                    >
                      <Frown size={16} className="mr-2" />
                      Drop
                    </Button>
                    <Button
                      onClick={() => handleStatusChange(null)}
                      disabled={isLoading}
                      variant="outline"
                      className="text-red-500 hover:text-red-600"
                      size="sm"
                    >
                      <Trash2 size={16} className="mr-2" />
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)} variant="outline">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
