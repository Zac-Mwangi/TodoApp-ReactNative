import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const App = () => {
  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState([]);

  const handleTodoTextChange = (text) => {
    setTodoText(text);
  };

  const handleAddTodo = () => {
    if (todoText.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: todoText, completed: false }]);
      setTodoText('');
    }
  };

  const handleToggleCompletion = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo App</Text>
      <View style={styles.todoForm}>
        <TextInput
          style={styles.input}
          placeholder="Enter your task..."
          value={todoText}
          onChangeText={handleTodoTextChange}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Text style={styles.buttonText}>Add Todo</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity
              style={[styles.checkbox, item.completed && styles.checkboxCompleted]}
              onPress={() => handleToggleCompletion(item.id)}
            />
            <Text style={[styles.todoText, item.completed && styles.todoTextCompleted]}>
              {item.text}
            </Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteTodo(item.id)}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  todoForm: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  addButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007BFF',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#007BFF',
    marginRight: 10,
  },
  checkboxCompleted: {
    backgroundColor: '#007BFF',
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#777',
  },
  deleteButton: {
    marginLeft: 10,
    paddingHorizontal: 10,
  },
  deleteButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default App;
