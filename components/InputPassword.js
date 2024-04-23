import React, { useState } from 'react'
import { FormControl, Icon, Input, Pressable, Stack, View, WarningOutlineIcon } from 'native-base'
import { Controller } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';

const InputPassword = ({ name, control, rules, type = "text", label, placeholder }) => {

  const [show, setShow] = useState(false);

  return (
    <View w={"100%"} mb={2}>
      <FormControl>
        <Stack>
          <FormControl.Label _text={{ fontSize: 16 }}>{label}</FormControl.Label>
          <Controller
            control={control}
            rules={rules}
            render={({ field: { onChange, ...fields } }) => (
              <Input
                {...fields}
                type={show ? "text" : "password"}
                fontSize={20}
                onChangeText={onChange}
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