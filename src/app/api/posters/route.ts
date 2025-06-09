import { createClient } from "../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const dramaId = url.searchParams.get("id");

  if (!dramaId) {
    return new NextResponse("Drama ID is required", { status: 400 });
  }

  try {
    const supabase = await createClient();

    // Get the drama to find the poster URL
    const { data: drama, error } = await supabase
      .from("dramas")
      .select("poster_url")
      .eq("id", dramaId)
      .single();

    if (error || !drama?.poster_url) {
      return new NextResponse("Poster not found", { status: 404 });
    }

    // Fetch the image from the external URL
    const imageResponse = await fetch(drama.poster_url);
    if (!imageResponse.ok) {
      return new NextResponse("Failed to fetch image", { status: 500 });
    }

    // Get the image data
    const imageData = await imageResponse.arrayBuffer();

    // Return the image with appropriate headers
    return new NextResponse(imageData, {
      headers: {
        "Content-Type":
          imageResponse.headers.get("Content-Type") || "image/jpeg",
        "Cache-Control": "public, max-age=31536000", // Cache for 1 year
      },
    });
  } catch (error) {
    console.error("Error fetching poster:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
