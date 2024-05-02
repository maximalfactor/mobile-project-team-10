import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from "../../screens/Search"

const Stack = createNativeStackNavigator();

export default function SearchStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false, // Optionally hide the header for the Search screen
        }}
      />
      {/* Add more screens for the Search flow if needed */}
    </Stack.Navigator>
  );
}