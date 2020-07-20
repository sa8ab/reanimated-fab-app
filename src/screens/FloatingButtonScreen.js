import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  BackHandler,
  TextInput,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  useDerivedValue,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import {
  TapGestureHandler,
  TouchableOpacity,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';
import {useSafeArea} from 'react-native-safe-area-context';

const size = Dimensions.get('window');

const config = {
  damping: 20,
  mass: 0.2,
  stiffness: 80,
};
const FloatingButtonScreen = () => {
  console.log('rendering');
  const [isOpen, setIsOpen] = useState(false);
  const {top} = useSafeArea();
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (isOpen) {
          closeFloating();
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [isOpen, closeFloating]),
  );

  const width = useSharedValue(58);
  const height = useSharedValue(58);
  // const bottom = useSharedValue(20);
  // const right = useSharedValue(20);
  // const borderRadius = useSharedValue(29);
  // const elevation = useSharedValue(5);
  const elevation = useDerivedValue(() => {
    return interpolate(
      height.value,
      [58, size.height],
      [5, 0],
      Extrapolate.CLAMP,
    );
  });
  const contentOpacity = useDerivedValue(() => {
    return interpolate(
      height.value,
      [58, size.height],
      [0, 1],
      Extrapolate.CLAMP,
    );
  });
  const bottom = useDerivedValue(() => {
    return interpolate(
      height.value,
      [58, size.height],
      [20, 0],
      Extrapolate.CLAMP,
    );
  });
  const right = useDerivedValue(() => {
    return interpolate(
      height.value,
      [58, size.height],
      [20, 0],
      Extrapolate.CLAMP,
    );
  });
  const borderRadius = useDerivedValue(() => {
    return interpolate(
      height.value,
      [58, size.height],
      [29, 0],
      Extrapolate.CLAMP,
    );
  });

  const closeFloating = () => {
    'worklet';
    width.value = withSpring(58, config);
    height.value = withSpring(58, config);
    // bottom.value = withSpring(20, config);
    // right.value = withSpring(20, config);
    // borderRadius.value = withTiming(29);
    // elevation.value = withTiming(5);
    setIsOpen(false);
  };

  const handler = useAnimatedGestureHandler({
    onEnd: () => {
      console.log('tap handler');
      width.value = withSpring(size.width, config);
      height.value = withSpring(size.height, config);
      // bottom.value = withSpring(0);
      // right.value = withSpring(0);
      // borderRadius.value = withTiming(0);
      // elevation.value = withTiming(0);
      setIsOpen(true);
    },
  });
  const panHandler = useAnimatedGestureHandler({
    onStart: () => {
      console.log('panStart');
    },
    onActive: (event) => {
      height.value = size.height - event.translationY;
      width.value = size.width - event.translationX;
    },
    onEnd: (event) => {
      if (event.velocityY > 0) {
        closeFloating();
      } else {
        width.value = withSpring(size.width, {
          velocity: -event.velocityX,
          damping: 20,
          mass: 0.2,
          stiffness: 80,
        });
        height.value = withSpring(size.height, {
          velocity: -event.velocityY,
          damping: 20,
          mass: 0.2,
          stiffness: 80,
        });
      }
    },
  });

  const sz = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: height.value,
      bottom: bottom.value,
      right: right.value,
      borderRadius: borderRadius.value,
      elevation: elevation.value,
    };
  });

  const sx = useAnimatedStyle(() => {
    return {
      opacity: contentOpacity.value,
    };
  });

  const renderContent = () => {
    return (
      <PanGestureHandler onGestureEvent={panHandler}>
        <Animated.View style={[s.pan]}>
          <Text style={s.title}>Add your thing</Text>

          <PanGestureHandler>
            <TextInput style={s.input} />
          </PanGestureHandler>
          <TapGestureHandler>
            <TouchableOpacity
              style={s.send}
              onPress={() => console.log('button press')}>
              <Text>Submit your thing</Text>
            </TouchableOpacity>
          </TapGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    );
  };
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Text
        style={{
          paddingTop: top,
        }}>
        hdfgdcsdchji
      </Text>
      <TapGestureHandler maxDurationMs={20000} onGestureEvent={handler}>
        <Animated.View style={[s.button, sz]}>
          <Text style={s.text}>+</Text>
          <Animated.View
            style={[s.contentContainer, sx]}
            pointerEvents={isOpen ? 'auto' : 'none'}>
            {renderContent()}
          </Animated.View>
        </Animated.View>
      </TapGestureHandler>
    </View>
  );
};

export default FloatingButtonScreen;

const s = StyleSheet.create({
  button: {
    backgroundColor: '#0097e6',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    overflow: 'hidden',
  },
  text: {
    color: 'white',
    fontSize: 25,
  },
  contentContainer: {
    position: 'absolute',
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#5f27cd',
  },
  pan: {
    flex: 1,
  },
  input: {
    backgroundColor: 'whitesmoke',
    borderRadius: 10,
    margin: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    paddingVertical: 50,
  },
  send: {
    padding: 10,
    backgroundColor: '#feca57',
    alignItems: 'center',
    margin: 20,
    borderRadius: 10,
  },
});
