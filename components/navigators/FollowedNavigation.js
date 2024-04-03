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
        name='Followed Trending'
        component={Trending}
      />
      <TopTab.Screen
        name='Followed Science'
        component={Science}
      />
      <TopTab.Screen
        name='Followed Sports'
        component={Sports}
      />
    </TopTab.Navigator>
  )
}

export default function FollowedNavigation() {
  return (
    <TopTabs />
  )
}
