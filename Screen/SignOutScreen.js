import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TokenContext, UsernameContext } from '../Context/Context';

export default function SignOutScreen({ navigation }) {
  const [, setToken] = useContext(TokenContext); 
  const [, setUsername] = useContext(UsernameContext); 

  // Reinitialiser le token et le nom d'utilisateur lorsqu'on se deconncte
  const handleSignOut = () => {
    setToken(null); // Supprimer le token
    setUsername(null); // Supprimer le nom d'utilisateur
    navigation.navigate('Home'); // Naviguer vers l'écran d'accueil
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Déconnexion</Text>
    <TouchableOpacity style={styles.button} onPress={handleSignOut}>
      <Text style={styles.buttonText}>Se déconnecter</Text>
    </TouchableOpacity>
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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#3a6a4b',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#66bb6a', 
    paddingVertical: 15,
    paddingHorizontal: 25,
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