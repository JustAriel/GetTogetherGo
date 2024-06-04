import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, FlatList, Image, ScrollView, Button, Dimensions } from "react-native";
import Main from "./Main";
import Create from '../Meeting/Create';
import Profile from './Profile';
import GroupCreate from "./GroupCreate";

export default function Chat() {
  const [back, setBack] = useState(false); 
  const [meetingCreate, setMeetingCreate] = useState(false);
  const [profile, setProfile] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]); 
  const [groupScreen, setGroupScreen] = useState(false);
  const [groups, setGroups] = useState([]);

  const [recPeople, setRecPeople] = useState([
    { id: 1, name: "JustJohny!", subscribers: '111K', profilePicture: require('../../assets/pixelBG1.jpg') },
    { id: 2, name: "Ghost666", subscribers: 97, profilePicture: require('../../assets/profile.png') },
    { id: 3, name: "Metlz Off.", subscribers: '1.2M', profilePicture: require('../../assets/BGImg01.jpg') },
    { id: 4, name: ".f1rst-", subscribers: 372, profilePicture: require('../../assets/image2.jpg') },
    { id: 5, name: "No_name", subscribers: 2, profilePicture: require('../../assets/BGImg00.jpg') },
    { id: 6, name: "Walpappers", subscribers: '34,9K', profilePicture: require('../../assets/BGImg02.png') },
    { id: 7, name: "Cube studio", subscribers: 986, profilePicture: require('../../assets/image1.jpg') },
    { id: 8, name: "user65", subscribers: 1, profilePicture: require('../../assets/profle.webp') }, ]);
    
    const shuffleArray = (array) => {
      let currentIndex = array.length;
      let temporaryValue, randomIndex;
      
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    
    return array;
  }
  
  useEffect(() => {
    setRecPeople(shuffleArray(recPeople));
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  
    if (query.trim() === "") {
      setSearchResults(recMeetings);
    } else {
      const filterResult = recMeetings.filter(meeting =>
        meeting.title.toLowerCase().includes(query.toLowerCase())
      );
  
      setSearchResults(filterResult);
    }
  };    

  const recGroups = [
    { id: 1, groupName: 'Fitness Buddies', groupImage: require('../../assets/BGImg01.jpg'), members: 120 },
    { id: 2, groupName: 'Language Exchange', groupImage: require('../../assets/BGImg01.jpg'), members: 98 },
    { id: 3, groupName: 'Cooking Enthusiasts', groupImage: require('../../assets/BGImg01.jpg'), members: 230 },
    { id: 4, groupName: 'Hiking & Outdoors', groupImage: require('../../assets/BGImg01.jpg'), members: 75 },
    { id: 5, groupName: 'Photography Lovers', groupImage: require('../../assets/BGImg01.jpg'), members: 145 },
  ];

  const recMeetings = [
    { id: 1, title: 'Meeting Cars', description: 'Drift, Burnout, street races!', time: '10:00 AM', image: require('../../assets/BGImg03.jpg') },
    { id: 2, title: 'School Meetup', description: 'Parents must be there!', time: '11:30 AM', image: require('../../assets/BGImg03.jpg') },
    { id: 3, title: 'Team Meeting', description: 'Practicing before the games.', time: '2:00 PM', image: require('../../assets/BGImg03.jpg') },
    { id: 4, title: 'Project Update', description: 'App update meeting.', time: '3:45 PM', image: require('../../assets/BGImg03.jpg') },
    { id: 5, title: 'Client Discussion', description: 'Helping with depression', time: '9:30 AM', image: require('../../assets/BGImg03.jpg') },
    { id: 6, title: 'Brainstorming Session', description: 'New bissines Brainstorming Session', time: '1:15 PM', image: require('../../assets/BGImg03.jpg') },
    { id: 7, title: 'Product Launch Meeting', description: 'Searching for a profit products', time: '4:30 PM', image: require('../../assets/BGImg03.jpg') },
    { id: 8, title: 'Sales Strategy Meeting', description: 'Sales Strategy Meeting', time: '11:00 AM', image: require('../../assets/BGImg03.jpg') },
  ];

  const handleGoBack = () => { setBack(true); };
  const handleCreateMeetng = () => { setMeetingCreate(true); };
  const handleOpenProfile = () => { setProfile(true) };
  const handleOpenGroup = () => { setGroupScreen(true); };

  if (back) { return <Main />; };
  if (meetingCreate) { return <Create />; };
  if (profile) { return <Profile /> };
  if (groupScreen) { return <GroupCreate />; };

  const chatView = () => (
    <TouchableOpacity>
      <View style={styles.chatFriend}>
        <Image source={require('../../assets/profile.png')} style={styles.chatFriendPfp} />
        <Text style={styles.chatFriendText}>Ghost666</Text>
      </View>
    </TouchableOpacity>
  );

  const renderMeetingsItems = ({ item }) => {
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return null;
    }
  
    return (
      <TouchableOpacity style={styles.meetingItem}>
        <View style={styles.row}>
          <Image source={item.image} style={styles.meetingImage} />
          <View style={styles.textContainer}>
            <Text style={styles.meetingTitle}>{item.title.length > 15 ? item.title.substring(0, 15) + "..." : item.title}</Text>
            <Text style={styles.meetingDescription}>{item.description.length > 80 ? item.description.substring(0, 90) + "..." : item.description}</Text>
            <Text style={styles.meetingTime}>{item.time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };  

  const renderGroupsItems = ({ item }) => {
    return (
      <View style={styles.groupItem}>
        <Image source={item.groupImage} style={styles.groupImage} />
        <Text style={styles.groupName}>{item.groupName.length > 20 ? item.groupName.substring(0, 20) + "..." : item.groupName}</Text>
        <Text style={styles.groupMembers}>{item.members} members</Text>
      </View>
    );
  }

  const handlePublishGroup = (newGroup) => {
    setGroups(prevGroups => [...prevGroups, newGroup]);
  };

  return (
    <ScrollView 
      style={styles.container} 
      showsHorizontalScrollIndicator={false}>
      <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
        <Text style={styles.goBackButtonText}>Go Back</Text>
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          onChangeText={handleSearch}
          value={searchQuery}
          placeholder="Search for meetings"
        />
      </View>
      <View style={styles.recommendedMeetingsContainer}>
        <Text style={styles.recommendedGroupsTitle}>Recommended Meetings to join</Text>
        {searchResults.length === 0 ? (
          <View style={styles.NoneFound}>
            <Text style={styles.NoneFoundText}>No meetings found!</Text>
          </View>
        ) : (
          <FlatList
            data={searchResults}
            renderItem={renderMeetingsItems}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
        <View style={styles.createContainer}>
          <TouchableOpacity style={styles.createMeeting} onPress={handleCreateMeetng}>
            <Text style={styles.createMeetingsText}>Add and menage your own meet 🪴</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.mostSubscribedContainer}>
        <Text style={styles.recommendedGroupsTitle}>Recommended friends to meet</Text>
        <FlatList
          data={recPeople}
          renderItem={({ item }) => (
            <View style={styles.mostSubscribedItemContainer}>
              <Image source={item.profilePicture} style={styles.mostSubscribedItemImage} />
              <Text style={styles.mostSubscribedItemName}>{item.name}</Text>
              <Text style={styles.mostSubscribedItemSubscribers}>{item.subscribers} subscribers</Text>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.createContainer}>
          <TouchableOpacity style={styles.createMeeting}>
            <Text style={styles.createMeetingsText} onPress={handleOpenProfile}>Check & edit your own profile 🔮</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.chatContainer}>
        <Text style={styles.titleChat}>CHAT</Text>
        <Text style={styles.subtitleChat}>screen</Text>
      </View>
      <ScrollView style={styles.chatContainerGeneral}>
        {showChat && chatView()}
      </ScrollView>
      <View style={styles.recommendedContainer}>
        <View style={styles.recommendedGroupsContainer}>
          <Text style={styles.recommendedGroupsTitle}>Recommended Groups to join</Text>
          <FlatList
            data={recGroups}
            renderItem={renderGroupsItems}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <View style={styles.createContainer}>
            <TouchableOpacity style={styles.createMeeting}>
              <Text style={styles.createMeetingsText} onPress={handleOpenGroup}>Create your own bissness group 🏡</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  searchInput: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
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
  meetingItem: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    paddingLeft: 0,
    paddingRight: 16,
    marginVertical: 8,
    width: 300,
    marginRight: 5,
    borderColor : 'black',
    borderWidth: .3,
  },
  meetingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    top: -80,
    left: 10,
    width: 400,
  },
  meetingDescription: {
    fontSize: 14,
    color: '#666',
    width: 195,
    position: 'absolute',
    top:-50,
    marginLeft: 4,
  },
  meetingImage: {
    width:100,
    height: 185,
    borderTopLeftRadius:8,
    borderBottomLeftRadius:8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  helpText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  goBackButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    alignItems: 'center',
  },
  goBackButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  createMeeting: {
    flex: 1,
    width: 200,
    height: 40,
    backgroundColor: '#3f51b5',
    borderRadius: 9,
    textAlign: 'center',
    alignItems: 'center',
  },
  createMeetingsText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    paddingTop: 8,
    width: 300, 
},
  friendPfp: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'black',
  },
  createContainer: {
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center',
  },
  mostSubscribedContainer: {
    marginVertical: 16,
    paddingHorizontal: 16,
    height: 235,
  },
  mostSubscribedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  mostSubscribedItemContainer: {
    marginRight: 16,
    alignItems: 'center',
  },
  mostSubscribedItemImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  mostSubscribedItemName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mostSubscribedItemSubscribers: {
    marginTop: 4,
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
  chatContainer: {
    height: 100,
    backgroundColor: '#569DAA',
  },
  titleChat: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 52,
    position: 'absolute',
    top: 10,
    left: 40,
  },
  subtitleChat: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    position: 'absolute',
    top: 52,
    left: 180,
  },
  chatContainerGeneral: {
    height: 200,
    backgroundColor: '#B9EDDD',
  },
  chatFriend: {
    width: windowWidth,
    height: 100,
    backgroundColor: 'white',
    borderTopLeftRadius: 257,
    borderBottomLeftRadius: 257,
    borderColor: '#577D86',
    borderWidth: 1,
  },
  chatFriendText :{
    fontSize: 22,
    fontWeight :'bold',
    color: 'black',
    zIndex: 100,
  },  
  chatFriendPfp: {
    width: 100,
    height: 100,
  },
  meetingTime: {
    fontSize: 19,
    fontWeight: 'bold',
    position: 'absolute',
    right: -97,
    bottom: -90,
  },
  NoneFound: {
    height: 200,
  },
  NoneFoundText: {
    fontWeight: 'bold',
    fontSize: 23,
    textAlign: 'center',
    paddingTop: 70,
  },
  recommendedContainer: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  recommendedGroupsContainer: {
    marginBottom: 16,
  },
  recommendedGroupsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  groupItem: {
    backgroundColor: '#fff',
    marginRight: 8,
    padding: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    width: 120,
    alignItems: 'center',
    marginBottom: 10,
  },
  groupImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  groupName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  groupMembers: {
    fontSize: 12,
    color: '#666',
  },
  createGroup: {
    backgroundColor: '#3f51b5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  createGroupsText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});