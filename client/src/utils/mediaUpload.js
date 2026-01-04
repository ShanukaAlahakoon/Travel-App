import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default function uploadFile(file) {
  return new Promise((resolve, reject) => {
    const timeStamp = Date.now();
    const fileName = timeStamp + "-" + file.name;

    supabase.storage
      .from("images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      })
      .then((response) => {
        if (response.error) {
          reject(response.error);
          return;
        }

        const publicUrl = supabase.storage
          .from("images")
          .getPublicUrl(fileName);

        resolve(publicUrl.data.publicUrl);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
