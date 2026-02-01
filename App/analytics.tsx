// app/(tabs)/analytics.tsx
import { View, Text, Dimensions } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import { useStore } from "../../store/useStore";

const screenWidth = Dimensions.get("window").width;

export default function Analytics() {
  const { habits, tasks } = useStore();

  const totalItems = habits.length + tasks.length;

  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().slice(0, 10);
  });

  const completionData = last7Days.map((date) => {
    const completed =
      habits.filter((h) => h.completedDates.includes(date)).length +
      tasks.filter((t) => t.completedDates.includes(date)).length;
    return Math.round((completed / totalItems) * 100 || 0);
  });

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 28 }}>Analytics</Text>

      <Text style={{ marginTop: 20 }}>Weekly Productivity (%)</Text>
      <LineChart
        data={{
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          datasets: [{ data: completionData }],
        }}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          color: () => "#4CAF50",
        }}
      />

      <Text style={{ marginTop: 20 }}>Completion Breakdown</Text>
      <BarChart
        data={{
          labels: ["Habits", "Tasks"],
          datasets: [
            {
              data: [
                habits.reduce((a, h) => a + h.completedDates.length, 0),
                tasks.reduce((a, t) => a + t.completedDates.length, 0),
              ],
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          color: () => "#2196F3",
        }}
      />
    </View>
  );
}
