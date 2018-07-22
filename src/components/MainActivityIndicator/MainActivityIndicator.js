import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const mainActivityIndicator = props => (
  <View style={styles.activityIndicatorContainer}>
    <ActivityIndicator/>
  </View>
);

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
});

export default mainActivityIndicator;
