import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Trending from "../../screens/Trending"
import Science from "../../screens/categories/Science"
import Sports from "../../screens/categories/Sports"

const TopTab = createMaterialTopTabNavigator()

function TopTabs() {
  const insets = useSafeAreaInsets()

  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingTop: insets.top
        }
      }}
    >
      <TopTab.Screen
        name='Trending'
        component={Trending}
      />
      <TopTab.Screen
        name='Science'
        component={Science}
      />
      <TopTab.Screen
        name='Sports'
        component={Sports}
      />
    </TopTab.Navigator>
  )
}

export default function TopNavigation() {
  return (
    <TopTabs />
  )
}
