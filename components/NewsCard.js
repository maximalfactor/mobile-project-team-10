import {Text, View} from "react-native"

export default function NewsCard({title, description, releaseDate}) {

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
}