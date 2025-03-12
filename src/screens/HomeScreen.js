import { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";

import { Button, TextInput } from 'react-native-paper';
import { width, height } from '../utils/main';

import { initDatabase } from '../components/Datatable';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const handleUsernameChange = (username) => setUsername(username);

  const handleLogin = async ({ username }) => {
    if (!validateForm()) return;
    setLoading(true);
    setLoading(false);
    navigation.navigate('QuizScreen', { username: username });
  };

  const validateForm = () => {
    let isValid = true;
    setUsername('');
    if (!username) {
      setUsernameError('Username is required!')
      isValid = false;
    }
    return isValid;
  };

  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.containerScreen]}>
        <View style={[styles.containerForm]}>
          <TextInput
            type='outlined'
            disabled={loading}
            label='Username'
            error={usernameError}
            value={username}
            onChangeText={handleUsernameChange}
            style={styles.input}
          />
        </View>
        <View style={[styles.containerButtons]}>
          <Button
            type='contained'
            buttonColor='#0077b6'
            textColor='#FFFFFF'
            loading={loading}
            disabled={loading}
            style={styles.button}
            onPress={handleLogin}
          >
            {loading ? 'Loading...': 'Play!'}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  containerScreen: {
    alignItems: 'center',
    flex: 1,
    height: height * 1,
    justifyContent: 'center',
    width: width * 1,
  },
  containerForm: {
    alignItems: 'center',
    height: '80%',
    justifyContent: 'center',
    width: '100%',
  },
  containerButtons: {
    alignItems: 'center',
    height: '20%',
    justifyContent: 'center',
    width: '100%',
  },

  input: {
    height: 80,
    width: width * 0.8,
  },
  button: {
    alignItems: 'center',
    height: 60,
    justifyContent: 'center',
    width: width * 0.8,
  },
});
