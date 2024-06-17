import { Link } from "react-router-dom";
import { Photo, ResponseObj } from "~/model/photos";

type IProps = {
  photos: ResponseObj<Photo>[];
};
export default function PhotoGallery({ photos }: IProps) {
  return (
    <>
      <h2 className="text-2xl mt-4">Saved Files</h2>
      <small className="italic text-sm text-zinc-500">
        (Click to Open at Full Resolution)
      </small>
      <div className="grid grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div key={photo?.id}>
            <Link
              rel="noreferrer"
              to={photo.id}
              target="_blank"
              title={photo.data.fileInfo?.originalFilename || ""}
            >
              <img
                key={photo.id}
                src={`${photo.data.cdnUrl}/-/preview/-/resize/x400/`}
                width="200"
                height="200"
                alt={photo.data.fileInfo?.originalFilename || ""}
                title={photo.data.fileInfo?.originalFilename || ""}
              />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
