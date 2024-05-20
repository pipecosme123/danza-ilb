import React, { useEffect, useState } from 'react'
import { FormControl, Icon, Input, Stack, View, WarningOutlineIcon } from 'native-base'
import { Controller } from 'react-hook-form';

const InputText = ({ name, control, rules, type = "default", errors, label, style, placeholder, defaultValue = '', leftElement, isReadOnly = false }) => {

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
            name={name}
            control={control}
            rules={{ ...rules }}
            render={({ field: { onChange, value, ...fields } }) => (
              <Input
                {...fields}
                value={value}
                keyboardType={type}
                placeholder={placeholder}
                defaultValue={defaultValue}
                InputLeftElement={leftElement}
                fontSize={20}
                backgroundColor={errors ? "error.50" : "muted.50"}
                isReadOnly={isReadOnly}
                _focus={{ backgroundColor: "info.50" }}
                style={{ ...style }}
                onChangeText={onChange}
                onFocus={() => handleFocus()}
                onBlur={() => handleFocus()}
              />
            )}
          />

        </Stack>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {errors?.message}
        </FormControl.ErrorMessage>
      </FormControl>

    </View>
  )
}

export default InputText;