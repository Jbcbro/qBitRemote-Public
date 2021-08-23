import React, { useState, useEffect, useContext  } from 'react';
import AppContext from '../global/AppContext'

import { Ionicons } from '@expo/vector-icons';

import { StyleSheet, FlatList, TouchableOpacity, TouchableNativeFeedback } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { ProgressBar, Colors, Headline } from 'react-native-paper';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';



export default function TabOneScreen({
  navigation,
}) {
  const [torrents, setTorrents] = useState([]);
  const userSettings:any = useContext(AppContext);


  const loginQbit = async () => {
 
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch(userSettings.ssl == 'true' ? 'https://':'http://'+userSettings.host+":"+userSettings.port+"/api/v2/auth/login?username="+userSettings.username+"&password="+userSettings.password+"", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result)).then(() => getTorrentsQbit())
      .catch(error => console.log('error', error));
  }



  const getTorrentsQbit = async () => {
    var myHeaders = new Headers();

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };


    await fetch(userSettings.ssl == 'true' ? 'https://':'http://'+userSettings.host+":"+userSettings.port+"/api/v2/torrents/info?sort=added_on&reverse=true", requestOptions)
      .then(response => response.json())
      .then(result => setTorrents(result)).then(result => console.log('Recicved')).then(() => setRefreshed(false))
      .catch(error => console.log('error', error));
  }


  React.useEffect(() => {

      loginQbit();
  
    const timer = setInterval(()=> getTorrentsQbit(), 9000)

    const unsubscribe = navigation.addListener('focus', () => {

      getTorrentsQbit()
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
  return (

    <View style={styles.container}>



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

              <Text style={styles.markdown}>↑ {item.uploaded} KB ↓ {item.downloaded} KB</Text>
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
