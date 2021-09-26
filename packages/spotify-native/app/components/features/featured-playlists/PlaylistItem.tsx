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
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
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
      <GestureHandlerRootView>
        <ScrollView>
          <Layout align="center center" paddingScale={0}>
            {playlistItemNodes}
          </Layout>
        </ScrollView>
        {modalParams && (
          <Modal
            {...modalParams}
            onClose={() => {
              setModalParams(null);
            }}
          />
        )}
      </GestureHandlerRootView>
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
  const imageStyle: ImageStyle[] = [
    {width: 300, height: 300, borderRadius: 8, resizeMode: 'cover'},
  ];
  const startTransition = async () => {
    const position = (await measure(containerRef.current)) as Position;
    onPress(id, position);
  };
  return (
    <Layout marginScale={3}>
      <TouchableWithoutFeedback onPress={startTransition}>
        <Animated.View ref={containerRef as any}>
          <Image source={{uri}} style={imageStyle} resizeMode="cover" />
        </Animated.View>
      </TouchableWithoutFeedback>
    </Layout>
  );
}

function workletClamp(num: number, lower: number, upper: number) {
  'worklet';
  if (lower > upper) upper = [lower, (lower = upper)][0];
  if (num <= lower) return lower;
  if (num >= upper) return upper;
  return num;
}

function Modal({
  uri,
  position,
}: {
  uri: string;
  position: Position;
  onClose: () => void;
}) {
  const height = useSharedValue(position.height);
  const width = useSharedValue(position.width);
  const left = useSharedValue(position.left);
  const top = useSharedValue(position.top);
  const borderRadius = useSharedValue(8);
  const style = useAnimatedStyle<ViewStyle>(() => ({
    height: height.value,
    width: width.value,
    transform: [{translateX: left.value}, {translateY: top.value}],
    position: 'absolute',
    zIndex: 100,
  }));
  const imageStyle = useAnimatedStyle<ImageStyle>(() => ({
    width: width.value,
    height: width.value,
    borderRadius: borderRadius.value,
  }));
  const config: Animated.WithSpringConfig = {
    stiffness: 150,
  };

  const getModalSharedTransitionParams = withModalSharedTransition(
    {
      leftValue: position.left,
      borderRadiusValue: 8,
      topValue: position.top,
      widthValue: position.width,
      heightValue: position.height,
    },
    {
      leftValue: 0,
      topValue: 0,
      heightValue: wWidth,
      widthValue: wWidth,
      borderRadiusValue: 0,
    },
  );

  useLayoutEffect(() => {
    setTimeout(() => {
      setModalAnimStyle(getModalSharedTransitionParams('opened'));
    }, 100);
  }, []);

  function setModalAnimStyle({
    leftValue,
    topValue,
    widthValue,
    heightValue,
    borderRadiusValue,
  }: ModalTransitionParam) {
    'worklet';
    left.value = withSpring(leftValue, config);
    top.value = withSpring(topValue, config);
    width.value = withSpring(widthValue, config);
    height.value = withSpring(heightValue, config);
    borderRadius.value = withSpring(borderRadiusValue, config);
  }

  const eventTranslationThreshold = 20;
  const onGesture = useAnimatedGestureHandler({
    onActive: (event, context) => {
      console.log('event.translationY ', event.translationY);
      if (event.translationY >= eventTranslationThreshold) {
        const params = getModalSharedTransitionParams('closed');
        setModalAnimStyle(params);
      } else {
        const params = getModalSharedTransitionParams(
          'active',
          event.translationY,
        );
        setModalAnimStyle(params);
      }
    },
    onEnd: _ => {
      // top.value = withSpring(0);
      // left.value = withSpring(0);
    },
  });

  return (
    <Animated.View style={style}>
      <AppBackground flex={1}>
        <PanGestureHandler onGestureEvent={onGesture}>
          <Animated.Image style={[styles.image, imageStyle]} source={{uri}} />
        </PanGestureHandler>
        <Layout style={[styles.content]}>
          <Text style={styles.title}>{faker.lorem.text()}</Text>
          <Text style={styles.subtitle}>{faker.lorem.lines(40)}</Text>
        </Layout>
      </AppBackground>
    </Animated.View>
  );
}

type ModalTransitionParam = {
  leftValue: number;
  topValue: number;
  borderRadiusValue: number;
  widthValue: number;
  heightValue: number;
};

function withModalSharedTransition(
  notStartedParams: ModalTransitionParam,
  completeParams: ModalTransitionParam,
) {
  'worklet';
  return function (
    state: 'closed' | 'active' | 'opened',
    translationY?: number,
  ): ModalTransitionParam {
    'worklet';
    switch (state) {
      case 'closed':
        return notStartedParams;
      case 'opened':
        return completeParams;
      case 'active':
        const multiply = workletClamp(translationY / 100, 0, 1);
        const leftValue = workletClamp(
          notStartedParams.leftValue * multiply,
          notStartedParams.leftValue,
          completeParams.leftValue,
        );
        const topValue = workletClamp(
          notStartedParams.topValue * multiply,
          notStartedParams.topValue,
          completeParams.topValue,
        );
        const widthValue = workletClamp(
          completeParams.widthValue * (1 - multiply),
          notStartedParams.widthValue,
          completeParams.widthValue,
        );
        const heightValue = workletClamp(
          completeParams.heightValue * (1 - multiply),
          notStartedParams.heightValue,
          completeParams.heightValue,
        );
        const borderRadiusValue = workletClamp(
          notStartedParams.borderRadiusValue -
            notStartedParams.borderRadiusValue * (1 - multiply),
          notStartedParams.borderRadiusValue,
          completeParams.borderRadiusValue,
        );
        return {
          leftValue,
          topValue,
          widthValue,
          heightValue,
          borderRadiusValue,
        };
    }
  };
}

const styles = StyleSheet.create({
  content: {
    zIndex: 100,
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
  image: {},
});
