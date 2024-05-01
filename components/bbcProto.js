import { createNewsObject } from "./fetcherproto"

async function getData(Link) {
  let response = {}
   response = await fetch(Link).then(res => res.json())
   return new Promise((resolve) => resolve(response))
  }

export default async function BBCFetcher(fetchLimit) {                            
  let news = []
   async function parseData() {
    try {
      let feeds = [
        {
          "category": "Talous",
          "link": "https://newsapi.org/v2/everything?sources=bbc-news&apiKey=853dfe898db54fe9808a5828d2e2f15c&q=economy&pageSize=",
          "feed": []
        },
        {
          "category": "Urheilu",
          "link": "https://newsapi.org/v2/everything?sources=bbc-news&apiKey=853dfe898db54fe9808a5828d2e2f15c&q=sport&pageSize=",
          "feed": []
        },
        {
          "category": "Tiede",
          "link": "https://newsapi.org/v2/everything?sources=bbc-news&apiKey=853dfe898db54fe9808a5828d2e2f15c&q=science&pageSize=",
          "feed": []
        },
      ]

      for(let feed of feeds) {
        feed.link += fetchLimit
        data = await getData(feed.link)
        if(data == -1) {
          return
        }
        feed.feed = data.articles
      }
  
      let title = ""
      let desc = ""
      let date = new Date()
      let imgLink = ""
      let category = ""
      let link = ""
      for(let feed of feeds) {
        for(let entry of feed.feed) {
          title = entry.title
          desc = entry.description
          imgLink = entry.urlToImage
          date = entry.publishedAt
          link = entry.url
          news.push(createNewsObject(title, desc, date, imgLink, category, link))
        }
      }
    }

    catch (exception) {
      news = [createNewsObject("Error has occured in BBC fetching", "Error has occured in HS fetching", "", "", [])]
      alert(exception)
    }
    
  }


  await parseData()
  return new Promise((resolve) => resolve(news))
}

