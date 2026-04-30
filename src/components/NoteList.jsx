import {View, Text, FlatList} from 'react-native';
import React from 'react';
import NoteItem from './NoteItem';

const NoteList = ({ notes, onDelete, onEdit }) => {
  return (
    <View>
      <FlatList
        data={notes}
        renderItem={({ item }) => 
          <NoteItem note={item} onDelete={onDelete} onEdit={onEdit} />}
        keyExtractor={(item) => item.$id}
      />
    </View>
  );
};

export default NoteList;