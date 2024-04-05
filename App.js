import { View } from 'react-native';
import FetcherPrototype from './components/fetcherproto';
import Header from "./components/Header"
import NewsCard from "./components/NewsCard"
import { PaperProvider } from 'react-native-paper';
export default function App() {
  return (
    <PaperProvider>
    <View>
      <Header />
      {/*<FetcherPrototype />*/}
      <NewsCard />
      </View>
      </PaperProvider>
  );
}



