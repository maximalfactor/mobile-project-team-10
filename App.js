import BottomNavigation from "./components/navigators/BottomNavigation"
import { NavigationContainer } from "@react-navigation/native"
import { PaperProvider } from 'react-native-paper'
import Header from './components/Header'
import { ThemeProvider } from './context/ThemeContext'
import { ContrastProvider } from "./context/ContrastThemeContext"
import { FontSizeProvider } from './context/FontSizeContext'

export default function App() {
  return (
    <ThemeProvider>
      {/*<ContrastProvider>*/}
        <PaperProvider>
          <FontSizeProvider>
            <Header/>
            <NavigationContainer>
              <BottomNavigation />
            </NavigationContainer>
          </FontSizeProvider>
        </PaperProvider>
      {/*</ContrastProvider>*/}
    </ThemeProvider>
  )
}
