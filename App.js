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

import { useState } from 'react';
import { WebView } from 'react-native-webview';
const MONUMENTS = {
  bigben: {
    name: 'Big Ben',
    android: 'https://mod-le-3d.vercel.app/models/big_ben.glb',
    ios: 'https://mod-le-3d.vercel.app/models/Clock_Tower_Big_Ben.usdz',
    object3d: 'https://mod-le-3d.vercel.app/models/big_ben.glb',
  },

  colosseum: {
    name: 'Colosseum',
    android: 'https://mod-le-3d.vercel.app/models/colosseum.glb',
    ios: 'https://mod-le-3d.vercel.app/models/Colosseum.usdz',
    object3d: 'https://mod-le-3d.vercel.app/models/colosseum.glb',
  },

  eiffel: {
    name: 'Eiffel Tower',
    android: 'https://mod-le-3d.vercel.app/models/eiffel.glb',
    ios: 'https://mod-le-3d.vercel.app/models/eiffel.usdz',
    object3d: 'https://mod-le-3d.vercel.app/models/eiffel.glb',
  },

  girl: {
    name: 'Girl Character',
    android: 'https://mod-le-3d.vercel.app/models/girl-character.glb',
    ios: null,
    object3d: 'https://mod-le-3d.vercel.app/models/girl-character.glb',
  },

  atena: {
    name: 'Atena',
    android: 'https://mod-le-3d.vercel.app/models/atena.glb',
    ios: null,
    object3d: 'https://mod-le-3d.vercel.app/models/atena.glb',
  },

  atena1: {
    name: 'Atena 1',
    android: 'https://mod-le-3d.vercel.app/models/atena1.glb',
    ios: null,
    object3d: 'https://mod-le-3d.vercel.app/models/atena1.glb',
  },

  judy: {
    name: 'Judy Hopps',
    android: 'https://mod-le-3d.vercel.app/models/judy_hopps_farmer_outfit.glb',
    ios: null,
    object3d: 'https://mod-le-3d.vercel.app/models/judy_hopps_farmer_outfit.glb',
  },

  talkingBen: {
    name: 'Talking Ben',
    android: 'https://mod-le-3d.vercel.app/models/talking_ben_ai_-_ben.glb',
    ios: null,
    object3d: 'https://mod-le-3d.vercel.app/models/talking_ben_ai_-_ben.glb',
  },
};

export default function App() {
  const [selectedKey, setSelectedKey] = useState('colosseum');
  const [viewMode, setViewMode] = useState('object');

  const selectedMonument = MONUMENTS[selectedKey];

  const openModelInAR = async () => {
    try {
      if (Platform.OS === 'android') {
        if (!selectedMonument.android) {
          Alert.alert(
            'Not available on Android',
            `${selectedMonument.name} has no Android GLB model yet.`
          );
          return;
        }

        const encodedGlbUrl = encodeURIComponent(selectedMonument.android);

        const sceneViewerUrl =
          `https://arvr.google.com/scene-viewer/1.0?file=${encodedGlbUrl}&mode=ar_preferred`;

        await Linking.openURL(sceneViewerUrl);
        return;
      }

      if (Platform.OS === 'ios') {
        if (!selectedMonument.ios) {
          Alert.alert(
            'Not available on iOS',
            `${selectedMonument.name} has no iOS USDZ model yet.`
          );
          return;
        }

        await Linking.openURL(selectedMonument.ios);
        return;
      }

      Alert.alert('AR not supported', 'Use Android or iOS to test AR.');
    } catch (error) {
      Alert.alert(
        'Could not open AR',
        'Make sure the model URL is public and this device supports AR.'
      );
    }
  };

  const modelViewerHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
        <style>
          body {
            margin: 0;
            background: #111;
            overflow: hidden;
          }

          model-viewer {
            width: 100vw;
            height: 100vh;
            background: #111;
          }
        </style>
      </head>

      <body>
        <model-viewer
          src="${selectedMonument.object3d}"
          ar
          ${selectedKey === 'talkingBen' ? 'autoplay' : ''}
          ${selectedKey === 'talkingBen' ? 'animation-name="Ben Talking Mouth Loop"' : ''}
          auto-rotate
          camera-controls
          shadow-intensity="1"
          exposure="1"
        >
        </model-viewer>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AR Monument Viewer</Text>

      <Text style={styles.subtitle}>
        Selected: {selectedMonument.name}
      </Text>

      {/* Monument Selector */}
      <View style={styles.selector}>
        {Object.entries(MONUMENTS).map(([key, monument]) => (
          <Pressable
            key={key}
            style={[
              styles.monumentButton,
              selectedKey === key && styles.monumentButtonActive,
            ]}
            onPress={() => {
              setSelectedKey(key);
              setViewMode('object');
            }}
          >
            <Text
              style={[
                styles.monumentButtonText,
                selectedKey === key && styles.monumentButtonTextActive,
              ]}
            >
              {monument.name}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Mode Switch */}
      <View style={styles.modeContainer}>
        <Pressable
          style={[
            styles.modeButton,
            viewMode === 'object' && styles.modeButtonActive,
          ]}
          onPress={() => setViewMode('object')}
        >
          <Text style={styles.modeButtonText}>3D Object</Text>
        </Pressable>

        <Pressable
          style={[
            styles.modeButton,
            viewMode === 'ar' && styles.modeButtonActive,
          ]}
          onPress={() => setViewMode('ar')}
        >
          <Text style={styles.modeButtonText}>AR View</Text>
        </Pressable>
      </View>

      {/* OBJECT MODE */}
      {viewMode === 'object' && (
        <View style={styles.viewerContainer}>
          {selectedMonument.object3d ? (
            <WebView
              originWhitelist={["*"]}
              source={{ html: modelViewerHTML }}
              style={styles.webview}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                3D View not available for this monument.
              </Text>
            </View>
          )}
        </View>
      )}

      {/* AR MODE */}
      {viewMode === 'ar' && (
        <View style={styles.arContainer}>
          <Text style={styles.arTitle}>
            Open {selectedMonument.name} in AR
          </Text>

          <Pressable style={styles.arButton} onPress={openModelInAR}>
            <Text style={styles.arButtonText}>Launch AR</Text>
          </Pressable>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1115',
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },

  subtitle: {
    color: '#9ba1a6',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },

  selector: {
    gap: 10,
    marginBottom: 20,
  },

  monumentButton: {
    backgroundColor: '#1c1f26',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  monumentButtonActive: {
    backgroundColor: '#2f6f73',
  },

  monumentButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },

  monumentButtonTextActive: {
    color: 'white',
  },

  modeContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },

  modeButton: {
    flex: 1,
    backgroundColor: '#1c1f26',
    paddingVertical: 12,
    borderRadius: 10,
  },

  modeButtonActive: {
    backgroundColor: '#2f6f73',
  },

  modeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },

  viewerContainer: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 20,
    backgroundColor: '#111',
  },

  webview: {
    flex: 1,
    backgroundColor: '#111',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    color: '#aaa',
  },

  arContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  arTitle: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },

  arButton: {
    backgroundColor: '#2f6f73',
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 14,
  },

  arButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
