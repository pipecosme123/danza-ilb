import React from 'react'
import { Box } from 'native-base'
import { Slot } from 'expo-router'
import { statusBarHeight } from '../../constants'

const _layout = () => {
  return (
    <Box mt={statusBarHeight}>
      <Slot />
    </Box>
  )
}

export default _layout