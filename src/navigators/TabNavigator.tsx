import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import ArticlesNavigator from "./ArticlesNavigator";
import SavedArticlesNavigator from "./SavedArticlesNavigator";
import DeletedArticlesNavigator from "./DeletedArticlesNavigator";
import { NotificationsScreen } from "../presentation/screens/NotificationsScreen";

const Tab = createBottomTabNavigator();

export const navigationRef = createNavigationContainerRef();

export default function TabNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Articles" component={ArticlesNavigator} />
        <Tab.Screen name="Saved Articles" component={SavedArticlesNavigator} />
        <Tab.Screen
          name="Deleted Articles"
          component={DeletedArticlesNavigator}
        />
        <Tab.Screen name="Notifications" component={NotificationsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
