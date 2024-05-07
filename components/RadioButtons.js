import React from 'react'
import { Controller } from 'react-hook-form';
import { Box, FormControl, Radio, Text } from 'native-base';

const RadioButtons = ({ label, value, onChange, options }) => {
  return (

    <FormControl>
      <FormControl.Label>{label}</FormControl.Label>
      <Radio.Group
        value={value}
        onChange={nextValue => {
          onChange(nextValue);
        }}
        defaultValue={options[0].value}
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-around'}
      >
        {options.map(({ label, value }, index) => (
          <Radio key={index} value={value} my={1}>{label}</Radio>
        ))}
      </Radio.Group>
    </FormControl>

  )
}

export default RadioButtons

{/* <Box>
<Text>{label}</Text>
<Controller
  name={name}
  control={control}
  rules={{ ...rules }}
  render={({ field: { onChange, value, ref, name, ...fields } }) => (
      {...fields}
      value={value}
  )}
  />
</Box> */}