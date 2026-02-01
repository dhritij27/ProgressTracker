// store/useStore.ts
import { create } from "zustand";

type Habit = {
  id: string;
  title: string;
  completedDates: string[];
};

type Task = {
  id: string;
  title: string;
  completedDates: string[];
};

type State = {
  habits: Habit[];
  tasks: Task[];
  toggleHabitToday: (id: string) => void;
  toggleTaskToday: (id: string) => void;
};

const today = () => new Date().toISOString().slice(0, 10);

export const useStore = create<State>((set) => ({
  habits: [
    { id: "1", title: "Drink Water", completedDates: [] },
    { id: "2", title: "Exercise", completedDates: [] },
  ],
  tasks: [
    { id: "1", title: "Study", completedDates: [] },
    { id: "2", title: "Clean room", completedDates: [] },
  ],

  toggleHabitToday: (id) =>
    set((s) => ({
      habits: s.habits.map((h) =>
        h.id === id
          ? {
              ...h,
              completedDates: h.completedDates.includes(today())
                ? h.completedDates.filter((d) => d !== today())
                : [...h.completedDates, today()],
            }
          : h
      ),
    })),

  toggleTaskToday: (id) =>
    set((s) => ({
      tasks: s.tasks.map((t) =>
        t.id === id
          ? {
              ...t,
              completedDates: t.completedDates.includes(today())
                ? t.completedDates.filter((d) => d !== today())
                : [...t.completedDates, today()],
            }
          : t
      ),
    })),
}));
