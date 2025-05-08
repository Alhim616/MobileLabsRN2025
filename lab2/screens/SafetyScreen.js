import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Tabs from '../components/Tabs';
import AnimatedProgressBar from '../components/guardComponents/AnimatedProgressBar';
import { TABS } from '../data/guardTabs';
import { useTheme } from '@react-navigation/native';
import sampleTabsStyles from '../styles/sampleTabsStyles';
import getSafetyStyles from '../styles/safetyStyles';

const CODE_LENGTH = 5;
const INTERVAL = 30;

function generateCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

const SafetyScreen = () => {
  const [activeTab, setActiveTab] = useState('guard');
  const [code, setCode] = useState(generateCode());
  const [secondsLeft, setSecondsLeft] = useState(INTERVAL);
  const progress = useRef(new Animated.Value(1)).current;
  const { colors } = useTheme();
  const mainStyles = sampleTabsStyles(colors);
  const styles = getSafetyStyles(colors);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 0,
      duration: INTERVAL * 1000,
      useNativeDriver: false,
    }).start();

    const timer = setInterval(() => {
      setCode(generateCode());
      setSecondsLeft(INTERVAL);
      progress.setValue(1);
      Animated.timing(progress, {
        toValue: 0,
        duration: INTERVAL * 1000,
        useNativeDriver: false,
      }).start();
    }, INTERVAL * 1000);

    const secondCountdown = setInterval(() => {
      setSecondsLeft((prev) => (prev > 1 ? prev - 1 : 1));
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(secondCountdown);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Tabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} styles={mainStyles} />

      {activeTab === 'guard' && (
        <>
          <Text style={styles.loggedIn}>Вхід як гравець</Text>
          <Text style={styles.code}>{code}</Text>
          <AnimatedProgressBar progress={progress} styles={styles} />
          <Text style={styles.timerText}>{secondsLeft} сек</Text>
          <Text style={styles.infoText}>
            Ви повинні вводити свій код кожного разу, коли вводите свій пароль для входу в свій Steam аккаунт.
          </Text>
          <Text style={styles.tipText}>
            Поради: Якщо ви не ділитеся своїм комп'ютером, ви можете вибрати "Запам'ятати пароль" при вході в PC-клієнт, щоб вводити свій пароль та код автентифікатора рідше.
          </Text>

          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Remove Authenticator</Text>
              <Text style={styles.arrow}>{'>'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>My Recovery Code</Text>
              <Text style={styles.arrow}>{'>'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Help</Text>
              <Text style={styles.arrow}>{'>'}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {activeTab === 'confirm' && (
        <Text style={styles.menuText}>
          Тут буде контент для підтвердження.
        </Text>
      )}
    </View>
  );
};

export default SafetyScreen;
