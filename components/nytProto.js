import { createNewsObject } from "./fetcherproto"
const parseString = require('react-native-xml2js').parseString

async function getData(rssLink) {
  let response = {}
  await fetch(rssLink).then(res => res.text()).then((st) => parseString(st, {strict: false}, (err, result) => response = result))
  return new Promise((resolve) => resolve(response))
}

export default async function NYTFetcher(fetchLimit) {                            
  let news = []
  async function parseData() {
  try {
    let feeds = [
      {
        "category": "Talous",
        "link": "https://rss.nytimes.com/services/xml/rss/nyt/Economy.xml",
        "feed": []
      },
      {
        "category": "Urheilu",
        "link": "https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml",
        "feed": []
      },
      {
        "category": "Tiede",
        "link": "https://rss.nytimes.com/services/xml/rss/nyt/Science.xml",
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

    let title = ""
    let desc = ""
    let date = new Date()
    let imgLink = ""
    let category =""
    
    for(let feed of feeds) {
      let excess = 0
      currFeed = feed.feed.RSS.CHANNEL[0].ITEM
      for (let i = 1; i - excess <= fetchLimit && i < currFeed.length; i++) {    
        currNode = currFeed[i] 
        if(currNode?.TITLE) {
          try {
            category = feed.category
            title = currNode.TITLE[0]
            desc = currNode.DESCRIPTION[0]
            date = currNode.PUBDATE
            date = new Date(date)
            if("MEDIA:CONTENT" in currNode) {
              imgLink = currNode["MEDIA:CONTENT"][0]["$"].URL
            }
            news.push(createNewsObject(title, desc, date, imgLink, category))
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
    
  }
    catch (exception) {
      news = [createNewsObject("Error has occured in NYT fetching", "Error has occured in HS fetching", "", "", [])]
      alert(exception)
    }
  }

  parseData()
  return new Promise((resolve) => resolve(news))
}

