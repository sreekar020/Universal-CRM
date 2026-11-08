import { Redirect } from 'expo-router';
import { useAppStore, selectAuthState } from '../src/store/appStore';

export default function Index() {
  const authState = useAppStore(selectAuthState);

  if (authState === 'ready') return <Redirect href="/(crm)/dashboard" />;
  if (authState === 'onboarding') return <Redirect href="/(onboarding)/business-preferences" />;
  return <Redirect href="/(auth)/login" />;
}
