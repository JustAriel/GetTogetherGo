import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Button, Image, Modal, Animation, Animated } from "react-native";
import Main from "./Main";
import { Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('users.db');

export default function Scroll() {
  const [posts, setPosts] = useState([]);
  const [back, setBack] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [modal, setModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userID, setUserID] = useState(null);


  useEffect(() => {
    AsyncStorage.getItem('posts')
      .then((value) => {
        const savedPost = value ? JSON.parse(value) : [];
        setPosts(savedPost);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  const addToScroll = () => {
    if (postContent) {
      db.transaction((tx) => {
        if (!userID) {
          console.log('User ID is not available');
          return;
        }
  
        tx.executeSql(
          'SELECT username FROM users WHERE id = ?;',
          [userID],
          (_, { rows }) => {
            if (rows.length > 0) {
              const { username } = rows.item(0);
              const newPost = {
                content: postContent,
                username: username,
              };
              setPosts((prevPosts) => [...prevPosts, newPost]);
              setPostContent('');
  
              // Save the new post to the database
              const updatedPosts = [...posts, newPost];
              AsyncStorage.setItem('posts', JSON.stringify(updatedPosts))
                .then(() => {
                  console.log('Posts saved successfully');
                })
                .catch((error) => {
                  console.log('Error saving posts: ', error);
                });
            }
          },
          (_, error) => {
            console.log('Error retrieving username: ', error);
          }
        );
      });
    }
  };

  const handleDeletePost = (index) => { 
    if (selectedPost !== null) {
      const updatedPosts = [...posts];
      updatedPosts.splice(index, 1);
    
      setPosts(updatedPosts);
      AsyncStorage.setItem('posts', JSON.stringify(updatedPosts))
        .then(() => {
          console.log('Posts deleted successfully');
          setSelectedPost(null);
          setModal(false);
        })
        .catch((error) => {
          console.log('Error: ', error);
        })
    }
  };

  const handleReportPost = () => {
    if (selectedPost !== null) {
      console.log('Post reported');
      setSelectedPost(null);
      setModal(false);
    }
  }

  const handleResponsePost = () => {
    if (selectedPost !== null) {
      console.log('Post responsed');
      selectedPost(null);
      setModal(false);
    }
  }

  const handleHoldTouch = (index) => {
    setSelectedPost(index);
    setModal(true);
  }

  const handleClosePost = () => {
    setModal(false);
  }

  const handleGoBack = () => { setBack(true); };
  const handleGoForward = () => { console.log('add logic'); };

  useEffect(() => {
    getImageURI();
  }, []);

  const getImageURI = async () => {
    try {
      const uri = await AsyncStorage.getItem('selectedImageURI');
      console.log(uri);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const openImagePicker = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        console.log('Permission Needed.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true,
        aspect: [4, 4],
      });

      if (!result.cancelled) {
        setSelectedImage(result.uri);
        
        const { uri, width, height, type, fileName } = result;
        console.log('Image URI: ', uri);
        console.log('Image Width: ', width);
        console.log('Image Height: ', height);
        console.log('Image Type: ', type);
        console.log('Image Filename: ', fileName);

        await AsyncStorage.setItem('selectedImageURI', uri);
      } else {
        console.log('Image picker was canceled');
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  return (
    <>
    {back ? (
      <Main />
    ) : (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={handleGoBack} style={styles.buttonBack}>
          <Text style={styles.backText}>Go Back</Text>
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput 
            placeholder="Search for posts..." 
            style={styles.inputSearch} />
          <View style={styles.HRvertical} />
          <TouchableOpacity style={styles.searchButton} onPress={handleGoForward}>
            <Icon name="search" size={25} />
          </TouchableOpacity>
        </View>
        <View style={styles.HR1} />
        <View style={styles.containerPublish}>
          <TextInput
            style={styles.textInput}
            placeholder="Edit your post..."
            multiline
            value={postContent}
            onChangeText={setPostContent}
          />
          <TouchableOpacity style={styles.publishButton} onPress={openImagePicker}>
            <Image source={require('../../assets/publish.png')} style={styles.publishButtonImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.imagePickerContainer}>
          <TouchableOpacity onPress={addToScroll} style={styles.imageButton}>
            <Text style={styles.imagePicker}>Share your post all over the wold!</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {posts.length > 0 ? (
            posts.map(({ content, username }, index) => (
              <TouchableOpacity
                key={index}
                style={styles.postContainer}
                onLongPress={() => handleHoldTouch(index)}
              >
                <View style={styles.postComment}>
                  <View style={styles.userPostContainer}>
                    <Image style={styles.pfpPost} source={require('../../assets/profile.png')} />
                    <Text style={styles.username}>{username}</Text>
                  </View>
                  <View style={styles.HR0} />
                  {selectedImage && <Image source={{ uri: selectedImage }} style={styles.imagePost} />}
                  <View style={styles.HRvertical}/>
                  <Text style={styles.textPost}>{content}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.container}>
              <Text style={styles.nonePostsText}>No posts available</Text>
            </View>
          )}
        </ScrollView>
      </View>
      <Modal visible={modal} animationType="slide" style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={handleDeletePost} style={styles.modalButton}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleReportPost} style={styles.modalButton}>
            <Text style={styles.buttonText}>Report</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleResponsePost} style={styles.modalButton}>
            <Text style={styles.buttonText}>Response</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleClosePost} style={styles.modalButton}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
    )}
    </>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles=StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight * 1.07,
  },
  buttonBack: {
    width: windowWidth,
    height: 60,
    backgroundColor: "#2196F3",
    position: 'absolute',
    top: 10,
  },
  backText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 90,
    width: windowWidth * .95,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: 10,
    borderColor: 'black',
    borderWidth: .5,
    marginBottom: 5,
  },
  inputSearch: {
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
  title: {
    marginBottom: 2000,
    marginTop: 10,
  },
  HRvertical: {
    width: .3,
    height: 30,
    backgroundColor: 'black',
  },
  HR1: {
    width: windowWidth * .99,
    height: .3,
    backgroundColor: 'black',
    marginTop: 4,
    marginLeft: 2,
  },
  containerPublish: {
    width: windowWidth * .9,
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 7,
    marginLeft: 20,
    marginTop: 10,
    borderWidth: .5,
    borderColor: 'black',
  },
  textInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  publishButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
  },
  publishButtonImage: {
    width: 20,
    height: 20,
  },
  postComment: {
    width: windowWidth * .95,
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    padding: 7,
    marginLeft: 10,
    marginBottom: 10,
  },
  containerComent: {
    marginLeft: 10,
    textAlign: 'center',
    justifyContent: 'center',
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
  },
  modalButton: {
    marginBottom: 10,
    backgroundColor: '#3f51b5',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  nonePostsText: {
    textAlign: 'center',
    color: 'grey',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 100,
  },
  pfpPost: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 8,
  },
  userPostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  HR0: {
    width: windowWidth * .55,
    height: .2,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
  },
  imagePost: {
    position: 'absolute',
    right: 0,
    width: 120, 
    height: 140,
    borderRadius: 12,
  },
  imageButton: {
    marginLeft: 15,
    width: 374,
    height: 40,
    textAlign: 'center',
    justifyContent: 'center',
    borderColor:' black',
    borderWidth: .5,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePicker:{
    marginTop: 17,
    width: 240, 
    height: 40,
    fontWeight: 'bold',
  },
  imagePickerContainer :{
    alignItems: 'center',
    width: 400,
    justifyContent: 'center',
    textAlign: 'center',
  },
  HRvertical :{
    width: .3,
    height: 30,
    backgroundColor: 'black',
  }
});