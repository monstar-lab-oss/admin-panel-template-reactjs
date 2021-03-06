/**
 * Check if a string looks like an external URL
 */
export const isURL = (str: string) => {
  return /http|www/.test(str);
};

/**
 * A promise to delay an async function
 * @param ms how many milliseconds to wait
 */
export const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const getInitials = (name: string, maxChar: number) => {
  return name
    .split(/\s/)
    .map(word => word[0])
    .join("")
    .substr(0, maxChar)
    .toUpperCase();
};
