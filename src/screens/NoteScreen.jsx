import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import NoteList from '../components/NoteList';
import AddNoteModal from '../components/AddNoteModal';
import { useState, useEffect } from "react";
import noteService from "../services/noteService";
import { ActivityIndicator } from 'react-native';


const NoteScreen = ({ navigation }) => {

  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await noteService.getNotes();
    if(response.error){
      setError(response.error);
      Alert.alert('Error', response.error);
    }else{
      setNotes(response);
      setError(null);
    }
    setLoading(false);
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

  // Delete Note
  const deleteNote = async (id) => {
    Alert.alert(
      'Delete Note', 'Are you sure you want to delete this note?', [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const response = await noteService.deleteNote(id);
            if(response.error){
              Alert.alert('Error', response.error)
            }else{
              setNotes(notes.filter((note)=> note.$id !== id));
            }
          } 
        }
      ]
    )
  }

  const editNote = async (id, newTitle, newContent) => {
    if(!newTitle.trim()) {
      Alert.alert('Error', 'Title and content cannot be empty');
      return;
    }
    const response = await noteService.updateNote(id, newTitle, newContent);
    if(response.error){
      Alert.alert('Error', response.error)
    }else{
      setNotes((prevNotes) => prevNotes.map((note) => note.$id === id ? {...note, title: newTitle, content: newContent} : note));
    }
  }

  return (
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size='large' color='#007bff' />
        ) : (
          <>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <NoteList notes={notes} onDelete={deleteNote} onEdit={editNote} />
          </>
        ) }
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
  errorText:{
    color: 'red',
    textALign: 'center',
    marginBottom: 10,
    fontSize: 16
  }

});

export default NoteScreen;