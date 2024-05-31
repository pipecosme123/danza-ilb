import React from 'react'
import { Slot } from 'expo-router'
import { HeaderBack } from '../../../components'

const _layout = () => {
  return (
    <>
      <HeaderBack />
      <Slot />
    </>
  )
}

export default _layout