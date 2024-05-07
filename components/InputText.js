import React, { useState } from 'react'
import { FormControl, Icon, Input, Stack, View } from 'native-base'
import { Controller } from 'react-hook-form';

const InputText = ({ name, control, rules, type = "default", errors, label, style, placeholder, defaultValue = '', leftElement, rightElement }) => {

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
      <FormControl isInvalid={errors ? true : false}>
        <Stack>
          <FormControl.Label _text={styleLabelText}>{label}</FormControl.Label>
          <Controller
            control={control}
            rules={{ ...rules }}
            render={({ field: { onChange, ...fields } }) => (
              <Input
                {...fields}
                onChangeText={onChange}
                keyboardType={type}
                placeholder={placeholder}
                fontSize={20}
                _focus={{
                  backgroundColor: "info.50"
                }}
                backgroundColor={errors ? "error.50" : "muted.50"}
                defaultValue={defaultValue}
                style={{ ...style }}
                InputLeftElement={leftElement}
                onFocus={() => handleFocus()}
                onBlur={() => handleFocus()}
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