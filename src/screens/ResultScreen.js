import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Button, TextInput, DataTable} from "react-native-paper";
import { width, height } from "../utils/main";

import { getTopScores } from "../components/Datatable";

const ResultScreen = ({route, navigation}) => {
  const {score} = route.params;
  const [topScore, setTopScore] = useState([]);
  
  useFocusEffect(() => {
    getTopScores(setTopScore);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.containerScreen]}>
        <View style={[styles.containerHeader]}>
          <Text style={[styles.text]}>Votre score est de {score}</Text>
        </View>
        <View style={[styles.containerRanking]}>
          {/* <Datatable /> */}
          {topScore.map((item, index) => (
            <Text key={index}>{item.name}:{item.score}</Text>
          ))}
        </View>
        <View style={[styles.containerButtons]}>
          <Button
            type="contained"
            buttonColor="#0077b6"
            textColor="#FFFFFF"
            loading={loading}
            disabled={loading}
            style={styles.button}
            onPress={() => navigation.navigate("HomeScreen")}
          >
            {loading ? "Loading..." : "Replay"}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  containerScreen: {
    alignItems: "center",
    flex: 1,
    height: height * 1,
    justifyContent: "center",
    width: width * 1,
  },
});
