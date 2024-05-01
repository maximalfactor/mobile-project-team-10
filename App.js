import BottomNavigation from "./components/navigators/BottomNavigation"
import { NavigationContainer } from "@react-navigation/native"
import { PaperProvider } from 'react-native-paper'
import Header from './components/Header'
import { ThemeProvider } from './context/ThemeContext'
import { FontSizeProvider } from './context/FontSizeContext'
import HsFetcher from "./components/fetcherproto"
import NYTFetcher from "./components/nytProto"
import BBCFetcher from "./components/bbcProto"
import MtvProto from "./components/mtvproto"
import { useState } from "react"
import { Text } from "react-native"



export default function App() {
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
}
