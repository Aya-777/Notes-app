import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NoteList from '../components/NoteList';
import AddNoteModal from '../components/AddNoteModal';
import { useState} from "react";


const NoteScreen = ({ navigation }) => {

  const [notes, setNotes] = useState([
    { id: 1, title: 'Note 1', content: 'This is the content of note 1.' },
    { id: 2, title: 'Note 2', content: 'This is the content of note 2.' },
    { id: 3, title: 'Note 3', content: 'This is the content of note 3.' }
  ]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const addNote = () => {
    
    if(!newNoteTitle.trim() || !newNoteContent.trim()) {
      alert("Please enter both title and content for the note.");
      return;
    }

    const newNote = {
      id: Date.now().toString(),
      title: newNoteTitle,
      content: newNoteContent
    };
    setNotes([...notes, newNote]);
    
    setNewNoteTitle("");
    setNewNoteContent("");
    setModalVisible(false);
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