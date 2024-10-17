import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

const App = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const addFlashcard = () => {
    if (question.trim() === '' || answer.trim() === '') {
      Alert.alert('Error', 'Please enter both question and answer.');
      return;
    }

    setFlashcards([...flashcards, { question, answer }]);
    setQuestion('');
    setAnswer('');
  };

  const nextFlashcard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      Alert.alert('End of Flashcards', 'You have reached the end of the flashcards.');
    }
  };

  const previousFlashcard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flashcard Quiz App</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Question"
          value={question}
          onChangeText={setQuestion}
        />
        <TextInput
          style={styles.input}
          placeholder="Answer"
          value={answer}
          onChangeText={setAnswer}
        />
        <Button title="Add Flashcard" onPress={addFlashcard} />
      </View>

      {flashcards.length > 0 && (
        <View style={styles.flashcardContainer}>
          <Text style={styles.flashcard}>
            {showAnswer ? flashcards[currentIndex].answer : flashcards[currentIndex].question}
          </Text>
          <Button title={showAnswer ? 'Hide Answer' : 'Show Answer'} onPress={toggleAnswer} />
          <View style={styles.navigation}>
            <Button title="Previous" onPress={previousFlashcard} disabled={currentIndex === 0} />
            <Button title="Next" onPress={nextFlashcard} disabled={currentIndex === flashcards.length - 1} />
          </View>
        </View>
      )}

      {flashcards.length === 0 && (
        <Text style={styles.placeholder}>Add flashcards to start quizzing!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: '#333',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '100%',
  },
  flashcardContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  flashcard: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  placeholder: {
    fontSize: 16,
    color: '#888',
  },
});

export default App;
