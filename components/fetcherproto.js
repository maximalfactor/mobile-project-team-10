const parseString = require('react-native-xml2js').parseString
export function createNewsObject(title, desc, date, img, cat, link) {
  return {
    "title" : title ? title : "No data",
    "description": desc ? desc : "No data",
    "releaseDate": date ? date : "No data",
    "img": img ? img : "",
    "categories:": cat ? cat : "",
    "articleLink": link ? link : ""
  }
}

async function getData(rssLink) {
  let response = {}
  await fetch(rssLink).then(res => res.text()).then((st) => parseString(st, {strict: false}, (err, result) => response = result))
  return new Promise((resolve) => resolve(response))
}

export default async function HsFetcher(fetchLimit) {                             //fetches and compiles data from the hs.fi rss feed
    let news = []
    try {
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
    for(let feed of feeds) {
      let data = await getData(feed.link)
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
      let link
      
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
              link = currNode.LINK
              if(currNode?.ENCLOSURE) {
                imgLink = currNode.ENCLOSURE[0]["$"].URL 
              }
              news.push(createNewsObject(title, desc, date, imgLink, category, link))
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
      news = [createNewsObject("Error has occured in HS fetching", "Error has occured in HS fetching", "", "", [])]
      alert(exception)
    }
  return new Promise((resolve) => resolve(news))
}
