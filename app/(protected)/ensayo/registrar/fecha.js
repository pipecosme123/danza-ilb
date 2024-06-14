import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { router, useLocalSearchParams } from 'expo-router';

const RegistrarFechaEnsayo = () => {

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(true);

  const local = useLocalSearchParams();

  const onChange = (date) => {
    const { nativeEvent: { timestamp }, type } = date;

    setShow(false);

    setTimeout(() => {
      if (type === "set") {
        setShow(false);
        router.push({
          pathname: './',
          params: {
            date: timestamp,
            type: local.type
          }
        });
      } else {
        setShow(false);
        router.back();
      }
    }, 600);
  }

  useEffect(() => {
    console.log({ show });
    if (local.date) {
      setDate(new Date(parseInt(local.date)));
    }
  }, []);

  return (
    <View>
      {show &&
        <DateTimePicker
          value={date}
          mode={"date"}
          onChange={onChange}
          maximumDate={new Date()}
        />
      }
    </View>
  )
}

export default RegistrarFechaEnsayo