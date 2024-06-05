import React, { useEffect } from 'react'
import { Slot, router, useRootNavigationState } from 'expo-router';
import { Amplify } from 'aws-amplify';
import { NativeBaseProvider, Box, Toast, StatusBar } from "native-base";
import { Provider, useSelector } from 'react-redux';
import { persistor, store } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import amplifyconfig from '../src/amplifyconfiguration.json';
import { ROLES, statusBarHeight } from '../constants';
import { ToastAlert, Spiner } from '../components';

Amplify.configure(amplifyconfig);

const Layout = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootLayout />
      </PersistGate>
    </Provider>
  )
}

const RootLayout = () => {

  const { loading, alert } = useSelector(({ system }) => system);
  const { role } = useSelector(({ users }) => users);

  const rootNavigationState = useRootNavigationState();

  const navigatorReady = rootNavigationState?.key != null;

  useEffect(() => {
    if (navigatorReady) {
      if (role !== ROLES.DESCONECTADO) {
        router.replace('/(protected)');
      } else {
        router.replace('/(app)');
      }
    }
  }, [navigatorReady, role]);

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

  return (
    <NativeBaseProvider>
      {loading && <Spiner />}
      <StatusBar backgroundColor={'#f5f5f4'} />
      <Box w={'full'} h={'full'} bg={'muted.50'} mt={statusBarHeight}>
        <Slot />
      </Box>
    </NativeBaseProvider>
  )
}

export default Layout;