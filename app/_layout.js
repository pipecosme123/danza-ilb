import React, { useEffect } from 'react'
import { Slot, useRouter } from 'expo-router';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { NativeBaseProvider, Box, Toast } from "native-base";
import { Provider, useSelector } from 'react-redux';

import { persistor, store } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import ToastAlert from '../components/ToastAlert';
import { ROLES } from '../constants/roles';

import amplifyconfig from '../src/amplifyconfiguration.json';
import Spiner from '../components/Spiner';

Amplify.configure(amplifyconfig);
export const client = generateClient();

export default () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootLayout />
      </PersistGate>
    </Provider>
  )
}

const RootLayout = () => {

  const user = useSelector(({ user }) => user);
  const { loading } = useSelector(({ system }) => system);
  const { alert } = useSelector(({ system }) => system);

  const router = useRouter();

  useEffect(() => {
    if (alert.status !== null) {
      Toast.show({
        placement: 'top',
        render: () => {
          return <ToastAlert status={alert.status} message={alert.message} />
        }
      })
    }
  }, [alert]);

  useEffect(() => {
    if (user.role === ROLES.DESCONECTADO) {
      router.replace('/');
    } else {
      router.replace('/(protected)');
    }
  }, [user]);

  return (
    <NativeBaseProvider>
      <Box w={'full'} h={'full'} bg={'muted.50'}>
        {loading && <Spiner />}
        <Slot />
      </Box>
    </NativeBaseProvider>
  )
}