import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import AppContext from './global/AppContext';
import * as SecureStore from 'expo-secure-store';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(true);

  const [host, setHost] = useState('');
  const [port, setPort] = useState();
  const [ssl, setSsl] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('Remote');


async function getValueFor() {
  let host = await SecureStore.getItemAsync('host');
  setHost(host);

  let port = await SecureStore.getItemAsync('port');
  setPort(port);
 let username = await SecureStore.getItemAsync('username');
  setUsername(username);

 let passwordRes = await SecureStore.getItemAsync('passwordRes');
  setPassword(passwordRes);

 let ssl = await SecureStore.getItemAsync('ssl');
  setSsl(ssl);

  setLoading(false)
}


 getValueFor();


const userSettings = {
    host: host,
    port: port,
    ssl: ssl,
    username: username,
    nickname: nickname,
    password: password,
    setHost,
    setPort,
    setSsl,
    setUsername,
    setPassword,
    setNickname
  };

if (!loading) {
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AppContext.Provider value={userSettings}>
  
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider> 
      </AppContext.Provider>
    );
  }
  } else {
    return null
  }
}
