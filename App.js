import { SafeAreaProvider } from 'react-native-safe-area-context'
import BottomNavigation from "./components/navigators/BottomNavigation"
import { NavigationContainer } from "@react-navigation/native"

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <BottomNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
