import React, { useState } from 'react'
import InputText from '../../components/InputText'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import IconButtons from '../../components/IconButtons';
import { Box, Center, Divider, Flex, HStack, Select, Text } from 'native-base';
import ListSelect from '../../components/ListSelect';
import RadioButtons from '../../components/RadioButtons';
import Buttons from '../../components/Buttons';
import { client } from '../_layout';
import { createUsers } from '../../src/graphql/mutations';

const signUp = () => {

  const { control, handleSubmit, formState: { errors }, watch } = useForm();
  const [genero, setGenero] = useState('FE');
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    console.log(data);
    const { tipo_id, num_id, nombre, apellidos, fecha_nacimiento, ddd, direccion, telefono } = data;

    try {
      const newUsers = await client.graphql({
        query: createUsers,
        variables: {
          input: {
            "tipo_id": tipo_id,
            "num_id": num_id,
            "nombre": nombre,
            "apellido": apellidos,
            "fecha_nacimiento": fecha_nacimiento,
            "genero": "masculino",
            "direccion": direccion,
            "telefono": telefono,
          }
        }
      });

      console.log(newUsers);
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <Center w="100%" h="100%">

      <Text fontSize={"4xl"} bold>Registrarse</Text>

      <Box w={"100%"} px={10}>

        <Box w={'full'}>

          <ListSelect
            name={'tipo_id'}
            label={'Tipo de documento'}
            control={control}
            rules={{
              required: {
                value: true,
                message: "Este campo es requerido"
              }
            }}
            options={[
              {
                label: "Registro civil de nacimiento",
                value: 'TI'
              },
              {
                label: "Tarjeta de identidad",
                value: 'TI'
              },
              {
                label: "Cédula de ciudadanía",
                value: 'CC'
              },
              {
                label: "Cédula de extranjería",
                value: 'CE'
              },
              {
                label: "Passaporte",
                value: 'PA'
              }
            ]}
          />

          <InputText
            name={"num_id"}
            type={'numeric'}
            control={control}
            errors={errors.user}
            rules={{
              required: {
                value: true,
                message: "Este campo es requerido"
              }
            }}
            label={"Numero de identificacion:"}
            placeholder={""}
          />

          <InputText
            name={"nombre"}
            control={control}
            errors={errors.user}
            rules={{
              required: {
                value: true,
                message: "Este campo es requerido"
              }
            }}
            label={"Nombres:"}
            placeholder={""}
          />

          <InputText
            name={"apellidos"}
            control={control}
            errors={errors.user}
            rules={{
              required: {
                value: true,
                message: "Este campo es requerido"
              }
            }}
            label={"Apellidos:"}
            placeholder={""}
          />

          <InputText
            name={"fecha_nacimiento"}
            control={control}
            errors={errors.user}
            rules={{
              required: {
                value: true,
                message: "Este campo es requerido"
              }
            }}
            label={"Fecha de nacimiento:"}
            placeholder={""}
          />

          <RadioButtons
            value={genero}
            onChange={setGenero}
            label={"Sexo:"}
            options={[
              {
                label: "Femenino",
                value: 'FE'
              },
              {
                label: "Masculino",
                value: 'MA'
              }
            ]}
          />

          <InputText
            name={"telefono"}
            type={'text'}
            control={control}
            errors={errors.user}
            rules={{
              required: {
                value: true,
                message: "Este campo es requerido"
              }
            }}
            label={"Número de telefono celular:"}
            placeholder={""}
          />

          <InputText
            name={"direccion"}
            type={'text'}
            control={control}
            errors={errors.user}
            rules={{
              required: {
                value: true,
                message: "Este campo es requerido"
              }
            }}
            label={"Direccion residencial:"}
            placeholder={""}
          />

        </Box>
        <Buttons onPress={handleSubmit(onSubmit)}>Iniciar Sesión</Buttons>
      </Box>
    </Center>

  )
}

export default signUp