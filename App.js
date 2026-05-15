import { StatusBar } from 'expo-status-bar';
import {
  Alert,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// ============================================================================
// VERCEL DOMAIN
// ============================================================================

const VERCEL_DOMAIN = 'https://mod-le-3d.vercel.app';

// ============================================================================
// MONUMENTS DATABASE
// ============================================================================

const MONUMENTS = {
  bigben: {
    name: 'Big Ben',
    glbUrl: null, // No Android GLB yet
    usdzUrl: `${VERCEL_DOMAIN}/models/Clock_Tower_Big_Ben.usdz`,
  },

  colosseum: {
    name: 'Colosseum',
    glbUrl: `${VERCEL_DOMAIN}/models/colosseum.glb`,
    usdzUrl: `${VERCEL_DOMAIN}/models/colosseum.usdz`,
  },

  eiffel: {
    name: 'Eiffel Tower',
    glbUrl: null, // No Android GLB yet
    usdzUrl: `${VERCEL_DOMAIN}/models/eiffel.usdz`,
  },
};

// ============================================================================
// CHANGE THIS TO TEST DIFFERENT MONUMENTS
// ============================================================================

const CURRENT_MONUMENT = MONUMENTS.colosseum;

// ============================================================================
// APP
// ============================================================================

export default function App() {
  const openModelInAR = async () => {
    try {
      // ======================================================================
      // ANDROID
      // ======================================================================

      if (Platform.OS === 'android') {
        // Check if GLB exists
        if (!CURRENT_MONUMENT.glbUrl) {
          Alert.alert(
            'Not available on Android',
            `${CURRENT_MONUMENT.name} has no GLB model yet.`
          );
          return;
        }

        // Encode GLB URL
        const encodedGlbUrl = encodeURIComponent(
          CURRENT_MONUMENT.glbUrl
        );

        // Google Scene Viewer URL
        const sceneViewerUrl =
          `https://arvr.google.com/scene-viewer/1.0?file=${encodedGlbUrl}&mode=ar_preferred`;

        await Linking.openURL(sceneViewerUrl);
        return;
      }

      // ======================================================================
      // IOS
      // ======================================================================

      if (Platform.OS === 'ios') {
        // Check if USDZ exists
        if (!CURRENT_MONUMENT.usdzUrl) {
          Alert.alert(
            'Not available on iOS',
            `${CURRENT_MONUMENT.name} has no USDZ model yet.`
          );
          return;
        }

        // Open AR Quick Look
        await Linking.openURL(CURRENT_MONUMENT.usdzUrl);
        return;
      }

      // ======================================================================
      // OTHER DEVICES
      // ======================================================================

      Alert.alert(
        'AR not supported',
        'This AR test supports Android and iOS devices only.'
      );
    } catch (error) {
      Alert.alert(
        'Could not open AR',
        'Make sure the model URL is public and this device supports AR.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AR Monument Viewer</Text>

      <Text style={styles.subtitle}>
        Current Monument: {CURRENT_MONUMENT.name}
      </Text>

      <Pressable style={styles.button} onPress={openModelInAR}>
        <Text style={styles.buttonText}>Open Model in AR</Text>
      </Pressable>

      <Text style={styles.infoText}>
        {Platform.OS === 'android'
          ? 'Android uses GLB + Google Scene Viewer'
          : 'iOS uses USDZ + AR Quick Look'}
      </Text>

      <StatusBar style="auto" />
    </View>
  );
}

// ============================================================================
// STYLES
// ============================================================================

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

  infoText: {
    marginTop: 20,
    color: '#526063',
    fontSize: 13,
    textAlign: 'center',
  },
});