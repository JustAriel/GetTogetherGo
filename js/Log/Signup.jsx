import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import Login from "./Login";
import Main from "../Social/Main";
import { Dimensions } from "react-native";
import { useFonts } from "expo-font";
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';

export default function Signup({ userId }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [screen, setScreen] = useState('home');
  const [isSignedUp, setIsSignedUp] = useState(false);

  const db = SQLite.openDatabase('users.db');
  const navigation = useNavigation();

  const handleExplore = async () => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT COUNT(*) FROM users WHERE username = ?",
        [username],
        (_, result) => {
          const count = result.rows.item(0)['COUNT(*)'];
          if (count > 0) {
            alert('Username already exists. Please choose a different username.');
          } else {
            tx.executeSql(
              "INSERT INTO users (username, password) VALUES (?, ?)",
              [username, password],
              (_, insertResult) => {
                if (insertResult.rowsAffected > 0) {
                  alert(`${username} added to the table`);
                  setScreen('explore');
                  setIsSignedUp(true);
                  navigation.navigate('Main', { username: username }); // navigate to Main screen with username prop
                }
              },
              (_, error) => {
                console.log('Error executing SQL: ', error);
              }
            );
          }
        },
        (_, error) => {
          console.log('Error executing SQL: ', error);
        }
      );
    });
  };
  
  const handleLogin = () => { 
    setScreen('login');
    setIsSignedUp(false);
  };

  const [fontsLoaded] = useFonts({
    'Pacifico': require('../../fonts/Pacifico.ttf'),
    "Mukta": require('../../fonts/Mukta.ttf'),
  });

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, username TEXT UNIQUE, password TEXT);'
      );
    });
  }, []);   

  if (!fontsLoaded) {
    return <View />;
  } else {
    return (
      <>
        {screen === 'home' && (
          <ImageBackground source={require('../../assets/BGImg05.jpg')} style={styles.imageBackground}>
          <Text style={styles.subtitle}>Meet {'\n'} Create {'\n'} Join {'\n'} Find {'\n'} Discover {'\n'} Celebrate {'\n'} Chat {'\n'} Explore {'\n'} Connect {'\n'} Collaborate {'\n'} Share {'\n'} Learn {'\n'} Inspire {'\n'} Grow {'\n'} Support {'\n'} Motivate {'\n'} Discover {'\n'} Meet {'\n'} Create {'\n'} Achieve {'\n'} Impact {'\n'} Connect {'\n'} Collaborate</Text>
            <View style={styles.container}>
              <Text style={{ fontSize: 21, color: '#333', textAlign: 'center', marginBottom: 10, fontFamily: 'Pacifico'}}>Happy Comeback!</Text>
              <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 24, color: '#000', width: 280, fontFamily: 'Mukta'}}>Please enter your username/email and password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter an account username"
                keyboardType="default"
                maxLength={20}
                value={username}
                onChangeText={text => setUsername(text)}
              />
              <TextInput
                style={styles.input}
                maxLength={120}
                placeholder="Enter an account password"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
              />
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleExplore}
              >
                <Text style={styles.buttonText}>Explore!</Text>
              </TouchableOpacity>
              <Text style={styles.linkText} onPress={handleLogin}>Have account? Login!</Text>
              <Text style={styles.safeText}>Your privacy is safe with us.</Text>
            </View>
          </ImageBackground>
        )}
        {screen === 'explore' && <Main userId={userId} username={username} />}
        {screen === 'login' && <Login />}
      </>
    );
  }
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight * .5,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#fff",
    resizeMode: 'cover',
  },
  subtitle: {
    fontSize: 16,
    color: 'black',
    textAlign: "center",
    marginBottom: 24,
    fontWeight: 'bold',
    width: 300,
  },
  input: {
    width: 260,
    height: 40,
    borderColor: "#000",
    borderWidth: .2,
    borderRadius: 2,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
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
    marginLeft: 10,
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
  imageBackground: {
    width: windowWidth * 1.05,
    height: windowHeight * 1.07,
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeText: {
    fontSize: 11,
    position: 'absolute',
    bottom: 0,
  },
});