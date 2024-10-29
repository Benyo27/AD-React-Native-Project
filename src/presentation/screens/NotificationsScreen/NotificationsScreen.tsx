import { useEffect, useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import * as TaskManager from "expo-task-manager";
import {
  registerBackgroundTasks,
  unregisterBackgroundFetchTask,
} from "../../../services/backgroundFetch";

export function NotificationsScreen() {
  const BACKGROUND_FETCH_TASK = "background-fetch-articles";
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    checkStatusAsync();
  }, []);

  const checkStatusAsync = async () => {
    const isRegistered = await TaskManager.isTaskRegisteredAsync(
      BACKGROUND_FETCH_TASK,
    );
    setIsRegistered(isRegistered);
  };

  const toggleFetchTask = async () => {
    if (isRegistered) {
      unregisterBackgroundFetchTask();
    } else {
      await registerBackgroundTasks();
    }
    checkStatusAsync();
  };

  return (
    <View style={styles.screen}>
      <Button
        title={
          isRegistered
            ? "Unsuscribe from notifications"
            : "Subscribe to notifications"
        }
        onPress={toggleFetchTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    margin: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
});
