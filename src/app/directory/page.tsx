"use client";

import { createClient } from "../../../supabase/client";
import { useRouter } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import MasonryGrid from "@/components/masonry-grid";
import TagFilter from "@/components/tag-filter";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AddDramaDialog from "@/components/add-drama-dialog";
import { useState, useEffect } from "react";

export default function Directory() {
  const [dramas, setDramas] = useState([]);
  const [isAddDramaOpen, setIsAddDramaOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const DRAMAS_PER_PAGE = 8;
  const supabase = createClient();
  const router = useRouter();

  const fetchAllDramas = async (page = 1, query = "") => {
    // Reset dramas to prevent showing stale data
    setDramas([]);
    setIsLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/sign-in");
        return;
      }

      // Build full drama query for data fetching
      let dramaQuery = supabase.from("dramas").select("*").order("title");

      // Build a separate count query so dramaQuery stays intact
      let countQuery = supabase.from("dramas").select("id", {
        count: "exact",
        head: true,
      });

      if (query) {
        dramaQuery = dramaQuery.ilike("title", `%${query}%`);
        countQuery = countQuery.ilike("title", `%${query}%`);
      }

      // Get total count
      const { count } = await countQuery;

      setTotalPages(Math.ceil((count || 0) / DRAMAS_PER_PAGE));

      // Fetch dramas with pagination
      const from = (page - 1) * DRAMAS_PER_PAGE;
      const to = from + DRAMAS_PER_PAGE - 1;

      const { data: dramas, error: dramasError } = await dramaQuery.range(
        from,
        to,
      );

      if (dramasError) {
        console.error("Error fetching dramas:", dramasError);
        return;
      }

      console.log("Raw dramas data:", dramas);

      // Fetch user's dramas to know which ones are in their library
      const { data: userDramas } = await supabase
        .from("user_dramas")
        .select("drama_id, status")
        .eq("user_id", user.id);

      // Create a map of user's dramas for quick lookup
      const userDramaMap = (userDramas || []).reduce(
        (acc, ud) => {
          acc[ud.drama_id] = ud.status;
          return acc;
        },
        {} as Record<string, string>,
      );

      // Fetch tags for all dramas
      const { data: dramaTags } = await supabase.from("drama_tag_relations")
        .select(`
          drama_id,
          tags:tag_id(id, name)
        `);

      // Group tags by drama ID
      const tagsByDramaId = (dramaTags || []).reduce(
        (acc, dt) => {
          if (!acc[dt.drama_id]) {
            acc[dt.drama_id] = [];
          }
          acc[dt.drama_id].push(dt.tags);
          return acc;
        },
        {} as Record<string, { id: string; name: string }[]>,
      );

      // Format dramas for the grid - ensure titles are always displayed
      const formattedDramas = (dramas || []).map((drama) => {
        console.log("Processing drama:", drama);
        return {
          id: drama.id,
          title: drama.title || "Unknown Title", // Ensure title is never empty
          year: drama.year,
          description: drama.description || "",
          userStatus: userDramaMap[drama.id] || null,
          inLibrary: !!userDramaMap[drama.id],
          tags: tagsByDramaId[drama.id] || [],
          posterUrl: drama.poster_url || "",
        };
      });

      console.log("Formatted dramas:", formattedDramas);
      setDramas(formattedDramas);
    } catch (error) {
      console.error("Error fetching dramas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllDramas(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const handleTagsChange = (tags) => {
    setSelectedTags(tags);
  };

  const handleAddToLibrary = async (dramaId) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      await supabase.from("user_dramas").upsert({
        user_id: user.id,
        drama_id: dramaId,
        status: "plan_to_watch",
      });

      // Update the local state to reflect the change
      setDramas(
        dramas.map((drama) =>
          drama.id === dramaId
            ? { ...drama, inLibrary: true, userStatus: "plan_to_watch" }
            : drama,
        ),
      );

      // Show toast notification
      const toast = document.createElement("div");
      toast.className =
        "fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50";
      toast.style.animation = "slideInUp 0.3s ease-out forwards";
      toast.textContent = "Drama added to your library";
      document.body.appendChild(toast);

      // Remove toast after 3 seconds
      setTimeout(() => {
        toast.style.animation = "slideOutDown 0.3s ease-in forwards";
        setTimeout(() => {
          if (document.body.contains(toast)) {
            document.body.removeChild(toast);
          }
        }, 300);
      }, 3000);
    } catch (error) {
      console.error("Error adding drama to library:", error);
    }
  };

  const handleStatusChange = async (dramaId, status) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      if (status === null) {
        await supabase
          .from("user_dramas")
          .delete()
          .eq("user_id", user.id)
          .eq("drama_id", dramaId);

        // Update local state
        setDramas(
          dramas.map((drama) =>
            drama.id === dramaId
              ? { ...drama, inLibrary: false, userStatus: null }
              : drama,
          ),
        );
      } else {
        await supabase.from("user_dramas").upsert(
          {
            user_id: user.id,
            drama_id: dramaId,
            status: status,
          },
          { onConflict: "user_id,drama_id" },
        );

        // Update local state
        setDramas(
          dramas.map((drama) =>
            drama.id === dramaId
              ? { ...drama, inLibrary: true, userStatus: status }
              : drama,
          ),
        );
      }
    } catch (error) {
      console.error("Error updating drama status:", error);
    }
  };

  const filteredDramas = dramas.filter((drama) => {
    // Filter by tags only (search is now handled by the backend)
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
            Global K-Drama Directory
          </h1>

          <div className="flex items-center gap-4">
            <Button
              onClick={() => setIsAddDramaOpen(true)}
              className="bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 flex items-center gap-2"
            >
              <Plus size={16} />
              Add New Drama
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
          <aside className="bg-white p-4 rounded-lg shadow-sm border border-kdrama-pink border-opacity-20 h-fit">
            <div className="mb-6">
              <label
                htmlFor="search"
                className="font-medium text-kdrama-text block mb-2"
              >
                Search
              </label>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  id="search"
                  placeholder="Search dramas..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <TagFilter onTagsChange={handleTagsChange} />
          </aside>

          <div>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-kdrama-text">Loading dramas...</p>
              </div>
            ) : (
              <>
                <MasonryGrid
                  dramas={filteredDramas}
                  onStatusChange={handleStatusChange}
                  onAddToLibrary={handleAddToLibrary}
                />

                {/* Pagination Controls */}
                <div className="flex justify-center mt-8 gap-2">
                  <Button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    variant="outline"
                  >
                    Previous
                  </Button>

                  <div className="flex items-center px-4">
                    <span className="text-sm font-medium">
                      Page {currentPage} of {totalPages}
                    </span>
                  </div>

                  <Button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    variant="outline"
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <AddDramaDialog
        open={isAddDramaOpen}
        onOpenChange={setIsAddDramaOpen}
        onDramaAdded={fetchAllDramas}
      />
    </div>
  );
}
