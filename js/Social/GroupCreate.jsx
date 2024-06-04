import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Switch, StyleSheet, Dimensions, ImageBackground, Slider, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import Chat from "./Chat";

export default function CreateGroup({ onPublishGroup }) {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupImage, setGroupImage] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [recommendedAge, setRecommendedAge] = useState(0);
  const [back, setBack] = useState(false);

  const handleCreateGroup = () => {
    if (!groupName || !groupDescription || !recommendedAge) {
      Alert.alert("Group name, description, and age are required!");
    } else {
      setBack(true);    
    };

    const newGroup = {
      name: groupName.toString(),
      description: groupDescription.toString(),
      image: groupImage,
      isPublic: isPublic,
      recommendedAge: recommendedAge,
    };
    
    onPublishGroup(newGroup);
  };

  const handleGoBack = () => {
    setBack(true);
  };

  const handleImageUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      console.error("Permission to access camera roll is required!");
      return;
    }
  
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    
    if (!pickerResult.cancelled) {
      setGroupImage(pickerResult.uri);
    }
  };

  return (
    <>
      {back ? (
        <Chat />
      ) : (
        <ImageBackground source={require('../../assets/BGImg05.jpg')} style={styles.imageContainer}>
          <View style={styles.backContainer}>
            <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
              <Text style={styles.goBackButtonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <Text style={styles.title}>Create Group</Text>
            <TextInput
              style={styles.input}
              placeholder="Group name"
              value={groupName}
              onChangeText={setGroupName}
            />
            <TextInput
              style={[styles.input, { height: 50 }]}
              placeholder="Group description"
              multiline
              value={groupDescription}
              onChangeText={setGroupDescription}
            />
            <View style={styles.imageUploadContainer}>
              {groupImage ? (
                <Image source={{ uri: groupImage }} style={styles.imageUpload} />
              ) : (
                <TouchableOpacity
                  style={styles.imageUploadPlaceholder}
                  onPress={handleImageUpload}
                >
                  <Text style={styles.imageUploadText}>Upload Group Image</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.containerUpload}>
              <View style={styles.switchContainer}>
                <Text style={styles.switchLabelRight}>Private</Text>
                <Switch value={isPublic} onValueChange={setIsPublic} />
                <Text style={styles.switchLabelLeft}>Public</Text>
              </View>
            </View>
            <View style={styles.input2}>
              <Text style={styles.label}>Recommended age: {recommendedAge}+</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={70}
                step={2}
                maximumTrackTintColor="lime"
                minimumTrackTintColor="red"
                thumbTintColor="black"
                value={recommendedAge}
                onValueChange={setRecommendedAge}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleCreateGroup}>
              <Text style={styles.buttonText}>Create Group</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      )}
    </>
  );  
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    marginTop: 30,
  },
  backContainer: {
    marginTop: 10,
    marginLeft: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  slider: {
    width: 250,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#F3F3f3',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'black',
  },
  input2: {
    alignItems: 'center',
    width: '100%',
    height: 60,
    backgroundColor: '#F3F3f3',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'black',
  },
  imageUploadContainer: {
    width: '100%',
    height: Dimensions.get('window').height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageUploadPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageUploadText: {
    fontSize: 16,
    color: 'gray',
  },
  imageUpload: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 12,
  },
  containerUpload: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    width: 300,
    borderRadius: 5,
    padding: 10,
  },
  switchLabelRight: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginRight: 30,
    marginLeft: 40,
  },
  switchLabelLeft: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginHorizontal: 30,
  },
  button: {
    width: '100%',
    backgroundColor: '#3f51b5',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  goBackButton: {
    width: windowWidth *1.05,
    height: 60,
    backgroundColor: '#2196F3',
    position: 'absolute',
    top: -40,
    left: -15,
    justifyContent: 'center',
  },
  goBackButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    paddingBottom: 10,
  },
});
