import React from 'react'
import Header from '../../../components/Header'
import { Slot } from 'expo-router'
import { ScrollView } from 'native-base'

const _layout = () => {
  return (
    <>
      <Header />
      <Slot />
    </>
  )
}

export default _layout