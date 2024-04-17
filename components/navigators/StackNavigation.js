import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../../context/ThemeContext';
import Account from "../../screens/Account"
import HiddenCategories from '../../screens/HiddenCategories';
import Settings from '../../screens/Settings';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  const { theme } = useTheme()

  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerStyle: {backgroundColor: theme.headerColor}
        }}
      />

      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerStyle: {backgroundColor: theme.headerColor}
        }}
      />

      <Stack.Screen
        name="Hidden Categories"
        component={HiddenCategories}
        options={{
          headerStyle: {backgroundColor: theme.headerColor}
        }}
      />

    </Stack.Navigator>
  )
}
