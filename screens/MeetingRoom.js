import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Touchable,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import StartMeeting from "../components/StartMeeting";
import { io } from "socket.io-client";
import { Camera } from "expo-camera";
import FontAwesome from "react-native-vector-icons/FontAwesome";
let socket;

const menuIcons = [
  {
    id: 1,
    name: "microphone",
    title: "Mute",
    customColor: "#efefef",
  },
  {
    id: 2,
    name: "video-camera",
    title: "Stop Video",
    customColor: "#efefef",
  },
  {
    id: 3,
    name: "upload",
    title: "Share Content",
    customColor: "#efefef",
  },
  {
    id: 4,
    name: "group",
    title: "Participants",
    customColor: "#efefef",
  },
];

///////////////////////////////////////////
function MeetingRoom() {
  const [name, setName] = useState();
  const [roomId, setRoomId] = useState();
  const [activeUsers, SetActiverUsers] = useState([]);
  const [startCamera, setStartCamera] = useState(false);

  const openCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status === "granted") {
      setStartCamera(true);
    } else {
      Alert.alert("Access.denied");
    }
  };

  const joinRoom = () => {
    openCamera();
    socket.emit("join-room", { roomId: roomId, userName: name });
  };
  useEffect(() => {
    const API_URL = "https://ad5f-31-4-236-37.ngrok.io/";
    socket = io(`${API_URL}`);

    socket.on("connection", () => console.log("connected"));

    socket.on("all-users", (users) => {
      SetActiverUsers(users);
    });
  }, []);

  return (
    <View style={styles.container}>
      {startCamera ? (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.activeUsersContainer}>
            <View style={styles.cameraContainer}>
              <Camera
                type={"front"}
                style={{
                  width: activeUsers.length <= 1 ? "100%" : 160,
                  height: activeUsers.length <= 1 ? 600 : 200,
                }}
              ></Camera>
              {activeUsers
                .filter((user) => user.userName !== name)
                .map((user, index) => (
                  <View key={index} style={styles.activeUserContainer}>
                    <Text
                      style={{
                        color: "white",
                      }}
                    >
                      {user.userName}
                    </Text>
                  </View>
                ))}
            </View>
          </View>
          {/* Footer */}
          <View style={styles.menu}>
            {menuIcons.map(({ id, name, title, customColor }) => (
              <TouchableOpacity key={id} style={styles.tile}>
                <FontAwesome name={name} size={24} color={customColor} />
                <Text style={styles.texTile}>{title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </SafeAreaView>
      ) : (
        <StartMeeting
          name={name}
          setName={setName}
          roomId={roomId}
          setRoomId={setRoomId}
          joinRoom={joinRoom}
        />
      )}
    </View>
  );
}

export default MeetingRoom;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1c1c1c",
    flex: 1,
  },

  activeUsersContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",

    alignItems: "center",
    backgroundColor: "black",
  },

  cameraContainer: {
    backgroundColor: "black",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },

  tile: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginTop: 15,
  },
  menu: {
    flexDirection: "row",

    justifyContent: "space-around",
  },

  texTile: {
    color: "white",
    marginTop: 10,
  },
  activeUserContainer: {
    borderColor: "gray",
    borderWidth: 1,
    width: 160,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
});
