import React, { useState } from 'react';
import { View, TextInput, Button, Modal, StyleSheet, TouchableOpacity, Text, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import Chat from '../Social/Chat';
import { Picker } from '@react-native-picker/picker';
import { Dimensions } from 'react-native';

export default function Create({ isVisible, onMeetingCreate, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [showLocationAndImage, setShowLocationAndImage] = useState(false);
  const [showTimeAndDay, setShowTimeAndDay] = useState(false);
  const [showConfirmButton, setShowConfirmButton] = useState(true);
  const [showConfirmButtonTwo, setShowConfirmButtonTwo] = useState(false);
  const [chat, setChat] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [post, setPost] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [image, setImage] = useState('');

  const handleCreateMeeting = () => {
    const meeting = { title, description, location, time, image };
    onMeetingCreate(meeting);
    setTitle('');
    setDescription('');
    setLocation('');
    setTime('');
    setImage('');
  };

  const handlePostMeeting = () => {
    if (title.length >= 10 && description.length >= 10 && selectedDay !== "" && selectedHour !== "" && location !== "") {
      setSuccess('Successfully created meeting!');
      setPost(true);
    } else {
      setError('Please fill in all the inputs!');
      setTimeout(() => {
        setError('');
      }, 8000);
    }
  };

  const handleCloseCreate = () => {
    setChat(true);
  };

  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  const handleHourChange = (hour) => {
    setSelectedHour(hour);
  };

  if (chat) {
    return <Chat />;
  }

  if (post) {
    return <Chat />;
  }

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <ImageBackground source={require('../../assets/BGImg02.png')} style={styles.imageContainer}>
        <TouchableOpacity style={styles.goBackButton} onPress={handleCloseCreate}>
          <Text style={styles.goBackButtonText}>Go Back!</Text>
        </TouchableOpacity>
        <View style={styles.modalContainer}>
          <View>
            <Text style={styles.title}>Customize Meeting</Text>
            <Text>Create your own meeting! Start your career</Text>
            <TextInput
              style={styles.input}
              placeholder="Title (minimum 7 characters)"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Description (minimum 10 characters)"
              value={description}
              onChangeText={setDescription}
            />
          </View>
        </View>
        <View style={styles.modalContainer}>
          {showConfirmButton && (
            <View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.nextButton} onPress={() => {
                  setShowLocationAndImage(true);
                  setShowConfirmButtonTwo(true);
                  setShowConfirmButton(false);
                }}>
                  <Text style={styles.nextButtonText}>Confirm & Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {showLocationAndImage && (
            <View>
              <Text style={styles.title}>Meeting Location & Image📍</Text>
              <Text>Select the meeting location and upload an image</Text>
              <TextInput
                style={styles.input}
                placeholder="Location"
                value={location}
                onChangeText={setLocation}
              />
              <TextInput
                style={styles.input}
                placeholder="Image URL (Optional)"
                value={image}
                onChangeText={setImage}
              />
              {showConfirmButtonTwo && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.nextButton} onPress={() => {
                    setShowTimeAndDay(true);
                    setShowConfirmButtonTwo(false);
                  }}>
                    <Text style={styles.nextButtonText}>Confirm & Continue</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
          </View>
          <View style={styles.modalContainer}>
            {showTimeAndDay && (
              <>
                <Text style={styles.title}>Meeting Time & Day⌚️📆</Text>
                <Text>Select the meeting time and day</Text>
                <View style={styles.inputPicker}>
                  <Picker
                    selectedValue={selectedDay}
                    onValueChange={handleDayChange}
                  >
                    <Picker.Item label="Select a day" value="" />
                    <Picker.Item label="Monday" value="Monday" />
                    <Picker.Item label="Tuesday" value="Tuesday" />
                    <Picker.Item label="Wednesday" value="Wednesday" />
                    <Picker.Item label="Thursday" value="Thursday" />
                    <Picker.Item label="Friday" value="Friday" />
                    <Picker.Item label="Saturday" value="Saturday" />
                    <Picker.Item label="Sunday" value="Sunday" />
                  </Picker>
                </View>
                <View style={styles.inputPicker}>
                  <Picker
                    selectedValue={selectedHour}
                    onValueChange={handleHourChange}
                  >
                    <Picker.Item label="Select an hour" value="" />
                    <Picker.Item label="08:00 AM" value="08:00 AM" />
                    <Picker.Item label="09:00 AM" value="09:00 AM" />
                    <Picker.Item label="10:00 AM" value="10:00 AM" />
                    <Picker.Item label="11:00 AM" value="11:00 AM" />
                    <Picker.Item label="12:00 PM" value="12:00 PM" />
                    <Picker.Item label="01:00 PM" value="01:00 PM" />
                    <Picker.Item label="02:00 PM" value="02:00 PM" />
                    <Picker.Item label="03:00 PM" value="03:00 PM" />
                    <Picker.Item label="04:00 PM" value="04:00 PM" />
                    <Picker.Item label="05:00 PM" value="05:00 PM" />
                  </Picker>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.createButton} onPress={handlePostMeeting}>
                    <Text style={styles.createButtonText}>Create Meeting</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
            {error !== '' && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
            {success !== '' && (
              <View style={styles.successContainer}>
                <Text style={styles.successText}>{success}</Text>
              </View>
            )}
          </View>
      </ImageBackground>
    </Modal>
  );
}


let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').height * .3,
    marginLeft: 20,
    marginBottom: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  picker: {
    height: 40,
  },
  pickerItems: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: -10,
    justifyContent: 'center',
  },
  backButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  backButtonLabel: {
    fontSize: 16,
    color: '#555',
    textDecorationLine: 'underline',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  createButton: {
    backgroundColor: '#3E3E3F',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 15,
    width: Dimensions.get('window').width * .7,
    alignItems: 'center',
  },
  nextButton: {
    marginLeft: 10,
    paddingHorizontal: 35,
    paddingVertical: 7,
    backgroundColor: '#50C878',
    borderRadius: 15,
    alignItems: 'center',
  },
  nextButtonText: {
    fontWeight :'bold',
    fontSize: 20,
    color: 'white',
    width: Dimensions.get('window').width * .5,
  },
  nextButtonLabel: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  inputPicker: {
    height: 55,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 0,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  goBackButton: {
    alignItems :'center',
    justifyContent: 'center',
    width: windowWidth * 1.05,
    backgroundColor: '#2196F3',
    height: 50,
    marginTop: -20,
  },
  goBackButtonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  HR1: {
    width: 330,
    alignItems: 'center',
    marginTop: 1.5,
    height: .3,
    backgroundColor: 'black',
  },
});
