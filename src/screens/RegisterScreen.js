// Importações React
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

// Importação de bibliotecas
import { auth } from "../services/firebase.js";

// Importação de componentes
import MyInput from "../components/Input";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home", { userLevel: 0 });
      }
    });
    return unsubscribe;
  }, []);

  // Handle para atualizar email
  function changeEmail(value) {
    setEmail(value);
  }

  // Handle para atualizar a senha
  function changePassword(value) {
    setPassword(value);
  }

  // Handle para identificar cadastramento
  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with: ", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ImageBackground
        source={require("../assets/backgroundRegister.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title1}>Cadastre-se!</Text>
          <Text style={styles.title2}>Para ficar por dentro</Text>
          <View style={styles.titleContainerAlign}>
            <Text style={styles.title2}>das melhores </Text>
            <Text style={[styles.title2, { color: "#FFF" }]}>piadas!</Text>
          </View>
        </View>
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
          <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            <Text style={styles.buttonText}>CADASTRAR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerTextConteiner}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={[styles.registerText, { color: "#000" }]}>
              Já é cadastrado?{" "}
            </Text>
            <Text style={[styles.registerText, { color: "#FFF" }]}>
              Clique aqui!
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

// Estilização da tela
const styles = StyleSheet.create({
  backgroundImage: {
    backgroundColor: "#FBC401",
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    paddingTop: 20,
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  titleContainer: {
    width: "100%",
    paddingHorizontal: 45,
  },
  titleContainerAlign: {
    flexDirection: "row",
  },
  title1: {
    color: "#FFF",
    fontSize: 35,
    fontWeight: "700",
  },
  title2: {
    color: "#433327",
    fontSize: 26,
    fontWeight: "600",
  },
  inputContainer: {
    marginTop: 25,
    width: "100%",
    paddingHorizontal: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#433327",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 45,
    // marginTop: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  registerTextConteiner: {
    alignItems: "center",
    marginTop: 15,
  },
  registerText: {
    fontSize: 17,
    fontWeight: "500",
  },
});

export default RegisterScreen;
