import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import NoteList from '../components/NoteList';
import AddNoteModal from '../components/AddNoteModal';
import { useState, useEffect } from "react";
import noteService from "../services/noteService";


const NoteScreen = ({ navigation }) => {

  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await noteService.getNotes();
    if(response.error){
      Alert.alert('Error', response.error);
    }else{
      setNotes(response);
    }
  };

  // add New Note
  const addNote = async () => {
    if (newNoteTitle.trim()) {
      
      const response = await noteService.addNote(newNoteTitle, newNoteContent);
      if(response.error){
        Alert.alert('Error', response.error);
      }else{
        setNotes([...notes, response.data]);
      }

      setNewNoteTitle("");
      setNewNoteContent("");
      setModalVisible(false);
    }
  };


  return (
      <View style={styles.container}>

        <NoteList notes={notes} />
        <TouchableOpacity 
          style={styles.addButton}
          onPress={ () => setModalVisible(true) }
        >
          <Text style={styles.addButtonText}>
            + Add Note
          </Text>
        </TouchableOpacity>

      <AddNoteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newNoteTitle={newNoteTitle}
        setNewNoteTitle={setNewNoteTitle}
        newNoteContent={newNoteContent}
        setNewNoteContent={setNewNoteContent}
        addNote={addNote}
      />

      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#007b',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    fontSize: 18,
    color: '#fff',
  },

});

export default NoteScreen;