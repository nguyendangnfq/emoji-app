import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect } from 'react';
import { createContext, useState, useCallback } from 'react';
import { MoodOptionType, MoodOptionWithTimeStamp } from './types';

type AppContextType = {
  moodList: MoodOptionWithTimeStamp[];
  handleSelectMood: (mood: MoodOptionType) => void;
};

type AppData = {
  moods: MoodOptionWithTimeStamp[];
};

type ProviderProps = {
  children: React.ReactNode;
};

const defaultValue = {
  moodList: [],
  handleSelectMood: () => {},
};

const storageKey = 'my-app-data';

const getAppData = async (): Promise<AppData | null> => {
  try {
    const data = await AsyncStorage.getItem(storageKey);

    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    return null;
  }

  return null;
};

const setAppData = async (newData: AppData) => {
  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(newData));
  } catch {}
};

const AppContext = createContext<AppContextType>(defaultValue);

export const AppProvider: React.FC<ProviderProps> = props => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimeStamp[]>([]);

  useEffect(() => {
    const getDataFromStorage = async () => {
      const data = await getAppData();

      if (data) {
        setMoodList(data.moods);
      }
    };
    getDataFromStorage();
  }, []);

  const handleSelectMood = useCallback((mood: MoodOptionType) => {
    setMoodList(current => {
      const newValue = [...current, { mood, timestamp: Date.now() }];
      setAppData({ moods: newValue });
      return newValue;
    });
  }, []);
  return (
    <AppContext.Provider value={{ moodList, handleSelectMood }}>
      {props.children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
