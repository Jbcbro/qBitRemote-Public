import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../global/AppContext'

import { ScrollView, StyleSheet, TouchableOpacity, Button, Vibration, Alert } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function InfoScreen({ route, navigation }) {
  const { data } = route.params;
  const userSettings: any = useContext(AppContext);


  const deleteTorrent = () => {
    Alert.alert(
      "Delete Torrent?",
      data.name,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "DELETE", onPress: () => {

            var requestOptions = {
              method: 'GET',
              redirect: 'follow'
            };

            fetch((userSettings.ssl == 'true' ? 'https://':'http://')+ userSettings.host + ":" + userSettings.port + "/api/v2/torrents/delete?hashes=" + data.hash + "&deleteFiles=true", requestOptions)
              .then(response => response.text())
              .then(result => console.log(result)).then(() => navigation.goBack())
              .catch(error => console.log('error', error));
            Vibration.vibrate()



          }
        }
      ]
    );
  }
  const pauseTorrent = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch((userSettings.ssl == 'true' ? 'https://':'http://')+ userSettings.host + ":" + userSettings.port + "/api/v2/torrents/pause?hashes=" + data.hash + "", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    Vibration.vibrate()

  }
  const recheckTorrent = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch((userSettings.ssl == 'true' ? 'https://':'http://')+ userSettings.host + ":" + userSettings.port + "/api/v2/torrents/recheck?hashes=" + data.hash + "", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    Vibration.vibrate()

  }
  const resumeTorrent = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch((userSettings.ssl == 'true' ? 'https://':'http://')+ userSettings.host + ":" + userSettings.port + "/api/v2/torrents/resume?hashes=" + data.hash + "", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    Vibration.vibrate()

  }
  const moveTorrents = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch((userSettings.ssl == 'true' ? 'https://':'http://')+ userSettings.host + ":" + userSettings.port + "/api/v2/torrents/resume?hashes=" + data.hash + "", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result)).then(() => navigation.goBack())
      .catch(error => console.log('error', error));
    Vibration.vibrate()

  }

  return (

    <ScrollView>
      <View style={{ marginTop: 25 }} />

      <Text style={styles.info}>CONTROLS</Text>
      <View darkColor="#1c1c1c" style={styles.cards}>
        <Button
          title="Pause Torrent"
          onPress={() => pauseTorrent()}
        />


        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <Button
          title="Resume Torrent"
          onPress={() => resumeTorrent()}
        />

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <Button
          title="Force Recheck"
          onPress={() => recheckTorrent()}
        />


        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Button
          color="red"
          title="Delete Torrent"
          onPress={() => deleteTorrent()}
        />

      </View>

      <Text style={styles.info}>BASIC INFO</Text>
      <View darkColor="#1c1c1c" style={styles.cards}>
        <View darkColor="rgba(255,255,255,0)" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.getStartedText}>Name</Text>
          <Text style={styles.data} >{data.name} </Text>
        </View>

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <View darkColor="rgba(255,255,255,0)" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.getStartedText}>State</Text>
          <Text style={styles.data} >{data.state} </Text>
        </View>

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />


        <View darkColor="rgba(255,255,255,0)" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.getStartedText}>Size</Text>
          <Text style={styles.data} >{Math.round(data.total_size / (1024 * 1024 * 1024) * 100) / 100} GB </Text>
        </View>

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <View darkColor="rgba(255,255,255,0)" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.getStartedText}>Seeds</Text>
          <Text style={styles.data} >{data.num_complete}</Text>
        </View>

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <View darkColor="rgba(255,255,255,0)" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.getStartedText}>Category</Text>
          <Text style={styles.data} >{data.category}</Text>
        </View>

      </View>



      <Text style={styles.info}>DOWNLOAD INFO</Text>
      <View darkColor="#1c1c1c" style={styles.cards}>
        <View darkColor="rgba(255,255,255,0)" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.getStartedText}>Downloaded</Text>
          <Text style={styles.data} >{Math.round(data.downloaded / (1024 * 1024 * 1024) * 100) / 100} GB </Text>
        </View>

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <View darkColor="rgba(255,255,255,0)" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.getStartedText}>Uploaded</Text>
          <Text style={styles.data} >{Math.round(data.uploaded / (1024 * 1024 * 1024) * 100) / 100} GB  </Text>
        </View>

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />


        <View darkColor="rgba(255,255,255,0)" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.getStartedText}>Ratio</Text>
          <Text style={styles.data} >{Math.round(data.ratio * 100) / 100}</Text>
        </View>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />


        <View darkColor="rgba(255,255,255,0)" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.getStartedText}>Seeding Time</Text>
          <Text style={styles.data} >{new Date(data.seeding_time * 1000).toISOString().substr(11, 8)}</Text>
        </View>
      </View>


      <Text style={styles.info}>STORAGE INFO</Text>
      <View darkColor="#1c1c1c" style={styles.cards}>
        <View darkColor="rgba(255,255,255,0)" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.getStartedText}>Path</Text>
          <Text style={styles.data} >{data.save_path}</Text>
        </View>



      </View>






      <Text style={styles.info}>TRACKER INFO</Text>
      <View darkColor="#1c1c1c" style={styles.cards}>
        <View darkColor="rgba(255,255,255,0)" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.getStartedText}>Tracker</Text>
          <Text style={styles.data} >{data.tracker} </Text>
        </View>

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />



        <View darkColor="rgba(255,255,255,0)" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.getStartedText}>Count</Text>
          <Text style={styles.data} >{data.trackers_count}</Text>
        </View>

      </View>



      <View style={{ margin: 30 }} />
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#1E6738',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  loginText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 10
  },
  cards: {
    margin: 20,
    marginTop: 5,
    padding: 10,
    borderRadius: 15,

  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
  },
  info: {
    fontSize: 13,
    lineHeight: 24,
    marginLeft: 30,
    fontWeight: '400'
  },
  data: {
    color: 'grey',
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'right',
    flex: 1,
    flexWrap: 'wrap'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '100%',
  },
});
