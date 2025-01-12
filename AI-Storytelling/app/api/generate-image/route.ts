import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req: NextRequest, res: NextResponse) {
  const replicate = new Replicate({
    auth: process.env.NEXT_PUBLIC_REPLICATE_IMAGE_GENERATION,
  });

  const data = await req.json();
  const { prompt } = data;

  const input = {
    prompt: prompt,
    go_fast: true,
    megapixels: "1",
    num_outputs: 1,
    aspect_ratio: "1:1",
    output_format: "webp",
    output_quality: 80,
    num_inference_steps: 4,
  };

  const output: any = await replicate.run("black-forest-labs/flux-schnell", {
    input,
  });
  console.log(output);
  return NextResponse.json({ imageUrl: output[0] });
}