import React, { useState, useEffect } from "react";
import { View, Text, Button, Modal, TextInput, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import Map from "./Map";
import { ImageBackground } from "react-native";


export default function Notes() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteTask, setNoteTask] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notes, setNotes] = useState([]);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const savedNotesJson = await AsyncStorage.getItem('notes');
        if (savedNotesJson) {
          const savedNotes = JSON.parse(savedNotesJson);
          setNotes(savedNotes);
        }
      } catch (error) {
        console.error('Failed to load notes:', error);
      }
    };

    loadNotes();
  }, []);

  useEffect(() => {
    const saveNotes = async () => {
      try {
        await AsyncStorage.setItem('notes', JSON.stringify(notes));
      } catch (error) {
        console.error('Failed to save notes:', error);
      }
    };

    saveNotes();
  }, [notes]);

  const handleAddNote = () => {
    const newNote = {
      id: new Date().getTime().toString(),
      title: noteTitle,
      task: noteTask,
      date: selectedDate.toLocaleString(),
    };
    setNotes([...notes, newNote]);
    setNoteTitle('');
    setNoteTask('');
    setSelectedDate(new Date());
    setModalVisible(false);
  };

  const handleDeleteNotes = (noteId) => {
    setNotes(notes.filter((note) => note.id !== noteId));
    alert("The note has been deleted successfully");
  };

  const handleToggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const meetings = [
    {id: '1', name: 'Meeting 1', image: require('../../assets/BGImg00.jpg') },
    {id: '2', name: 'Meeting 2', image: require('../../assets/forest.jpg') },
    {id: '3', name: 'Meeting 3', image: require('../../assets/BGImg02.png') },
    {id: '4', name: 'Meeting 4', image: require('../../assets/BGImg01.jpg') },
  ];

  const JoinMeetings = ({ name, description, image }) => (
    <View style={styles.meetingContainer}>
      <TouchableOpacity style={styles.buttonMeet}>
        <Image source={image} style={styles.image} />
        <Text style={styles.title}>{name.length > 10 ? name.substring(0, 10) + "..." : name}</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <>
    {showMap ? (
      <Map />
    ) : (
      <ImageBackground style={styles.imageContainer} source={require('../../assets/BGImg05.jpg')}>
        <TouchableOpacity onPress={() => setShowMap(true)} style={styles.button}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.containerNotes}>
        {notes.length === 0 ? (
          <View style={styles.noneNotesContainer}>
            <Text style={styles.noneNotesText}>No notes here</Text>
            <TouchableOpacity style={styles.buttonNoneNotes} onPress={handleToggleModal}>
              <Text style={styles.textNoneNotes}>Add Note</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={notes}
            scrollEnabled
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.noteContainer}>
                <Text style={styles.noteTitle}>{item.title}</Text>
                <View style={styles.HR1}/>
                <Text style={styles.noteTask}>{item.task}</Text>
                <Text style={styles.noteDate}>{item.date}</Text>
                <TouchableOpacity onPress={() => handleDeleteNotes(item.id)} style={styles.deleteButton}>
                <Ionicons name="trash" style={styles.garbageIcon} />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        )}
        </View>
          <TouchableOpacity onPress={handleToggleModal} style={styles.buttonBack}>
            <Text style={styles.buttonText}>Add Note</Text>
          </TouchableOpacity>

        <Modal visible={isModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Note</Text>
            <TextInput
              style={styles.input}
              placeholder="Note Title"
              onChangeText={setNoteTitle}
              value={noteTitle}
              maxLength={35}
            />
            <TextInput
              style={styles.input}
              placeholder="Note Task"
              onChangeText={setNoteTask}
              value={noteTask}
              maxLength={120}
            />
            <Button title="Add Note" onPress={handleAddNote} />
            <View style={styles.something} />
            <Button title="Close Modal" onPress={handleToggleModal} />
            <Text style={styles.warnText}>Meeting notes auto-deleted after 72 hours. ⓸</Text>
              <FlatList 
                data={meetings}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.buttonRender}>
                    <JoinMeetings 
                      name={item.name}
                      image={item.image}
                    />
                  </TouchableOpacity>
                )}
              />
          </View>
        </Modal>
      </View>
      </ImageBackground>
    )}
    </>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: windowWidth * .9,
    height: 700,
    backgroundColor: '#fff',
    paddingHorizontal: 1,
    paddingTop: 0,
    borderRadius: 12,
    justifyContent:'center',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 190,
  },
  containerNotes: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  noteContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: 335,
  },
  imageContainer: {
    width: windowWidth,
    marginTop: -16,
    height: windowHeight * 1.09,
    resizeMode: 'cover',
    justifyContent: 'center'  
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  noteTask: {
    fontSize: 16,
    marginBottom: 8,
  },
  noteDate: {
    fontSize: 14,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 0,
    padding: 10,
    marginBottom: 0,
    position: 'absolute',
    top: 28,
    width: windowWidth
  },
  buttonText: {
    height: 30,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonBack: {
    backgroundColor: '#3f51b5',
    borderRadius: 0,
    padding: 10,
    marginBottom: 0,
    width: windowWidth * .9,
  },
  HR1: {
    width: 340,
    height: .3,
    backgroundColor: 'black',
  },
  deleteButton: {
    position: 'absolute',
    right: 10,
    bottom: 5,
    backgroundColor: 'red',
    borderRadius: 20,
    width: 80,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  garbageIcon: {
    color: 'white',
    fontSize: 20
  },
  something: {
    marginBottom: 10,
  },
  warnText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  noneNotesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flex: .8,
  },
  noneNotesText: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  buttonNoneNotes: {
    marginTop: 10,
    backgroundColor: '#3f51b5',
    width: 180,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
  },
  textNoneNotes: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1,
    flex: 1,
    marginTop: 6,
  },
  meetingContainer: {
    backgroundColor: '#f2f2f2',
    padding: 0,
    borderRadius: 8,
    marginBottom: 10,
    height: 100,
  },
  buttonMeet: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 180,
    height: 100,
    marginRight: 10,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 35,
  },
});
