import { createNewsObject } from "./fetcherproto"

async function getData(rssLink) {
  let response = {}
  await fetch(rssLink).then(res => res.text()).then((st) => parseString(st, {strict: false}, (err, result) => response = result))
  return new Promise((resolve) => resolve(response))
}
monthMapping = {
  "Jan": 0,
  "Feb": 1,
  "Mar": 2,
  "Apr": 3,
  "May": 4,
  "Jun": 5,
  "Jul": 6,
  "Aug": 7,
  "Sep": 8,
  "Oct": 9,
  "Nov": 10,
  "Dec": 11
}

const parseString = require('react-native-xml2js').parseString
export default async function MtvProto(fetchLimit) {                             //fetches and compiles data from the hs.fi rss feed
  let news = []
   async function parseData() {
    try {
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

      let title = ""
      let desc = ""
      let _date = new Date()
      let imgLink = ""
      let category =""
      let link = ""
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
              _date = currNode.PUBDATE[0]
              _date = _date.split(" ")
              time = _date[3]
              time = time.split(":")
              _date = new Date(Date.UTC(_date[2], monthMapping[_date[1]], _date[0], time[0], time[1], time[2]))
              link = currNode.LINK
              if("MEDIA:GROUP" in currNode) {
                imgLink = currNode["MEDIA:GROUP"][0]["MEDIA:CONTENT"][0]["$"].URL
              }
              news.push(createNewsObject(title, desc, _date, imgLink, category, link, "mtv"))
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
      news = [createNewsObject("Error has occured in Mtv fetching", "Error has occured in Mtv fetching", "", "")]
      alert(exception)
    }
    
  }
  await parseData()
  return new Promise((resolve) => resolve(news))
}

