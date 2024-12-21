import { Video, useAV } from 'expo-av';
import { useEffect, useRef, useState } from 'react';
import * as Permissions from 'expo-permissions';

const VideoPlayer = () => {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [hasPermission, setHasPermission] = useState(null);
  const { registerPlayer, unregisterPlayer } = useAV();

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      setHasPermission(status === 'granted');
    })();

    registerPlayer(video);
    return () => unregisterPlayer(video);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {hasPermission === null ? (
        <Text>Requesting permissions...</Text>
      ) : hasPermission === false ? (
        <Text>Camera roll permissions denied.</Text>
      ) : (
        <Video
          ref={video}
          style={{ width: 300, height: 300 }}
          source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      )}
    </View>
  );
};

export default VideoPlayer;