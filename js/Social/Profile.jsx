import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Switch, Dimensions, TextInput, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";
import Chat from "./Chat";
import Log from "../Log/Log";

const db = SQLite.openDatabase("users.db");

export default function Profile() {
  const [isLoading, setLoading] = useState(true);
  const [back, setBack] = useState(false);
  const [goBack, setGoBack] = useState(false);
  const [log, setLog] = useState(false);
  const [user, setUser] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Posts");
  const [showWarn, setShowWarn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (userId) {
          fetchProfileData(userId);
          fetchPosts(userId);
        } else {
          setLoading(true);
        }
      } catch (error) {
        console.log("Error getting ID: ", error);
        setLoading(false);
      }
    };
  
    getUserId();
  }, []);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, username TEXT, profilePicture TEXT, position TEXT)",
        [],
        () => {},
        (_, error) => {
          console.log("SQLite error: ", error);
        }
      );      
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, image TEXT, userId INTEGER)",
        [],
        () => {},
        (_, error) => {
          console.log("SQLite error: ", error);
        }
      );
    });

    const getCurrentUserId = () => {
      // Implement your logic to get the current user ID
    };

    const userId = getCurrentUserId();
  
    fetchProfileData(userId);
    fetchPosts(userId);
  }, []);

  const fetchProfileData = (userId) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users WHERE id = ?",
        [userId],
        (_, { rows }) => {
          const userData = rows.item(0);
          setUser(userData);
          setSelectedImage(userData.profilePicture);
          setLoading(false);
        },
        (_, error) => {
          console.log("SQLite error: ", error);
          setLoading(false);
        }
      );
    });
  };  

  const fetchPosts = (userId) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM posts WHERE userId = ?",
        [userId],
        (_, { rows }) => {
          const postsData = [];
          for (let i = 0; i < rows.length; i++) {
            const post = rows.item(i);
            postsData.push(post);
          }
          setPosts(postsData);
        },
        (_, error) => {
          console.log("SQLite error: ", error);
        }
      );
    });
  };

  const handleImageUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access the gallery is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.canceled === true) {
      return;
    }

    setSelectedImage(pickerResult.uri);

    useEffect(() => {
      setShowWarn(true);
    
      const timeout = setTimeout(() => {
        setShowWarn(false);
      }, 2000);
    
      return () => clearTimeout(timeout);
    }, []);
  };

  const handleSave = () => {
    if (userId) {
      console.log("userId:", userId); // Check the value of userId
  
      db.transaction((tx) => {
        const postId = Math.floor(Math.random() * 1000000);
  
        console.log("postId:", postId); // Check the value of postId
        console.log("selectedImage:", selectedImage); // Check the value of selectedImage
  
        tx.executeSql(
          "INSERT INTO posts (id, image, userId) VALUES (?, ?, ?)",
          [postId, selectedImage, userId],
          (_, results) => {
            if (results.rowsAffected > 0) {
              console.log("Post saved successfully");
            } else {
              console.log("Post saving failed");
            }
          },
          (_, error) => {
            console.log("SQLite error: ", error);
          }
        );
      });
    } else {
      console.log("Invalid userId");
    }
  };  

  const renderCategoryItem = (category) => {
    const isActive = category === activeCategory;

    return (
      <TouchableOpacity
        style={[styles.categoryItem, isActive && styles.activeCategoryItem]}
        onPress={() => setActiveCategory(category)}
      >
        <Text style={[styles.categoryText, isActive && styles.activeCategoryText]}>{category}</Text>
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    switch (activeCategory) {
      case "Posts":
        return (
          <View style={styles.sectionContainer}>
            <FlatList
              data={posts}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.postContainer}>
                  <Image style={styles.postImage} source={{ uri: item.image }} />
                  <Text>{item.description}</Text>
                </View>
              )}
            />
            <TouchableOpacity onPress={handleImageUpload} style={styles.addButton}>
              <Text style={styles.addButtonText}>Add Photo Post</Text>
            </TouchableOpacity>
            {showWarn && (
              <Text style={styles.addImageText}>
                Even if the button isn't working, try to authorize.
              </Text>
            )}
            {selectedImage && (
              <View style={styles.selectedImageContainer}>
                <Image style={styles.selectedImage} source={{ uri: selectedImage }} />
                <TouchableOpacity onPress={() => handleSave(userId)} style={styles.saveButton}>
                  <Text style={styles.saveButtonText}>Save Post</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        );
      case "Profile":
        return (
          <View style={styles.sectionContainer}>
            <View style={styles.profileInfoContainer}>
              <Text style={styles.profileInfoLabel}>Username: {user.name}</Text>
            </View>
            <View>
              <Text style={styles.profileInfoLabel}>User ID: {userId}</Text>
            </View>
            <View style={styles.profileInfoContainer}>
              <Text style={styles.profileInfoLabel}>Location: {user.position}</Text>
            </View>
            <View style={styles.profileInfoContainer}>
              {selectedImage ? (
                <Image
                  style={styles.profilePicture}
                  source={{ uri: selectedImage }}
                  onPress={handleImageUpload}
                />
              ) : (
                <TouchableOpacity
                  style={styles.profilePicture}
                  onPress={handleImageUpload}
                >
                <View style={styles.row}>
                  <Text style={styles.addImageText}>Add Image</Text>
                  <Image source={require('../../assets/add.png')} style={styles.addImage} />
                </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        );       
      case "Meetings":
        return (
          <View style={styles.sectionContainer}>
            {/* Render your meetings here */}
          </View>
        );
      default:
        return null;
    }
  };

/*   if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', marginTop: 300, }}>Register/Login for feathers</Text>
        <TouchableOpacity style={styles.modalButton} onPress={handleLog}>
          <Text style={[ styles.buttonText ]}>Log</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGoBack}>
          <Text style={styles.textGuest}>Continue as a guest</Text>
        </TouchableOpacity>
      </View>
    );
  } */

  const handleGoBack = () => { setGoBack(true); };
  const handleLog = () => { setLog(true); };

  return (
    <>
      {goBack ? (
        <Chat />
      ) : (
        <View style={styles.container}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
          {!back ? (
            <ScrollView style={styles.scrollView}>
              <View style={styles.categoriesContainer}>
                <Image source={require('../../assets/post.png')} style={styles.postPng} /> 
                {renderCategoryItem("Posts")}
                <Image source={require('../../assets/proflePng.png')} style={styles.postPng2} />
                {renderCategoryItem("Profile")}
                <Image source={require('../../assets/meetPng.png')} style={styles.postPng3} />
                {renderCategoryItem("Meetings")}
              </View>
              <View style={styles.HR1} />
              {renderContent()}
            </ScrollView>
          ) : (
            <View />
          )}
        </View>
      )}
    </>
  );  
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: 400,
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 30,
  },
  backButton: {
    width: windowWidth * 1.1,
    height: 50,
    backgroundColor: "#2196F3",
    position: 'absolute',
    right: -10,
    top: -30,
    justifyContent: 'center'
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center'
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#3f51b5',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: 'white'
  },
  profilePictureContainer: {
    alignItems: "center",
    marginBottom: 20,
    height: 100,
  },
  profilePicture: {
    width: 360,
    height: 200,
    borderRadius: 30,
    borderWidth: .3,
    borderColor: 'black'  
},
  profileInfo: {
    marginBottom: 20,
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 0,
  },
  categoryItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  activeCategoryItem: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  categoryText: {
    fontSize: 16,
  },
  activeCategoryText: {
    color: "#000",
    fontWeight: 'bold',
    fontSize: 17,
  },
  sectionContainer: {
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  postContainer: {
    width: Dimensions.get("window").width * .87,
    height: 300,
    marginRight: 10,
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 4,
  },
  postImage: {
    width: "100%",
    height: "100%",
  },
  likeText: {
    fontSize: 16,
    marginBottom: 5,
  },
  imageButton: {
    height: 100,
  },
  settings:{
    width: 50,
    height: 50,
  },
  modalButton: {
    backgroundColor: '#3f51b5',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textGuest: {
    textAlign: 'center',
  },
  flatListContainer: {
    width: '100%',
  },
  selectedImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  scrollView: {
    height: 700,
  },
  addButton: {
    borderRadius: 5,
    backgroundColor: '#3f51b5',
    width: windowWidth * .87,
    height: 40,
    textAlign: 'center',
    alignItems: 'center',
    paddingVertical: 9,
  },
  addButtonText: {
    color:'#fff',
    fontWeight: 'bold',
  },
  HR1: {
    width: windowWidth * .865,
    height: .4,
    backgroundColor: 'black',
    marginBottom: 5,
  },
  addImageText :{
    textAlign: 'center',
    paddingVertical: '33%',
    fontWeight: '900',
    fontSize: 25,
    letterSpacing: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 77,
  },
  addImage :{
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
  postPng: {
    width: 20,
    marginTop: 12,
    height: 20,
  },
  postPng2: {
    width: 23,
    marginTop: 13,
    height: 23,
  },
  postPng3: {
    width: 23,
    marginTop: 13,
    height: 23,
    marginRight: -4,
  },
});