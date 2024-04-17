import { SafeAreaProvider } from 'react-native-safe-area-context'
import BottomNavigation from "./components/navigators/BottomNavigation"
import { NavigationContainer } from "@react-navigation/native"
import { ThemeProvider } from './context/ThemeContext'
import { FontSizeProvider } from './context/FontSizeContext'

export default function App() {
  return (
    <ThemeProvider>

        <SafeAreaProvider>

          <FontSizeProvider>

            <NavigationContainer>
              <BottomNavigation />
            </NavigationContainer>

          </FontSizeProvider>

        </SafeAreaProvider>

    </ThemeProvider>
  )
}
