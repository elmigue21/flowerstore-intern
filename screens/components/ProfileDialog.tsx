import React from 'react'
import { View,Text } from 'react-native';
import { Dialog ,Button, Portal} from 'react-native-paper';
import { Character } from '../types/Character';
import { Image } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Profile">;

const ProfileDialog = (character: Character) => {
      const [visible, setVisible] = React.useState(false);

      const showDialog = () => setVisible(true);

      const hideDialog = () => setVisible(false);

      const navigation = useNavigation<NavigationProp>();
  return (
    <View>
      <Button
        onPress={showDialog}
        style={{ borderWidth: 1, backgroundColor: "#88e23b" }}
      >
        <Text style={{ color: "black" }}>View More</Text>
      </Button>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={{
            backgroundColor: "#02afc5",
            borderColor: "black",
            borderWidth: 2,
          }}
        >
          <Dialog.Title style={{ color: "white" }}>
            Character Information
          </Dialog.Title>
          <Dialog.Content>
            <Image
              style={{
                width: "100%",
                aspectRatio: 1,
                borderRadius: 180,
                borderWidth: 3,
                borderColor: "white",
              }}
              source={{ uri: character.image }}
            />
            <Text style={{ color: "white", fontSize: 24 }}>
              {character.name.toUpperCase()}
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
              <Text style={{ color: "white", fontSize: 16 }}>
                {character.status.toUpperCase()}
              </Text>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <View style={{ gap: 3, flexDirection: "column", width: "100%" }}>
              <Button
                onPress={() => {navigation.navigate("Profile", {userId:String(character.id)}); setVisible(false)}}
                style={{
                  width: "100%",
                  backgroundColor: "#88e23b",
                  borderRadius: 10,
                  padding: 5,
                }}
              >
                <Text style={{ color: "black" }}>More</Text>
              </Button>
              <Button
                onPress={hideDialog}
                style={{
                  width: "100%",
                  backgroundColor: "#88e23b",
                  borderRadius: 10,
                  padding: 5,
                }}
              >
                <Text style={{ color: "black" }}>Close</Text>
              </Button>
            </View>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

export default ProfileDialog