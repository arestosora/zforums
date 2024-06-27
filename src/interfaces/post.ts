interface Author {
    id: number;
    name: string;
    username: string;
    email: string;
    avatar: string;
    role: string;
    createdAt: string;
    deletedAt: string | null;
  }
  
  interface Post {
    id?: number;
    title?: string;
    content?: string;
    imageUrl?: string;
    createdAt?: string;
    deletedAt?: string | null;
    author?: Author;
    comments?: any[];
  }

  export type  { Author, Post };