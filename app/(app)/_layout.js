import { useSelector } from 'react-redux'
import { ROLES } from '../../constants';
import { Redirect, router, Slot, useRootNavigationState } from 'expo-router';
import { useEffect } from 'react';

const _layoutApp = () => {

  // const users = useSelector(({ users }) => users);
  // const rootNavigationState = useRootNavigationState();
  // const navigatorReady = rootNavigationState?.key != null;

  // useEffect(() => {
  //   console.log(navigatorReady, users.role);
  //   if (navigatorReady && users.role !== ROLES.DESCONECTADO) {
  //     router.replace('/(protected)');
  //   }
  // }, [navigatorReady]);

  // if (role !== ROLES.DESCONECTADO) {
  //   router.replace('/(protected)');
  //   // return <Redirect href={'/(protected)'} />
  // } else {
  return (
    <Slot />
  )
  // }
}

export default _layoutApp