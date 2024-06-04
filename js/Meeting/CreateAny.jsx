import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import Map from './Map';
import Log from '../Log/Log';
import Create from './Create';
import CreateGroup from '../Social/GroupCreate';
import Profile from '../Social/Profile';
import Scroll from '../Social/Scroll';


export default function CreateAny() {
  const [selected, setSelected] = useState(null);

  if (selected === 'log') { return <Log />; };
  if (selected === 'profile') { return <Profile />; }
  if (selected === 'create') { return <Create />; }
  if (selected === 'group') { return <CreateGroup />; }
  if (selected === 'map') { return <Map />; };
  if (selected == 'post') { return <Scroll />; };

  return (
    <>
      <ImageBackground source={require('../../assets/forest.jpg')} style={styles.containerImage}>
        <TouchableOpacity style={styles.goBackButton} onPress={() => setSelected('map')}>
          <Text style={styles.goBackButtonText}>Go Back</Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <Text style={styles.text}>Unlimited Options! ✨</Text>
          <TouchableOpacity style={styles.buttonfirst} onPress={() => setSelected('log')}>
            <Text style={styles.buttonText}>Create an Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setSelected('create')}>
            <Text style={styles.buttonText}>Create New Meeting</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setSelected('group')}>
            <Text style={styles.buttonText}>Create a New Group</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setSelected('post')}>
            <Text style={styles.buttonText}>Create Account Post</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setSelected('profile')}>
            <Text style={styles.buttonText}>Edit your Profile</Text>
          </TouchableOpacity>
          <View style={styles.HR1} />
          <TouchableOpacity style={styles.helpButton}>
            <Text style={styles.helpButtonText}>REPORT A BUG</Text>
              <Text style={styles.text}>Contact developer for reports.</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text}>Tel: </Text> 
              <Text style={{color: 'red', fontWeight: 'bold'}}>Click here</Text>
            </View>

          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    height: 500,
    width: 300,
    marginLeft: 54,
    marginTop: 190,
  },
  text: {
    fontWeight: 'bold',
  },
  containerImage: {
    width: windowWidth,
    height: windowHeight * 1.07,
  },
  goBackButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    alignItems: 'center',
    width: 412,
    position: 'absolute',
    top: 0,
  },
  goBackButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#3f51b5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
    width: 250,
    marginBottom: 10,
  },
  buttonfirst: {
    backgroundColor: '#3f51b5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
    width: 250,
    marginBottom: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  HR1: {
    width: 200,
    height: .3,
    backgroundColor: 'black',
    marginTop: 5,
    textAlign: 'center',
    marginLeft: 10,
  },
  helpButton: {
    height: 105,
    width: 270,
    borderRadius: 6,
    marginTop: 30,
    borderColor: 'black',
    borderWidth: .3,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpButtonText: {
    color: '#3f51b5',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
