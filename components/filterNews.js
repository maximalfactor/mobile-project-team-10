

import HsFetcher from "./fetcherproto"
import BBCFetcher from "./bbcProto"
import NYTFetcher from "./nytProto"
import MtvProto from "./mtvproto"

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

export async function filterNews(fetchLimit) {
    try {
        const hs = await HsFetcher(fetchLimit)
        //const bbc = await BBCFetcher(fetchLimit)
        const nyt = await NYTFetcher(fetchLimit)
        const mtv = await MtvProto(fetchLimit)

        const news = [...hs, /*...bbc,*/ ...nyt, ...mtv]
        shuffle(news)
        const filteredNews = {
            "Talous": news.filter(newsItem => newsItem["categories:"] === "Talous"),
            "Urheilu": news.filter(newsItem => newsItem["categories:"] === "Urheilu"),
            "Tiede": news.filter(newsItem => newsItem["categories:"] === "Tiede"),
            "All": news
        }

        return filteredNews
    } catch (error) {
        console.error("Error fetching and categorizing news: ", error)
    }
}
