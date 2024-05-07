import React from 'react'
import { Box, Center, Flex, HStack, Text } from 'native-base'
import { useForm } from 'react-hook-form'
import InputText from '../../components/InputText'
import IconButtons from '../../components/IconButtons'
import Buttons from '../../components/Buttons'
import { userNumId } from '../../src/graphql/queries'
import { client } from '../_layout'
import { useDispatch } from 'react-redux'
import { getDataToSignUp } from '../../store/actions/userThunk'

const searchInfo = () => {

  const { control, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch(getDataToSignUp(data));
  }

  return (
    <Flex justifyContent={'center'} w="100%" h="100%" px={10}>
      <Text fontSize={"4xl"} textAlign={'center'} bold>Registrarse</Text>

      <Text fontSize={"md"}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, modi atque?</Text>

      <Box w={"100%"}>
        <Box w={'full'}>
          <InputText
            name={"identificacion"}
            type={'numeric'}
            control={control}
            errors={errors.user}
            rules={{
              required: {
                value: true,
                message: "Este campo es requerido"
              }
            }}
            style={{ textAlign: 'center' }}
            placeholder={"Número de identificación"}
          />
        </Box>

        <Buttons onPress={handleSubmit(onSubmit)} >Buscar</Buttons>

      </Box>
    </Flex>
  )
}

export default searchInfo