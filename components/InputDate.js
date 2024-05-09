import React, { useState } from 'react'
import { Box, FormControl, HStack, Input, Pressable, Text, WarningOutlineIcon } from 'native-base'
import DateTimePicker from '@react-native-community/datetimepicker';
import IconButtons from './IconButtons'
import { birthdayFormat } from '../helpers/dateFormat';

const InputDate = ({ name, errors, label, maximumDate = new Date(), setValue }) => {

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const onChange = (event) => {
    const { nativeEvent: { timestamp } } = event;
    setValue(name, timestamp);
    setDate(new Date(timestamp))
    setShow(false);
  }

  return (
    <>
      <FormControl isInvalid={errors ? true : false} w={'full'}>
        <FormControl.Label>{label}</FormControl.Label>
        <HStack space={3} justifyContent="space-between">
          <Input w={'80%'} value={birthdayFormat(date)} fontSize={20} isReadOnly />
          <IconButtons icon={'edit-calendar'} handleClick={() => setShow(true)} />
        </HStack>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Try different from previous passwords.
        </FormControl.ErrorMessage>
      </FormControl>

      {
        show && (
          <DateTimePicker
            value={date}
            mode={"date"}
            onChange={onChange}
            maximumDate={maximumDate}
          />
        )
      }
    </>
  )
}

export default InputDate