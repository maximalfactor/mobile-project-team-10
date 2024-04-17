import { SafeAreaProvider } from 'react-native-safe-area-context'
import BottomNavigation from "./components/navigators/BottomNavigation"
import { NavigationContainer } from "@react-navigation/native"
import { PaperProvider } from 'react-native-paper'
import Header from './components/Header'
import { ThemeProvider } from './context/ThemeContext'
import { FontSizeProvider } from './context/FontSizeContext'

export default function App() {
  return (
    


    <ThemeProvider>

      

        <PaperProvider>

          <FontSizeProvider>

            <Header/>

            <NavigationContainer>
              <BottomNavigation />
            </NavigationContainer>

          </FontSizeProvider>

        </PaperProvider>

      

    </ThemeProvider>
  )
}
