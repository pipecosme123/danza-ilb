import React from 'react'
import { Box } from 'native-base'

const Card = ({ width = 'full', height = 'full', children }) => {
  return (
    <Box
      w={width}
      h={height}
      my={2}
      p={1}
      border="1"
      borderRadius={'md'}
      bg={'white'}
      shadow={'2'}
    >
      {children}
    </Box>
  )
}

export default Card