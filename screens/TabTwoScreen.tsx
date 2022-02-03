import React, { useState, useContext } from 'react';
import { StyleSheet, Image, TextInput, KeyboardAvoidingView, Button, Scrollview  } from 'react-native';
import AppContext from '../global/AppContext'
import { Switch } from 'react-native-paper';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import * as SecureStore from 'expo-secure-store';


async function save(key, value) {
      await SecureStore.setItemAsync(key, value);
}


async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
  } else {
    alert('No values stored under that key.');
  }
}


export default function TabTwoScreen({navigation}) {

  const userSettings:any = useContext(AppContext);

  const [key, onChangeKey] = React.useState('');
  const [value, onChangeValue] = React.useState('');
  const [host, setHost] = React.useState(userSettings.host);
  const [port, setPort] = React.useState(userSettings.port);
  const [ssl, setSsl] = React.useState();
  const [username, setUsername] = React.useState(userSettings.username);
  const [password, setPassword] = React.useState(userSettings.password);
  const [test, setTest] = React.useState('');



const testLogin = () => {


var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
    if(this.responseText == "Ok.") {
save('host', host);
save('port', port);
save('username', username);
save('passwordRes', password);
userSettings.setHost(host);
userSettings.setPort(port);
userSettings.setUsername(username);
userSettings.setPassword(password);
alert('Settings saved')
    } else {
      alert('Could not auth with server.')
    }
  }
});

xhr.open("GET", (userSettings.ssl == 'true' ? 'https://':'http://')+host+":"+port+"/api/v2/auth/login?username="+username+"&password="+password+"");
xhr.send();



}
  
  return (
    <View darkColor="black" style={styles.container}>
      <Image style={{width: 100, height: 100}} source={require('../assets/images/icon2.png')} />
<View style={{height: 20}} />
      <Text style={styles.title}>qBitRemote</Text>
      
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

<Button
        title="Host Settings"
        onPress={() => {
        navigation.navigate('HostScreen')
        }}
      />


      <EditScreenInfo path="/screens/TabTwoScreen.tsx" />



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
 input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
