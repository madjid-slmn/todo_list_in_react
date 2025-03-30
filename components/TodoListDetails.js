import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList,Button, Image,Text,Switch, TouchableOpacity, Alert ,StyleSheet} from 'react-native';
import { getTodos, createTodo, updateTodo, deleteTodo } from './todo'; 
import Input from './UI/Input'; // Composant pour ajouter de nouveaux TodoItems
import { TokenContext } from '../Context/Context'; 



export default function TodoListDetails({ route }) {
  const [token] = useContext(TokenContext);
  const [todoItems, setTodoItems] = useState([]);
  const { id } = route.params; // ID de la TodoList
  const [completedCount, setCompletedCount] = useState(0); 
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'uncompleted'



 // pour recuperer les todoitem d'une liste
  useEffect(() => {
    
    const fetchTodoItems = () => {
      
         getTodos(id, token)
          .then(items =>{
            setTodoItems(items);

          })
          .catch (error => {
            console.error('Erreur lors de la récupération des TodoItems:', error);
            Alert.alert('Erreur', 'Impossible de récupérer les TodoItems');   
          });
        };
    fetchTodoItems();
  }, [id, token]);








  //  mettre a jour le compteur de taches realisees
  useEffect(() => {
    const count = todoItems.filter(item => item.done).length;
    setCompletedCount(count);
  }, [todoItems]);

 


    // Fonction pour ajouter un TodoItem
    const addTodo =  (text) => {
      if (!text.trim()) {
        Alert.alert('Erreur', 'Le titre ne peut pas être vide');
        return;
      }
      // Utiliser l'API pour ajouter un item
       createTodo(text, id, token)
         .then(newItem =>{
          setTodoItems(prevItems => [...prevItems, newItem]); // Mettre à jour la liste des TodoItems 
         })
         .catch (error => {
            console.error('Erreur lors de l\'ajout du TodoItem:', error);
            Alert.alert('Erreur', 'Impossible d\'ajouter le TodoItem');
       });
      };




    // Fonction pour cocher ou decocher un item
    const toggleDone =  (itemId, currentDone) => {
      
        updateTodo(itemId, !currentDone, token)
        .then(updatedItem =>{
          setTodoItems(prevItems =>
            prevItems.map(item => (item.id === itemId ? updatedItem : item))
          );
        })
        .catch (error => {
          console.error('Erreur lors de la mise à jour du TodoItem:', error);
          Alert.alert('Erreur', 'Impossible de mettre à jour le TodoItem');
        });    
    };

   // supprimer un item 
   const deleteItem =  (itemId) => {
    
       deleteTodo(itemId, token)
       .then(() =>{
        setTodoItems(prevItems => prevItems.filter(item => item.id !== itemId));
       })
      .catch (error => {
        console.error('Erreur lors de la suppression:', error);
        Alert.alert('Erreur', 'Impossible de supprimer le TodoItem');
      });  
  };

  // Fonction pour marquer toutes les taches comme realisee
  const checkAll =  () => {
    
       Promise.all(todoItems.map(item => updateTodo(item.id, true, token)))
       .then(updatedItems => {
        setTodoItems(updatedItems); 
         })

       .catch (error => {
        console.error('Erreur lors de la mise à jour des TodoItems:', error);
        Alert.alert('Erreur', 'Impossible de marquer toutes les tâches comme réalisées');
       });
  };



  // Fonction pour decocher tous les TodoItems
  const uncheckAll =  () => {
    
    Promise.all(todoItems.map(item => updateTodo(item.id, false, token)) )
      .then(() => {
        setTodoItems(prevItems => prevItems.map(item => ({ ...item, done: false }))); // Mettre à jour l'état local
      })
      .catch (error => {
        console.error('Erreur lors de la mise à jour des TodoItems:', error);
        Alert.alert('Erreur', 'Impossible de décocher les TodoItems');

      }); 
  };

  const completedPercentage = todoItems.length > 0 ? completedCount / todoItems.length : 0;        
    

  // Rendu de chaque TodoItem (le todoitem )  
 
  const renderTodoItem = ({ item }) => {
    // les conditions pour filtrer les taches
    if (filter === 'completed' && !item.done) return null; // Ne pas afficher si le filtre est "completed" mais l'item n'est pas fait
    if (filter === 'uncompleted' && item.done) return null; // Ne pas afficher si le filtre est "uncompleted" mais l'item est deja fait


    
    return (
      <View style={styles.todoItem}>
        <Switch
          value={item.done}
          onValueChange={() => toggleDone(item.id, item.done)}
        />
        <Text
          style={[
            styles.todoText,
            item.done ? styles.completed : null
          ]}
        >
          {item.content}
        </Text>
    
        <TouchableOpacity onPress={() => deleteItem(item.id)}>
          <Image
            source={require('../assets/trash-can-outline.png')}
            style={styles.Icon}
            
          />
        </TouchableOpacity>
      </View>
    );
  };


  return (
    <View style={styles.container}>
      
      <Input placeholder="Ajouter un TodoItem" buttonText="Ajouter" onSubmit={addTodo} />
      {/* Affichage du compteur */}
    <Text style={styles.counter} >Tâches réalisées : {completedCount}/{todoItems.length}</Text>
    <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${completedPercentage * 100}%` }]} />
      </View>
 
    <View style={styles.buttonsContainer}>
      <TouchableOpacity style={styles.button} onPress={checkAll}>
        <Text style={styles.buttonText}>Marquer toutes comme réalisées</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={uncheckAll}>
          <Text style={styles.buttonText}>Marquer toutes comme non réalisées</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setFilter('all')}>
          <Text style={styles.buttonText}> Toutes les tâches</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setFilter('completed')}>
          <Text style={styles.buttonText}>Tâches Réalisées</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setFilter('uncompleted')}>
          <Text style={styles.buttonText}> Tâches non réalisées</Text>
      </TouchableOpacity>
    </View>
      {/* Affichage des TodoItems */}
      <FlatList
        data={todoItems}
        renderItem={renderTodoItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

// Styles pour le composant


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#FFF',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  todoText: {
    fontSize: 16,
    marginRight: 10,
    flex: 1,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'grey',
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 20,
  },
  counter: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
  },
  Icon: {
    width: 24,
    height: 24,
    tintColor: '#66bb6a', 
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#66bb6a', 
    paddingVertical: 10,
    borderRadius: 5, 
    alignItems: 'center', 
    justifyContent: 'center', 
    flex: 1, 
    marginHorizontal: 5, 
  },
  buttonText: {
    color: '#ffffff', 
    fontSize: 16, 
    fontWeight: 'bold', 
  },
  progressBar: {
    height: 20,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#76ddc0',
  },
});