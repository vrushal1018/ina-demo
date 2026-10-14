import blogsData from './blogs.json';

export interface BlogTag {
  label: string;
  color?: string;
}

export interface BlogSection {
  id: string;
  title: string;
  paragraphs?: string[];
  list?: string[];
  bullets?: string[];
  subparagraphs?: string[];
}

export interface SidebarNavItem {
  id: string;
  label: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  description: string;
  date: string;
  author?: string;
  sourceUrl?: string;
  readTime: string;
  tags: BlogTag[];
  imageUrl: string;
  videoUrl?: string;
  sidebarNav?: SidebarNavItem[];
  sections: BlogSection[];
}

export const blogs: BlogPost[] = blogsData as BlogPost[];

export function getAllBlogs(): BlogPost[] {
  return blogs;
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogs.find(
    (b) => b.slug.toLowerCase() === slug.toLowerCase() || b.id.toString() === slug
  );
}
