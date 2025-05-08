import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  TapGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  FlingGestureHandler,
  PinchGestureHandler,
  State,
  Directions,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import ClickableObject from '../components/ClickableObject';
import styles from '../../assets/styles/styles';


const GestureButtons = ({gestureMode, setGestureMode}) => {
  const buttons = [
    {mode: 'tap', label: 'Tap'},
    {mode: 'longPress', label: 'Hold'},
    {mode: 'pan', label: 'Drag'},
    {mode: 'pinch', label: 'Pinch'},
    {mode: 'flingRight', label: 'Swipe R'},
    {mode: 'flingLeft', label: 'Swipe L'},
  ];
  return (
    <View style={styles.gestureButtonsContainer}>
      {buttons.map(btn => (
        <TouchableOpacity
          key={btn.mode}
          onPress={() => setGestureMode(btn.mode)}
          style={[
            styles.gestureButton,
            gestureMode === btn.mode && styles.activeGestureButton,
          ]}
        >
          <Text style={styles.gestureButtonText}>{btn.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const GestureHandlerSwitcher = ({
  gestureMode,
  animatedStyle,
  refs,
  handlers,
}) => {
  const {
    singleTapRef,
    doubleTapRef,
    longPressRef,
    panGestureEvent,
    pinchGestureEvent,
  } = refs;
  const {
    onSingleTap,
    onDoubleTap,
    onLongPress,
    onFlingRight,
    onFlingLeft,
  } = handlers;

  const gestureProps = {
    tap: {
      outer: (
        <TapGestureHandler
          ref={singleTapRef}
          waitFor={doubleTapRef}
          onHandlerStateChange={({nativeEvent}) => {
            if (nativeEvent.state === State.ACTIVE) onSingleTap();
          }}>
          <Animated.View>
            <TapGestureHandler
              ref={doubleTapRef}
              numberOfTaps={2}
              onHandlerStateChange={({nativeEvent}) => {
                if (nativeEvent.state === State.ACTIVE) onDoubleTap();
              }}>
              <Animated.View style={animatedStyle}>
                <ClickableObject>
                  <Text>Tap me!</Text>
                </ClickableObject>
              </Animated.View>
            </TapGestureHandler>
          </Animated.View>
        </TapGestureHandler>
      ),
    },
    longPress: {
      outer: (
        <LongPressGestureHandler
          ref={longPressRef}
          minDurationMs={3000}
          onHandlerStateChange={({nativeEvent}) => {
            if (nativeEvent.state === State.ACTIVE) onLongPress();
          }}>
          <Animated.View style={animatedStyle}>
            <ClickableObject>
              <Text>Hold me for 3s!</Text>
            </ClickableObject>
          </Animated.View>
        </LongPressGestureHandler>
      ),
    },
    pan: {
      outer: (
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={animatedStyle}>
            <ClickableObject>
              <Text>Drag me!</Text>
            </ClickableObject>
          </Animated.View>
        </PanGestureHandler>
      ),
    },
    pinch: {
      outer: (
        <PinchGestureHandler onGestureEvent={pinchGestureEvent}>
          <Animated.View style={animatedStyle}>
            <ClickableObject>
              <Text>Pinch me!</Text>
            </ClickableObject>
          </Animated.View>
        </PinchGestureHandler>
      ),
    },
    flingRight: {
      outer: (
        <FlingGestureHandler
          direction={Directions.RIGHT}
          onHandlerStateChange={({nativeEvent}) => {
            if (nativeEvent.state === State.ACTIVE) onFlingRight();
          }}>
          <Animated.View style={animatedStyle}>
            <ClickableObject>
              <Text>Swipe Right!</Text>
            </ClickableObject>
          </Animated.View>
        </FlingGestureHandler>
      ),
    },
    flingLeft: {
      outer: (
        <FlingGestureHandler
          direction={Directions.LEFT}
          onHandlerStateChange={({nativeEvent}) => {
            if (nativeEvent.state === State.ACTIVE) onFlingLeft();
          }}>
          <Animated.View style={animatedStyle}>
            <ClickableObject>
              <Text>Swipe Left!</Text>
            </ClickableObject>
          </Animated.View>
        </FlingGestureHandler>
      ),
    },
    default: {
      outer: (
        <Animated.View style={animatedStyle}>
          <ClickableObject>
            <Text>Select gesture!</Text>
          </ClickableObject>
        </Animated.View>
      ),
    },
  };

  return gestureProps[gestureMode]?.outer || gestureProps.default.outer;
};

const HomeScreen = ({navigation}) => {
  const [score, setScore] = useState(0);
  const [lastGesture, setLastGesture] = useState('None');
  const [gestureMode, setGestureMode] = useState('tap');
  const [clicks, setClicks] = useState(0);
  const [doubleTaps, setDoubleTaps] = useState(0);
  const [longPress, setLongPress] = useState(0);
  const [panned, setPanned] = useState(false);
  const [flingRight, setFlingRight] = useState(false);
  const [flingLeft, setFlingLeft] = useState(false);
  const [pinched, setPinched] = useState(false);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const doubleTapRef = useRef(null);
  const singleTapRef = useRef(null);
  const longPressRef = useRef(null);

  const onSingleTap = () => {
    setScore(prevScore => prevScore + 1);
    setClicks(prevClicks => prevClicks + 1);
    setLastGesture('Single Tap (+1)');
  };

  const onDoubleTap = () => {
    setScore(prevScore => prevScore + 2);
    setDoubleTaps(prevDoubleTaps => prevDoubleTaps + 1);
    setLastGesture('Double Tap (+2)');
  };

  const onLongPress = () => {
    setScore(prevScore => prevScore + 5);
    setLongPress(prevLongPress => prevLongPress + 1);
    setLastGesture('Long Press (+5)');
  };

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: () => {
      runOnJS(setLastGesture)('Pan Gesture');
      runOnJS(setPanned)(true);
    },
  });

  const onFlingRight = () => {
    const points = Math.floor(Math.random() * 10) + 1;
    setScore(prevScore => prevScore + points);
    setFlingRight(true);
    setLastGesture(`Fling Right (+${points})`);
  };

  const onFlingLeft = () => {
    const points = Math.floor(Math.random() * 10) + 1;
    setScore(prevScore => prevScore + points);
    setFlingLeft(true);
    setLastGesture(`Fling Left (+${points})`);
  };

  const pinchGestureEvent = useAnimatedGestureHandler({
    onActive: event => {
      scale.value = event.scale;
    },
    onEnd: () => {
      scale.value = withSpring(1);
      runOnJS(setLastGesture)('Pinch Gesture (+3)');
      runOnJS(setScore)(prevScore => prevScore + 3);
      runOnJS(setPinched)(true);
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: translateX.value},
      {translateY: translateY.value},
      {scale: scale.value},
    ],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.scoreText}>Score: {score}</Text>
      <Text style={styles.lastGestureText}>Last Gesture: {lastGesture}</Text>

      <GestureHandlerSwitcher
        gestureMode={gestureMode}
        animatedStyle={animatedStyle}
        refs={{
          singleTapRef,
          doubleTapRef,
          longPressRef,
          panGestureEvent,
          pinchGestureEvent,
        }}
        handlers={{
          onSingleTap,
          onDoubleTap,
          onLongPress,
          onFlingRight,
          onFlingLeft,
        }}
      />

      <GestureButtons gestureMode={gestureMode} setGestureMode={setGestureMode} />

      <TouchableOpacity
        style={styles.tasksButton}
        onPress={() =>
          navigation.navigate('Tasks', {
            score,
            clicks,
            doubleTaps,
            longPress,
            panned,
            flingRight,
            flingLeft,
            pinched,
          })
        }>
        <Text style={styles.tasksButtonText}>View Tasks</Text>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
