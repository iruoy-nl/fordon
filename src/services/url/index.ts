import { pipe } from "fp-ts/lib/function";
import { pbUrl } from "~/di";

/**
 * Constructs an absolute file url.
 *
 * @param collection The id or name of the collection of the file.
 * @param id The id of the associated record.
 * @param filename The name of the files.
 */
export const getFileUrl = (
  collection: string,
  id: string,
  filename: string
): string => {
  return pipe(
    //
    pbUrl,
    (v) => `${v}/api/files/${collection}/${id}/${filename}`
  );
};
