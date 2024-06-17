import { LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { fetchPhotoByID } from "~/model/photos";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json({ data: await fetchPhotoByID(params.id || "") });
};

export default function PhotoDetail() {
  const { data } = useLoaderData<typeof loader>();
  const photo = data[0];
  return photo ? (
    <img
      src={photo?.data.cdnUrl || ""}
      width={photo?.data.fileInfo?.imageInfo?.width}
      height={photo?.data.fileInfo?.imageInfo?.height}
      alt={photo?.data.fileInfo?.originalFilename || ""}
      title={photo?.data.fileInfo?.originalFilename || ""}
    />
  ) : (
    <div>Not Found</div>
  );
}
