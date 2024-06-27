import React from 'react'
import { Box } from 'native-base'

const Card = ({ background = 'white', children, ...props }) => {
  return (
    <Box
      {...props}
      mb={2}
      p={2}
      border="1"
      borderRadius={'md'}
      bg={background}
      shadow={'2'}
    >
      {children}
    </Box>
  )
}

export default Card