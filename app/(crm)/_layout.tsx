import { Stack } from 'expo-router';

export default function CrmLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="leads" />
      <Stack.Screen name="contacts" />
      <Stack.Screen name="tasks" />
      <Stack.Screen name="pipeline" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}
