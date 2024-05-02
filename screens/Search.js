import React, { useState, useEffect, useContext } from "react";
import { Text, SafeAreaView, TextInput, FlatList, View, Pressable, Linking, ActivityIndicator } from "react-native";
import { filterNews } from "../components/filterNews";
import styles from "../style/cardStyle"
import { useTheme } from "../context/ThemeContext"
import { useFont } from "../context/FontSizeContext"
import { FilterSourceContext } from "../context/filterContext"
import Ellipse from "../assets/svg/Ellipse.svg"

const sourceMapping = {
    "en": ["nyt", "bbc"],
    "fi": ["mtv", "hs"]
}

const categoryLangMapping = {
    "Talous": "Economy",
    "Urheilu": "Sports",
    "Tiede": "Science"
}

export default function Search({ category = "" }) {
    const { theme } = useTheme()
    const { fontSize } = useFont()
    const [allNews, setAllNews] = useState([])
    const [loading, setLoading] = useState(true)
    const [filteredNews, setFilteredNews] = useState([])
    const sourceContext = useContext(FilterSourceContext)

    async function fetchData() {
        try {
            const fetchedNews = await filterNews(10)
            setAllNews(fetchedNews["All"])
            setFilteredNews(fetchedNews["All"])
            setLoading(false)
        } catch (error) {
            console.log("Error fetching all news: ", error)
        }
    }
    if (allNews.length == 0) {
        fetchData()
    }

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

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        )
    } else if (allNews.length > 0) {
        return (
            <SafeAreaView style={{ backgroundColor: theme.containerBackgroundColor }}>
                <TextInput
                    style={{ height: 40, borderColor: theme.borderColor, borderWidth: 1, color: theme.textColor }}
                    onChangeText={(text) => handleFilter(text)}
                    placeholder="Search news..."
                    placeholderTextColor={theme.textColor}
                />

                <FlatList
                    style={{ height: "100%", backgroundColor: theme.containerBackgroundColor }}
                    data={filteredNews.filter((newsItem) =>
                        sourceMapping[sourceContext].includes(newsItem.source)
                    )}
                    renderItem={({ item, index }) => {
                        const releaseDate = new Date(item.releaseDate)
                        const day = releaseDate.getDate()
                        const month = releaseDate.getMonth() + 1
                        const year = releaseDate.getFullYear()
                        const formattedDate = `${day}/${month}/${year}`

                        return (
                            <Pressable onPress={() => handlePress(new String(item.articleLink))}>
                                <View style={[styles.card, styles.shadow, { borderWidth: theme.borderWidth, borderColor: theme.borderColor, backgroundColor: theme.cardBackgroundColor }]}>

                                    <View style={styles.textContainer}>

                                        <View style={styles.headingContainer}>
                                            <Text style={[styles.headingText, { color: theme.textColor, fontSize: fontSize.headingText }]}>{item.title}</Text>
                                        </View>

                                        <View style={styles.newsContainer}>
                                            <Text numberOfLines={4} style={{ color: theme.textColor, fontSize: fontSize.newsText }}>{item.description}</Text>
                                        </View>

                                        <View style={styles.infoRow}>
                                            <Ellipse />
                                            <Text style={[styles.category, styles.infoText, { fontSize: fontSize.newsText }]}>
                                                {sourceContext == "fi" ? item["categories:"] : categoryLangMapping[item["categories:"]]}
                                            </Text>
                                            <Text style={[styles.infoText, { fontSize: fontSize.newsText }]}>{formattedDate}</Text>
                                        </View>

                                    </View>

                                </View>
                            </Pressable>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </SafeAreaView>
        )
    }
}