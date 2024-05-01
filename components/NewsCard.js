import { useContext, useEffect, useState } from "react"
import { Text, View, Image, SafeAreaView, ScrollView, Linking, Pressable } from "react-native"
import Ellipse from "../assets/svg/Ellipse.svg"
import styles from "../style/cardStyle"
import { useTheme } from "../context/ThemeContext"
import { useFont } from "../context/FontSizeContext"
import { filterNews } from "./filterNews"
import {FilterNameContext, FilterSourceContext} from "../context/filterContext"
import Loading from "./Loading"
const sourceMapping = {
  "en": ["nyt", "bbc"],
  "fi": ["mtv", "hs"]
}
const categoryLangMapping = {
  "Talous": "Economy",
  "Urheilu": "Sports",
  "Tiede": "Science"
}
export default function NewsCard({category = ""}) {
  const { theme } = useTheme()
  const { fontSize } = useFont()
  const [allNews, setAllNews] = useState([])
  const nameContext = useContext(FilterNameContext)
  const sourceContext = useContext(FilterSourceContext)
  async function fetchData() {
    try {
      const filteredNews = await filterNews(5)
      setAllNews(filteredNews[!category ? "All" : category])
    } catch (error) {
      console.log("Error fetching all news: ", error)
    }
  }
  if(allNews.length == 0) {
    fetchData()
  }

  const renderCards = () => {
    return allNews.map((newsItem, index) => {

      const releaseDate = new Date(newsItem.releaseDate)
      const day = releaseDate.getDate()
      const month = releaseDate.getMonth() + 1
      const year = releaseDate.getFullYear()
      const formattedDate = `${day}/${month}/${year}`

      const handlePress = (url) => {
        url = url.toString()
        const supported = Linking.canOpenURL(url);
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert(`Don't know how to open this URL: ${url}`);
        }
      }
      if(newsItem.title.includes(nameContext) && (!sourceContext || sourceMapping[sourceContext].includes(newsItem.source))) {
        return (
          <Pressable key={index}  onPress={() => handlePress(new String(newsItem.articleLink))}>
            <View style={[styles.card, styles.shadow, {borderWidth: theme.borderWidth, borderColor: theme.borderColor, backgroundColor: theme.cardBackgroundColor}]}>
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
                  <Text style={[styles.category, styles.infoText, {fontSize: fontSize.newsText}]}>{sourceContext == "fi" ? newsItem["categories:"]: categoryLangMapping[newsItem["categories:"]]}</Text>
                  <Text style={[styles.infoText, {fontSize: fontSize.newsText}]}>{formattedDate}</Text>
                </View>
  
              </View>
            </View>
          </Pressable>
        )
      }
      else {
        return 
      }
    })
  }
  if (allNews.length > 0) {
    return (
      <SafeAreaView>
        <ScrollView style={{backgroundColor: theme.containerBackgroundColor}}>
          {renderCards()}
        </ScrollView>
      </SafeAreaView>
    )
  }
  else {
    return <Loading></Loading>
  }
  
}