import { db } from "~/db/client.server";
import { photos } from "~/db/schema";
import { OutputFileEntry } from "@uploadcare/blocks";
import { desc, eq } from "drizzle-orm";

export async function fetchAllPhotos() {
  return await db.select().from(photos).orderBy(desc(photos.createdAt));
}

export async function fetchPhotoByID(id: string) {
  return await db.select().from(photos).where(eq(photos.id, id));
}

function pruneImageObj(file: OutputFileEntry<"success">) {
  const {
    uuid,
    cdnUrl,
    fullPath,
    uploadProgress,
    fileInfo,
    isSuccess,
    errors,
  } = file;

  return {
    data: {
      uuid,
      cdnUrl,
      fullPath,
      uploadProgress,
      fileInfo,
      isSuccess,
      errors,
    },
  };
}

export async function savePhotos(files: OutputFileEntry<"success">[]) {
  const pruned = files.map((file) => pruneImageObj(file));
  return await db.insert(photos).values(pruned);
}

export type Photo = Pick<
  OutputFileEntry,
  | "uuid"
  | "cdnUrl"
  | "fullPath"
  | "uploadProgress"
  | "fileInfo"
  | "isSuccess"
  | "errors"
>;

export interface ResponseObj<T> {
  id: string;
  data: T;
  created_at: Date;
}
