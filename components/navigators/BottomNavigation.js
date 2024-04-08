import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Settings from "../../screens/Settings"
import TopNavigation from "./TrendingNavigation"
import FollowedNavigation from "./FollowedNavigation"

const BottomTab = createBottomTabNavigator()

function BottomTabs() {

    return (
        <BottomTab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,

                tabBarStyle: {
                    backgroundColor: "white",
                    borderTopColor: "#F28705",
                    borderTopWidth: 2
                },

                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Bottom Trending') {
                      iconName = 'trending-up'
                    } else if (route.name === 'Followed') {
                      iconName = 'bookmark-plus' 
                    }
                    else if (route.name === 'Settings') {
                      iconName = 'cog'
                    }

                    return <MaterialCommunityIcons 
                        name={iconName} size={size} color={color} />;
                    },

                    tabBarActiveTintColor: '#000000',
                    tabBarInactiveTintColor: '#F28705' 
                }
            )}
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
