import React, { useContext } from 'react';
import { createContext, useState, useCallback } from 'react';
import { MoodOptionType, MoodOptionWithTimeStamp } from './types';

type AppContextType = {
  moodList: MoodOptionWithTimeStamp[];
  handleSelectMood: (mood: MoodOptionType) => void;
};

type ProviderProps = {
  children: React.ReactNode;
};

const defaultValue = {
  moodList: [],
  handleSelectMood: () => {},
};

const AppContext = createContext<AppContextType>(defaultValue);

export const AppProvider: React.FC<ProviderProps> = props => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimeStamp[]>([]);

  const handleSelectMood = useCallback((selectedMood: MoodOptionType) => {
    setMoodList(current => [
      ...current,
      { mood: selectedMood, timestamp: Date.now() },
    ]);
  }, []);
  return (
    <AppContext.Provider value={{ moodList, handleSelectMood }}>
      {props.children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
