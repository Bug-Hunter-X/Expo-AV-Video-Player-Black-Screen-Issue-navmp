import { Video } from 'expo-av';

const VideoPlayer = () => {
  const video = useRef(null);
  const [status, setStatus] = useState({});

  return (
    <Video
      ref={video}
      style={{ width: 300, height: 300 }}
      source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
      useNativeControls
      resizeMode="contain"
      isLooping
      onPlaybackStatusUpdate={status => setStatus(() => status)}
    />
  );
};