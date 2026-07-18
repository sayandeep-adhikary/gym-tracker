import { Dumbbell, Heart, Home, Settings, TrendingUp } from "lucide-react";

import { ROUTES } from "@/lib/constants";
import type { NavItem } from "@/types";

/**
 * Primary navigation. Rendered as a bottom tab bar on mobile and a sidebar on
 * desktop. Keep this list to ~5 destinations for an ergonomic mobile tab bar.
 */
export const NAV_ITEMS: NavItem[] = [
  { title: "Home", href: ROUTES.home, icon: Home },
  { title: "Workouts", href: ROUTES.workouts, icon: Dumbbell },
  { title: "Progress", href: ROUTES.progress, icon: TrendingUp },
  { title: "Favorites", href: ROUTES.favorites, icon: Heart },
  { title: "Settings", href: ROUTES.settings, icon: Settings },
];
