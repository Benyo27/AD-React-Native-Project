import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import ArticlesNavigator from "./ArticlesNavigator";
import DeletedArticlesNavigator from "./DeletedArticlesNavigator";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Articles" component={ArticlesNavigator} />
        <Tab.Screen
          name="Deleted Articles"
          component={DeletedArticlesNavigator}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
