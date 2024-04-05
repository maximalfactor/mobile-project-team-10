import styles from "../style/headerStyle"
import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Header = () => {
  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
        <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Title" />
        <Appbar.Action icon="magnify" onPress={_handleSearch} />
        <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
        </Appbar.Header>
        </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Header;