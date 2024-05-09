import React, { useEffect, useState } from 'react'
import { FormControl, Radio } from 'native-base';

const RadioButtons = ({ name, label, setValue, options, defaultValue }) => {

  const inputRef = useRef(null);

  const [option, setOption] = useState(options[0].value);

  const onChange = (nextValue) => {

    setOption(nextValue);
    setValue(name, nextValue)
  }

  useEffect(() => {
    setOption(defaultValue)
  }, [defaultValue]);

  return (
    <FormControl>
      <FormControl.Label>{label}</FormControl.Label>
      <Radio.Group
        ref={inputRef}
        value={option}
        onChange={onChange}
        defaultValue={defaultValue}
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