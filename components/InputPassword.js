import React, { useState } from 'react'
import { FormControl, Icon, Input, Pressable, Stack, View, WarningOutlineIcon } from 'native-base'
import { Controller } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';

const InputPassword = ({ name, control, rules, type = "text", label, placeholder }) => {

  const [show, setShow] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const handleFocus = () => {
    setIsFocus(!isFocus);
  }

  const styleLabelText = {
    fontSize: 16,
    color: isFocus ? 'primary.600' : 'muted.500'
  }

  return (
    <View w={"100%"} mb={2}>
      <FormControl>
        <Stack>
          <FormControl.Label _text={styleLabelText}>{label}</FormControl.Label>
          <Controller
            control={control}
            rules={rules}
            render={({ field: { onChange, ...fields } }) => (
              <Input
                {...fields}
                type={show ? "text" : "password"}
                fontSize={20}
                onChangeText={onChange}
                onFocus={() => handleFocus()}
                onBlur={() => handleFocus()}
                InputRightElement={
                  <Pressable onPress={() => setShow(!show)}>
                    <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr={5} color="muted.400" />
                  </Pressable>
                }
              />
            )}
            name={name}
          />
        </Stack>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Atleast 6 characters are required.
        </FormControl.ErrorMessage>
      </FormControl>
    </View>
  )
}

export default InputPassword;