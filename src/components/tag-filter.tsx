"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { createClient } from "../../supabase/client";

interface Tag {
  id: string;
  name: string;
}

interface TagFilterProps {
  onTagsChange: (selectedTags: string[]) => void;
  availableTags?: { id: string; name: string }[];
  initialSelectedTags?: string[];
}

export default function TagFilter({
  onTagsChange,
  availableTags,
  initialSelectedTags = [],
}: TagFilterProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] =
    useState<string[]>(initialSelectedTags);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        if (availableTags) {
          setTags(availableTags);
          setIsLoading(false);
        } else {
          const { data, error } = await supabase
            .from("drama_tags")
            .select("id, name")
            .order("name");

          if (error) throw error;
          setTags(data || []);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
        setIsLoading(false);
      }
    };

    fetchTags();
  }, [availableTags]);

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) => {
      const newSelectedTags = prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId];

      // Notify parent component about the change
      onTagsChange(newSelectedTags);

      return newSelectedTags;
    });
  };

  const clearAllTags = () => {
    setSelectedTags([]);
    onTagsChange([]);
  };

  const getRandomColor = (tagName: string) => {
    const colors = [
      "bg-pink-400 hover:bg-pink-500",
      "bg-blue-400 hover:bg-blue-500",
      "bg-purple-400 hover:bg-purple-500",
      "bg-green-400 hover:bg-green-500",
      "bg-yellow-400 hover:bg-yellow-500",
      "bg-red-400 hover:bg-red-500",
      "bg-indigo-400 hover:bg-indigo-500",
    ];

    // Simple hash function to get consistent colors for the same tag
    const hash = tagName
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-2 py-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-6 w-16 bg-gray-200 animate-pulse rounded-full"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-kdrama-text">Filter by Tags</h3>
        {selectedTags.length > 0 && (
          <button
            onClick={clearAllTags}
            className="text-xs text-kdrama-accent hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag.id);
          return (
            <button
              key={tag.id}
              onClick={() => toggleTag(tag.id)}
              className={`
                px-3 py-1 rounded-full text-sm transition-colors flex items-center gap-1
                ${
                  isSelected
                    ? `${getRandomColor(tag.name)} text-white`
                    : "bg-gray-100 hover:bg-gray-200 text-kdrama-text"
                }
              `}
            >
              {tag.name}
              {isSelected && <X size={14} />}
            </button>
          );
        })}

        {tags.length === 0 && (
          <p className="text-sm text-gray-500">No tags available</p>
        )}
      </div>
    </div>
  );
}
