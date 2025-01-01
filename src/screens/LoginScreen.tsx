import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Portal, Dialog, Paragraph, Button as PaperButton } from "react-native-paper";
import Input from "../components/Input";
import Button from "../components/Button";
import { login } from "../services/api";
import { setAuthToken } from "../utils/auth";
import { AuthResponse, ApiError } from "../types";

type RootStackParamList = {
  MainTabs: undefined;
  Register: undefined;
};

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      setDialogMessage("Please fill in all fields");
      setVisible(true);
      return;
    }

    setLoading(true);
    try {
      const response = (await login(username, password)) as AuthResponse;
      await setAuthToken(response.data.token);
      navigation.reset({
        index: 0,
        routes: [{ name: "MainTabs" }],
      });
    } catch (error: any) {
      const apiError = error as ApiError;
      const errorMessage = apiError.data?.message || "Something went wrong";
      const errors = apiError.data?.errors;
      const passwordError = errors?.password;
      const usernameError = errors?.username;
      setDialogMessage(
        passwordError
          ? `${errorMessage}: ${passwordError}`
          : usernameError
          ? `${errorMessage}: ${usernameError}`
          : errorMessage
      );
      setVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require("../../assets/icon.png")} 
        style={styles.logo} 
        resizeMode="contain"
      />
      <Input
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#e1b5c4"
        style={styles.input}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#e1b5c4"
        style={styles.input}
      />
      <Button
        title={loading ? "Logging in..." : "Login"}
        onPress={handleLogin}
        disabled={loading}
        style={styles.button}
      />
      <TouchableOpacity
        style={styles.registerLink}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.registerText}>Don't have an account? Register</Text>
      </TouchableOpacity>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{dialogMessage}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton onPress={() => setVisible(false)}>OK</PaperButton>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f8bbd0", // Modern soft pink background
  },
  logo: {
    width: "60%",
    height: 150,
    alignSelf: "center",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#f3d6e1", // Light pink for input background
    color: "#5f3a4b", // Deep pink for text
    marginBottom: 20,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e1b5c4",
    elevation: 3, // Slight shadow for depth
  },
  button: {
    backgroundColor: "#f06292", // Bright pink for button
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
    elevation: 4, // Button shadow
  },
  registerLink: {
    marginTop: 24,
    alignItems: "center",
  },
  registerText: {
    color: "#ad678a", 
    fontWeight: "600",
    fontSize: 15,
  },
});

export default LoginScreen;
