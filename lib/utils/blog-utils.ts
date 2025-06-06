/**
 * Converts a blog title to a URL-friendly slug
 * @param title - The blog title to convert
 * @returns A URL-friendly slug
 */
export const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens and spaces
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, and multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Finds a blog by its slug (converted from title)
 * @param blogs - Array of blogs
 * @param slug - The slug to search for
 * @returns The matching blog or undefined
 */
export const findBlogBySlug = (blogs: any[], slug: string) => {
  return blogs.find(blog => createSlug(blog.title) === slug);
};
