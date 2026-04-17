import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const NoteItem = ({ note }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.content}>{note.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flexDirection: 'column',
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
});

export default NoteItem;