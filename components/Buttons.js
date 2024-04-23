import React from 'react'
import { Button } from 'native-base'

const Buttons = ({ onPress, children, size, variant, disabled = false }) => {
  return (
    <Button
      size={size}
      variant={variant}
      isDisabled={disabled}
      onPress={onPress}
      _text={{
        fontSize: 20,
        fontWeight: 'bold'
      }}
    >
      {children}
    </Button>
  )
}

export default Buttons