import { SafeAreaProvider } from 'react-native-safe-area-context'
import BottomNavigation from "./components/navigators/BottomNavigation"
import { NavigationContainer } from "@react-navigation/native"
import { PaperProvider } from 'react-native-paper'
import Header from './components/Header'
export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
      <Header/>
      <NavigationContainer>
        <BottomNavigation />
      </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  )
}
