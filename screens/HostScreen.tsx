import React, { useState, useContext } from 'react';
import { StyleSheet, Image, TextInput, KeyboardAvoidingView, Button, ScrollView, Switch  } from 'react-native';
import AppContext from '../global/AppContext'


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


export default function HostScreen() {

  const userSettings:any = useContext(AppContext);

  const [key, onChangeKey] = React.useState('');
  const [value, onChangeValue] = React.useState('');
  const [host, setHost] = React.useState(userSettings.host);
  const [port, setPort] = React.useState(userSettings.port);
  const [ssl, setSsl] = React.useState();
  const [username, setUsername] = React.useState(userSettings.username);
  const [password, setPassword] = React.useState(userSettings.password);
  const [test, setTest] = React.useState('');
  const [isSwitchOn, setIsSwitchOn] = React.useState(userSettings.ssl == 'true' ? true : false);
  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn)

  }


const testLogin = () => {

save('ssl', isSwitchOn.toString());
userSettings.setSsl(isSwitchOn.toString());

var data = new FormData();
data.append("username", username);
data.append("password", password);

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
save('ssl', isSwitchOn.toString());


userSettings.setHost(host);
userSettings.setPort(port);
userSettings.setUsername(username);
userSettings.setPassword(password);
userSettings.setSsl(isSwitchOn.toString());

alert('Settings saved')
    } else {
      alert('Could not auth with server.')
    }
  }
});
console.log((isSwitchOn ? 'https://':'http://')+host+":"+port+"/api/v2/auth/login")
xhr.open("POST",(isSwitchOn ? 'https://':'http://')+host+":"+port+"/api/v2/auth/login");
xhr.send(data);

console.log(isSwitchOn)

}
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.info}>NAME</Text>
  
      <View  darkColor="#1c1c1c" style={styles.cards}>
      <View darkColor="rgba(255,255,255,0)" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  <View darkColor="rgba(255,255,255,0)" style={styles.leftContainer}>
          
          <Text style={styles.getStartedText}>Nick name</Text>
        </View>

  <View darkColor="rgba(255,255,255,0)" style={styles.rightContainer}>

                   <TextInput
                   
      placeholder={"Server Name?"}

        style={styles.input}
        onChangeText={setHost}
        value={host}
      />
        </View>

        </View>
</View>


      <Text style={styles.info}>qBitTorrent CREDENTIALS</Text>

      <View darkColor="#1c1c1c" style={styles.cards}>



<View darkColor="rgba(255,255,255,0)" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  <View darkColor="rgba(255,255,255,0)" style={styles.leftContainer}>

          <Text style={styles.getStartedText}>Host</Text>
        </View>

  <View darkColor="rgba(255,255,255,0)" style={styles.rightContainer}>

           <TextInput
           
      placeholder={"Host qBittorrent"}

        style={styles.input}
        onChangeText={setHost}
        value={host}
      />
        </View>
       
        </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />


<View darkColor="rgba(255,255,255,0)" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  <View darkColor="rgba(255,255,255,0)" style={styles.leftContainer}>

          <Text style={styles.getStartedText}>Port</Text>
        </View>

  <View darkColor="rgba(255,255,255,0)" style={styles.rightContainer}>

      <TextInput
      placeholder={"Port of qBittorrent WebUI"}
        style={styles.input}
        onChangeText={setPort}
        value={port}
      />
        </View>
       
        </View>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

<View darkColor="rgba(255,255,255,0)" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.getStartedText}>SSL Enabled</Text>
         <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

<View darkColor="rgba(255,255,255,0)" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  <View darkColor="rgba(255,255,255,0)" style={styles.leftContainer}>

          <Text style={styles.getStartedText}>Username</Text>
          </View>
  <View  darkColor="rgba(255,255,255,0)" style={styles.rightContainer}>

      <TextInput
      placeholder={"Enter Username"}

        style={styles.input}
        onChangeText={setUsername}
        value={username}
      />
        </View>
       
        </View>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />


<View darkColor="rgba(255,255,255,0)" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  <View darkColor="rgba(255,255,255,0)" style={styles.leftContainer}>

          <Text style={styles.getStartedText}>Password</Text>
          </View>

           <View darkColor="rgba(255,255,255,0)" style={styles.rightContainer}>
 
      <TextInput
      placeholder={"Enter Password"}

        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
        </View>
       
        </View>
</View>




<Text style={{textAlign: 'center'}}>Reguest are sent as "SSL+HOST+':'+PORT"/</Text>
<Text style={{textAlign: 'center'}}>For relative path add after port without '/' at end</Text>


<Button
        title="Save"
        onPress={() => {
        testLogin();
        }}
      />



    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    },
      getStartedText: {
    fontSize: 17,
    lineHeight: 24,
  },
    getStartedText: {
    fontSize: 17,
    lineHeight: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
 input: {
 width: '100%',
 textAlign: 'right'
  },
   leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',

  },
   rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',

  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '100%',

  },
   data: {
    color: 'grey',
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'right',
    flex: 1,
    flexWrap: 'wrap'
  },
  cards: {
    margin: 20,
    marginTop: 5,
    padding: 10,
    borderRadius: 15,

  },
    info: {
    fontSize: 13,
    lineHeight: 24,
    marginLeft: 30,
    fontWeight: '400'
  }
});
