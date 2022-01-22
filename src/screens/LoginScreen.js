// Importações React
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

// Importação de bibliotecas
import { auth } from "../services/firebase.js";

// Importação de componentes
import MyInput from "../components/Input";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function changeEmail(value) {
    setEmail(value);
  }

  function changePassword(value) {
    setPassword(value);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with: ", user.email);
      })
      .catch((error) => alert(error.message));
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <MyInput
          placeholder={"Email"}
          value={email}
          setValue={changeEmail}
          icon={"account-circle"}
        />
        <MyInput
          placeholder={"Password"}
          value={password}
          setValue={changePassword}
          icon={"lock"}
          secure={true}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerTextConteiner}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={[styles.registerText, { color: "#000" }]}>
            Não é cadastrado ainda?
          </Text>
          <Text style={[styles.registerText, { color: "#FFF" }]}>
            Clique aqui!
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

// Estilização da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCC401",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    padding: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#433327",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 40,
    marginTop: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
  },
  registerTextConteiner: {
    alignItems: "center",
    marginTop: 15,
  },
  registerText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LoginScreen;
