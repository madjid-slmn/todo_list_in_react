import React, { useContext } from 'react';
import { View, Text,TouchableOpacity, StyleSheet } from 'react-native';
import { TokenContext, UsernameContext } from '../Context/Context';

export default function HomeScreen({ navigation }) {
  const [token] = useContext(TokenContext);
  const [username] = useContext(UsernameContext);

  return (
    <View style={styles.container}>
      {token ? (
        <Text style={styles.welcome}>Bienvenue ! Vous êtes connecté en tant que {username}</Text>
      ) : (
        <View>
          <Text style={styles.message}>Vous n'êtes pas connecté.</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e9f5e9', 
  },
  welcome: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#3a6a4b', 
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 20,
    color: '#5a7b5a', 
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#66bb6a', 
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#ffffff', 
    fontSize: 18,
    fontWeight: 'bold',
  },
});