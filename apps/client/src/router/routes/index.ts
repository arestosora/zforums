import aboutRoutes from "./about";
import homeRoutes from "./home";
import authRoutes from "./auth";
import commentsRoutes from "./comment";
import notFoundRoutes from "./notFound";
import postsRoutes from "./posts";
import profileRoutes from "./profile";

export const AppRoutes = [
    ...homeRoutes,
    ...authRoutes,
    ...aboutRoutes,
    ...postsRoutes,
    ...profileRoutes,
    ...commentsRoutes,
    ...notFoundRoutes,
]