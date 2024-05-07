import React from 'react'
import IconButtons from './IconButtons'
import { Input } from 'native-base'

const InputSearch = ({ type = 'text', handleClick }) => {
  return (
    <Input
      type={type}
      w="100%"
      py="0"
      InputRightElement={
        <IconButtons
          size="xs"
          handleClick={() => console.log(2222)}
          icon='search'
        />}
      placeholder="Password" />
  )
}

export default InputSearch