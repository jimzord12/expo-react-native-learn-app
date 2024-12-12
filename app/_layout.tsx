import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";

import { useColorScheme } from "@/hooks/useColorScheme";
import { databases } from "./appwrite/config";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Using Appwrite to fetch data
  useEffect(() => {
    const getData = async () => {
      const databaseId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
      const collectionId =
        process.env.EXPO_PUBLIC_APPWRITE_COLLECTIONS_TASKS_ID;

      console.log("Project ID:", process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID);
      console.log("Database ID:", process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID);
      console.log(
        "Collection ID:",
        process.env.EXPO_PUBLIC_APPWRITE_COLLECTIONS_TASKS_ID
      );

      if (!(databaseId && collectionId))
        throw new Error("Database or collection ID not found");

      try {
        const response = await databases.listDocuments(
          databaseId,
          collectionId
        );
        console.log("UseEffect - Appwrite - response: ", response.documents);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <GluestackUIProvider mode="light">
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          {/* <div></div> */}
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
