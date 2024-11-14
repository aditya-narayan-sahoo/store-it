import Card from "@/components/Card";
import { Models } from "node-appwrite";
import { getFiles } from "@/lib/actions/file.actions";
import { convertFileSize, getFileTypesParams } from "@/lib/utils";

const Page = async ({ searchParams, params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";
  const types = getFileTypesParams(type) as FileType[];
  const files = await getFiles({ types, searchText, sort });

  const totalSizeBytes = files.documents.reduce(
    (total, file: Models.Document) => total + (file.size || 0),
    0
  );
  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>
        <div className="total-size-section">
          <p className="body-1">
            Total: <span className="h5">{convertFileSize(totalSizeBytes)}</span>
          </p>
          <div className="sort-container">
            {/* <p className="body-1 hidden text-light-200 sm:block">Sort by:</p> */}
            {/* <Sort /> */}
          </div>
        </div>
      </section>
      {/* Render the files */}
      {files.total > 0 ? (
        <section className="file-list">
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="empty-list">No files uploaded</p>
      )}
    </div>
  );
};
export default Page;
