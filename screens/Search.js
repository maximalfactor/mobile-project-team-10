import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, TextInput, FlatList, View, Pressable, Linking } from "react-native";
import { filterNews } from "../components/filterNews";
import styles from "../style/cardStyle"
import { useTheme } from "../context/ThemeContext"
import { useFont } from "../context/FontSizeContext"

export default function Search() {
    const { theme } = useTheme()
    const { fontSize } = useFont()
    const [allNews, setAllNews] = useState([])
    const [filteredNews, setFilteredNews] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedNews = await filterNews(5)
                setAllNews(fetchedNews["All"])
                setFilteredNews(fetchedNews["All"])
            } catch (error) {
                console.log("Error fetching all news: ", error)
            }
        }
        fetchData()
    }, [])

    function handleFilter(searchTerm) {
        const filtered = allNews.filter((newsItem) =>
            newsItem.title.toUpperCase().includes(searchTerm.toUpperCase()) ||
            newsItem.description.toUpperCase().includes(searchTerm.toUpperCase())
        )
        setFilteredNews(filtered)
    }

    const handlePress = (url) => {
        url = url.toString()
        const supported = Linking.canOpenURL(url);
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }

    return (
        <SafeAreaView style={{backgroundColor: theme.containerBackgroundColor}}>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: theme.textColor }}
                onChangeText={(text) => handleFilter(text)}
                placeholder="Search news..."
            />

            <FlatList
                style={{height: "100%", backgroundColor: theme.containerBackgroundColor}}
                data={filteredNews}
                renderItem={({ item, index }) => (
                    <Pressable onPress={() => handlePress(new String(item.articleLink))}>
                        <View style={[styles.card, styles.shadow, { borderWidth: theme.borderWidth, borderColor: theme.borderColor, backgroundColor: theme.cardBackgroundColor }]}>
                            
                            <View style={styles.textContainer}>

                                <View style={styles.headingContainer}>
                                    <Text style={[styles.headingText, { color: theme.textColor, fontSize: fontSize.headingText }]}>{item.title}</Text>
                                </View>

                                <View style={styles.newsContainer}>
                                    <Text numberOfLines={4} style={{ color: theme.textColor, fontSize: fontSize.newsText }}>{item.description}</Text>
                                </View>

                            </View>
                            
                        </View>
                    </Pressable>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    )
}