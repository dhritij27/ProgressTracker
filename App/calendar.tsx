// app/(tabs)/calendar.tsx
import { View, Text } from "react-native";
import { useStore } from "../../store/useStore";

export default function Calendar() {
  const { habits, tasks } = useStore();

  const dates = Array.from(
    new Set([
      ...habits.flatMap((h) => h.completedDates),
      ...tasks.flatMap((t) => t.completedDates),
    ])
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 28 }}>Calendar</Text>

      {dates.map((d) => (
        <Text key={d} style={{ padding: 8 }}>
          📅 {d}
        </Text>
      ))}
    </View>
  );
}
