import { useState } from "react"
import {View, Text} from "react-native"

export default function BBCFetcher() {                            
  const link = "https://newsapi.org/v2/everything?sources=bbc-news&apiKey=853dfe898db54fe9808a5828d2e2f15c&pageSize="

  const [news, setNews] = useState([])
  const [hasFetched, setHasFetched] = useState(false)
  const [fetchLimit, setFetchLimit] = useState(30)
  async function getData(Link) {
    console.log("link", Link)
    if(hasFetched) {
      return -1
    }
    let response = {}
     response = await fetch(Link + fetchLimit).then(res => res.json())
    setHasFetched(true)
    return response
  }

   async function parseData(Link) {
    try {
      if(hasFetched) {
        return
      }

      const newsJSON =  await getData(Link)

      if(newsJSON == -1) {
        return
      }
      const feed = newsJSON.articles
  
      let title = ""
      let desc = ""
      let date = new Date()
      let imgLink = ""
      let categories = ["No category"]
      let objects = []
      
      for(let entry of feed) {
        title = entry.title
        desc = entry.description
        imgLink = entry.urlToImage
        date = entry.publishedAt
        objects.push(createNewsObject(title, desc, date, imgLink, categories))
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
      "categories:": cat ? cat : []
    }
  }


  parseData(link)
  return <></>
}

