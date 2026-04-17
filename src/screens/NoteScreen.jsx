import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import NoteList from '../components/NoteList';
import { add } from 'react-native/types_generated/Libraries/Animated/AnimatedExports';

const notes = [
  { id: 1, title: 'Note 1', content: 'This is the content of note 1.' },
  { id: 2, title: 'Note 2', content: 'This is the content of note 2.' },
  { id: 3, title: 'Note 3', content: 'This is the content of note 3.' },
];

const NoteScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>

        <NoteList notes={notes} />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add Note</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    
  },
  addButton: {
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