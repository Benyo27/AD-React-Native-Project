import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TabNavigator from "./src/navigators/TabNavigator";
import { initializeNotifications } from "./src/services/notifications";
import { registerBackgroundTasks } from "./src/services/backgroundFetch";

export default function App() {
  useEffect(() => {
    initializeNotifications();
    registerBackgroundTasks();
  }, []);

  return (
    <GestureHandlerRootView>
      <TabNavigator />
    </GestureHandlerRootView>
  );
}
