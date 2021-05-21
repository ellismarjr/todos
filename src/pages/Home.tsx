import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  async function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle) {
      const data = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      };

      setTasks(prevArray => [...prevArray, data]);
      await AsyncStorage.setItem('@todoApp:tasks', JSON.stringify([...tasks, data]))
    }
  }

  async function handleMarkTaskAsDone(id: number) {
    const taskExists = tasks.find(task => task.id === id);
    if (taskExists) {
      const tasksFiltered = tasks.map(task => task.id === id
        ? { ...task, done: !task.done }
        : task);

      setTasks(tasksFiltered);
      await AsyncStorage.setItem('@todoApp:tasks', JSON.stringify(tasksFiltered));
    }
  }

  async function handleRemoveTask(id: number) {
    const tasksFiltered = tasks.filter(task => task.id !== id);
    setTasks(tasksFiltered);
    await AsyncStorage.setItem('@todoApp:tasks', JSON.stringify(tasksFiltered));
  }

  useEffect(() => {
    async function getTasks() {
      const response = await AsyncStorage.getItem('@todoApp:tasks');
      if (response) {
        setTasks(JSON.parse(response));
      }
    }

    getTasks();
  }, []);

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList
        tasks={tasks}
        onPress={handleMarkTaskAsDone}
        onLongPress={handleRemoveTask}
      />
    </>
  )
}