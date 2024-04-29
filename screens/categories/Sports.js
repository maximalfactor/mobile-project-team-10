import { View, Text, Image, ScrollView } from "react-native"
import Ellipse from "../../assets/svg/Ellipse"
import styles from "../../style/cardStyle"
import { useTheme } from "../../context/ThemeContext"
import { useFont } from "../../context/FontSizeContext"
import { useState, useEffect } from "react"
import HsFetcher from "../../components/fetcherproto"

export default function Sports() {
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

  // Filter economy news
  const sportsNews = newsData.filter(newsItem => newsItem["categories:"] === "Urheilu")

  return (
    <ScrollView style={{backgroundColor: theme.containerBackgroundColor}}>
        <View>
        {sportsNews.map((newsItem, index) => {
            const releaseDate = new Date(newsItem.releaseDate)
            const day = releaseDate.getDate()
            const month = releaseDate.getMonth() + 1
            const year = releaseDate.getFullYear()
            const formattedDate = `${day}/${month}/${year}`

            return (
            <View key={index} style={[styles.card, styles.shadow, { backgroundColor: theme.cardBackgroundColor }]}>
                <Image
                style={styles.image}
                src={newsItem.img}
                />
                <View style={styles.textContainer}>
                <View style={styles.headingContainer}>
                    <Text style={[styles.headingText, { color: theme.textColor, fontSize: fontSize.headingText }]}>{newsItem.title}</Text>
                </View>
                <View style={styles.newsContainer}>
                    <Text numberOfLines={4} style={{ color: theme.textColor, fontSize: fontSize.newsText }}>{newsItem.description}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Ellipse />
                    <Text style={[styles.category, styles.infoText, { fontSize: fontSize.newsText }]}>{newsItem["categories:"]}</Text>
                    <Text style={[styles.infoText, { fontSize: fontSize.newsText }]}>{formattedDate}</Text>
                </View>
                </View>
            </View>
            )
        })}
        </View>
    </ScrollView>
  )
}