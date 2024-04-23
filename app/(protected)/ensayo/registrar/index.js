import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { Box, Divider, FlatList, Heading, HStack, Text, View, IconButton, Flex } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons";

import dataJSON from '../../../../assets/data.json';
import CheckBox from '../../../../components/CheckBox';
import Card from '../../../../components/Card';
import { dateFormat } from '../../../../helpers/dateFormat';
import { storeGetAllKeys, storeGetObjectData, storeObjectData } from '../../../../helpers/storage';

const index = () => {

  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([]);

  const local = useLocalSearchParams();

  const onChangeChaeck = (newStatus, index) => {
    data[index].status = newStatus;
  }

  const handleDate = async () => {

    await storeObjectData('data-ensayo', data);

    router.replace({
      pathname: '/ensayo/registrar/fecha',
      params: {
        date: local.date
      }
    });
  }

  const getData = async () => {
    try {
      const keys = await storeGetAllKeys();

      if (keys.includes('data-ensayo')) {
        const data = await storeGetObjectData('data-ensayo');
        console.log(data);
        setData(data)
      } else {
        setData(dataJSON);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setDate(new Date(parseInt(local.date)));
    getData();

  }, []);

  return (
    <View px={5} mb={20}>

      <HStack display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>

        <Box>
          <IconButton
            size={'lg'}
            variant="solid"
            _icon={{
              as: MaterialIcons,
              name: 'edit-calendar'
            }}
            onPress={handleDate}
          />
        </Box>

        <Card width={'4/6'} height={'container'}>
          <Text>Fecha</Text>
          <Heading>{dateFormat(date)}</Heading>
        </Card>

        <Box>
          <IconButton
            size={'lg'}
            variant="solid"
            colorScheme={'success'}
            _icon={{
              as: MaterialIcons,
              name: 'save'
            }}
            onPress={() => console.log(data.filter(i => i.status === "one" || i.status === "two" || i.status === "three"))}
          />
        </Box>

      </HStack>
      <Flex w={'full'} flexDirection={'row'} justifyContent={'flex-end'}>
      <Text mr={6}>Asistencia</Text>
      </Flex>
      <Card
        height={"85%"}
      >
        <FlatList
          data={data}
          keyExtractor={(item, index) => index}
          px={1}
          initialNumToRender={20}
          maxToRenderPerBatch={20}
          removeClippedSubviewsen={true}
          refreshing={true}
          ItemSeparatorComponent={<Divider />}
          renderItem={({ item, index }) => (
            <CheckBox item={item} index={index} onValueChange={onChangeChaeck} />
          )}
        />
      </Card>

    </View>
  )
}

export default index