import React from 'react'
import { Controller } from 'react-hook-form';
import { Box, Radio, Text } from 'native-base';

const RadioButtons = ({ value, onChange, options }) => {
  return (

    <Radio.Group
      value={value}
      onChange={nextValue => {
        onChange(nextValue);
      }}
      defaultValue={options[0].value}
    >
      {options.map(({ label, value }, index) => (
        <Radio key={index} value={value} my={1}>{label}</Radio>
      ))}
    </Radio.Group>

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