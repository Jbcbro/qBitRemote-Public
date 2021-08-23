import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../global/AppContext'

import { StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

export default function EditScreenInfo({ path }: { path: string }) {
  const userSettings: any = useContext(AppContext);

  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
         A React Native project by JBCBRO, enables remote control of qBittorrent v4.5 + webui.
         The current version is
         

        </Text>

        <View
          style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
          darkColor="rgba(255,255,255,0.05)"
          lightColor="rgba(0,0,0,0.05)">
          <MonoText>qBitRemote v. 1 </MonoText>
        </View>

      
      </View>

      <View style={styles.helpContainer}>
        <TouchableOpacity style={styles.helpLink}>
          <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>{userSettings.host}</Text>
          <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>{userSettings.port}</Text>
          <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>{userSettings.username}</Text>
          

        </TouchableOpacity>
      </View>
    </View>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet'
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
