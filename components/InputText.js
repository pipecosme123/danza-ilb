import React from 'react'
import { FormControl, Icon, Input, Stack, View } from 'native-base'
import { Controller } from 'react-hook-form';

const InputText = ({ name, control, rules, type = "text", errors, label, placeholder }) => {

  return (
    <View w={"100%"} mb={2}>
      <FormControl isInvalid={errors ? true : false}>
        <Stack>
          <FormControl.Label _text={{ fontSize: 16 }}>{label}</FormControl.Label>
          <Controller
            control={control}
            rules={{ ...rules }}
            render={({ field: { onChange, ...fields } }) => (
              <Input
                {...fields}
                onChangeText={onChange}
                type={type}
                placeholder={placeholder}
                fontSize={20}
                _focus={{
                  backgroundColor: "info.50"
                }}
                backgroundColor={errors ? "error.50": "muted.50"}
              />
            )}
            name={name}
          />

        </Stack>
        <FormControl.ErrorMessage>
          Atleast 6 characters are required.
        </FormControl.ErrorMessage>
      </FormControl>

    </View>
  )
}

export default InputText;