import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native";
import { useCharactersInfiniteQuery } from "./hooks/useCharactersInfiniteQuery";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Searchbar } from "react-native-paper";
import { Avatar } from "react-native-paper";
import ProfileDialog from "./components/ProfileDialog";
import { Character } from "./types/Character";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";



export default function HomeScreen() {

  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.removeQueries({ queryKey: ["characters"] });
  }, [search]);
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useCharactersInfiniteQuery(search);
  const characters = data?.pages.flatMap((page) => page.results) ?? [];


  const [isGrid, setIsGrid] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#97ce4c" }}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearch}
        value={search}
        style={{ margin: 10 }}
      />

      <View style={{ flexDirection: "row" }}>
        <Button
          onPress={() => {
            setIsGrid(true);
          }}
          style={isGrid ? {} : { opacity: 0.3 }}
        >
          <Feather name="grid" size={24} color="black" />
        </Button>
        <Button
          onPress={() => {
            setIsGrid(false);
          }}
          style={isGrid ? { opacity: 0.3 } : {}}
        >
          <Feather name="list" size={24} color="black" />
        </Button>
      </View>

      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={200} color="#0000ff" />
        </View>
      ) : (
        <FlatList
          style={{ backgroundColor: "#97ce4c", borderRadius: 30 }}
          numColumns={isGrid ? 2 : 1}
          key={isGrid ? "grid" : "list"}
          ListFooterComponent={
            <>
              {isFetchingNextPage && (
                <ActivityIndicator
                  size="large"
                  style={{ marginVertical: 16 }}
                />
              )}
              {!hasNextPage && (
                <View style={{ width: "100%", minHeight: 40 }}>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 24,
                    }}
                  >
                    Reached end of page
                  </Text>
                </View>
              )}
            </>
          }
          onEndReachedThreshold={0.01}
          onEndReached={() => fetchNextPage()}
          columnWrapperStyle={
            isGrid ? { justifyContent: "space-evenly" } : undefined
          }
          contentContainerStyle={{
            padding: 10,
            gap: 10,
          }}
          data={characters}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }: { item: Character }) =>
            isGrid ? (
              <View
                style={{
                  width: "45%",
                  backgroundColor: "#02afc5",
                  borderRadius: 20,
                  padding: 10,
                  borderColor: "black",
                  borderWidth: 1,
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <View
                  style={{
                    borderWidth: 3,
                    borderColor: "white",
                    borderRadius: 999,
                  }}
                >
                  <Avatar.Image source={{ uri: item.image }} size={120} />
                </View>
                <Text
                  style={{ fontSize: 24, color: "white", fontWeight: "bold" }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  {item.status == "Dead" ? (
                    <FontAwesome5 name="skull" size={18} color="white" />
                  ) : item.status == "Alive" ? (
                    <AntDesign name="heart" size={18} color="#90ee90" />
                  ) : (
                    <AntDesign name="question" size={20} color="red" />
                  )}
                  <Text style={{ color: "white" }}>
                    {item.status.toUpperCase()}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: "#88e23b",
                    borderRadius: 10,
                    width: "100%",
                  }}
                >
                  <ProfileDialog {...item} />
                </View>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  // marginBottom: 10,
                  borderRadius: 20,
                  padding: 10,
                  borderColor: "black",
                  borderWidth: 1,
                  justifyContent: "space-between",
                  backgroundColor: "#02afc5",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      overflow: "hidden",
                      borderColor: "white",
                      borderWidth: 3,
                      borderRadius: 999,
                    }}
                  >
                    <Avatar.Image source={{ uri: item.image }} size={70} />
                  </View>
                  <View style={{ flex: 1, marginEnd: 10 }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        maxWidth: "100%",
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      {item.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      {item.status == "Dead" ? (
                        <FontAwesome5 name="skull" size={18} color="white" />
                      ) : item.status == "Alive" ? (
                        <AntDesign name="heart" size={18} color="#90ee90" />
                      ) : (
                        <AntDesign name="question" size={20} color="red" />
                      )}
                      <Text style={{ color: "white" }}>
                        {item.status.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </View>
                <ProfileDialog {...item} />
              </View>
            )
          }
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
