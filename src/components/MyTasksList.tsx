import React, { useState } from 'react';
import { FlatList, TouchableOpacity, View, Text, StyleSheet, FlatListProps, Switch } from 'react-native';

interface FlatListHeaderComponentProps {
  toggleSwitch: () => void;
  isDarkMode: boolean;
}

function FlatListHeaderComponent({ isDarkMode, toggleSwitch }: FlatListHeaderComponentProps) {

  return (
    <View style={styles.main}>
      <Text style={isDarkMode ? styles.headerDark : styles.header}>Minhas tasks</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isDarkMode ? "#565BFF" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isDarkMode}
      />
    </View>
  )
}

interface MyTasksListProps {
  tasks: {
    id: number;
    title: string;
    done: boolean;
  }[];
  onPress: (id: number) => void;
  onLongPress: (id: number) => void;
  toggleSwitch: () => void;
  isDarkMode: boolean;
}

export function MyTasksList({ tasks, onLongPress, onPress, isDarkMode, toggleSwitch }: MyTasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity
            testID={`button-${index}`}
            activeOpacity={0.7}
            onPress={() => onPress(item.id)}
            onLongPress={() => onLongPress(item.id)}
            style={item.done ? isDarkMode ? styles.taskButtonDoneDark : styles.taskButtonDone : styles.taskButton}
          >
            <View
              testID={`marker-${index}`}
              style={[item.done 
                ? styles.taskMarkerDone : styles.taskMarker, 
                isDarkMode && item.done ?  styles.taskMarkerDoneDark : styles.taskMarkerDark]}
            />
            <Text
              style={[item.done
                ? isDarkMode ? styles.taskTextDoneDark : styles.taskTextDone 
                : isDarkMode ? styles.taskTextDark : styles.taskText]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )
      }}
      ListHeaderComponent={<FlatListHeaderComponent isDarkMode={isDarkMode} toggleSwitch={toggleSwitch}/>}
      ListHeaderComponentStyle={{
        marginBottom: 20
      }}
      style={{
        marginHorizontal: 24,
        marginTop: 32,
      }}
    />
  )
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  header: {
    color: '#3D3D4D',
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold'
  },
  headerDark: {
    color: '#565BFF',
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold'
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3D3D4D',
    marginRight: 10
  },
  taskMarkerDark: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#565BFF',
    marginRight: 10
  },
  taskText: {
    color: '#3D3D4D',
  },
  taskTextDark: {
    color: '#E1E1E6',
  },
  taskButtonDone: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(25, 61, 223, 0.1)',
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskButtonDoneDark: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(33, 33, 54, 0.3)',
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: '#273FAD',
    marginRight: 10
  },
  taskMarkerDoneDark: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: '#565BFF',
    marginRight: 10
  },
  taskTextDone: {
    color: '#A09CB1',
    textDecorationLine: 'line-through'
  },
  taskTextDoneDark: {
    color: 'rgba(255, 255, 230, 0.6)',
    textDecorationLine: 'line-through'
  }
})