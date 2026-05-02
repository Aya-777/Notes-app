import {useState} from "react";
import {
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Alert,
} from 'react-native';
import{useAuth} from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {

  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async () => {
    if(!email.trim() || !password.trim()){
      setError('Email and password are required');
      return;
    }
    
  let response;
    if(isRegistering){
      if(password !== confirmPassword){
        setError('Please check the passwords.');
        return;
      }
      response = await signUp(email, password);
    }else{
      response = await signIn(email, password);
    }  
    if(response?.error){
      // setError(response.error);
      Alert.alert('Error', response.error);
      return;
    }
    navigation.replace('Notes');
  };

  return(
    <View style={styles.container}>
  
      <View style={styles.content}>
        <Text style={styles.header}>
          {isRegistering ? 'Sign Up' : 'Login'}
        </Text>

        {error ? <Text adjustsFontSizeToFit={true} numberOfLines={1}
        style={styles.error}>{error}</Text> : null}

        <TextInput style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        />
        <TextInput style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        // secureTextEntry
        textContentType='none'
        />
        {isRegistering && (
          <TextInput style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#aaa"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          // secureTextEntry
          textContentType='none'
        />)}

        <TouchableOpacity 
        style={styles.button}
        onPress={handleAuth}>
          <Text style={styles.buttonText}>
            {isRegistering ? 'Sign Up' : 'Login'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
          <Text 
          style={styles.switchText}
          adjustsFontSizeToFit={true} 
          numberOfLines={1}>
            {isRegistering ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    transform: [{ translateY: -60 }], // slight upward shift
  },
  header:{
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333'
  }, 
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    borderColor: '#ccc',
    fontSize: 16,  
  },
  button: {
    backgroundColor: '#007b',
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText:{
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchText: {
    color: '#007b',
    marginTop: 15,
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 16,
  },
});

export default LoginScreen;