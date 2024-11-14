import Link from "next/link";
import { Models } from "node-appwrite";
import { convertFileSize } from "@/lib/utils";
import Thumbnail from "@/components/Thumbnail";
import ActionDropdown from "@/components/ActionDropdown";
import FormattedDateTime from "@/components/FormattedDateTime";

const Card = ({ file }: { file: Models.Document }) => {
  const { url, type, extension, size, name, owner, $createdAt } = file;
  return (
    <Link href={url} target="_blank" className="file-card">
      <div className="flex justify-between">
        <Thumbnail
          type={type}
          extension={extension}
          url={url}
          className="!size-20"
          imageClassName="!size-11"
        />
        <div className="flex flex-col items-end justify-between">
          <ActionDropdown file={file} />
          <p className="body-1">{convertFileSize(size)}</p>
        </div>
      </div>

      <div className="file-card-details">
        <p className="subtitle-2 line-clamp-1">{name}</p>
        <FormattedDateTime
          date={$createdAt}
          className="body-2 text-light-100"
        />
        <p className="caption line-clamp-1 text-light-200">
          By: {owner.fullName}
        </p>
      </div>
    </Link>
  );
};

export default Card;
