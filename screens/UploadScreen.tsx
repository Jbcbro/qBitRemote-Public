import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useContext } from 'react'
import AppContext from '../global/AppContext'

import { Text, View } from '../components/Themed';
import EditScreenInfo from '../components/EditScreenInfo';

import { StyleSheet, TouchableOpacity, TextInput, Clipboard, Button, ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../types';

export default function UploadScreen({
  navigation,
}) {
  const userSettings:any = useContext(AppContext);


  const [text, onChangeText] = React.useState("");

  const login = () => {

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(userSettings.ssl == 'true' ? 'https://':'http://'+userSettings.host+":"+userSettings.port+"/api/v2/auth/login?username="+userSettings.username+"&password="+userSettings.password+"", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }



  const addTorrent = async () => {
    const texts = await Clipboard.getString()
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(userSettings.ssl == 'true' ? 'https://':'http://'+userSettings.host+":"+userSettings.port+"/api/v2/auth/login?username="+userSettings.username+"&password="+userSettings.password+"", requestOptions)
      .then(response => response.text())
      .catch(error => console.log('error', error));


    var myHeaders = new Headers();

    var formdata = new FormData();
    formdata.append("urls", texts);

    var requestOptions = {
      method: 'POST',
      body: formdata,
    };

    fetch(userSettings.ssl == 'true' ? 'https://':'http://'+userSettings.host+":"+userSettings.port+"/api/v2/torrents/add", requestOptions)
      .then(response => response.text())
      .then(result => check(result))
      .catch(error => console.log('error', error));
  }
  const check = (res: any) => {
    if (res == 'Ok.') {
      navigation.goBack()
    } else {
     
    }
  }

  const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
   
    console.log(result);
    var data = new FormData();
    data.append("torrents", result, result.uri);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
        check(this.responseText);
      }
    });

    xhr.open("POST", userSettings.ssl == 'true' ? 'https://':'http://'+userSettings.host+":"+userSettings.port+"/api/v2/torrents/add");

    xhr.send(data);
  }

  return (
    <ScrollView style={styles.container}>
      

      <View darkColor="#1c1c1c" style={styles.cards}>
        <Button
          title='Add Torrent (Clipboard)'
          onPress={() => addTorrent()}
        />


        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <Button
          title='Add Torrent File'
          onPress={() => _pickDocument()}
        />







  


      </View>


 








  









    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  upload: {

    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(248, 249, 254, 0.1)',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'grey',
    borderRadius: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: '100%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  smallText: {
    fontSize: 14,
    marginTop: 5
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
  separator: {
    marginVertical: 10,
    height: 1,
    width: '100%',
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
    marginTop: 15,
    padding: 10,
    borderRadius: 15,

  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
  },
});
