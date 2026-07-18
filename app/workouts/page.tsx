import type { Metadata } from "next";

import { ExerciseSearch } from "@/components/exercise-library/exercise-search";
import { WorkoutSchedule } from "@/components/schedule/workout-schedule";

export const metadata: Metadata = {
  title: "Workouts",
};

export default function WorkoutsPage() {
  return (
    <div className="space-y-14">
      <WorkoutSchedule />
      <ExerciseSearch />
    </div>
  );
}
