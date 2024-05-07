import React, { useEffect, useState } from 'react'
import InputText from '../../components/InputText'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import IconButtons from '../../components/IconButtons';
import { Box, Center, Divider, Flex, HStack, ScrollView, Select, Text } from 'native-base';
import ListSelect from '../../components/ListSelect';
import RadioButtons from '../../components/RadioButtons';
import Buttons from '../../components/Buttons';
import { client } from '../_layout';
import { createUsers } from '../../src/graphql/mutations';
import { useLocalSearchParams } from 'expo-router';
import Paragraph from '../../components/Paragraph';

const signUp = () => {

  const { control, handleSubmit, formState: { errors }, watch } = useForm();
  const [genero, setGenero] = useState('FE');
  const [info, setInfo] = useState({});

  const params = useLocalSearchParams();
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

  useEffect(() => {
    // setInfo(JSON.parse(params.info))
  }, []);

  return (
    <ScrollView w="100%" h="100%">
      <Box px={5} pb={15}>
        <Text fontSize={"4xl"} textAlign={'center'} bold>Registrarse</Text>
        <Paragraph>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum maiores nam, odio unde quis natus vel id totam qui dignissimos quasi aliquam laborum soluta assumenda architecto veniam nesciunt odit enim autem incidunt praesentium amet!</Paragraph>

        <Box w={"100%"} px={5}>

          <Box w={'full'}>

            <ListSelect
              name={'tipoId'}
              label={'Tipo de documento'}
              control={control}
              errors={errors.tipoId}
              rules={{
                required: {
                  value: true,
                  message: "Este campo es requerido"
                }
              }}
              defaultOption={info.tipoId}
              options={[
                {
                  label: "Registro civil de nacimiento",
                  value: 'RC'
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
                  label: "Pasaporte",
                  value: 'PA'
                }
              ]}
            />

            <InputText
              name={"numId"}
              type={'numeric'}
              control={control}
              errors={errors.numId}
              rules={{
                required: {
                  value: true,
                  message: "Este campo es requerido"
                }
              }}
              label={"Numero de identificacion:"}
              placeholder={""}
              defaultValue={`${info.numId}`}
            />

            <InputText
              name={"nombre"}
              control={control}
              errors={errors.nombre}
              rules={{
                required: {
                  value: true,
                  message: "Este campo es requerido"
                }
              }}
              label={"Nombres:"}
              placeholder={""}
              defaultValue={info.nombres}
            />

            <InputText
              name={"apellidos"}
              control={control}
              errors={errors.apellidos}
              rules={{
                required: {
                  value: true,
                  message: "Este campo es requerido"
                }
              }}
              label={"Apellidos:"}
              placeholder={""}
              defaultValue={info.apellidos}
            />

            <InputText
              name={"fechaNacimiento"}
              control={control}
              errors={errors.fechaNacimiento}
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
              name={"genero"}
              control={control}
              errors={errors.genero}
              rules={{
                required: {
                  value: true,
                  message: "Este campo es requerido"
                }
              }}
              label={"Género:"}
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
              type='phone-pad'
              control={control}
              errors={errors.telefono}
              rules={{
                required: {
                  value: true,
                  message: "Este campo es requerido"
                }
              }}
              label={"Celular:"}
              placeholder={""}
              defaultValue={info.telefono}
              leftElement={<Text fontSize={20} ml={3} color={'muted.400'}>+57</Text>}
            />

            <InputText
              name={"direccion"}
              control={control}
              errors={errors.direccion}
              rules={{
                required: {
                  value: true,
                  message: "Este campo es requerido"
                }
              }}
              label={"Direccion residencial:"}
              placeholder={""}
              defaultValue={info.direccion}
            />

          </Box>
          <Buttons onPress={handleSubmit(onSubmit)}>Iniciar Sesión</Buttons>
        </Box>
      </Box>
    </ScrollView>

  )
}

export default signUp