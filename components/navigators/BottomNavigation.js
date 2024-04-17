import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import TopNavigation from "./TrendingNavigation"
import FollowedNavigation from "./FollowedNavigation"
import StackNavigation from "./StackNavigation"
import { useTheme } from "../../context/ThemeContext"
import { useFont } from "../../context/FontSizeContext"

const BottomTab = createBottomTabNavigator()

function BottomTabs() {
    const { theme } = useTheme()
    const { fontSize } = useFont()

    return (
        <BottomTab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,

                tabBarStyle: {
                    backgroundColor: theme.containerBackgroundColor,
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
                    else if (route.name === 'StackSettings') {
                      iconName = 'cog'
                    }

                    return <MaterialCommunityIcons 
                        name={iconName} size={size} color={color} />;
                    },

                    tabBarActiveTintColor: '#F28705',
                    tabBarInactiveTintColor: '#B4B4B4'
                }
            )}
        >
            <BottomTab.Screen
                name='Bottom Trending'
                options={{
                    title: 'Trending',
                    tabBarLabelStyle: {
                        fontSize: fontSize.bottomNavText
                    }
                }}
                component={TopNavigation}       // Nesting top navigation here
            />
            <BottomTab.Screen
                name='Followed'
                options={{
                    title: 'Followed',
                    tabBarLabelStyle: {
                        fontSize: fontSize.bottomNavText
                    }
                }}
                component={FollowedNavigation}      // Nesting followed navigation here
            />
            <BottomTab.Screen
                name='StackSettings'
                options={{
                    title: 'Settings',
                    tabBarLabelStyle: {
                        fontSize: fontSize.bottomNavText
                    }
                }}
                component={StackNavigation}         // Nesting stack navigation here
            />
        </BottomTab.Navigator>
    )
}

export default function BottomNavigation() {
    return (
        <BottomTabs />
    )
}
