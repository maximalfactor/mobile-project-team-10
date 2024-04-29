import { Text, View, Image, SafeAreaView, ScrollView } from "react-native"
import Ellipse from "../assets/svg/Ellipse.svg"
import styles from "../style/cardStyle"
import { useTheme } from "../context/ThemeContext"
import { useFont } from "../context/FontSizeContext"

export default function NewsCard() {
  const { theme } = useTheme()
  const { fontSize } = useFont()

  const renderCards = () => {
    const cards = []
    for (let i = 0; i < 20; i++) {
      cards.push(

        <View key={i} style={[styles.card, styles.shadow, {borderWidth: theme.borderWidth, borderColor: theme.borderColor, backgroundColor: theme.cardBackgroundColor}]}>

          <Image
            style={styles.image}
            src={"https://images.unsplash.com/photo-1508612761958-e931d843bdd5?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          />

          <View style={styles.textContainer}>

            <View style={styles.headingContainer}>
              <Text style={[styles.headingText, {color: theme.textColor, fontSize: fontSize.headingText}]}>Heading</Text>
            </View>

            <View style={styles.newsContainer}>
              <Text numberOfLines={4} style={{color: theme.textColor, fontSize: fontSize.newsText}}>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Non tristique interdum faucibus velit.</Text>
            </View>

            <View style={styles.infoRow}>
              <Ellipse />
              <Text style={[styles.category, styles.infoText, {fontSize: fontSize.newsText}]}>category</Text>
              <Text style={[styles.infoText, {fontSize: fontSize.newsText}]}>20/3/2024</Text>
            </View>

          </View>

        </View>

      )
    }
    return cards
  }

  return (
    <SafeAreaView>
      <ScrollView style={{backgroundColor: theme.containerBackgroundColor}}>
        {renderCards()}
      </ScrollView>
    </SafeAreaView>
  )
}