import { enableScreens } from "react-native-screens";
import "@/global.css";
// import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
enableScreens();
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@/gluestack-style.config";
const queryClient = new QueryClient();

export default function App() {
  return (
    <GluestackUIProvider config={config}><QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </QueryClientProvider></GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
