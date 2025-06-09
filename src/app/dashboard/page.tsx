"use client";

import { createClient } from "../../../supabase/client";
import { useRouter } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import MasonryGrid from "@/components/masonry-grid";
import TagFilter from "@/components/tag-filter";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddDramaDialog from "@/components/add-drama-dialog";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/toast-provider";

export default function Dashboard() {
  const [dramas, setDramas] = useState([]);
  const [isAddDramaOpen, setIsAddDramaOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();
  const supabase = createClient();
  const router = useRouter();

  const fetchUserDramas = async () => {
    setIsLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/sign-in");
        return;
      }

      // Run both queries in parallel for better performance
      const [userDramasResult, dramaTagsResult] = await Promise.all([
        // Fetch user's dramas with drama details in a single query
        supabase
          .from("user_dramas")
          .select(
            `
            id,
            status,
            drama_id,
            drama:drama_id(id, title, year, description, poster_url)
          `,
          )
          .eq("user_id", user.id),

        // Fetch all drama tags in a single query
        supabase.from("drama_tag_relations").select(`
            drama_id,
            tags:tag_id(id, name)
          `),
      ]);

      const { data: userDramas, error: userDramasError } = userDramasResult;
      const { data: dramaTags } = dramaTagsResult;

      if (userDramasError) {
        console.error("Error fetching user dramas:", userDramasError);
        return;
      }

      // Group tags by drama ID using a Map for better performance
      const tagsByDramaId = new Map();
      (dramaTags || []).forEach((dt) => {
        if (!tagsByDramaId.has(dt.drama_id)) {
          tagsByDramaId.set(dt.drama_id, []);
        }
        tagsByDramaId.get(dt.drama_id).push(dt.tags);
      });

      // Format dramas for the grid with optimized processing
      const formattedDramas = (userDramas || [])
        .map((ud) => {
          const dramaId = ud.drama?.id;
          if (!dramaId) return null;

          console.log(
            `Dashboard - Drama ${ud.drama?.title} - Raw data:`,
            ud.drama,
          );
          console.log(
            `Dashboard - Drama ${ud.drama?.title} - poster_url:`,
            ud.drama?.poster_url,
          );

          return {
            id: dramaId,
            title: ud.drama?.title || "Unknown Title",
            year: ud.drama?.year,
            posterUrl: `/api/posters?id=${dramaId}`,
            userStatus: ud.status,
            inLibrary: true,
            tags: tagsByDramaId.get(dramaId) || [],
          };
        })
        .filter(Boolean); // Filter out any null entries

      console.log("Dashboard - All formatted dramas:", formattedDramas);

      setDramas(formattedDramas);
    } catch (error) {
      console.error("Error fetching dramas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDramas();
  }, []);

  const handleTagsChange = (tags) => {
    setSelectedTags(tags);
  };

  // Get unique tags from user's dramas only
  const getUserLibraryTags = () => {
    const uniqueTags = new Set();
    dramas.forEach((drama) => {
      drama.tags.forEach((tag) => {
        uniqueTags.add(JSON.stringify(tag));
      });
    });
    return Array.from(uniqueTags).map((tag) => JSON.parse(tag));
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const filteredDramas = dramas.filter((drama) => {
    // Filter by status
    if (selectedStatus !== "all" && drama.userStatus !== selectedStatus) {
      return false;
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      const dramaTags = drama.tags.map((tag) => tag.id);
      return selectedTags.every((tagId) => dramaTags.includes(tagId));
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-kdrama-lightpink">
      <DashboardNavbar />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-kdrama-text">
            My K-Drama Library
          </h1>

          <div className="flex items-center gap-4">
            <Button
              onClick={() => setIsAddDramaOpen(true)}
              className="bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 flex items-center gap-2"
            >
              <Plus size={16} />
              Add Drama
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
          <aside className="bg-white p-4 rounded-lg shadow-sm border border-kdrama-pink border-opacity-20 h-fit">
            <TagFilter
              onTagsChange={handleTagsChange}
              availableTags={getUserLibraryTags()}
            />

            <div className="border-t border-gray-200 pt-4 mt-4">
              <h3 className="font-medium text-kdrama-text mb-2">Status</h3>
              <div className="space-y-2">
                {[
                  { value: "all", label: "All Dramas" },
                  { value: "loved", label: "Loved" },
                  { value: "liked", label: "Liked" },
                  { value: "watching", label: "Watching" },
                  { value: "plan_to_watch", label: "Plan to Watch" },
                  { value: "dropped", label: "Dropped" },
                ].map((status) => (
                  <div key={status.value} className="flex items-center">
                    <input
                      type="radio"
                      id={status.value}
                      name="status"
                      value={status.value}
                      checked={selectedStatus === status.value}
                      onChange={() => handleStatusChange(status.value)}
                      className="mr-2"
                    />
                    <label
                      htmlFor={status.value}
                      className="text-sm text-kdrama-text"
                    >
                      {status.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-kdrama-text">Loading your dramas...</p>
              </div>
            ) : (
              <MasonryGrid
                dramas={filteredDramas}
                onStatusChange={(id, status) => {
                  setDramas(
                    dramas.map((drama) =>
                      drama.id === id
                        ? { ...drama, userStatus: status }
                        : drama,
                    ),
                  );
                }}
              />
            )}
          </div>
        </div>
      </main>

      <AddDramaDialog
        open={isAddDramaOpen}
        onOpenChange={setIsAddDramaOpen}
        onDramaAdded={fetchUserDramas}
      />
    </div>
  );
}
