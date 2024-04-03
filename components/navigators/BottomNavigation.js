import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Settings from "../../screens/Settings"
import TopNavigation from "./TrendingNavigation"
import FollowedNavigation from "./FollowedNavigation"

const BottomTab = createBottomTabNavigator()

function BottomTabs() {

    return (
        <BottomTab.Navigator
            screenOptions={{ headerShown: false }}
        >
            <BottomTab.Screen
                name='Bottom Trending'
                options={{ title: 'Trending'}}
                component={TopNavigation}       // Nesting top navigation here
            />
            <BottomTab.Screen
                name='Followed'
                options={{ title: 'Followed'}}
                component={FollowedNavigation}       // Nesting top navigation here
            />
            <BottomTab.Screen
                name='Settings'
                component={Settings}
            />
        </BottomTab.Navigator>
    )
}

export default function BottomNavigation() {
    return (
        <BottomTabs />
    )
}
