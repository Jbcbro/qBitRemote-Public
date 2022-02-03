import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../global/AppContext'

import { Ionicons } from '@expo/vector-icons';

import { StyleSheet, FlatList, TouchableOpacity, ColorSchemeName, TouchableNativeFeedback, Button } from 'react-native';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { ProgressBar, Colors, Headline, Appbar } from 'react-native-paper';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';



export default function TabOneScreen({ navigation, colorScheme }: { navigation: any, colorScheme: ColorSchemeName }) {
  const [torrents, setTorrents] = useState([]);
  const [clinetInfo, setClientInfo] = useState([]);

  const userSettings: any = useContext(AppContext);


  const loginQbit = async () => {

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch((userSettings.ssl == 'true' ? 'https://':'http://') + userSettings.host + ":" + userSettings.port + "/api/v2/auth/login?username=" + userSettings.username + "&password=" + userSettings.password + "", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result)).then(() => getTorrentsQbit())
      .catch(error => console.log('error', error));
  }


  const getTorrentsQbitInfo = async () => {
    console.log(clinetInfo);
    var myHeaders = new Headers();

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    await fetch((userSettings.ssl == 'true' ? 'https://':'http://') + userSettings.host + ":" + userSettings.port + "/api/v2/transfer/info", requestOptions)
      .then(response => response.json())
      .then(result => setClientInfo(result))
      .catch(error => console.log('error', error));
  }

  const getTorrentsQbit = async () => {
    var myHeaders = new Headers();

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    getTorrentsQbitInfo;
    
    await fetch((userSettings.ssl == 'true' ? 'https://':'http://') + userSettings.host + ":" + userSettings.port + "/api/v2/torrents/info?sort=added_on&reverse=true", requestOptions)
      .then(response => response.json())
      .then(result => setTorrents(result)).then(result => console.log('Recicved')).then(() => setRefreshed(false))
      .catch(error => console.log('error', error));
  }


  React.useEffect(() => {

    loginQbit();

    const timer = setInterval(() => getTorrentsQbit(), 9000)

    const timerInfo = setInterval(() => getTorrentsQbitInfo(), 9000)


    const unsubscribe = navigation.addListener('focus', () => {

      getTorrentsQbit()
      getTorrentsQbitInfo()
    });

    return unsubscribe;
  }, [navigation]);




  const onPress = (click: any) => console.log(click) + navigation.navigate('InfoScreen', { data: click });
  const onPressLong = (clickL: any) => setRefreshed(false);


  const [refreshed, setRefreshed] = useState(false);

  const onRefresh = () => {
    setRefreshed(true);
    getTorrentsQbit();

  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 B';
    if (bytes === NaN) return '0 B';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  const ContentTitle = ({ title, style }) => (
    <Appbar.Content
      title={<Text style={style}> {title} </Text>}
      style={{ alignItems: 'center' }}
    />
  );
  const _handleMore = () => navigation.navigate('UploadScreen');

  
  return (

    <View style={styles.container}>


      <Appbar.Header theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={{backgroundColor: 'transparent'}}>
            <Text style={{ marginLeft: 20, color: 'white' }}>↑{clinetInfo.up_info_speed == null ? "0" : formatBytes(clinetInfo.up_info_speed)}/s</Text>
            
            <Text style={{ marginLeft: 20, color: 'white' }}>↓{clinetInfo.dl_info_speed == null ? "0" : formatBytes(clinetInfo.dl_info_speed)}/s</Text>



</View>
        <ContentTitle title={'Remote'} style={{ color: 'white' }} />
        <Appbar.Action icon="plus" onPress={_handleMore} />
      </Appbar.Header>


      <FlatList
        data={torrents}
        onRefresh={() => onRefresh()}
        refreshing={refreshed}
        renderItem={({ item }) => (

          <TouchableOpacity style={styles.row} onPress={() => onPress(item)} onLongPress={() => onPressLong(item.name)}>
            <Text style={{ textAlign: 'center', marginBottom: 5 }} numberOfLines={1}>{item.name}</Text>


            <ProgressBar style={{ height: 3, width: '100%', borderRadius: 20 }} progress={item.progress} color={Colors.blue400} />


            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

              {(() => {
                if (item.state == 'stalledUP') {
                  return (
                    <Text style={styles.markdown}>Seeding</Text>
                  )
                }
                if (item.state == 'pausedDL') {
                  return (
                    <Text style={styles.markdown}>Paused</Text>
                  )
                }
                if (item.state == 'uploading') {
                  return (
                    <Text style={styles.markdown}>Seeding</Text>
                  )
                }

                return <Text style={styles.markdown}>{item.state}</Text>;
              })()}

              <Text style={styles.markdown}>↑ {formatBytes(item.uploaded)} ↓ {

                formatBytes(item.downloaded)}</Text>
              <Text style={styles.markdown}>{Math.round(item.ratio * 100) / 100}</Text>
            </View>

            <View style={{ height: 1, width: '100%', backgroundColor: '#D1D1D6' }}></View>
          </TouchableOpacity>


        )}
        keyExtractor={({ hash }, index) => hash}
      />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  row: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    marginLeft: 25,
    marginRight: 25,
  },
  markdown: {
    textAlign: 'center',
    fontSize: 10,
    marginTop: 7,
    marginBottom: 7,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
