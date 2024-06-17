import { OutputFileEntry } from "@uploadcare/blocks";
import { formatSize } from "~/lib/utils";

type IProps = {
  files: OutputFileEntry<"success">[];
};

export default function FileList({ files }: IProps) {
  return (
    <div>
      <h3 className="underline my-2">Temp Files</h3>

      {files.map((file) => (
        <div className="flex items-center py-1 border-t" key={file.uuid}>
          <img
            key={file.uuid}
            src={`${file.cdnUrl}/-/preview/-/resize/x100/`}
            width="50"
            height="50"
            alt={file.fileInfo.originalFilename || ""}
            title={file.fileInfo.originalFilename || ""}
          />
          <div className="ml-2">
            <div className="text-sm">
              <span className="font-bold">Name: </span>
              {file.fileInfo.originalFilename}
            </div>
            <div className="text-sm">
              <span className="font-bold">Size: </span>
              {formatSize(file.fileInfo.size)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
