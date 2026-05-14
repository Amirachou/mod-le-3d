import { StatusBar } from 'expo-status-bar';
import { Alert, Linking, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

// This must be the public direct URL of the hosted GLB file.
// After deploying to Vercel, replace YOUR-VERCEL-DOMAIN with the real project domain.
const CASTLE_GLB_URL = 'https://YOUR-VERCEL-DOMAIN.vercel.app/models/castle.glb';

export default function App() {
  const openCastleInAR = async () => {
    if (!CASTLE_GLB_URL.startsWith('https://')) {
      Alert.alert('Hosted URL needed', 'Please paste a public HTTPS .glb URL into CASTLE_GLB_URL.');
      return;
    }

    if (Platform.OS !== 'android') {
      Alert.alert('Android only', 'Scene Viewer AR works on Android devices with Google Play Services for AR.');
      return;
    }

    const encodedModelUrl = encodeURIComponent(CASTLE_GLB_URL);
    const sceneViewerUrl =
      `intent://arvr.google.com/scene-viewer/1.0?file=${encodedModelUrl}&mode=ar_preferred` +
      '#Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;end;';

    try {
      await Linking.openURL(sceneViewerUrl);
    } catch (error) {
      Alert.alert('Could not open AR', 'Make sure this is an Android device with AR support installed.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Castle AR Test</Text>
      <Pressable style={styles.button} onPress={openCastleInAR}>
        <Text style={styles.buttonText}>Open Castle in AR</Text>
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
    marginBottom: 24,
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
