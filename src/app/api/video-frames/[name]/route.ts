import { readFile } from "node:fs/promises";
import path from "node:path";

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

export async function GET(
  _request: Request,
  context: RouteContext<"/api/video-frames/[name]">,
) {
  const { name } = await context.params;

  if (!/^frame_\d{6}\.(jpg|jpeg|png|webp)$/i.test(name)) {
    return new Response("Not found", { status: 404 });
  }

  const extension = path.extname(name).toLowerCase();
  const filePath = path.join(process.cwd(), "video-frames", name);

  try {
    const file = await readFile(filePath);

    return new Response(file, {
      headers: {
        "Content-Type": CONTENT_TYPES[extension] ?? "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
