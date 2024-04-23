import { Center, Spinner } from 'native-base'
import React from 'react'

const Spiner = () => {
  return (
    <Center w={'full'} h={'full'} bg={'muted.100'}>
      <Spinner size="lg" />
    </Center>
  )
}

export default Spiner