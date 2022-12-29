import { baseUrl } from "$env/static/private";

/**
 * Constructs a file url.
 *
 * @param collection The collection in which the file is stored.
 * @param id The id of the record associated with the file.
 * @param filename The name of the file.
 */
export const fileUrl = (
  collection: string,
  id: string,
  filename: string
): string => {
  //
  return `${baseUrl}/api/files/${collection}/${id}/${filename}`;
};
