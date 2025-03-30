import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TokenContext } from '../Context/Context'; // Importer le contexte

import TodoListsScreen from '../Screen/TodoListsScreen';
import HomeScreen from '../Screen/HomeScreen';
import SignInScreen from '../Screen/SignInScreen';
import SignOutScreen from '../Screen/SignOutScreen';
import SignUpScreen from '../Screen/SignUpScreen';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const [token] = useContext(TokenContext); 

  return (
    <NavigationContainer>
      <Tab.Navigator
              screenOptions={{
                tabBarActiveTintColor: '#3a6a4b', // Vert foncé pour les icônes actives
                tabBarInactiveTintColor: '#a0c1a0', // Teinte plus claire pour les icônes inactives
                headerShown: false, // Masquer le header par défaut
              }}
      
      >
        {token ? ( // Si l'utilisateur est connecté, afficher ces écrans
          <>
            <Tab.Screen name='Home' 
             component={HomeScreen} 
             options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="home" color={color} size={size} /> // Icone de home
              ),

            }} />
            <Tab.Screen name='TodoLists' component={TodoListsScreen}
            options={{ 
              tabBarIcon: ({ color, size }) => (
                <Icon name="menu" color={color} size={size} /> // Icône des 3 barres pour TodoLists
              ),
             }} 
            /> 
            <Tab.Screen name='SignOut'
             component={SignOutScreen} 
             options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="logout" color={color} size={size} /> // Icone de déconnexion
              ),
            }}
            />
          </>
        ) : ( // Si l'utilisateur n'est pas connecté, afficher uniquement ces écrans
          <>
            <Tab.Screen name='SignIn' 
            component={SignInScreen} 
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="person-add" color={color} size={size} /> // Icone d'inscription
              ),   
            }}        
            />
            <Tab.Screen name='SignUp'
             component={SignUpScreen}
             options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="person-add" color={color} size={size} /> // Icone d'inscription
              ),
            }}          
              />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );

 
}


