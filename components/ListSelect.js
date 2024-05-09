import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { Box, CheckIcon, FormControl, Select, Stack, Text, View } from 'native-base'

const ListSelect = ({ label, name, control, rules, errors, options, defaultOption }) => {

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
              <Select
                {...fields}
                mt={1}
                fontSize={20}
                selectedValue={value || defaultOption}
                accessibilityLabel="Choose Service"
                placeholder="Choose Service"
                onValueChange={itemValue => onChange(itemValue)}
                onOpen={() => handleFocus()}
                onClose={() => handleFocus()}
                borderColor={isFocus ? 'primary.600': 'muted.300'}
                backgroundColor={isFocus ? 'info.100': 'muted.50'}
                _selectedItem={{
                  bg: "primary.200",
                  endIcon: <CheckIcon size="5" />
                }}
              >
                {options.map(({ label, value }, index) => (
                  <Select.Item key={index} label={label} value={value} />
                ))}
              </Select>
            )}
          />

        </Stack>
        <FormControl.ErrorMessage>
          Atleast 6 characters are required.
        </FormControl.ErrorMessage>
      </FormControl>

    </View>

  )
}

export default ListSelect

//   < Box >
// <Text _text={{ fontSize: 16 }}>{label}</Text>
// <Controller
//   name={name}
//   control={control}
//   rules={{ ...rules }}
//   render={({ field: { onChange, value, ...fields } }) => (
//     <Select
//       {...fields}
//       mt={1}
//       selectedValue={value}
//       accessibilityLabel="Choose Service"
//       placeholder="Choose Service"
//       _selectedItem={{
//         bg: "primary.200",
//         endIcon: <CheckIcon size="5" />
//       }}
//       onValueChange={itemValue => onChange(itemValue)}
//     >
//       {options.map(({ label, value }, index) => (
//         <Select.Item key={index} label={label} value={value} />
//       ))}
//     </Select>
//   )}
// />
// </Box >