import { useState } from "react"
import {View, Text} from "react-native"

export default function BBCFetcher() {                            
  const [news, setNews] = useState([])
  const [hasFetched, setHasFetched] = useState(false)
  const [fetchLimit, setFetchLimit] = useState(20)
  async function getData(Link) {
    let response = {}
     response = await fetch(Link).then(res => res.json())
    return response
  }

   async function parseData() {
    try {
      if(hasFetched) {
        return
      }

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
      setHasFetched(true)
  
      let title = ""
      let desc = ""
      let date = new Date()
      let imgLink = ""
      let category = ""
      let objects = []
      for(let feed of feeds) {
        for(let entry of feed.feed) {
          title = entry.title
          desc = entry.description
          imgLink = entry.urlToImage
          date = entry.publishedAt
          objects.push(createNewsObject(title, desc, date, imgLink, category))
        }
      }
      console.log(objects)
      setNews(objects)
    }

    catch (exception) {
      setNews([createNewsObject("Error has occured in BBC fetching", "Error has occured in HS fetching", "", "", [])])
      alert(exception)
    }
    
  }

  function createNewsObject(title, desc, date, img, cat) {
    return {
      "title" : title ? title : "No data",
      "description": desc ? desc : "No data",
      "releaseDate": date ? date : "No data",
      "img": img ? img : "",
      "categories:": cat ? cat : ""
    }
  }


  parseData()
  return <></>
}

