import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('quizz');

export const initDatabase = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS questions (id INT PRIMARY KEY NOT NULL, options TEXT NOT NULL, answer TEXT NOT NULL);
  `);
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS scores (id INT PRIMARY KEY NOT NULL, username TEXT NOT NULL, score INT NOT NULL);
  `);
};

export const addQuestion = async (question, options, answer) => {
  await db.runAsync('INSERT INTO questions (question, options, answer) VALUES (?, ?, ?)', question, JSON.stringify(options), answer);
};

export const getQuestions = async () => {
  await db.getAllAsync('SELECT * FROM questions');
};

export const addScore = async (username, score) => {
  await db.runAsync('INSERT INTO scores (username, score) VALUES (?, ?)', username, score);
};

export const getTopScores = async () => {
  await db.getAllAsync('SELECT * FROM scores ORDER BY score DESC LIMIT 4');
};