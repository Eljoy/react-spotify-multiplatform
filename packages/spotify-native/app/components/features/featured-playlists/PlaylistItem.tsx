import * as faker from 'faker';
import React, {useState} from 'react';
import {
  Image,
  ImageStyle,
  NativeModules,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated, {useAnimatedRef} from 'react-native-reanimated';
import {AppBackground} from '../../containers';
import Layout from '../../layout/Layout';
import {SubTitleText} from '../../typography';
const {StatusBarManager} = NativeModules;

const images = [
  'https://m.media-amazon.com/images/I/61d8t0gNa+L._SS500_.jpg',
  'https://www.udiscovermusic.com/wp-content/uploads/2015/10/Janelle-Mona%CC%81e-Dirty-Computer-.jpg',
  'https://i.pinimg.com/originals/8d/e4/20/8de42050e671b93b1d6bad2f2764ba89.jpg',
  'https://i.pinimg.com/originals/44/86/16/4486167e8fec4d4438a12707da02537f.jpg',
];

type Position = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const yOffset = Platform.OS === 'ios' ? 20 : 0;

const measure = async ref =>
  new Promise(resolve =>
    ref.measureInWindow((x, y, width, height, pageX, pageY) =>
      resolve({
        x,
        y: y - yOffset,
        width,
        height,
        pageX,
        pageY,
      }),
    ),
  );

export function PlaylistItemContainer() {
  const [modalParams, setModalParams] = useState(null);
  const playlistItemNodes = images.map((uri, id) => (
    <PlaylistItem
      uri={uri}
      id={id}
      onPress={(id, position) => {
        setModalParams({uri: images[id], position});
      }}
    />
  ));
  return (
    <AppBackground>
      <ScrollView>
        <Layout align="center center" paddingScale={0}>
          {playlistItemNodes}
        </Layout>
      </ScrollView>
      {modalParams && <Modal {...modalParams} />}
    </AppBackground>
  );
}

export function PlaylistItem({
  uri,
  id,
  onPress,
}: {
  uri: string;
  id: number;
  onPress: (id: number, position: Position) => void;
}) {
  const containerRef = useAnimatedRef();
  const imageStyle: ImageStyle[] = [{width: 300, height: 300, borderRadius: 8}];
  const startTransition = async () => {
    const position = (await measure(containerRef.current)) as Position;
    onPress(id, position);
  };
  return (
    <Layout marginScale={3}>
      <TouchableWithoutFeedback onPress={startTransition}>
        <Animated.View ref={containerRef as any}>
          <Image source={{uri}} style={imageStyle} />
        </Animated.View>
      </TouchableWithoutFeedback>
    </Layout>
  );
}

function Modal({uri, position}: {uri: string; position: Position}) {
  const imageStyle: ImageStyle[] = [
    {
      borderRadius: 8,
      width: position.width,
      height: position.height,
    },
  ];
  return (
    <Animated.View
      style={{
        position: 'absolute',
        width: position.width,
        left: position.x,
        top: position.y,
        zIndex: 100,
      }}>
      <AppBackground>
        <Animated.Image source={{uri}} style={imageStyle} />
        <SubTitleText>{faker.lorem.lines(10)}</SubTitleText>
      </AppBackground>
    </Animated.View>
  );
}
