import { useState } from "react"
import {View, Text} from "react-native"

const parseString = require('react-native-xml2js').parseString
export default function MtvProto() {                             //fetches and compiles data from the hs.fi rss feed
  const link = "https://api.mtvuutiset.fi/mtvuutiset/api/feed/rss/uutiset_uusimmat"

  const [news, setNews] = useState([])
  const [hasFetched, setHasFetched] = useState(false)
  const [fetchLimit, setFetchLimit] = useState(30)
  async function getData(rssLink) {
    if(hasFetched) {
      return -1
    }
    let response = {}
    await fetch(rssLink).then(res => res.text()).then((st) => parseString(st, {strict: false}, (err, result) => response = result))
    
    setHasFetched(true)
    return response
  }

   async function parseData(rssLink) {
    try {
      if(hasFetched) {
        return
      }

      const xmlDoc =  await getData(rssLink)

      if(xmlDoc == -1) {
        return
      }
      const feed = xmlDoc.RSS.CHANNEL[0].ITEM
      let title = ""
      let desc = ""
      let date = new Date()
      let imgLink = ""
      let excess = 0
      let categories = ["uutinen"]
      let objects = []
      
      for (let i = 1; i - excess < fetchLimit; i++) {         
        let currNode = feed[i]
        
        if(currNode?.TITLE) {
          try {
            title = currNode.TITLE[0]
            desc = currNode.DESCRIPTION[0]
            date = currNode.PUBDATE
            date = new Date(date)
            if("MEDIA:GROUP" in currNode) {
              imgLink = currNode["MEDIA:GROUP"][0]["MEDIA:CONTENT"][0]["$"].URL
            }
            objects.push(createNewsObject(title, desc, date, imgLink, categories))
          }
          catch (exception) {
            continue
          }
        }
        else {
          excess++
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

