import BottomNavigation from "./components/navigators/BottomNavigation"
import { NavigationContainer } from "@react-navigation/native"
import { PaperProvider } from 'react-native-paper'
import Header from './components/Header'
import { ThemeProvider } from './context/ThemeContext'
import { FontSizeProvider } from './context/FontSizeContext'
import { useState } from "react"
import {FilterNameContext, FilterSourceContext} from "./context/filterContext"


export default function App() {
  const [filterSource, setFilterSource] = useState("fi")
  const [filterName, setFilterName] = useState("")
    return (
    <ThemeProvider>
        <PaperProvider>
          <FontSizeProvider>
            <FilterNameContext.Provider value={filterName}>
            <FilterSourceContext.Provider value={filterSource}>
              <NavigationContainer>
                <Header setFilterName={setFilterName} setFilterSource={setFilterSource}/>
                <BottomNavigation />
              </NavigationContainer>
            </FilterSourceContext.Provider>
            </FilterNameContext.Provider>
          </FontSizeProvider>
        </PaperProvider>
    </ThemeProvider>
    )
}
