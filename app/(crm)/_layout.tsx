// ─────────────────────────────────────────────────────────────
//  Universal CRM — CRM Layout
//  Registers all screens in the (crm) route group
// ─────────────────────────────────────────────────────────────

import { Stack } from 'expo-router';

export default function CrmLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="leads" />
      <Stack.Screen name="pipeline" />
      <Stack.Screen name="tasks" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="lead-details" />
      <Stack.Screen name="add-lead" />
      <Stack.Screen name="contacts" />
      <Stack.Screen name="contact-details" />
      <Stack.Screen name="quotes" />
      <Stack.Screen name="document-preview" />
      <Stack.Screen name="team" />
      <Stack.Screen name="notifications" />
    </Stack>
  );
}
