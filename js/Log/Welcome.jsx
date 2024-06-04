import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import Main from '../Social/Main';
import Log from './Log';
import { useFonts } from 'expo-font';


export default function Welcome() {
  const [screen, setScreen] = useState('home');

  const handleGetStarted = () => { setScreen('main'); };
  const handleShowLogScreen = () => { setScreen('log'); };

  let [fontsLoaded] = useFonts({
    'Mukta': require('../../fonts/Mukta.ttf'),
    'DancingScript': require('../../fonts/DancingScript.ttf'),
    'JosefinSansII': require('../../fonts/JosefinSans.ttf'),
  }); 

  if (!fontsLoaded) {
    return <View />;
  } else {
    return (
      <>
      {screen === 'home' && (
        <ImageBackground source={require("../../assets/BGImg05.jpg")} style={styles.container}> 
          <Text style={{ color: '#fff', fontFamily :'Mukta',
          fontSize: 23 }}>Welcome to</Text>
          <Text style={{ color: '#fff', fontFamily :'DancingScript',
          fontSize: 39 }}>GetTogetherGo</Text>
          <TouchableOpacity style={styles.buttonContainer} onPress={handleShowLogScreen}>
            <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center', fontFamily: 'JosefinSans' }}>Log for feathers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer1} onPress={handleGetStarted}>
            <Text style={{ color: '#3f51b5', fontSize: 18, textAlign: 'center', fontFamily: 'JosefinSans' }}>Get Started as guest</Text>
          </TouchableOpacity>
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>© 2023 Meeting App. Beta version</Text>
          </View>
        </ImageBackground>
      )}
      {screen === 'log' && <Log />}
      {screen === 'main' && <Main />}
      </>
    );
  }
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    width: windowWidth,
  },
  titleTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginTop: 0,
    marginBottom: 50,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 50,
  },
  buttonContainer: {
    backgroundColor: '#3f51b5',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
    width: 300,
    position: 'absolute',
    bottom: 40,
    marginBottom: 15,
  },
  buttonContainer1: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
    width: 300,
    position: 'absolute',
    bottom: 100,  
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#999',
  },
});