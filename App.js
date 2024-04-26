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


async function fetchItAll(fetchLimit) {
  let news = []
  news.push(await HsFetcher(fetchLimit))
  news.push(await NYTFetcher(fetchLimit))
  news.push(await BBCFetcher(fetchLimit))
  news.push(await MtvProto(fetchLimit))
  return news
}

export default function App() {
  const [allNews, setAllNews] = useState([])
  if(allNews.length == 0) {
    fetchItAll(20).then(news => {
      var temp = []
      for(let source of news) {
        temp = [...temp, ...source]
      }
      setAllNews(temp)
      })
  }
  /*
  NOTE: allNews will be [] on the first time app is loaded. When all the fetches arrive the app will re-render and allNews will have the data. Removing the above if statement
  would cause the program to infinitely fetch all the feeds causing us to get ip-banned.
  */
  


  return allNews.length != 0 ? (
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
  ):
  <Text>Loading...</Text>
}
