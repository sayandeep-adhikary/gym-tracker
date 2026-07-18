import type { WorkoutDay, WorkoutDayId, WorkoutExercise } from "@/types";

/**
 * =============================================================================
 *  Workout data — Push / Pull / Legs, Upper / Lower and their A/B variations.
 * =============================================================================
 *  Each template is a structured `WorkoutDay` containing fully-specified
 *  `WorkoutExercise` objects. Exercise ids are globally unique (day-prefixed)
 *  so they are safe to use as keys and for lookups.
 * =============================================================================
 */

// -----------------------------------------------------------------------------
// Push — chest, shoulders, triceps
// -----------------------------------------------------------------------------
export const pushWorkout: WorkoutDay = {
  id: "push",
  name: "Push",
  focus: "push",
  description: "Chest, shoulders and triceps — all the pressing muscles.",
  exercises: [
    {
      id: "push-barbell-bench-press",
      name: "Barbell Bench Press",
      primaryMuscle: "chest",
      secondaryMuscles: ["shoulders", "triceps"],
      equipment: "barbell",
      sets: 4,
      reps: "6-8",
      rest: "120s",
      difficulty: "intermediate",
      animationType: "horizontal-press",
      tips: [
        "Retract your shoulder blades and keep them pinned to the bench.",
        "Lower the bar to your mid-chest and drive through the full foot.",
      ],
    },
    {
      id: "push-overhead-press",
      name: "Standing Overhead Press",
      primaryMuscle: "shoulders",
      secondaryMuscles: ["triceps", "core"],
      equipment: "barbell",
      sets: 4,
      reps: "8-10",
      rest: "120s",
      difficulty: "intermediate",
      animationType: "vertical-press",
      tips: [
        "Brace your core and squeeze your glutes to protect your lower back.",
        "Move your head 'through the window' once the bar clears your face.",
      ],
    },
    {
      id: "push-incline-dumbbell-press",
      name: "Incline Dumbbell Press",
      primaryMuscle: "chest",
      secondaryMuscles: ["shoulders", "triceps"],
      equipment: "dumbbell",
      sets: 3,
      reps: "8-12",
      rest: "90s",
      difficulty: "intermediate",
      animationType: "horizontal-press",
      tips: [
        "Set the bench to 30–45° to bias the upper chest.",
        "Control the descent and stop just short of locking out at the top.",
      ],
    },
    {
      id: "push-lateral-raise",
      name: "Dumbbell Lateral Raise",
      primaryMuscle: "shoulders",
      secondaryMuscles: ["traps"],
      equipment: "dumbbell",
      sets: 3,
      reps: "12-15",
      rest: "60s",
      difficulty: "beginner",
      animationType: "lateral-raise",
      tips: [
        "Lead with your elbows and keep a slight bend throughout.",
        "Use a weight you can control — momentum steals the tension.",
      ],
    },
    {
      id: "push-triceps-pushdown",
      name: "Cable Triceps Pushdown",
      primaryMuscle: "triceps",
      secondaryMuscles: [],
      equipment: "cable",
      sets: 3,
      reps: "10-15",
      rest: "60s",
      difficulty: "beginner",
      animationType: "extension",
      tips: [
        "Keep your elbows tucked to your sides and stationary.",
        "Fully extend and squeeze the triceps at the bottom.",
      ],
    },
    {
      id: "push-overhead-triceps-extension",
      name: "Overhead Cable Triceps Extension",
      primaryMuscle: "triceps",
      secondaryMuscles: [],
      equipment: "cable",
      sets: 3,
      reps: "10-12",
      rest: "60s",
      difficulty: "beginner",
      animationType: "extension",
      tips: [
        "Keep your upper arms fixed and stretch the triceps overhead.",
        "Avoid flaring the elbows as you extend.",
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// Pull — back, biceps, rear delts
// -----------------------------------------------------------------------------
export const pullWorkout: WorkoutDay = {
  id: "pull",
  name: "Pull",
  focus: "pull",
  description: "Back, biceps and rear delts — the pulling muscles.",
  exercises: [
    {
      id: "pull-deadlift",
      name: "Conventional Deadlift",
      primaryMuscle: "back",
      secondaryMuscles: ["glutes", "hamstrings", "traps", "forearms"],
      equipment: "barbell",
      sets: 3,
      reps: "5",
      rest: "180s",
      difficulty: "advanced",
      animationType: "hinge",
      tips: [
        "Brace hard and pull the slack out of the bar before you lift.",
        "Keep the bar close and push the floor away — don't yank.",
      ],
    },
    {
      id: "pull-pull-up",
      name: "Pull-Up",
      primaryMuscle: "lats",
      secondaryMuscles: ["biceps", "back", "rear-delts"],
      equipment: "bodyweight",
      sets: 4,
      reps: "6-10",
      rest: "120s",
      difficulty: "intermediate",
      animationType: "vertical-pull",
      tips: [
        "Start from a dead hang and drive your elbows down and back.",
        "Think about pulling your chest to the bar, not your chin over it.",
      ],
    },
    {
      id: "pull-barbell-row",
      name: "Barbell Row",
      primaryMuscle: "back",
      secondaryMuscles: ["lats", "biceps", "rear-delts"],
      equipment: "barbell",
      sets: 4,
      reps: "8-10",
      rest: "90s",
      difficulty: "intermediate",
      animationType: "horizontal-pull",
      tips: [
        "Hinge to ~45° and keep a flat, braced back.",
        "Row to your lower ribs and control the eccentric.",
      ],
    },
    {
      id: "pull-seated-cable-row",
      name: "Seated Cable Row",
      primaryMuscle: "back",
      secondaryMuscles: ["lats", "biceps"],
      equipment: "cable",
      sets: 3,
      reps: "10-12",
      rest: "90s",
      difficulty: "beginner",
      animationType: "horizontal-pull",
      tips: [
        "Keep your torso upright and avoid rocking for momentum.",
        "Drive your elbows back and squeeze your shoulder blades together.",
      ],
    },
    {
      id: "pull-face-pull",
      name: "Cable Face Pull",
      primaryMuscle: "rear-delts",
      secondaryMuscles: ["traps"],
      equipment: "cable",
      sets: 3,
      reps: "15-20",
      rest: "60s",
      difficulty: "beginner",
      animationType: "horizontal-pull",
      tips: [
        "Pull the rope towards your forehead and externally rotate.",
        "Great for shoulder health — keep the reps smooth and high.",
      ],
    },
    {
      id: "pull-dumbbell-curl",
      name: "Dumbbell Biceps Curl",
      primaryMuscle: "biceps",
      secondaryMuscles: ["forearms"],
      equipment: "dumbbell",
      sets: 3,
      reps: "10-12",
      rest: "60s",
      difficulty: "beginner",
      animationType: "curl",
      tips: [
        "Keep your elbows pinned and avoid swinging the weight up.",
        "Supinate (turn the pinky up) as you curl for a stronger contraction.",
      ],
    },
    {
      id: "pull-hammer-curl",
      name: "Hammer Curl",
      primaryMuscle: "biceps",
      secondaryMuscles: ["forearms"],
      equipment: "dumbbell",
      sets: 3,
      reps: "10-12",
      rest: "60s",
      difficulty: "beginner",
      animationType: "curl",
      tips: [
        "Hold a neutral grip to target the brachialis and forearms.",
        "Control the lowering phase — don't let the weight drop.",
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// Legs — quads, hamstrings, glutes, calves
// -----------------------------------------------------------------------------
export const legsWorkout: WorkoutDay = {
  id: "legs",
  name: "Legs",
  focus: "legs",
  description: "Quads, hamstrings, glutes and calves — the full lower body.",
  exercises: [
    {
      id: "legs-back-squat",
      name: "Barbell Back Squat",
      primaryMuscle: "quads",
      secondaryMuscles: ["glutes", "hamstrings", "core"],
      equipment: "barbell",
      sets: 4,
      reps: "6-8",
      rest: "150s",
      difficulty: "intermediate",
      animationType: "squat",
      tips: [
        "Brace your core and break at the hips and knees together.",
        "Descend to at least parallel and drive up through mid-foot.",
      ],
    },
    {
      id: "legs-romanian-deadlift",
      name: "Romanian Deadlift",
      primaryMuscle: "hamstrings",
      secondaryMuscles: ["glutes", "back"],
      equipment: "barbell",
      sets: 3,
      reps: "8-10",
      rest: "120s",
      difficulty: "intermediate",
      animationType: "hinge",
      tips: [
        "Push your hips back and keep the bar dragging down your thighs.",
        "Feel the hamstring stretch, then drive your hips forward to stand.",
      ],
    },
    {
      id: "legs-leg-press",
      name: "Leg Press",
      primaryMuscle: "quads",
      secondaryMuscles: ["glutes", "hamstrings"],
      equipment: "machine",
      sets: 3,
      reps: "10-12",
      rest: "90s",
      difficulty: "beginner",
      animationType: "squat",
      tips: [
        "Keep your lower back flat against the pad throughout.",
        "Don't lock out the knees aggressively at the top.",
      ],
    },
    {
      id: "legs-walking-lunge",
      name: "Walking Lunge",
      primaryMuscle: "quads",
      secondaryMuscles: ["glutes", "hamstrings"],
      equipment: "dumbbell",
      sets: 3,
      reps: "12-16",
      rest: "90s",
      difficulty: "intermediate",
      animationType: "lunge",
      tips: [
        "Take a controlled step and drop the back knee towards the floor.",
        "Keep your torso tall and push through the front heel.",
      ],
    },
    {
      id: "legs-leg-curl",
      name: "Lying Leg Curl",
      primaryMuscle: "hamstrings",
      secondaryMuscles: ["calves"],
      equipment: "machine",
      sets: 3,
      reps: "10-15",
      rest: "60s",
      difficulty: "beginner",
      animationType: "curl",
      tips: [
        "Curl explosively and lower under control.",
        "Keep your hips down on the pad — don't let them rise.",
      ],
    },
    {
      id: "legs-standing-calf-raise",
      name: "Standing Calf Raise",
      primaryMuscle: "calves",
      secondaryMuscles: [],
      equipment: "machine",
      sets: 4,
      reps: "12-20",
      rest: "45s",
      difficulty: "beginner",
      animationType: "calf-raise",
      tips: [
        "Get a full stretch at the bottom and a strong squeeze at the top.",
        "Pause briefly at the top — avoid bouncing the reps.",
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// Upper — chest, back, shoulders, arms
// -----------------------------------------------------------------------------
export const upperWorkout: WorkoutDay = {
  id: "upper",
  name: "Upper",
  focus: "upper",
  description: "Chest, back, shoulders and arms in a single upper-body session.",
  exercises: [
    {
      id: "upper-bench-press",
      name: "Barbell Bench Press",
      primaryMuscle: "chest",
      secondaryMuscles: ["shoulders", "triceps"],
      equipment: "barbell",
      sets: 4,
      reps: "6-8",
      rest: "120s",
      difficulty: "intermediate",
      animationType: "horizontal-press",
      tips: [
        "Keep your shoulder blades retracted and feet planted.",
        "Touch the mid-chest and press in a slight arc back over the shoulders.",
      ],
    },
    {
      id: "upper-pull-up",
      name: "Pull-Up",
      primaryMuscle: "lats",
      secondaryMuscles: ["biceps", "back"],
      equipment: "bodyweight",
      sets: 4,
      reps: "6-10",
      rest: "120s",
      difficulty: "intermediate",
      animationType: "vertical-pull",
      tips: [
        "Initiate by depressing the shoulder blades, then pull.",
        "Add weight with a belt once you can clear 10 clean reps.",
      ],
    },
    {
      id: "upper-overhead-press",
      name: "Overhead Press",
      primaryMuscle: "shoulders",
      secondaryMuscles: ["triceps", "core"],
      equipment: "barbell",
      sets: 3,
      reps: "8-10",
      rest: "90s",
      difficulty: "intermediate",
      animationType: "vertical-press",
      tips: [
        "Keep the bar path vertical and stacked over the mid-foot.",
        "Don't over-arch — squeeze your glutes to stay tight.",
      ],
    },
    {
      id: "upper-barbell-row",
      name: "Barbell Row",
      primaryMuscle: "back",
      secondaryMuscles: ["lats", "biceps"],
      equipment: "barbell",
      sets: 3,
      reps: "8-10",
      rest: "90s",
      difficulty: "intermediate",
      animationType: "horizontal-pull",
      tips: [
        "Maintain a braced, neutral spine throughout the set.",
        "Pull to the lower ribs and control the way down.",
      ],
    },
    {
      id: "upper-incline-dumbbell-press",
      name: "Incline Dumbbell Press",
      primaryMuscle: "chest",
      secondaryMuscles: ["shoulders", "triceps"],
      equipment: "dumbbell",
      sets: 3,
      reps: "10-12",
      rest: "90s",
      difficulty: "intermediate",
      animationType: "horizontal-press",
      tips: [
        "A 30° incline hits the upper chest without over-loading the delts.",
        "Lower until you feel a stretch, then press back up smoothly.",
      ],
    },
    {
      id: "upper-dumbbell-curl",
      name: "Dumbbell Biceps Curl",
      primaryMuscle: "biceps",
      secondaryMuscles: ["forearms"],
      equipment: "dumbbell",
      sets: 3,
      reps: "10-12",
      rest: "60s",
      difficulty: "beginner",
      animationType: "curl",
      tips: [
        "Keep your elbows still and curl with control.",
        "Squeeze at the top before lowering slowly.",
      ],
    },
    {
      id: "upper-triceps-pushdown",
      name: "Cable Triceps Pushdown",
      primaryMuscle: "triceps",
      secondaryMuscles: [],
      equipment: "cable",
      sets: 3,
      reps: "12-15",
      rest: "60s",
      difficulty: "beginner",
      animationType: "extension",
      tips: [
        "Pin your elbows and extend fully without leaning over.",
        "Keep constant tension — resist the stack on the way up.",
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// Lower — quads, hamstrings, glutes, calves, core
// -----------------------------------------------------------------------------
export const lowerWorkout: WorkoutDay = {
  id: "lower",
  name: "Lower",
  focus: "lower",
  description: "Quads, hamstrings, glutes, calves and core lower-body work.",
  exercises: [
    {
      id: "lower-back-squat",
      name: "Barbell Back Squat",
      primaryMuscle: "quads",
      secondaryMuscles: ["glutes", "hamstrings", "core"],
      equipment: "barbell",
      sets: 4,
      reps: "6-8",
      rest: "150s",
      difficulty: "intermediate",
      animationType: "squat",
      tips: [
        "Set the bar on your upper traps and brace before unracking.",
        "Keep your knees tracking over your toes throughout.",
      ],
    },
    {
      id: "lower-romanian-deadlift",
      name: "Romanian Deadlift",
      primaryMuscle: "hamstrings",
      secondaryMuscles: ["glutes", "back"],
      equipment: "barbell",
      sets: 3,
      reps: "8-10",
      rest: "120s",
      difficulty: "intermediate",
      animationType: "hinge",
      tips: [
        "Soft knees, hips back — this is a hinge, not a squat.",
        "Only lower as far as you can keep a flat back.",
      ],
    },
    {
      id: "lower-bulgarian-split-squat",
      name: "Bulgarian Split Squat",
      primaryMuscle: "quads",
      secondaryMuscles: ["glutes", "hamstrings"],
      equipment: "dumbbell",
      sets: 3,
      reps: "10-12",
      rest: "90s",
      difficulty: "advanced",
      animationType: "lunge",
      tips: [
        "Elevate the rear foot and keep most of the weight on the front leg.",
        "Drop straight down and drive up through the front heel.",
      ],
    },
    {
      id: "lower-leg-extension",
      name: "Leg Extension",
      primaryMuscle: "quads",
      secondaryMuscles: [],
      equipment: "machine",
      sets: 3,
      reps: "12-15",
      rest: "60s",
      difficulty: "beginner",
      animationType: "extension",
      tips: [
        "Pause and squeeze the quads hard at the top of each rep.",
        "Lower slowly — don't let the stack slam down.",
      ],
    },
    {
      id: "lower-seated-leg-curl",
      name: "Seated Leg Curl",
      primaryMuscle: "hamstrings",
      secondaryMuscles: ["calves"],
      equipment: "machine",
      sets: 3,
      reps: "12-15",
      rest: "60s",
      difficulty: "beginner",
      animationType: "curl",
      tips: [
        "Keep your hips pressed into the seat throughout.",
        "Contract hard at the bottom and control the return.",
      ],
    },
    {
      id: "lower-standing-calf-raise",
      name: "Standing Calf Raise",
      primaryMuscle: "calves",
      secondaryMuscles: [],
      equipment: "machine",
      sets: 4,
      reps: "12-20",
      rest: "45s",
      difficulty: "beginner",
      animationType: "calf-raise",
      tips: [
        "Full range of motion — deep stretch, high squeeze.",
        "Slow the eccentric to maximise time under tension.",
      ],
    },
    {
      id: "lower-hanging-leg-raise",
      name: "Hanging Leg Raise",
      primaryMuscle: "abs",
      secondaryMuscles: ["hip-flexors", "obliques"],
      equipment: "bodyweight",
      sets: 3,
      reps: "12-15",
      rest: "60s",
      difficulty: "intermediate",
      animationType: "core-flexion",
      tips: [
        "Curl your pelvis up rather than just raising the legs.",
        "Avoid swinging — pause to kill momentum between reps.",
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// Push A — strength-focused push
// -----------------------------------------------------------------------------
export const pushAWorkout: WorkoutDay = {
  id: "push-a",
  name: "Push A",
  focus: "push",
  description: "Heavier, strength-focused push session led by the bench press.",
  exercises: [
    {
      id: "push-a-barbell-bench-press",
      name: "Barbell Bench Press",
      primaryMuscle: "chest",
      secondaryMuscles: ["shoulders", "triceps"],
      equipment: "barbell",
      sets: 5,
      reps: "5",
      rest: "150s",
      difficulty: "intermediate",
      animationType: "horizontal-press",
      tips: [
        "Treat every rep like a heavy single — tight setup, hard brace.",
        "Keep your wrists stacked over your elbows on the press.",
      ],
    },
    {
      id: "push-a-overhead-press",
      name: "Standing Overhead Press",
      primaryMuscle: "shoulders",
      secondaryMuscles: ["triceps", "core"],
      equipment: "barbell",
      sets: 4,
      reps: "6-8",
      rest: "120s",
      difficulty: "intermediate",
      animationType: "vertical-press",
      tips: [
        "Squeeze your glutes and brace to keep a stable base.",
        "Finish with the bar stacked directly over the mid-foot.",
      ],
    },
    {
      id: "push-a-weighted-dip",
      name: "Weighted Dip",
      primaryMuscle: "chest",
      secondaryMuscles: ["triceps", "shoulders"],
      equipment: "bodyweight",
      sets: 3,
      reps: "8-10",
      rest: "120s",
      difficulty: "advanced",
      animationType: "horizontal-press",
      tips: [
        "Lean forward slightly to bias the chest over the triceps.",
        "Descend until your upper arms are roughly parallel to the floor.",
      ],
    },
    {
      id: "push-a-cable-fly",
      name: "Cable Fly",
      primaryMuscle: "chest",
      secondaryMuscles: ["shoulders"],
      equipment: "cable",
      sets: 3,
      reps: "12-15",
      rest: "60s",
      difficulty: "beginner",
      animationType: "fly",
      tips: [
        "Keep a soft, fixed elbow bend and hug the reps together.",
        "Squeeze at the midline and resist the stretch on the way out.",
      ],
    },
    {
      id: "push-a-lateral-raise",
      name: "Dumbbell Lateral Raise",
      primaryMuscle: "shoulders",
      secondaryMuscles: ["traps"],
      equipment: "dumbbell",
      sets: 4,
      reps: "12-15",
      rest: "45s",
      difficulty: "beginner",
      animationType: "lateral-raise",
      tips: [
        "Raise to shoulder height, no higher, and lower slowly.",
        "Keep a micro-bend in the elbow and lead with the elbows.",
      ],
    },
    {
      id: "push-a-skull-crusher",
      name: "EZ-Bar Skull Crusher",
      primaryMuscle: "triceps",
      secondaryMuscles: [],
      equipment: "ez-bar",
      sets: 3,
      reps: "8-12",
      rest: "75s",
      difficulty: "intermediate",
      animationType: "extension",
      tips: [
        "Keep your elbows in and lower the bar to your forehead/hairline.",
        "Only move at the elbow — the upper arms stay put.",
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// Push B — hypertrophy-focused push
// -----------------------------------------------------------------------------
export const pushBWorkout: WorkoutDay = {
  id: "push-b",
  name: "Push B",
  focus: "push",
  description: "Volume and pump-focused push session for chest and delts.",
  exercises: [
    {
      id: "push-b-incline-bench-press",
      name: "Incline Barbell Bench Press",
      primaryMuscle: "chest",
      secondaryMuscles: ["shoulders", "triceps"],
      equipment: "barbell",
      sets: 4,
      reps: "8-10",
      rest: "90s",
      difficulty: "intermediate",
      animationType: "horizontal-press",
      tips: [
        "A 30° bench emphasises the clavicular (upper) chest.",
        "Keep the bar path over the upper chest, not the shoulders.",
      ],
    },
    {
      id: "push-b-seated-dumbbell-press",
      name: "Seated Dumbbell Shoulder Press",
      primaryMuscle: "shoulders",
      secondaryMuscles: ["triceps"],
      equipment: "dumbbell",
      sets: 4,
      reps: "10-12",
      rest: "90s",
      difficulty: "intermediate",
      animationType: "vertical-press",
      tips: [
        "Press the dumbbells slightly inward until they nearly touch.",
        "Keep your lower back supported against the pad.",
      ],
    },
    {
      id: "push-b-machine-chest-press",
      name: "Machine Chest Press",
      primaryMuscle: "chest",
      secondaryMuscles: ["shoulders", "triceps"],
      equipment: "machine",
      sets: 3,
      reps: "10-12",
      rest: "75s",
      difficulty: "beginner",
      animationType: "horizontal-press",
      tips: [
        "Set the seat so the handles line up with your mid-chest.",
        "A great way to chase a pump with minimal stabiliser fatigue.",
      ],
    },
    {
      id: "push-b-cable-lateral-raise",
      name: "Cable Lateral Raise",
      primaryMuscle: "shoulders",
      secondaryMuscles: [],
      equipment: "cable",
      sets: 3,
      reps: "15-20",
      rest: "45s",
      difficulty: "beginner",
      animationType: "lateral-raise",
      tips: [
        "The cable keeps constant tension across the whole range.",
        "Lead with the elbow and keep the torso still.",
      ],
    },
    {
      id: "push-b-pec-deck-fly",
      name: "Pec Deck Fly",
      primaryMuscle: "chest",
      secondaryMuscles: [],
      equipment: "machine",
      sets: 3,
      reps: "12-15",
      rest: "60s",
      difficulty: "beginner",
      animationType: "fly",
      tips: [
        "Drive with the elbows/upper arms, not the hands.",
        "Pause and squeeze the chest for a beat at the midline.",
      ],
    },
    {
      id: "push-b-overhead-triceps-extension",
      name: "Overhead Cable Triceps Extension",
      primaryMuscle: "triceps",
      secondaryMuscles: [],
      equipment: "cable",
      sets: 3,
      reps: "12-15",
      rest: "60s",
      difficulty: "beginner",
      animationType: "extension",
      tips: [
        "The overhead position emphasises the long head of the triceps.",
        "Keep your upper arms fixed and stretch fully behind the head.",
      ],
    },
    {
      id: "push-b-triceps-pushdown",
      name: "Rope Triceps Pushdown",
      primaryMuscle: "triceps",
      secondaryMuscles: [],
      equipment: "cable",
      sets: 3,
      reps: "12-15",
      rest: "45s",
      difficulty: "beginner",
      animationType: "extension",
      tips: [
        "Spread the rope apart at the bottom for a peak contraction.",
        "Keep the elbows glued to your sides throughout.",
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// Pull A — strength-focused pull
// -----------------------------------------------------------------------------
export const pullAWorkout: WorkoutDay = {
  id: "pull-a",
  name: "Pull A",
  focus: "pull",
  description: "Heavy pulling led by the deadlift and weighted pull-ups.",
  exercises: [
    {
      id: "pull-a-deadlift",
      name: "Conventional Deadlift",
      primaryMuscle: "back",
      secondaryMuscles: ["glutes", "hamstrings", "traps", "forearms"],
      equipment: "barbell",
      sets: 4,
      reps: "4-6",
      rest: "180s",
      difficulty: "advanced",
      animationType: "hinge",
      tips: [
        "Set your lats before lifting — 'protect your armpits'.",
        "Push the floor away and lock out with the glutes, not the back.",
      ],
    },
    {
      id: "pull-a-weighted-pull-up",
      name: "Weighted Pull-Up",
      primaryMuscle: "lats",
      secondaryMuscles: ["biceps", "back", "rear-delts"],
      equipment: "bodyweight",
      sets: 4,
      reps: "5-8",
      rest: "150s",
      difficulty: "advanced",
      animationType: "vertical-pull",
      tips: [
        "Add load with a dip belt and keep reps strict.",
        "Control the descent to a full dead hang each rep.",
      ],
    },
    {
      id: "pull-a-pendlay-row",
      name: "Pendlay Row",
      primaryMuscle: "back",
      secondaryMuscles: ["lats", "rear-delts", "biceps"],
      equipment: "barbell",
      sets: 4,
      reps: "6-8",
      rest: "120s",
      difficulty: "intermediate",
      animationType: "horizontal-pull",
      tips: [
        "Reset the bar on the floor between every rep.",
        "Keep your torso parallel and explode the bar to your chest.",
      ],
    },
    {
      id: "pull-a-face-pull",
      name: "Cable Face Pull",
      primaryMuscle: "rear-delts",
      secondaryMuscles: ["traps"],
      equipment: "cable",
      sets: 3,
      reps: "15-20",
      rest: "60s",
      difficulty: "beginner",
      animationType: "horizontal-pull",
      tips: [
        "High elbows — pull towards your eyes and rotate outward.",
        "Balances all the heavy pressing and pulling volume.",
      ],
    },
    {
      id: "pull-a-barbell-curl",
      name: "Barbell Biceps Curl",
      primaryMuscle: "biceps",
      secondaryMuscles: ["forearms"],
      equipment: "barbell",
      sets: 3,
      reps: "8-10",
      rest: "75s",
      difficulty: "intermediate",
      animationType: "curl",
      tips: [
        "Keep your elbows pinned and avoid swinging the hips.",
        "Lower under control for the full 2–3 second eccentric.",
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// Pull B — hypertrophy-focused pull
// -----------------------------------------------------------------------------
export const pullBWorkout: WorkoutDay = {
  id: "pull-b",
  name: "Pull B",
  focus: "pull",
  description: "Machine and cable pulling for back width and biceps volume.",
  exercises: [
    {
      id: "pull-b-lat-pulldown",
      name: "Lat Pulldown",
      primaryMuscle: "lats",
      secondaryMuscles: ["biceps", "back"],
      equipment: "cable",
      sets: 4,
      reps: "10-12",
      rest: "90s",
      difficulty: "beginner",
      animationType: "vertical-pull",
      tips: [
        "Drive your elbows down and in — don't lean back excessively.",
        "Pull to the top of your chest and control the way up.",
      ],
    },
    {
      id: "pull-b-chest-supported-row",
      name: "Chest-Supported Row",
      primaryMuscle: "back",
      secondaryMuscles: ["lats", "rear-delts", "biceps"],
      equipment: "machine",
      sets: 4,
      reps: "10-12",
      rest: "90s",
      difficulty: "beginner",
      animationType: "horizontal-pull",
      tips: [
        "The chest pad removes the lower back so you can focus on the row.",
        "Squeeze the shoulder blades together at the peak.",
      ],
    },
    {
      id: "pull-b-seated-cable-row",
      name: "Seated Cable Row",
      primaryMuscle: "back",
      secondaryMuscles: ["lats", "biceps"],
      equipment: "cable",
      sets: 3,
      reps: "12-15",
      rest: "75s",
      difficulty: "beginner",
      animationType: "horizontal-pull",
      tips: [
        "Stay upright and avoid using momentum from the torso.",
        "Pause briefly with the handle at your stomach.",
      ],
    },
    {
      id: "pull-b-reverse-pec-deck",
      name: "Reverse Pec Deck",
      primaryMuscle: "rear-delts",
      secondaryMuscles: ["traps"],
      equipment: "machine",
      sets: 3,
      reps: "15-20",
      rest: "60s",
      difficulty: "beginner",
      animationType: "fly",
      tips: [
        "Lead with the elbows and keep the arms slightly bent.",
        "Focus on the rear delts — don't just squeeze the shoulder blades.",
      ],
    },
    {
      id: "pull-b-incline-dumbbell-curl",
      name: "Incline Dumbbell Curl",
      primaryMuscle: "biceps",
      secondaryMuscles: ["forearms"],
      equipment: "dumbbell",
      sets: 3,
      reps: "10-12",
      rest: "60s",
      difficulty: "intermediate",
      animationType: "curl",
      tips: [
        "The incline puts the biceps on stretch for a bigger range.",
        "Let your arms hang straight down at the bottom of each rep.",
      ],
    },
    {
      id: "pull-b-hammer-curl",
      name: "Hammer Curl",
      primaryMuscle: "biceps",
      secondaryMuscles: ["forearms"],
      equipment: "dumbbell",
      sets: 3,
      reps: "12-15",
      rest: "60s",
      difficulty: "beginner",
      animationType: "curl",
      tips: [
        "Neutral grip builds the brachialis for thicker-looking arms.",
        "Keep the tempo controlled — no swinging.",
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// Legs A — quad-focused / strength
// -----------------------------------------------------------------------------
export const legsAWorkout: WorkoutDay = {
  id: "legs-a",
  name: "Legs A",
  focus: "legs",
  description: "Quad-dominant, strength-focused legs led by the back squat.",
  exercises: [
    {
      id: "legs-a-back-squat",
      name: "Barbell Back Squat",
      primaryMuscle: "quads",
      secondaryMuscles: ["glutes", "hamstrings", "core"],
      equipment: "barbell",
      sets: 5,
      reps: "5",
      rest: "180s",
      difficulty: "intermediate",
      animationType: "squat",
      tips: [
        "Big brace before each rep — think 360° of core pressure.",
        "Sit between your hips and keep your chest proud out of the hole.",
      ],
    },
    {
      id: "legs-a-romanian-deadlift",
      name: "Romanian Deadlift",
      primaryMuscle: "hamstrings",
      secondaryMuscles: ["glutes", "back"],
      equipment: "barbell",
      sets: 3,
      reps: "8-10",
      rest: "120s",
      difficulty: "intermediate",
      animationType: "hinge",
      tips: [
        "Hips back, bar close, back flat — chase the hamstring stretch.",
        "Drive the hips through to finish tall and squeeze the glutes.",
      ],
    },
    {
      id: "legs-a-leg-press",
      name: "Leg Press",
      primaryMuscle: "quads",
      secondaryMuscles: ["glutes"],
      equipment: "machine",
      sets: 3,
      reps: "10-12",
      rest: "90s",
      difficulty: "beginner",
      animationType: "squat",
      tips: [
        "A lower foot position emphasises the quads.",
        "Keep your lower back glued to the seat throughout.",
      ],
    },
    {
      id: "legs-a-leg-extension",
      name: "Leg Extension",
      primaryMuscle: "quads",
      secondaryMuscles: [],
      equipment: "machine",
      sets: 3,
      reps: "12-15",
      rest: "60s",
      difficulty: "beginner",
      animationType: "extension",
      tips: [
        "Squeeze the quads hard and pause at full extension.",
        "Control the lowering — resist the stack all the way down.",
      ],
    },
    {
      id: "legs-a-standing-calf-raise",
      name: "Standing Calf Raise",
      primaryMuscle: "calves",
      secondaryMuscles: [],
      equipment: "machine",
      sets: 4,
      reps: "12-15",
      rest: "45s",
      difficulty: "beginner",
      animationType: "calf-raise",
      tips: [
        "Full stretch at the bottom, tall squeeze at the top.",
        "Don't bounce — own each rep with a brief pause.",
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// Legs B — hamstring / glute-focused
// -----------------------------------------------------------------------------
export const legsBWorkout: WorkoutDay = {
  id: "legs-b",
  name: "Legs B",
  focus: "legs",
  description: "Posterior-chain legs led by front squats and hip thrusts.",
  exercises: [
    {
      id: "legs-b-front-squat",
      name: "Barbell Front Squat",
      primaryMuscle: "quads",
      secondaryMuscles: ["glutes", "core"],
      equipment: "barbell",
      sets: 4,
      reps: "6-8",
      rest: "150s",
      difficulty: "advanced",
      animationType: "squat",
      tips: [
        "Keep the elbows high to stop the bar rolling forward.",
        "Stay upright — front squats punish any forward lean.",
      ],
    },
    {
      id: "legs-b-hip-thrust",
      name: "Barbell Hip Thrust",
      primaryMuscle: "glutes",
      secondaryMuscles: ["hamstrings"],
      equipment: "barbell",
      sets: 4,
      reps: "8-12",
      rest: "120s",
      difficulty: "intermediate",
      animationType: "hinge",
      tips: [
        "Tuck the chin, ribs down, and drive through your heels.",
        "Squeeze the glutes hard and pause at full lockout.",
      ],
    },
    {
      id: "legs-b-bulgarian-split-squat",
      name: "Bulgarian Split Squat",
      primaryMuscle: "quads",
      secondaryMuscles: ["glutes", "hamstrings"],
      equipment: "dumbbell",
      sets: 3,
      reps: "10-12",
      rest: "90s",
      difficulty: "advanced",
      animationType: "lunge",
      tips: [
        "A longer stride shifts emphasis toward the glutes.",
        "Descend under control and drive through the front heel.",
      ],
    },
    {
      id: "legs-b-seated-leg-curl",
      name: "Seated Leg Curl",
      primaryMuscle: "hamstrings",
      secondaryMuscles: ["calves"],
      equipment: "machine",
      sets: 4,
      reps: "12-15",
      rest: "60s",
      difficulty: "beginner",
      animationType: "curl",
      tips: [
        "Keep your hips pinned to the seat as you curl.",
        "Squeeze at the bottom and resist on the way back up.",
      ],
    },
    {
      id: "legs-b-seated-calf-raise",
      name: "Seated Calf Raise",
      primaryMuscle: "calves",
      secondaryMuscles: [],
      equipment: "machine",
      sets: 4,
      reps: "15-20",
      rest: "45s",
      difficulty: "beginner",
      animationType: "calf-raise",
      tips: [
        "The bent knee targets the soleus — go for higher reps.",
        "Pause at the top and get a deep stretch at the bottom.",
      ],
    },
    {
      id: "legs-b-hanging-leg-raise",
      name: "Hanging Leg Raise",
      primaryMuscle: "abs",
      secondaryMuscles: ["hip-flexors", "obliques"],
      equipment: "bodyweight",
      sets: 3,
      reps: "12-15",
      rest: "60s",
      difficulty: "intermediate",
      animationType: "core-flexion",
      tips: [
        "Posteriorly tilt the pelvis to work the abs, not just the hip flexors.",
        "Keep the movement controlled and avoid swinging.",
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// Aggregated exports
// -----------------------------------------------------------------------------

/** Every workout template, in display order. */
export const WORKOUT_DAYS: WorkoutDay[] = [
  pushWorkout,
  pullWorkout,
  legsWorkout,
  upperWorkout,
  lowerWorkout,
  pushAWorkout,
  pushBWorkout,
  pullAWorkout,
  pullBWorkout,
  legsAWorkout,
  legsBWorkout,
];

/** Workout templates keyed by their id for O(1) lookup. */
export const WORKOUTS: Record<WorkoutDayId, WorkoutDay> = {
  push: pushWorkout,
  pull: pullWorkout,
  legs: legsWorkout,
  upper: upperWorkout,
  lower: lowerWorkout,
  "push-a": pushAWorkout,
  "push-b": pushBWorkout,
  "pull-a": pullAWorkout,
  "pull-b": pullBWorkout,
  "legs-a": legsAWorkout,
  "legs-b": legsBWorkout,
};

/** Every prescribed exercise across all templates (ids are globally unique). */
export const ALL_EXERCISES: WorkoutExercise[] = WORKOUT_DAYS.flatMap(
  (day) => day.exercises,
);

/** Get a workout template by its id. */
export function getWorkoutDay(id: WorkoutDayId): WorkoutDay {
  return WORKOUTS[id];
}

/** Find a single prescribed exercise by its id. */
export function getExerciseById(id: string): WorkoutExercise | undefined {
  return ALL_EXERCISES.find((exercise) => exercise.id === id);
}

/** Total number of working sets in a template. */
export function totalSets(day: WorkoutDay): number {
  return day.exercises.reduce((total, exercise) => total + exercise.sets, 0);
}

/** Rough estimated session length in minutes (rounded to the nearest 5). */
export function estimateDurationMinutes(day: WorkoutDay): number {
  const seconds = day.exercises.reduce((total, exercise) => {
    const rest = Number.parseInt(exercise.rest, 10) || 60;
    return total + exercise.sets * (rest + 45);
  }, 0);
  return Math.round(seconds / 60 / 5) * 5;
}

/** Unique exercises across all templates, de-duplicated by display name. */
export const UNIQUE_EXERCISES: WorkoutExercise[] = (() => {
  const seen = new Set<string>();
  return ALL_EXERCISES.filter((exercise) => {
    if (seen.has(exercise.name)) return false;
    seen.add(exercise.name);
    return true;
  });
})();
