import { Text } from 'native-base'
import React from 'react'

const Paragraph = ({ children }) => {
  return (
    <Text fontSize={"md"} pb={3}>{children}</Text>
  )
}

export default Paragraph