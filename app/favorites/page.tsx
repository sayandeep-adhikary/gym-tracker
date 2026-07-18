import type { Metadata } from "next";

import { FavoritesList } from "@/components/favorites/favorites-list";

export const metadata: Metadata = {
  title: "Favorites",
};

export default function FavoritesPage() {
  return <FavoritesList />;
}
