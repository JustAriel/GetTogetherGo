import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import Map from '../Meeting/Map';
import Chat from './Chat';
import Scroll from './Scroll';
import Log from '../Log/Log';
import * as SQLite from 'expo-sqlite';
import { useFonts } from 'expo-font';

const db = SQLite.openDatabase('users.db');

export default function Main({ route }) {
  const [mapScreen, setMapScreen] = useState(false);
  const [chatScreen, setChatScreen] = useState(false);
  const [scrollScreen, setScrollScreen] = useState(false);
  const [log, setLog] = useState(false);

  const { username } = route.params;

  const handleShowChatScreen = () => { setChatScreen(true); };
  const handleShowMapScreen = () => { setMapScreen(true); };
  const handleShowScrollScreen = () => { setScrollScreen(true)};
  const handleLog = () => { setLog(true); };

  const [fontsLoaded] = useFonts({
    "DancingScript": require('../../fonts/DancingScript.ttf'),
    "Pacifico": require('../../fonts/Pacifico.ttf'),
  })

  if (chatScreen) {
    return <Chat />;
  } else if (mapScreen) {
    return <Map />;
  } else if (scrollScreen) {
    return <Scroll />;
  } else if (log) {
    return <Log />;
  }

  if (!fontsLoaded) {
    return <View />;
  } else {
    return (
      <View style={styles.container}>
      <View>
        <Text style={{ fontFamily: 'Pacifico', position: 'absolute', top: -150,
        left: -160, fontSize: 35, }}>Welcome, </Text>
        <Text style={{ fontFamily: 'DancingScript', position: 'absolute', top: -120,
        left: -90, fontSize: 65, }}>{username ? username : 'Guest'}!</Text>
      </View>
        <View style={styles.activeContainer}>
          <TouchableOpacity style={styles.buttonImage}>
            <Image style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonImage}>
            <Image style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonImage}>
            <Image style={styles.image} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleShowMapScreen}>
          <Image style={styles.buttonIcon} source={require('../../assets/world.jpg')} />
          <View style={styles.buttonTextContainer}>
            <Text style={styles.buttonTitle}>Meetings Map</Text>
            <Text style={styles.buttonSubtitle}>Connect with others by</Text>
            <Text style={styles.buttonSubtitle}>finding new friends!</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleShowChatScreen}>
          <Image style={styles.buttonIcon} source={require('../../assets/chat.png')} />
          <View style={styles.buttonTextContainer}>
            <Text style={styles.buttonTitle}>Chat Screen</Text>
            <Text style={styles.buttonSubtitle}>Find and communicate</Text>
            <Text style={styles.buttonSubtitle}> with others by chatting!</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.button} onPress={handleShowScrollScreen}>
          <Image style={styles.buttonIcon2} source={require('../../assets/travellogo.jpg')} />
          <View style={styles.buttonTextContainer}>
            <Text style={styles.buttonTitle}>Posts Screen</Text>
            <Text style={styles.buttonSubtitle}>Scroll and watch new</Text>
            <Text style={styles.buttonSubtitle}>post events around you!</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.separatorLog} />
        <TouchableOpacity style={styles.logButton} onPress={handleLog}>
          <Text style={styles.logTitle}>Log in to access all app features</Text>
          <Text style={styles.logDescription}>
            Once you've registered, you'll be able to participate in meetings and create your own.
            Our system is designed with user security in mind.
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
};


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 10,
    borderWidth: .7,
    padding: 10,
    borderRadius: 8,
    width: 270,
  },
  buttonIcon: {
    width: 60,
    height: 60,
    marginRight: 16,
    backgroundColor: '#EFEFEF',
    borderRadius: 15,
  },
  buttonIcon2: {
    width: 65,
    height: 65,
    marginRight: 16,
    backgroundColor: '#EFEFEF',
    borderRadius: 15,
  },
  buttonTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  buttonSubtitle: {
    fontSize: 14,
    color: '#777777',
  },
  separator: {
    height: .3,
    width: 300,
    backgroundColor: '#CCCCCC',
    marginVertical: 10,
  },
  extraButtonTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  logButton: {
    position: 'absolute',
    bottom: 20,
    borderColor: '#3f51b5',
    borderWidth: .2,
    width: windowWidth * .9,
    height: 110,
    borderRadius: 6,
    padding: 12,
    backgroundColor: '#F9F9F9'
  },
  logTitle: {
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  logDescription: {
    fontSize: 13,
  },
  separatorLog: {
    width: windowWidth * .95,
    height: .3,
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 150,
  },
});