import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function Input({ placeholder, buttonText, onSubmit }) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim() !== '') {
      onSubmit(text);
      setText(''); // reinitialise l'input après soumission
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#3a6a4b" 
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{buttonText}</Text> {/* Affichage du texte sur le bouton */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#66bb6a', 
    paddingVertical: 10, 
    borderRadius: 5, 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  buttonText: {
    color: '#ffffff', 
    fontSize: 16, 
    fontWeight: 'bold', 
  },
});
