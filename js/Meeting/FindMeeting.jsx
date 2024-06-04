import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, FlatList, Image, TextInput } from "react-native";
import Map from "./Map";
import Create from "./Create";
import Icon from 'react-native-vector-icons/FontAwesome';


export default function FindMeeting() {
  const [back, setBack] = useState(false);
  const [show, setShow] = useState(false);
  const [showAsk, setShowAsk] = useState(false);

  const handleGoBack = () => { setBack(true); };

  if (back) { return <Map />; };

  const meetings = [
    {id: '1', name: 'Meeting 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', time: '10:00 AM', image: require('../../assets/BGImg00.jpg') },
    {id: '2', name: 'Meeting 2', description: 'Pellentesque euismod nisi ac metus pellentesque vestibulum.', time: '2:00 PM', image: require('../../assets/forest.jpg') },
    {id: '3', name: 'Meeting 3', description: 'Fusce ut lacinia dolor. Sed convallis massa quis metus lacinia, quis maximus enim accumsan.', time: '4:30 PM', image: require('../../assets/BGImg02.png') },
    {id: '4', name: 'Meeting 4', description: 'Nullam vel ipsum pharetra, aliquam sapien ut, feugiat libero, Nullam vel ipsum pharetra, aliquam sapien ut, feugiat libero, Nullam vel ipsum pharetra, aliquam sapien ut, feugiat libero, Nullam vel ipsum pharetra, aliquam sapien ut, feugiat libero, Nullam vel ipsum pharetra, aliquam sapien ut, feugiat libero', time: '7:00 PM', image: require('../../assets/BGImg01.jpg') },
  ];

  const handleJoinMeeting = () => {
    setShow(true);

    setTimeout(() => {
      setShow(false);
    }, 2000);
  };

  const handleAskMeeting = () => {
    setShowAsk(true);

    setTimeout(() => {
      setShowAsk(false);
    }, 2000);
  };

  const MeetingsItems = ({name, description, time, image}) => (
    <TouchableOpacity style={styles.meetingsContainer}>
      <View style={styles.meetingsImageContainer}>
        <Image source={image} style={styles.meetingsImage} />
      </View>
      <View style={styles.meetingsTextContainer}>
        <View style={styles.row}>
          <Text style={styles.meetingsName}>{name.length > 10 ? name.substring(0, 10) + "..." : name} </Text>
          <Text style={styles.meetingsJoins}>| 972 Joins</Text>
        </View>
        <Text style={styles.meetingsDescription}>{description.length > 330 ? description.substring(0, 330) + "..." : description}</Text>
        <Text style={styles.meetingsTime}>{time} | Username</Text>
        <TouchableOpacity style={styles.buttonfirst} onPress={handleJoinMeeting}>
          <Text style={styles.buttonText}>Join Meeting</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonsecond} onPress={handleAskMeeting}>
          <Text style={styles.buttonText}>Ask question</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={handleGoBack}
      >
        <Text style={styles.backText}>Go Back!</Text>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search for meetings..."
          style={styles.input}
        />
        <View style={styles.HRvertical} />
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search" size={25} />
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>Reccomended meetings</Text>
      <View style={styles.HRverticalMini} />
      <TouchableOpacity style={styles.filterButton}>
        <Text style={{ color: '#3f51b5' }}>Filter</Text>
      </TouchableOpacity>
      <View style={styles.HR1} / >
      <FlatList 
        data={meetings}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.meetingsItem}>
            <MeetingsItems
              name={item.name}
              description={item.description}
              time={item.time}
              image={item.image}
            />
          </TouchableOpacity>
        )}
      />
      <View style={styles.HR1} />
      {show ? (
        <View style={styles.modalContainer}>
          <Text style={styles.buttonText}>You have been joint the meeting successfully</Text>
        </View>
      ) : null}
      {showAsk ? (
        <View style={styles.modalContainer}>
          <Text style={styles.buttonText}>You have been asked question successfully</Text>
        </View>
      ) : null}
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    width: windowWidth * .95,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: 20,
    borderColor: 'black',
    borderWidth: .5,
    marginBottom: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  searchButton: {
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
  },
  HRvertical: {
    width: .3,
    height: 30,
    backgroundColor: 'black',
  },
  backButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    alignItems: 'center',
    width: windowWidth * 1.05,
    marginTop: -0,
  },
  backText :{
    color: 'white',
    fontWeight: 'bold',
  },
  meetingItem: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    width: 300,
    marginRight: 5,
    height: windowHeight * .3,
  },
  meetingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  meetingsImage: {
    width: 160,
    height: windowHeight * .6,
    borderRadius: 8,
    marginRight: 10,
    marginLeft: -11,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  meetingDescription: {
    width: 10,
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  meetingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginLeft: 30,
    height: windowHeight * .6,
    marginBottom: 0,
    width: 370,
    backgroundColor: '#F7F8F8',
  },
  meetingsName: {
    position: 'absolute',
    bottom: 220,
    fontWeight: 'bold',
    fontSize: 16,
  },
  meetingsDescription: {
    fontSize:14,
    color: '#666',
    marginBottom: 5,
    width: 180,
    position: 'absolute',
    top: -170,
  },
  meetingsTime: {
    fontSize: 12,
    color: '#999',
    position: 'absolute',
    bottom: 190,
    left: 7,
  },
  text: {
    fontWeight: 'bold',
    marginLeft: 40,
    marginTop: 10,
  },
  HR1: {
    width: windowWidth * .9,
    height: .3,
    backgroundColor: 'black',
    textAlign: 'center',
    marginLeft: 23,
    marginTop: 20,
  },
  buttonfirst: {
    backgroundColor: '#3f51b5',
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
    width: 180,
    position: 'absolute',
    marginBottom: 10,
    top: 200,
  },
  buttonsecond: {
    backgroundColor: '#3f51b5',
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
    width: 180,
    position: 'absolute',
    marginBottom: 10,
    top: 160,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    width: windowWidth * 1.05,
    height: 30,
    backgroundColor: '#3f51b5',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0
  },
  filterButton:{
    position:'absolute',
    right:50,
    top: 125,
  },
  HRverticalMini: {
    height: 20,
    width: .9,
    backgroundColor: 'black',
    position: 'absolute',
    right: 100,
    top: 127,
  },
  row: {
    flexDirection: 'row',
  },
  meetingsJoins:{
    position: 'absolute',
    bottom: 220,
    left: 90,
  },
});