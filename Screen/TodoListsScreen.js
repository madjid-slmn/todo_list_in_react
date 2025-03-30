import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';
import TodoLists from '../components/TodoLists'; 
import TodoListDetails from '../components/TodoListDetails'; 

const Stack = createNativeStackNavigator();

export default function TodoListsScreen() {
  return (
    <Stack.Navigator initialRouteName="TodoLists">
      <Stack.Screen 
        name="TodoLists" 
        component={TodoLists} 
        options={{ title: 'Liste des TodoLists',
          headerTintColor: '#3a6a4b',// couleur directe du titre en vert
         }} 
      />
      <Stack.Screen 
        name="TodoListDetails" 
        component={TodoListDetails} 
        options={{ title: 'Détails de la TodoList',
          headerTintColor: '#3a6a4b',
         }} 
      />
    </Stack.Navigator>
  );
}
