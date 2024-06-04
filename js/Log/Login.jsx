import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Dimensions, Alert } from "react-native";
import Signup from "./Signup";
import Main from "../Social/Main";
import Chat from "../Social/Chat";
import { useFonts } from "expo-font";
import * as SQLite from 'expo-sqlite';


export default function Login({ updateScreen }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isInsultWordDetected, setIsInsultWordDetected] = useState(false);
  const [screen, setScreen] = useState('home');

  const db = SQLite.openDatabase('users.db');

  const insultWords = [ 
    "sex", "fuck", "bitch", "ass", "porn", "dick", "vagina", "bastard", "whore", "shit", "cock", "cunt", "penis", "boobs", "pussy", "motherfucker", "idiot", "stupid", "moron", "jackass", "dumbass", "dipshit", "bullshit", "asshole", "damn", "jerk" 
  ];

  const handleInputChange = (text) => {
    setUsername(text);
    const space = text.replace(/\s+/g, '');
    setUsername(space);

    const insultWordFound = insultWords.some((insult) =>
      text.toLowerCase().includes(insult)
    );

    setIsInsultWordDetected(insultWordFound);
  };

  const handlePassword = (text) => { setPassword(text); };

  const [fontsLoaded] = useFonts({
    "DancingScript": require('../../fonts/DancingScript.ttf'),
    "Pacifico": require('../../fonts/Pacifico.ttf'),
    "Mukta": require('../../fonts/Mukta.ttf'),
  });

  const handleSignup = () => { setScreen('signup'); };

  const handleExplore = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT id FROM users WHERE username = ? AND password = ?',
        [username, password],
        (_, { rows }) => {
          if (rows.length > 0) {
            const userId = rows.item(0).id;
            updateScreen('explore', userId);
            Alert.alert('Successfully logged in!', `Logged into ${username}`);
          } else {
            Alert.alert('Login Failed', 'Invalid username or password');
          }
        },
        (_, error) => {
          console.log('Error executing SQL:', error);
        }
      );
    });
  };
  

  if (!fontsLoaded) {
    return <View />;
  } else {
    return (
      <>
        {screen === 'home' && (
          <ImageBackground source={require('../../assets/BGImg05.jpg')} style={styles.imageContainer}>
          <Text style={styles.subtitle}>Meet {'\n'} Create {'\n'} Join {'\n'} Find {'\n'} Discover {'\n'} Celebrate {'\n'} Chat {'\n'} Explore {'\n'} Connect {'\n'} Collaborate {'\n'} Share {'\n'} Learn {'\n'} Inspire {'\n'} Grow {'\n'} Support {'\n'} Motivate {'\n'} Discover {'\n'} Meet {'\n'} Create {'\n'} Achieve {'\n'} Impact {'\n'} Connect {'\n'} Collaborate</Text>
            <View style={{
              width: windowWidth,
              height: windowHeight * .5,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 24,
              backgroundColor: "#fff",
              resizeMode: 'cover',
              elevation: 10,
            }}>
              <Text style={{ fontSize: 21, color: '#333', textAlign: 'center', marginBottom: 10, fontFamily: 'Pacifico' }}>Welcome back!</Text>
              <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 24, color: '#000', width: 300, fontFamily: 'Mukta'}}>Please enter your username/email while then password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter an account username"
                keyboardType="default"
                autoCapitalize="none"
                maxLength={20}
                onChangeText={handleInputChange}
                value={username}
              />
              {isInsultWordDetected ? (
                <Text style={styles.warningText}>Insult words are not allowed</Text>
              ) : null}
              <TextInput
                style={styles.input}
                maxLength={120}
                placeholder="Enter an account password"
                secureTextEntry={true}
                value={password}
                autoCapitalize="none"
                onChangeText={handlePassword}
              />
              <TouchableOpacity
                style={[
                  styles.buttonContainer,
                  isInsultWordDetected ? styles.buttonContainerDisabled : null
                ]}
                disabled={isInsultWordDetected}
                onPress={handleExplore}
              >
                <Text style={styles.buttonText}>Explore!</Text>
              </TouchableOpacity>
              <Text style={styles.linkText} onPress={handleSignup}>New account? Signup!</Text>
              <Text style={styles.safeText}>Your privacy is safe with us.</Text>
            </View>
          </ImageBackground>
        )}
        {screen === 'explore' && <Main userId={userId} />}
        {screen === 'signup' && <Signup />}
      </>
    );
  }
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  safeText: {
    fontSize: 11,
    position: 'absolute',
    bottom: 0,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    color: '#000',
    fontWeight: 'bold',
    width: 300,
  },
  subtitle: {
    fontSize: 50,
    position: 'absolute',
    top: -100,
    width: 350,
    left: 10,
    paddingLeft: 20,
    color: '#fff',
    opacity: .1,
    fontWeight: 'bold',
    padding: 20,
    borderRadius: 12,
  },
  input: {
    width: 260,
    height: 40,
    borderColor: "#000",
    borderWidth: .2,
    borderRadius: 2,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff'
  },
  buttonContainer: {
    backgroundColor: "#3f51b5",
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 8,
    width: 230,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 0,
    letterSpacing: 2,
  },
  linkText: {
    color: "#000",
    fontSize: 16,
    marginTop: 0,
    fontWeight: 'bold',
  },
  warningText: {
    color: 'red',
  },
  imageContainer: {
    width: windowWidth,
    height: windowHeight * 1.07,
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
});