import { View, Text, Image, ScrollView } from "react-native"
import Ellipse from "../../assets/svg/Ellipse"
import styles from "../../style/cardStyle"
import { useTheme } from "../../context/ThemeContext"
import { useFont } from "../../context/FontSizeContext"
import { useState, useEffect } from "react"
import { filterNews } from "../../components/filterNews"

export default function Sports() {
  const { theme } = useTheme()
  const { fontSize } = useFont()
  const [sportsNews, setSportsNews] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const filteredNews = await filterNews(10)
        setSportsNews(filteredNews.Urheilu)
      } catch (error) {
        console.log("Error fetching economy news: ", error)
      }
    }

    fetchData()
  }, [])

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