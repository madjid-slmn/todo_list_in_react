import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity } from 'react-native';
import { TokenContext, UsernameContext } from '../Context/Context';
import { signIn } from '../components/SignIn_SignUp';


  export default function SignInScreen({ navigation }) {


    const [, setToken] = useContext(TokenContext);
    const [, setUsernameContext] = useContext(UsernameContext);  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSignIn = () => {
      if (username === "") {
        setError('Veuillez entrer un nom d\'utilisateur.'); // Afficher un message d'erreur
        return; // Ne pas continuer si le nom d'utilisateur est vide
      }
        // Verifier si le mot de passe est vide
      if (password === "") {
        setError('Veuillez entrer un mot de passe.'); // Afficher un message d'erreur
        return; // Ne pas continuer si le mot de passe est vide
      }

      signIn(username, password)
        .then(token => {
          setToken(token); 
          setUsernameContext(username);  
          navigation.navigate('Home'); // Rediriger vers la page d'accueil
        })
        .catch(err => setError(err.message)); 


  };



  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Bienvenue !</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor="#888"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      {error && <Text style={styles.error}>{error}</Text>} 
      <TouchableOpacity style={styles.button} onPress={handleSignIn}> {/* Nouveau bouton stylisé */}
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
      <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
        Pas encore de compte ?  <Text style={styles.linkHighlight}>Inscrivez-vous</Text>
      </Text>
    </View>
  );

}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#e9f5e9', 
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#3a6a4b', 
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 20,
    color: '#5a7b5a', 
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 55,
    borderColor: '#b2d6b2', 
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#ffffff', 
    fontSize: 16,
  },
  error: {
    color: '#d9534f', 
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#66bb6a', 
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#ffffff', 
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    textAlign: 'center',
    fontSize: 16,
    color: '#3a6a4b', 
    marginTop: 15,
  },
  linkHighlight: {
    color: '#66bb6a', 
    fontWeight: '600',
  },
});
