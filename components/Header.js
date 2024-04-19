import styles from "../style/headerStyle"
import * as React from 'react';
import { View } from "react-native"
import { Appbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = () => {
  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleChange = () => console.log('Changing Language');

  const _handleMore = () => console.log('Shown more');

  return (
    
    <View>
      <SafeAreaView edges={['top', 'left', 'right']} style={[{flex:1}, styles.container]} />
      <Appbar.Header style={styles.header}>
        {/*<Appbar.BackAction onPress={_goBack} />*/}
        <Appbar.Content title="Media Moment" />
        <Appbar.Action icon="magnify" onPress={_handleSearch} />
        <Appbar.Action icon="plus-circle" onPress={_handleChange} />
        <Appbar.Action icon="account-circle" onPress={_handleMore} />
      </Appbar.Header>
    </View>
        
  );
};

export default Header;