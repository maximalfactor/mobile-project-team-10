import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from "../../context/ThemeContext"
import { useFont } from "../../context/FontSizeContext"
import Trending from "../../screens/Trending"
import Science from "../../screens/categories/Science"
import Sports from "../../screens/categories/Sports"

const TopTab = createMaterialTopTabNavigator()

function TopTabs() {
  const insets = useSafeAreaInsets()
  const { theme } = useTheme()
  const { fontSize } = useFont()

  return (
    <TopTab.Navigator

    screenOptions={{

      tabBarIndicatorStyle: { backgroundColor: theme.tabBarIndicatorColor },

      tabBarStyle: {
        paddingTop: insets.top,
        backgroundColor: theme.tabBarColor
      },

      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'white'
      }}
    >
      <TopTab.Screen
        name='Trending'
        options={{
          tabBarLabelStyle: {
            fontSize: fontSize.topNavText
          }
        }}
        component={Trending}
      />
      <TopTab.Screen
        name='Science'
        options={{
          tabBarLabelStyle: {
            fontSize: fontSize.topNavText
          }
        }}
        component={Science}
      />
      <TopTab.Screen
        name='Sports'
        options={{
          tabBarLabelStyle: {
            fontSize: fontSize.topNavText
          }
        }}
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
