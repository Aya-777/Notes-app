import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import PostItImage from "../../assets/images/post-it.png";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={PostItImage} style={styles.image} />
        <Text style={styles.title}>Welcome to Notes App</Text>
        <Text style={styles.subtitle} adjustsFontSizeToFit={true} numberOfLines={1}>
        Capture your thoughts anytime, anywhere.
        </Text>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Notes')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  button: {
    backgroundColor: '#007b',
    padding: 10,
    borderRadius: 5,
    borderShadowColor: '#000',
    elevation: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 10,
  },

});

export default HomeScreen;