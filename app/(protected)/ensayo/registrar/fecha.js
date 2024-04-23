import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { router, useLocalSearchParams } from 'expo-router';
import { useDispatch } from 'react-redux';
import { cambiarFecha } from '../../../../store/reducer/ensayo';

const fecha = () => {

  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const local = useLocalSearchParams();

  const onChange = (date) => {

    const { nativeEvent: { timestamp } } = date;
    dispatch(cambiarFecha(timestamp));
    router.push('./');
  }

  useEffect(() => {

    if (local.date) {
      setDate(new Date(parseInt(local.date)));
    }
  }, []);

  return (
    <View>
      <DateTimePicker
        value={date}
        mode={"date"}
        onChange={onChange}
        maximumDate={new Date()}
      />
    </View>
  )
}

export default fecha