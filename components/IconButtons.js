import React from 'react'
import { IconButton } from 'native-base'
import { MaterialIcons } from "@expo/vector-icons";

const IconButtons = ({ size = 'xs', variant = 'solid', icon = 'menu', handleClick, ...props }) => {
  return (
    <IconButton
      {...props}
      size={'lg'}
      variant={variant}
      m={0}
      onPress={handleClick}
      _icon={{
        as: MaterialIcons,
        name: icon
      }}
    />
  )
}

export default IconButtons