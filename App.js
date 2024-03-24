import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
export default function App() {
  return (
    <View style={styles.container}>
      <FetcherPrototype />
    </View>
  );
}



function FetcherPrototype() {                             //fetches and compiles data from the hs.fi rss feed
  const link = "https://www.hs.fi/rss/tuoreimmat.xml";
  const [news, setNews] = useState([]);

  async function getData(rssLink) {
    response = await fetch(rssLink).then(res => res.text()).then((st) => new window.DOMParser().parseFromString(st, "text/xml"));
    return response
  }

   async function parseData(rssLink) {
    if(news.length != 0) {
      return
    }
    const xmlDoc =  await getData(rssLink);
    const feed = xmlDoc.children.item(0).children.item(0).children;
    var title = "";
    var desc = "";
    var date = "";

    let objects = [];
    for (let i = 1; i < 20; i++) {         
      var currNode = feed.item(i);
      if(currNode.nodeName == "item") {
        try {
          title = currNode.children.item(0).textContent;
          desc = currNode.children.item(1).textContent;
          date = currNode.children.item(5).textContent;
          objects.push(createNewsObject(title, desc, date));
        }
        catch {
          ;
        }
      }

      
    }
    console.log(objects)
    setNews(objects);
    
  };

  function createNewsObject(title, desc, date) {
    return {
      "title" : title,
      "description": desc,
      "releaseDate": date
    }
  };


  parseData(link);
  return news.map(
    obj => 
      <NewsCard title={obj.title} description={obj.description} releaseDate={obj.releaseDate} key={news.indexOf(obj)}></NewsCard>
  )
};

function NewsCard({title, description, releaseDate}) {

  return (
    <View>
      <Text>
        {"title: " + title}
      </Text>
      <Text>
        {"description: " + description}
      </Text>
      <Text>
        {"releaseDate: " + releaseDate}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



