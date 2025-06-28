import { colors } from "@/constants/colors";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerShadowVisible: false,
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerTintColor: colors.primary,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen 
        name="language-select" 
        options={{ 
          title: "Select Language",
          headerBackTitle: "Back",
        }} 
      />
      <Stack.Screen 
        name="level-select" 
        options={{ 
          title: "Select Level",
          headerBackTitle: "Back",
        }} 
      />
    </Stack>
  );
}