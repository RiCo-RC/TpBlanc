import { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button, TextInput } from 'react-native-paper';
import { width, height } from '../utils/main';

import { getQuestions, addScore } from '../components/Datatable';

const QuizScreen = ({ route, navigation }) => {
  const {username} = route.params;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    getQuestions(setQuestions);
  }, []);

  const handleAnswer = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) setScore(score + 1);
    
    if (currentQuestionIndex + 1 < questions.length) setCurrentQuestionIndex(currentQuestionIndex + 1);
    else {
      addScore(username, score);
      navigation.navigate('ResultScreen', { score })
    }
    
    if (questions.length === 0) {
      return <View><Text>Loading questions...</Text></View>
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  console.log(currentQuestion);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.containerScreen]}>
      <View style={[styles.containerHeader]}>
        <Text style={[styles.text]}>Question n°{currentQuestionIndex}</Text>
        <Text style={[styles.text]}>Score : {score}</Text>
      </View>
      <View style={[styles.containerQuizz]}>
        <View style={[styles.containerQuizzQuestion]}>
          <Text style={[styles.question]}>{currentQuestion.question}</Text>
        </View>
        <View style={[styles.containerQuizzAnswers]}>
          {JSON.parse(currentQuestion.options).map(option => {
            <Button key={option} title={option} onPress={() => handleAnswer(option)} />
          })}
        </View>
      </View>
        <View style={[styles.containerButtons]}>
          <Button
            type='contained'
            buttonColor='#0077b6'
            textColor='#FFFFFF'
            loading={loading}
            disabled={loading}
            style={styles.button}
            onPress={() => navigation.navigate('RankingScreen')}
          >
            {loading ? 'Loading...': 'Continue'}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  containerScreen: {
    alignItems: 'center',
    flex: 1,
    height: height * 1,
    justifyContent: 'center',
    width: width * 1,
  },
});
