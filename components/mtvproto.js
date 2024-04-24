import { useState } from "react"
import {View, Text} from "react-native"

const parseString = require('react-native-xml2js').parseString
export default function MtvProto() {                             //fetches and compiles data from the hs.fi rss feed

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
          "link": "https://api.mtvuutiset.fi/mtvuutiset/api/feed/rss/uutiset_talous",
          "feed": []
        },
        {
          "category": "Urheilu",
          "link": "https://api.mtvuutiset.fi/mtvuutiset/api/feed/rss/urheilu",
          "feed": []
        },
        {
          "category": "Tiede",
          "link": "https://api.mtvuutiset.fi/mtvuutiset/api/feed/rss/lifestyle_tekniikka",
          "feed": []
        },
      ]
      for(let feed of feeds) {
        data = await getData(feed.link)
        if(data == -1) {
          return
        }
        feed.feed = data
      }
      setHasFetched(true)

      let title = ""
      let desc = ""
      let date = new Date()
      let imgLink = ""
      let category =""
      let objects = []
      
      for(let feed of feeds) {
        let excess = 0
        currFeed = feed.feed.RSS.CHANNEL[0].ITEM
        for (let i = 1; i - excess <= fetchLimit && i < currFeed.length; i++) {         
          let currNode = currFeed[i]
          
          if(currNode?.TITLE) {
            try {
              category = feed.category
              title = currNode.TITLE[0]
              desc = currNode.DESCRIPTION[0]
              date = currNode.PUBDATE
              date = new Date(date)
              if("MEDIA:GROUP" in currNode) {
                imgLink = currNode["MEDIA:GROUP"][0]["MEDIA:CONTENT"][0]["$"].URL
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
      setNews([createNewsObject("Error has occured in Mtv fetching", "Error has occured in Mtv fetching", "", "")])
      alert(exception)
    }
    
  }

  function createNewsObject(title, desc, date, img, cat) {
    return {
      "title" : title ? title : "No data",
      "description": desc ? desc : "No data",
      "releaseDate": date ? date : "No data",
      "img": img ? img : "",
      "categories": cat ? cat : [],
    }
  }


  parseData(link)
  return <></>
}

