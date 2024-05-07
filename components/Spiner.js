import { Center, Spinner } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'

const Spiner = () => {
  return (
    <Center w={'full'} h={'full'} bg={'muted.500'} style={style.Spiner}>
      <Spinner size='500' />
    </Center>
  )
}

const style = StyleSheet.create({
  Spiner: {
    position: 'absolute',
    top: 0,
    zIndex: 10,
    opacity: .5
  }
})

export default Spiner