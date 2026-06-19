import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";

import HomeScreen      from "../screens/HomeScreen";
import CarDetailScreen from "../screens/CarDetailScreen";
import BookingScreen   from "../screens/BookingScreen";
import MyBookingsScreen from "../screens/MyBookingsScreen";
import ProfileScreen   from "../screens/ProfileScreen";

const Tab   = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home"       component={HomeScreen} />
      <Stack.Screen name="CarDetail"  component={CarDetailScreen} />
      <Stack.Screen name="Booking"    component={BookingScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#2563EB",
          tabBarInactiveTintColor: "#94A3B8",
          tabBarStyle: { borderTopWidth: 0.5, borderTopColor: "#E2E8F0", paddingBottom: 6, height: 60 },
          tabBarLabel: ({ color }) => {
            const labels = { HomeTab: "Explore", Bookings: "Bookings", Profile: "Profile" };
            return <Text style={{ color, fontSize: 11, marginBottom: 2 }}>{labels[route.name]}</Text>;
          },
          tabBarIcon: ({ color }) => {
            const icons = { HomeTab: "🚗", Bookings: "📋", Profile: "👤" };
            return <Text style={{ fontSize: 20 }}>{icons[route.name]}</Text>;
          },
        })}
      >
        <Tab.Screen name="HomeTab"  component={HomeStack} />
        <Tab.Screen name="Bookings" component={MyBookingsScreen} />
        <Tab.Screen name="Profile"  component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
