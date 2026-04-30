import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import React from 'react';
import { useState, useRef } from 'react';

const NoteItem = ({ note, onDelete, onEdit }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  
  const handleSave = () => {
    if(editedTitle.trim() === '' && editedContent.trim() === '') {
      return;
    }
    onEdit(note.$id, editedTitle, editedContent);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      { isEditing ? (
        <View>
          <TextInput
            ref={titleRef}
            style= {styles.input}
            value={editedTitle}
            onChangeText={setEditedTitle}
            autoFocus
            onSubmitEditing={handleSave}
            returnKeyType='done'
          />
          <TextInput ref={contentRef}
            style= {styles.input}
            value={editedContent}
            onChangeText={setEditedContent}
            onSubmitEditing={handleSave}
            returnKeyType='done'
          />
        </View>
      ) : (
        <View>
          <Text style={styles.title}>{note.title}</Text>
          <Text style={styles.content}>{note.content}</Text>
        </View>
      ) }
      <View style={styles.actions}>
        {isEditing ? (
          <TouchableOpacity
            onPress={()=>{
              handleSave();
              titleRef.current?.blur();
              contentRef.current?.blur();
            }}>
            <Text style={styles.edit}>💾</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
          onPress={()=>{
            setIsEditing(true);
            }}>
            <Text style={styles.edit}>✏️</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={ () => onDelete(note.$id) }
        >
          <Text style={styles.delete}>❌</Text>
        </TouchableOpacity>

      </View>
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
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  edit: {
    fontSize: 24,
    marginRight: 10,
    color: 'blue'
  }
});

export default NoteItem;