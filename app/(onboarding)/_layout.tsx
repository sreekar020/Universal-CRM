import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="business-preferences" />
      <Stack.Screen name="business-setup" />
    </Stack>
  );
}
