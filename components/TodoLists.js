import React, { useContext, useState, useEffect } from 'react';
import { View, FlatList, Alert, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { TouchableOpacity, Image } from 'react-native';

import { TokenContext, UsernameContext } from '../Context/Context';
import { createTodoList } from './todoList';
import { getTodoLists, deleteTodoList,renameTodoList } from './todoList';

import Input from './UI/Input';

export default function TodoLists({ navigation }) {
  const [token] = useContext(TokenContext);
  const [username] = useContext(UsernameContext);
  const [todoLists, setTodoLists] = useState([]);


 
// Charger toutes les todolistes d'un utilsateur 
  useEffect(() => {
    const loadTodoLists =  () => {
      
       getTodoLists(username, token)
       .then(fetchedTodoLists =>{
        setTodoLists(fetchedTodoLists);
        console.log(fetchedTodoLists);
        console.log("le username", username);
        console.log("le token", token);


       })
       .catch (error =>{
          console.error('Erreur lors de la récupération des TodoLists:', error);
          Alert.alert('Erreur', 'Impossible de récupérer les TodoLists');
       });    
    };

    loadTodoLists(); 
  }, [username, token]);




  // fonction pour ajouter une todolist
  const addTodoList = (title) => {
    if (!title.trim()) {
      console.log('Erreur', 'Le titre ne peut pas être vide');
      Alert.alert('Erreur', 'Le titre ne peut pas être vide');
      return;
    }

    
       createTodoList(username, title, token)
       .then(newTodoList => {
         setTodoLists(prevLists => [...prevLists, newTodoList]);

       })
       .catch (error=>{
        console.error('Erreur lors de l\'ajout de la TodoList:', error);
        Alert.alert('Erreur', 'Impossible d\'ajouter la TodoList');
       });

  };

  // fonction pour renomer une todolist
  const handleRename = (id, newTitle) => {
    if (!newTitle.trim()) {
      console.log('Erreur', 'Le titre ne peut pas être vide');
      Alert.alert('Erreur', 'Le titre ne peut pas être vide');
      return;
    }
    console.log('Renommer TodoList avec les paramètres:', { id, newTitle, token });

    renameTodoList(id, newTitle, token)
      .then(updatedTodo => {
        
        setTodoLists(prevLists =>
          prevLists.map(list => (list.id === id ? { ...list, title: newTitle } : list))
        );
        
        

        console.log('TodoList renommée:', updatedTodo);
      })
      .catch(error => {
        console.error('Erreur lors de la modification de la TodoList:', error);
        Alert.alert('Erreur', 'Impossible de renommer la TodoList');
      });
  };





  // Fonction pour supprimer un élément
  const handleDelete = (id) => {
    deleteTodoList(id, token) // Appel API pour supprimer l'élément
      .then(n => {
        setTodoLists(prevTodoLists => prevTodoLists.filter(list => list.id !== id)); 
        console.error('supresion avec succes');
      }).catch(error => {
        console.error('Erreur lors de la suppression:', error);
        Alert.alert('Erreur', 'Impossible de supprimer la liste');
      })
  };


  // Composant pour rendre chaque item de la liste
  const renderTodoListItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('TodoListDetails', { id: item.id })}>
      <View style={styles.listItem}>
        <Text style={styles.listTitle}>{item.title}</Text>
        <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Image source={require('../assets/trash-can-outline.png')} style={styles.Icon} />
        </TouchableOpacity>
           {/* Bouton pour déclencher la modification */}
          <TouchableOpacity onPress={() => {
             const newTitle = prompt('Nouveau titre:', item.title);
             if (newTitle !== null) {
               handleRename(item.id, newTitle);
             }
        }}>
           <Image source={require('../assets/edit.png')} style={styles.Icon} />
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
  );


  return (
    <View style={styles.container} >
      {/* Composant Input pour ajouter une nouvelle TodoList */}
      <Input
        placeholder="Ajouter une nouvelle TodoList"
        buttonText="Ajouter"
        onSubmit={addTodoList}
      />

      {/* Liste des TodoLists */}
      <FlatList
        data={todoLists}
        renderItem={renderTodoListItem}
        keyExtractor={item => item.id.toString()}
        style={styles.listContainer} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e9f5e9', 
  },
  listContainer: {
    marginTop: 20,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#ffffff', 
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3a6a4b', 
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  Icon: {
    width: 24,
    height: 24,
    tintColor: '#66bb6a', 
    marginLeft: 10,
  },
});