import { Text } from "react-native";
import { Redirect, Stack } from "expo-router";
import { useSession } from "@/contexts/auth.context";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  useEffect(() => {
    if (isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  // This layout can be deferred because it's not the root layout.
  return <Stack />;
}