import { ActionFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import {
  OutputFileEntry,
  OutputCollectionState,
  OutputCollectionStatus,
} from "@uploadcare/blocks";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

import { fetchAllPhotos, savePhotos } from "~/model/photos";
import PhotoGallery from "~/components/PhotoGallery";
import { useState, useRef, useEffect } from "react";
import { Button } from "~/components/ui/button";
import FileList from "~/components/FileList";

let isHydrating = true;

export const meta: MetaFunction = () => {
  return [
    { title: "Photo Gallery" },
    { name: "description", content: "Welcome!" },
  ];
};
export const loader = async () => {
  return json({ photos: await fetchAllPhotos() });
};

export async function action({ request }: ActionFunctionArgs) {
  const files = await request.json();
  if (files) {
    await savePhotos(files);
  }

  return json({ success: true }, 200);
}

export default function Index() {
  const [isHydrated, setIsHydrated] = useState(!isHydrating);
  const ctxProviderRef = useRef<InstanceType<UploadCtxProvider>>(null);

  const { photos } = useLoaderData<typeof loader>();
  const [files, setFiles] = useState<OutputFileEntry<"success">[]>([]);
  const fetcher = useFetcher();

  useEffect(() => {
    isHydrating = false;
    setIsHydrated(true);
  }, []);

  const handleClick = async () => {
    await fetcher.submit(JSON.stringify(files), {
      method: "POST",
      encType: "application/json",
    });
    resetUploaderState();
  };

  const resetUploaderState = () =>
    ctxProviderRef.current?.uploadCollection.clearAll();

  const handleChangeEvent = (
    files: OutputCollectionState<OutputCollectionStatus, "maybe-has-group">
  ) => {
    setFiles([
      ...files.allEntries.filter((f) => f.status === "success"),
    ] as OutputFileEntry<"success">[]);
  };

  return (
    <div className="font-sans p-4">
      <h2 className="text-2xl">Upload Files</h2>
      {isHydrated && (
        <FileUploaderRegular
          apiRef={ctxProviderRef}
          ctxName="uploader-3"
          onChange={handleChangeEvent}
          pubkey="1ebff484d858d9c647d8"
          maxLocalFileSizeBytes={10000000}
          imgOnly={true}
          sourceList="local, url, camera, dropbox"
        />
      )}
      <FileList files={files} />
      <Button
        onClick={handleClick}
        className="mt-2"
        disabled={files.length === 0}
      >
        {files.length === 0 ? "No Files to Save" : "Save to DB"}
      </Button>

      <PhotoGallery photos={photos} />
    </div>
  );
}
