

import HsFetcher from "./fetcherproto"
import BBCFetcher from "./bbcProto"
import NYTFetcher from "./nytProto"
import MtvProto from "./mtvproto"

export async function filterNews(fetchLimit) {
    try {
        const hs = await HsFetcher(fetchLimit)
        const bbc = await BBCFetcher(fetchLimit)
        const nyt = await NYTFetcher(fetchLimit)
        const mtv = await MtvProto(fetchLimit)

        const news = [...hs, ...bbc, ...nyt, ...mtv]

        const filteredNews = {
            Talous: news.filter(newsItem => newsItem["categories:"] === "Talous"),
            Urheilu: news.filter(newsItem => newsItem["categories:"] === "Urheilu"),
            Tiede: news.filter(newsItem => newsItem["categories:"] === "Tiede"),
            All: news
        }

        return filteredNews
    } catch (error) {
        console.error("Error fetching and categorizing news: ", error)
    }
}
