import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { BottomTabsNavigator } from './screens/BottomTabs.navigator';
import { AppProvider } from './App.provider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <BottomTabsNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </AppProvider>
  );
};
