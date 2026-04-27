import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const NoteItem = ({ note, onDelete }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.content}>{note.content}</Text>
      </View>
      <TouchableOpacity onPress={ () => onDelete(note.$id) }
      >
        <Text style={styles.delete}>❌</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#080808',
  },
  content: {
    fontSize: 16,
    color: '#666',
  },
  delete:{
    fontSize: 28,
    color: 'red',
  }
});

export default NoteItem;