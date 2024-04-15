{/*
import { useState } from "react"
import {View, Text} from "react-native"

const parseString = require('react-native-xml2js').parseString
export default function HsFetcher() {                             //fetches and compiles data from the hs.fi rss feed
  const link = "https://www.hs.fi/rss/tuoreimmat.xml"

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
      let categories = []
      let excess = 0
      let objects = []
      
      for (let i = 1; i - excess < fetchLimit; i++) {         
        let currNode = feed[i]
        
        if(currNode?.TITLE) {
          try {
            title = currNode.TITLE[0]
            categories[0] = title.search(/^.+?(?= \|)/)
            categories[1] = currNode.CATEGORY
            title = title.replace(/^.+?\| /, "").trim()
            desc = currNode.DESCRIPTION[0]
            date = currNode.PUBDATE
            date = new Date(date)
            if(currNode?.ENCLOSURE) {
              imgLink = currNode.ENCLOSURE[0]["$"].URL 
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
      "categories:": cat ? cat : []
    }
  }


  parseData(link)
  return <></>
}
