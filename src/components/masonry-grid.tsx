"use client";

import { useEffect, useState } from "react";
import DramaCard from "./drama-card";

interface Drama {
  id: string;
  title: string;
  year?: number;
  posterUrl?: string;
  description?: string;
  tags?: { id: string; name: string }[];
  userStatus?:
    | "liked"
    | "loved"
    | "dropped"
    | "watching"
    | "plan_to_watch"
    | null;
  inLibrary?: boolean;
}

interface MasonryGridProps {
  dramas: Drama[];
  onStatusChange?: (
    id: string,
    status: "liked" | "loved" | "dropped" | "watching" | "plan_to_watch" | null,
  ) => void;
  onAddToLibrary?: (id: string) => void;
}

export default function MasonryGrid({
  dramas,
  onStatusChange,
  onAddToLibrary,
}: MasonryGridProps) {
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640)
        setColumns(1); // Mobile
      else if (width < 768)
        setColumns(2); // Small tablets
      else if (width < 1024)
        setColumns(3); // Tablets
      else setColumns(4); // Desktop
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // Distribute dramas into columns
  const getColumnDramas = () => {
    const columnDramas: Drama[][] = Array.from({ length: columns }, () => []);

    // Make sure dramas is defined and has items
    if (!dramas || !Array.isArray(dramas) || dramas.length === 0) {
      return columnDramas;
    }

    dramas.forEach((drama, index) => {
      if (drama && drama.id) {
        // Ensure drama is valid
        const columnIndex = index % columns;
        columnDramas[columnIndex].push(drama);
      }
    });

    return columnDramas;
  };

  if (dramas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-lg text-kdrama-text mb-4">No dramas found</p>
        <p className="text-sm text-gray-500">
          Try adjusting your filters or add some dramas to your collection
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {getColumnDramas().map((columnDramas, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-4">
          {columnDramas.map((drama) => (
            <DramaCard
              key={drama.id}
              id={drama.id}
              title={drama.title}
              year={drama.year}
              description={drama.description}
              tags={drama.tags}
              userStatus={drama.userStatus}
              inLibrary={drama.inLibrary}
              onStatusChange={onStatusChange}
              onAddToLibrary={onAddToLibrary}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
