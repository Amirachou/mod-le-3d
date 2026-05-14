import { StatusBar } from 'expo-status-bar';
import { Alert, Linking, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

// Android uses GLB with Google Scene Viewer.
// iOS uses USDZ with AR Quick Look.
// These are the public direct URLs from the Vercel deployment.
const ANDROID_GLB_URL = 'https://mod-le-3d.vercel.app/models/free__la_tour_eiffel.glb';
const IOS_USDZ_URL = 'https://mod-le-3d.vercel.app/models/Clock_Tower_Big_Ben.usdz';

export default function App() {
  const openModelInAR = async () => {
    try {
      if (Platform.OS === 'android') {
        const encodedGlbUrl = encodeURIComponent(ANDROID_GLB_URL);
        const sceneViewerUrl =
          `https://arvr.google.com/scene-viewer/1.0?file=${encodedGlbUrl}&mode=ar_preferred`;

        await Linking.openURL(sceneViewerUrl);
        return;
      }

      if (Platform.OS === 'ios') {
        await Linking.openURL(IOS_USDZ_URL);
        return;
      }

      Alert.alert('AR not supported', 'This AR test supports Android and iOS devices only.');
    } catch (error) {
      Alert.alert('Could not open AR', 'Make sure the model URL is public and this device supports AR.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AR Model Test</Text>
      <Text style={styles.subtitle}>Android uses GLB, iOS uses USDZ</Text>
      <Pressable style={styles.button} onPress={openModelInAR}>
        <Text style={styles.buttonText}>Open Model in AR</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f2',
    padding: 24,
  },
  title: {
    color: '#1d2a2e',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#526063',
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2f6f73',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
