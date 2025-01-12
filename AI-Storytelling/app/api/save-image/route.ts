import { storage } from "@/config/firebase";
import axios from "axios";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

// POST function for handling the API route
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { url }: any = data;

    // Convert image to base64 encoded string
    const imageBase64 = await convertImage(url);

    if (!imageBase64) {
      return NextResponse.json(
        { error: "Image conversion failed" },
        { status: 400 }
      );
    }

    const fileName = "/ai-story/" + Date.now() + ".png";
    const imageRef = ref(storage, fileName);

    // Upload the base64 string without the data URI prefix
    await uploadString(imageRef, imageBase64, "base64");

    // Get the download URL of the uploaded image
    const downloadUrl = await getDownloadURL(imageRef);

    return NextResponse.json({ imageUrl: downloadUrl });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}

// Helper function to convert image URL to base64
const convertImage = async (imageUrl: string) => {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const base64 = Buffer.from(response.data).toString("base64");
    return base64;
  } catch (error) {
    console.error("Error converting image:", error);
    return null;
  }
};
