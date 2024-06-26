import { v2 as cloudinary } from "cloudinary";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const chapterId = req.nextUrl.searchParams.get("chapterId");

  const { resources } = await cloudinary.search
    .expression(`tags=${chapterId}`)
    .execute();
  return Response.json({ results: resources });
}
