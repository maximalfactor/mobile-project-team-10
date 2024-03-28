import { Text, View, Image, SafeAreaView, ScrollView } from "react-native"
import Ellipse from "../assets/svg/Ellipse.svg"
import styles from "../style/cardStyle"

export default function NewsCard({ title, description, releaseDate }) {

  const renderCards = () => {
    const cards = []
    for (let i = 0; i < 20; i++) {
      cards.push(

        <View key={i} style={[styles.card, styles.shadow]}>

          <Image
            style={styles.image}
            src={"https://images.unsplash.com/photo-1508612761958-e931d843bdd5?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          />

          <View style={styles.textContainer}>

            <View style={styles.headingContainer}>
              <Text style={styles.headingText}>Heading</Text>
            </View>

            <View style={styles.newsContainer}>
              <Text numberOfLines={4}>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Non tristique interdum faucibus velit.</Text>
            </View>

            <View style={styles.infoRow}>
              <Ellipse />
              <Text style={[styles.category, styles.infoText]}>category</Text>
              <Text style={styles.infoText}>20/3/2024</Text>
            </View>

          </View>

        </View>

      )
    }
    return cards
  }

  return (
    <SafeAreaView>
      <ScrollView>
        {renderCards()}
      </ScrollView>
    </SafeAreaView>
  )
  
  {/*
    return (
      <View>
        <Text>
          {"title: " + title}
        </Text>
        <Text>
          {"description: " + description}
        </Text>
        <Text>
          {"releaseDate: " + releaseDate}
        </Text>
      </View>
    )
  */}
}