import { useEffect, useState } from "react"
import { Text, View, Image, SafeAreaView, ScrollView } from "react-native"
import Ellipse from "../assets/svg/Ellipse.svg"
import styles from "../style/cardStyle"
import { useTheme } from "../context/ThemeContext"
import { useFont } from "../context/FontSizeContext"
import HsFetcher from "./fetcherproto"
import BBCFetcher from "./bbcProto"
import NYTFetcher from "./nytProto"
import MtvProto from "./mtvproto"

export default function NewsCard() {
  const { theme } = useTheme()
  const { fontSize } = useFont()
  const [newsData, setNewsData] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const hs = await HsFetcher(10)
        //const bbc = await BBCFetcher(1)
        //const nyt = await NYTFetcher(1)
        //const mtv = await MtvProto(1)
        //const news = [...hs, ...bbc, ...nyt, ...mtv]
        console.log(hs)
        setNewsData(hs)
      } catch (error) {
        console.log("Error fetching news: ", error)
      }
    }

    fetchData()
  }, [])

  const renderCards = () => {
    return newsData.map((newsItem, index) => {

      const releaseDate = new Date(newsItem.releaseDate)
      const day = releaseDate.getDate()
      const month = releaseDate.getMonth() + 1
      const year = releaseDate.getFullYear()
      const formattedDate = `${day}/${month}/${year}`
  
      return (
        <View key={index} style={[styles.card, styles.shadow, {backgroundColor: theme.cardBackgroundColor}]}>
          <Image
            style={styles.image}
            //src={"https://images.unsplash.com/photo-1508612761958-e931d843bdd5?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
            src={newsItem.img}
          />
          <View style={styles.textContainer}>

            <View style={styles.headingContainer}>
              <Text style={[styles.headingText, {color: theme.textColor, fontSize: fontSize.headingText}]}>{newsItem.title}</Text>
            </View>

            <View style={styles.newsContainer}>
              <Text numberOfLines={4} style={{color: theme.textColor, fontSize: fontSize.newsText}}>{newsItem.description}</Text>
            </View>
      
            <View style={styles.infoRow}>
              <Ellipse />
              <Text style={[styles.category, styles.infoText, {fontSize: fontSize.newsText}]}>{newsItem["categories:"]}</Text>
              <Text style={[styles.infoText, {fontSize: fontSize.newsText}]}>{formattedDate}</Text>
            </View>

          </View>
        </View>
      )
    })
  }

  return (
    <SafeAreaView>
      <ScrollView style={{backgroundColor: theme.containerBackgroundColor}}>
        {renderCards()}
      </ScrollView>
    </SafeAreaView>
  )
}