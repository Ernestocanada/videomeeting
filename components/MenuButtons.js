import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function MenuButtons({ navigation }) {
  const openMeeting = () => {
    navigation.navigate("Room");
  };

  const items = [
    {
      id: 1,
      name: "video-camera",
      title: "New Meeting",
      customColor: "#FF751F",
    },
    {
      id: 2,
      name: "plus-square",
      title: "Join",
    },
    {
      id: 3,
      name: "calendar",
      title: "Schedule",
    },
    {
      id: 4,
      name: "upload",
      title: "Share Screen",
    },
  ];

  return (
    <View style={styles.container}>
      {items.map(({ id, name, title, customColor }) => (
        <View key={id} style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => openMeeting()}
            style={{
              ...styles.button,
              backgroundColor: customColor ? customColor : "#0470DC",
            }}
          >
            <FontAwesome name={name} size={23} color={"#efefef"} />
          </TouchableOpacity>
          <Text style={styles.menuText}>{title}</Text>
        </View>
      ))}
    </View>
  );
}

export default MenuButtons;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingBottom: 10,
    borderBottomColor: "#1F1F1F",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    alignItems: "center",
    flex: 1,
  },
  button: {
    width: 50,
    height: 50,

    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  menuText: {
    color: "#858585",
    fontSize: 12,
    paddingTop: 10,
    fontWeight: "600",
  },
});
