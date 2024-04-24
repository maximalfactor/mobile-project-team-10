
import { useState } from "react"
import {View, Text} from "react-native"

const parseString = require('react-native-xml2js').parseString
export default function HsFetcher() {                             //fetches and compiles data from the hs.fi rss feed
  const [news, setNews] = useState([])
  const [hasFetched, setHasFetched] = useState(false)
  const [fetchLimit, setFetchLimit] = useState(20)
  async function getData(rssLink) {
    let response = {}
    await fetch(rssLink).then(res => res.text()).then((st) => parseString(st, {strict: false}, (err, result) => response = result))
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
        "link": "https://www.hs.fi/rss/talous.xml",
        "feed": []
      },
      {
        "category": "Urheilu",
        "link": "https://www.hs.fi/rss/urheilu.xml",
        "feed": []
      },
      {
        "category": "Tiede",
        "link": "https://www.hs.fi/rss/tiede.xml",
        "feed": []
      },
    ]
    setHasFetched(true)
    for(let feed of feeds) {
      data = await getData(feed.link)
      if(data == -1) {
        return
      }
      feed.feed = data
    }

      
      let title = ""
      let desc = ""
      let date = new Date()
      let imgLink = ""
      let category = ""
      let objects = []
      
      for(let feed of feeds) {
        let excess = 0
        for (let i = 1; i- excess <= fetchLimit; i++) {         
          let currNode = feed.feed.RSS.CHANNEL[0].ITEM[i]
          
          if(currNode?.TITLE) {
            try {
              category = feed.category
              title = currNode.TITLE[0]
              title = title.replace(/^.+?\| /, "").trim()
              desc = currNode.DESCRIPTION[0]
              date = currNode.PUBDATE
              date = new Date(date)
              if(currNode?.ENCLOSURE) {
                imgLink = currNode.ENCLOSURE[0]["$"].URL 
              }
              objects.push(createNewsObject(title, desc, date, imgLink, category))
            }
            catch (exception) {
              continue
            }
          }
          else {
            excess++
          }

          
        }
      }
      setNews(objects)
   
      
    }

    catch (exception) {
      setNews([createNewsObject("Error has occured in HS fetching", "Error has occured in HS fetching", "", "", [])])
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
