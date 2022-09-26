import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function App() {
  return (
    <RootSiblingParent>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
