import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppContext } from '../App.provider';
import { VictoryPie } from 'victory-native';
import _ from 'lodash';

export const Analytics: React.FC = () => {
  const appContext = useAppContext();
  const data = Object.entries(_.groupBy(appContext.moodList, 'mood.emoji')).map(
    ([key, value]: any) => ({
      x: key,
      y: value.length,
    }),
  );

  return (
    <View style={styles.container}>
      <VictoryPie
        data={data}
        colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
        innerRadius={50}
        labelRadius={({ innerRadius }) => innerRadius + 20}
        style={{ labels: { fontSize: 30 } }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
