import * as faker from 'faker';
import React, {useLayoutEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageStyle,
  NativeModules,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {AppBackground} from '../../containers';
import Layout from '../../layout/Layout';
const {StatusBarManager} = NativeModules;
const images = [
  'https://m.media-amazon.com/images/I/61d8t0gNa+L._SS500_.jpg',
  'https://www.udiscovermusic.com/wp-content/uploads/2015/10/Janelle-Mona%CC%81e-Dirty-Computer-.jpg',
  'https://i.pinimg.com/originals/8d/e4/20/8de42050e671b93b1d6bad2f2764ba89.jpg',
  'https://i.pinimg.com/originals/44/86/16/4486167e8fec4d4438a12707da02537f.jpg',
];

const {width: wWidth, height: wHeight} = Dimensions.get('window');

type Position = {
  left: number;
  top: number;
  width: number;
  height: number;
};

const yOffset = Platform.OS === 'ios' ? 20 : 0;

const measure = async ref =>
  new Promise(resolve =>
    ref.measureInWindow((x, y, width, height, pageX, pageY) =>
      resolve({
        left: x,
        top: y - yOffset,
        width,
        height,
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
  const height = useSharedValue(position.height);
  const width = useSharedValue(position.width);
  const left = useSharedValue(position.left);
  const top = useSharedValue(position.top);
  const style = useAnimatedStyle<ViewStyle>(() => ({
    height: height.value,
    width: width.value,
    transform: [{translateX: left.value}, {translateY: top.value}],
    position: 'absolute',
    zIndex: 100,
  }));
  useLayoutEffect(() => {
    setTimeout(() => {
      width.value = withSpring(wWidth);
      height.value = withSpring(wHeight);
      left.value = withSpring(0);
      top.value = withSpring(0);
    }, 100);
  }, []);

  return (
    <Animated.View style={style}>
      <Test app={{source: {uri}}} borderRadius={8} />
    </Animated.View>
  );
}

function Test({app: {source}, borderRadius}) {
  return (
    <>
      <Animated.Image style={[styles.image, {borderRadius: 8}]} {...{source}} />
      <Layout style={[styles.content]}>
        <Text style={styles.title}>{faker.lorem.text()}</Text>
        <Text style={styles.subtitle}>{faker.lorem.lines(40)}</Text>
      </Layout>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    top: 300,
  },
  title: {
    color: 'white',
    fontSize: 34,
    lineHeight: 41,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'white',
    fontSize: 18,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});
