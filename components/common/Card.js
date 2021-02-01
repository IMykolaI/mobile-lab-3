import React from "react";
import { View, Appearance } from "react-native";

const Card = props => {
  return (
    <View
      style={
        Appearance.getColorScheme() === "dark"
          ? styles.blackStyle
          : styles.containerStyle
      }
    >
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    width: 360,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  },
  blackStyle: {
    width: 360,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#333",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  }
};

export { Card };
