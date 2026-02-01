// app/(tabs)/index.tsx
import { View, Text, Pressable } from "react-native";
import { useStore } from "../../store/useStore";

const today = new Date().toISOString().slice(0, 10);

export default function Today() {
  const { habits, tasks, toggleHabitToday, toggleTaskToday } = useStore();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: "600" }}>Today</Text>

      <Text style={{ marginTop: 20, fontSize: 18 }}>Habits</Text>
      {habits.map((h) => (
        <Pressable key={h.id} onPress={() => toggleHabitToday(h.id)}>
          <Text style={{ padding: 10 }}>
            {h.completedDates.includes(today) ? "✅" : "⬜️"} {h.title}
          </Text>
        </Pressable>
      ))}

      <Text style={{ marginTop: 20, fontSize: 18 }}>Tasks</Text>
      {tasks.map((t) => (
        <Pressable key={t.id} onPress={() => toggleTaskToday(t.id)}>
          <Text style={{ padding: 10 }}>
            {t.completedDates.includes(today) ? "✅" : "⬜️"} {t.title}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
