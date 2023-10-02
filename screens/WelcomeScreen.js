import { StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { AuthContext } from "../store/auth-context";

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMesssage] = useState("");

  const authCtx = useContext(AuthContext);

  const token = authCtx.token;

  useEffect(() => {
    axios
      .get(
        "https://react-native-expenses-14061-default-rtdb.firebaseio.com/message.json?auth=" +
          token
      )
      .then((response) => {
        console.log("respuesta:", response.data);
        setFetchedMesssage(response.data);
      })
      .catch((err) => {
        console.log("Error Consultado Backend-message:", err);
      });
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Bienvenido!</Text>
      <Text>Autenticado exitosamente!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
