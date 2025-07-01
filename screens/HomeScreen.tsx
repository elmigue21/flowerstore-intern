import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native";
import { useCharactersInfiniteQuery } from "./hooks/useCharactersInfiniteQuery";
import { useQueryClient } from "@tanstack/react-query";
import { Avatar ,Box, Input} from "native-base";

export default function HomeScreen() {

  const [search, setSearch] = useState("")
//"https://rickandmortyapi.com/api/character/?name=ri";
const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.removeQueries({ queryKey: ["characters"] });
  }, [search]);


const {
  data,
  isLoading,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
} = useCharactersInfiniteQuery(search);


 const characters = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Input value={search} onChangeText={(text) => setSearch(text)} />
      {isLoading ? (
        <View>
          <Text> FETCHING</Text>
        </View>
      ) : (
        <FlatList
          ListFooterComponent={
            isFetchingNextPage ? <ActivityIndicator size="large" /> : null
          }
          onEndReachedThreshold={0.01}
          onEndReached={() => fetchNextPage()}
          contentContainerStyle={{ padding: 10 }}
          data={characters}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Box
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
                borderRadius: 20,
                padding: 10,
                borderColor: "black",
                borderWidth: 1,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
              }}
            >
              <Avatar
                source={{ uri: item.image }}
                rounded="2xl"
                bg="transparent"
              />
              <View>
                <Text>Name: {item.name}</Text>
                <Text>Status: {item.status}</Text>
              </View>
            </Box>
          )}
        />
      )}
    </SafeAreaView>
  );

}

// const styles = StyleSheet.create({
//   list: {
//     padding: 16,
//   },
//   card: {
//     backgroundColor: "#f0f0f0",
//     padding: 12,
//     marginBottom: 12,
//     borderRadius: 8,
//     elevation: 2,
//   },
//   name: {
//     fontWeight: "bold",
//     fontSize: 16,
//     marginBottom: 4,
//   },
//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
