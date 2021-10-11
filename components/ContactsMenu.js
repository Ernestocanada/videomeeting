import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const ContactsMenuButtons = [
  {
    id: 1,
    type: "starred",
  },

  {
    id: 2,
    type: "contact",
    name: "Ernesto",
    photo: require("../assets/ernesto.jpg"),
  },
  {
    id: 3,
    type: "contact",
    name: "Hildeliza",
    photo: require("../assets/person1.jpg"),
  },
  {
    id: 4,
    type: "contact",
    name: "Irina",
    photo: require("../assets/person2.jpg"),
  },
];

function ContactsMenu() {
  return (
    <View style={styles.container}>
      {/* contact Container */}

      {ContactsMenuButtons.map(({ id, type, name, photo }) => (
        <View key={id} style={styles.row}>
          {/*  Image */}
          {type === "starred" ? (
            <View style={styles.starredIcon}>
              <AntDesign name="star" size={30} color="#efefef" />
            </View>
          ) : (
            <Image source={photo} style={styles.image} />
          )}

          {/* Text */}
          <Text style={styles.text}>
            {type === "starred" ? "Starred" : `${name}`}
          </Text>
        </View>
      ))}
    </View>
  );
}

export default ContactsMenu;

const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  starredIcon: {
    backgroundColor: "#333333",
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 20,
  },

  text: {
    color: "white",
    paddingLeft: 15,
    fontSize: 18,
  },
});
