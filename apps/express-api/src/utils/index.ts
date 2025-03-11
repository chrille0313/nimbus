/*
 * Converts an array of strings into a nested object and inserts some data at the end.
 * Each string in the array represents a nested key in the resulting object.
 * The properties of the data argument are merged into the final nested object as the
 * value of the last key.
 *
 * @param parts - An array containing strings representing keys.
 * @returns A nested object structure based on the input array.
 */
export function arrayToObject(parts: string[], data: any): object {
  return parts.reduceRight((acc, part) => {
    return { [part]: { ...acc } };
  }, data);
}
