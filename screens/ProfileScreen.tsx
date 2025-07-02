import React from 'react'
import { View,Text, SafeAreaView, Image } from 'react-native';
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from '../navigation/AppNavigator';
import { Character } from './types/Character';
import { useEffect, useState } from 'react';
import axios from 'axios';
import  AntDesign  from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
type ProfileRouteProp = RouteProp<RootStackParamList, "Profile">;

const ProfileScreen = () => {
  const route = useRoute<ProfileRouteProp>();
  const { userId } = route.params;
  const [character,setCharacter] = useState<Character | null>(null)
// const userId = 0
    useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character/${userId}`)
      .then((res) => setCharacter(res.data))
      .catch((err) => console.error(err));
  }, [userId]);

  if (!character){
    return (
      <View>
        <Text>Character not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#97ce4c",
        flex: 1,
        alignItems: "center",
        padding: 10,
        gap: 10,
      }}
    >
      <Image
        source={{ uri: character.image }}
        style={{
          width: "80%",
          aspectRatio: 1,
          borderColor: "white",
          borderWidth: 5,
          borderRadius: 20,
        }}
      />
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "white",
          backgroundColor: "#02afc5",
          width: "100%",
          textAlign: "center",
        }}
      >
        {character.name}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
        }}
      >
        {character.status == "Dead" ? (
          <FontAwesome5 name="skull" size={18} color="white" />
        ) : character.status == "Alive" ? (
          <AntDesign name="heart" size={18} color="#90ee90" />
        ) : (
          <AntDesign name="question" size={20} color="red" />
        )}
        <Text style={{ color: "white" }}>{character.status.toUpperCase()}</Text>
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen