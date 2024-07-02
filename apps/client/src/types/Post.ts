import type { Author } from "./Author";

interface Post {
    id: number;
    content: string;
    createdAt: string;
    sharedAt: string;
    imageUrl?: string;
    likes: number;
    liked: boolean;
    comments: { id: string }[];
    author: Author;
}

export type { Post };
