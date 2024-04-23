import { Slot } from 'expo-router';
import React from 'react'
import Header from '../../components/Header';
import { View } from 'native-base';

const _layout = () => {
  return (
    <>
      <Header />
      <View px={1}>
        <Slot />
      </View>
    </>
  )
}

export default _layout