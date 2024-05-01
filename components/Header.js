import styles from "../style/headerStyle"
import * as React from 'react';
import { View } from "react-native"
import { Appbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import {FilterSourceContext} from "../context/filterContext"
import { Image } from "react-native";
import FinnishFlag from "../assets/svg/Flag_of_Finland.svg"
import BritishFlag from "../assets/svg/Flag_of_the_United_Kingdom.svg"
const Header = ( {setFilterName, setFilterSource}) => {
  sourceContext = React.useContext(FilterSourceContext)
  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleChange = () => { if(sourceContext=="fi") {setFilterSource("en")} else {setFilterSource("fi")}};

  const _handleMore = () => console.log('Shown more');

  return (
    
    <View>
      <SafeAreaView edges={['top', 'left', 'right']} style={[{flex:1}, styles.container]} />
      <Appbar.Header style={styles.header}>
        {/*<Appbar.BackAction onPress={_goBack} />*/}
        <Appbar.Content title="Media Moment" />
        <Appbar.Action icon="magnify" onPress={_handleSearch} />
        <Appbar.Action icon={({size, color}) => {
          if(sourceContext =="fi") {
            return <FinnishFlag height={size * 0.7} width={size}></FinnishFlag>
          }
          else {
            return <BritishFlag height={size * 0.7} width={size}></BritishFlag>
          }
        }} onPress={_handleChange} />
        <Appbar.Action icon="account-circle" onPress={_handleMore} />
      </Appbar.Header>
    </View>
        
  );
};

export default Header;