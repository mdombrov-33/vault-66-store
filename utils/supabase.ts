import { createClient } from "@supabase/supabase-js";

//* Name of the bucket in Supabase storage.
const bucket = "main-bucket";

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

export const uploadImage = async (image: File) => {
  const timestamp = Date.now();
  const newName = `${timestamp} - ${image.name}`;
  const { data } = await supabase.storage
    .from(bucket)
    .upload(newName, image, { cacheControl: "3600" });
  if (!data) throw new Error("Image upload failed");
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};

export const deleteImage = (url: string) => {
  const decodedUrl = decodeURIComponent(url);
  const imageName = decodedUrl.split("/").pop();
  if (!imageName) throw new Error("Invalid image URL");
  return supabase.storage.from(bucket).remove([imageName]);
};
