/**
 * Converts the form data into a javascript object.
 *
 * @param request The incoming fetch request.
 */
export const getData = async <T = unknown>(
  request: Request
): Promise<{ [k: string]: T }> => {
  //
  const object: { [k: string]: T } = {};
  const formData = await request.formData();

  formData.forEach((v, k) => (object[k] = v as T));

  return object;
};
