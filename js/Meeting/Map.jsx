import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Animated, Text, FlatList, Button, ImageBackground, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Main from '../Social/Main';
import Notes from './Notes';
import CreateAny from './CreateAny';
import FindMeeting from './FindMeeting';


export default function Map() {
  const [windowActive, setWindowActive] = useState(false);
  const [back, setBack] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const windowHeightAnimated = useRef(new Animated.Value(100)).current;
  const [showNotes, setShowNotes] = useState(false);
  const [homeLocation, setHomeLocation] = useState(null);
  const [none, setNone] = useState(false);
  const [create, setCreate] = useState(false);
  const [find, setFind] = useState(false);


  const mapRef = useRef(null);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    if (windowActive) {
      setMarkerPosition(coordinate);
      setWindowActive(false);
      Animated.timing(windowHeightAnimated, {
        toValue: 100,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      setHomeLocation(coordinate);
    }
  };

  const handleHomePress = () => {
    if (windowActive) {
      if (markerPosition) {
        const { latitude, longitude } = markerPosition;
        const region = {
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        mapRef.current.animateToRegion(region);
      }
    } else {
      mapRef.current.animateToRegion(homeLocation);
      setWindowActive(true);
    }
  };  

  const notes = [
    { id: '1', title: 'Note 1', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { id: '2', title: 'Note 2', body: 'Pellentesque euismod nisi ac metus pellentesque vestibulum.' },
  { id: '3', title: 'Note 3', body: 'Fusce ut lacinia dolor. Sed convallis massa quis metus lacinia, quis maximus enim accumsan.' },
  { id: '1', title: 'Note 1', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { id: '2', title: 'Note 2', body: 'Pellentesque euismod nisi ac metus pellentesque vestibulum.' },
  { id: '3', title: 'Note 3', body: 'Fusce ut lacinia dolor. Sed convallis masa quis metus lacinia quis maximus enim accumsan' },
  ];

  const meetings = [
    {id: '1', name: 'Meeting 1 about homework', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: require('../../assets/BGImg00.jpg') },
  ];
  
  const MeetingsItems = ({name, description, time, image}) => (
    <TouchableOpacity style={styles.meetingsContainer}>
      <View style={styles.meetingsImageContainer}>
        <Image source={image} style={styles.meetingsImage} />
      </View>
      <View style={styles.meetingsTextContainer}>
        <Text style={styles.meetingsName}>{name.length > 20 ? name.substring(0, 20) + "..." : name}</Text>
        <Text style={styles.meetingsDescription}>{description.length > 120 ? description.substring(0, 120) + "..." : description}</Text>
      </View>
    </TouchableOpacity>
  );

  const NotesItems = ({ title, body }) => (
    <TouchableOpacity style={styles.meetingsContainer2}>
      <View style={styles.meetingsTextContainer2}>
        <Text style={styles.meetingsName2}>{title.length > 10 ? title.substring(0, 10) + "..." : title}</Text>
        <Text style={styles.meetingsDescription2}>{body.length > 90 ? body.substring(0, 90) + "..." : body}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleWindowPress = () => {
    setWindowActive(!windowActive);
    Animated.timing(windowHeightAnimated, {
      toValue: windowActive ? 100 : 600,
      duration: 600,
      useNativeDriver: false,
    }).start();
  };

  const handleCreate = () => { setCreate(true); };
  const handleGoBack = () => { setBack(true); };
  const handleFind = () => { setFind(true); };

  useEffect(() => {
    if (markerPosition) {
      const timer = setTimeout(() => {
        setMarkerPosition(null);
        console.log('Marker has been deleted successfully!');
      }, 345600911);
      return () => clearTimeout(timer);
    }
  }, [markerPosition]);

  const handleShowNotes = () => { setShowNotes(true); };

  if (showNotes) { return <Notes />; };
  if (back) { return <Main />; };
  if (find) { return <FindMeeting />; };

  return (
    <>
      {create ? (
        <CreateAny />
      ) : (
        <View style={styles.container}>
          <MapView
              ref={mapRef}
              style={styles.map}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
          onPress={handleMapPress}
          >
            {homeLocation && (
              <Marker coordinate={homeLocation} />
            )}
          </MapView>
          <Animated.ScrollView
      style={[ styles.window, styles.windowActive, {
      height: windowHeightAnimated.interpolate({ inputRange: [130, 600], outputRange: [100, 600], }), }, ]}
          >
            <TouchableOpacity onPress={handleWindowPress} style={styles.buttonLine}>
              <View style={styles.theLine} />
              <View style={styles.buttons} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonHome} onPress={handleHomePress}>
              <Text style={styles.buttonTextHome}>Home Location</Text>
            </TouchableOpacity>
            <View style={styles.HR1} />
            <Text style={styles.text}>&gt; Notes to complete</Text>
            <View style={styles.noteContainer}>
              <FlatList 
                data={notes}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.meetingsItem}>
                    <NotesItems
                      title={item.title}
                      body={item.body}
                    />
                  </TouchableOpacity>
                )}
              />
            {none ? (
              <Text>There is no posts yet</Text>
            ) : null}
            </View>
            <TouchableOpacity onPress={handleShowNotes} style={styles.button}>
              <Text style={styles.buttonText}>Notes</Text>
            </TouchableOpacity>
            <View style={styles.HR1}></View>
            <ImageBackground style={styles.createContainer} source={require('../../assets/forest.jpg')}> 
              <Text style={styles.buttonText}>Create & Edit section!</Text>
              <TouchableOpacity style={styles.buttonCreate} onPress={handleCreate}>
                <Text style={styles.addText}>Create</Text>
              </TouchableOpacity>
            </ImageBackground>
            <View style={styles.HR1} />
            <Text style={styles.text}>&gt; Recent visited meeting</Text>
            <FlatList
              data={meetings}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.meetingsItem}>
                  <MeetingsItems
                    name={item.name}
                    description={item.description}
                    image={item.image}
                  />
                </TouchableOpacity>
              )}
            />
            {none ? (
              <Text>There is no posts yet</Text>
            ) : null}
            <TouchableOpacity style={styles.button} onPress={handleFind}>
              <Text style={styles.buttonText}>Find Meeting</Text>
            </TouchableOpacity>
            <View style={styles.HR1} />
            <View style={styles.hfhfh} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                <View style={styles.row}>
                  <Image source={require('../../assets/homeClose.png')} style={styles.closeImg} />
                  <Text style={styles.backText}>Go Back</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Animated.ScrollView>
        </View>
      )}
    </>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: windowWidth,
    height: windowHeight * 1.05,
  },
  window: {
    position: 'absolute',
    bottom: -20,
    width: windowWidth * 1.06,
    height: 30, 
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    zIndex: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  windowActive: {
    height: 30, 
  },
  theLine: {
    width: 150,
    height: 10,
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    right: windowWidth * .3,
    borderRadius: 15,
  },
  buttons: {
    marginTop: 30,
    width: 200, 
    height: 50,
    backgroundColor: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    backgroundColor: '#3F3F3F',
    paddingVertical: 15,
    alignItems: 'center',
    width: windowWidth * .6,
    borderRadius: 29,
    height: 60,
  },
  backText :{
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonLine: {
    marginBottom: -34,
  },
  taskButton: {
    flex: .9,
    height: 40,
    backgroundColor: '#2196F3',
    borderRadius: 9,
  },
  taskText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    paddingTop: 8,
  },
  taskContainer: {
    marginLeft: 10,
    width: windowWidth* .95,
    flexDirection: "row",
    alignItems: "center",
  },
  meetingItem: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    width: 250,
    marginRight: 5,
  },
  meetingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  meetingsImage: {
    width: 120,
    height: 191,
    borderRadius: 10,
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
  recommendedMeetingsContainer: {
    height: 310,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  recommendedMeetingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    width: 400,
    height: 40,
    backgroundColor: '#3f51b5',
    borderRadius: 9,
    marginLeft: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    paddingTop: 8,
  },
  HR1: {
    width: 390,
    height: .5,
    backgroundColor: 'black',
    marginTop: 5,
    textAlign: 'center',
    marginLeft: 10,
  },
  meetingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginLeft: 5,
    height: 190,
    marginBottom: 20,
    width: 400,
    backgroundColor: '#F7F8F8',
  },
  meetingsName: {
    position: 'absolute',
    top: -70,
    fontWeight: 'bold',
    fontSize: 16,
  },
  meetingsDescription: {
    fontSize:14,
    color: '#666',
    position :'absolute',
    top: -30,
    marginBottom: 5,
  },
  noteContainer: {
    height: 200,
    textAlign: 'center',
  },
  buttonHome: {
    width: 400,
    height: 60,
    backgroundColor: '#BADA55',
    borderRadius: 9,
    marginLeft: 5,
    paddingTop: 10,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonTextHome: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    paddingTop: 8, 
    fontSize: 17, 
    letterSpacing: 2,
  },
  meetingsContainer2: {
    height: 180,
    width: 200,
    marginLeft: 5,
    marginTop: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: '#F7F8F8',
  },
  meetingsTextContainer2: {
    flex: 1,
    justifyContent: 'center',
  },
  meetingsTextContainer: {
    width:200,
    fontSize: 16,
  },
  meetingsName2: {
    fontWeight: 'bold',
    fontSize: 16,
    position: 'absolute',
    top: 0,
  },
  meetingsDescription2: {
    fontSize: 14,
    marginTop: 5,
    color: '#666',
    position: 'absolute',
    top: 20,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 7,
  },
  hfhfh: {
    height: 30,
  },
  createContainer: {
    height: 140,
  },
  buttonCreate: {
    width: 170,
    height: 50,
    borderRadius: 100,
    backgroundColor: 'green',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  addText: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 70,
  },
  closeImg: {
    height: 30,
    width: 30,
    marginRight: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});