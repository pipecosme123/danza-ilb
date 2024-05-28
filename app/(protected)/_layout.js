import { Slot } from 'expo-router';
import { View } from 'native-base';
import { useSelector } from 'react-redux';
import { Header } from '../../components';
import { ROLES } from '../../constants';

const _layout = () => {

  // const { role } = useSelector(({ users }) => users);

  // if (role === ROLES.DESCONECTADO) {
  //   return <Redirect href={'/(app)'} />
  // }

  return (
    <>
      <Header />
      <View px={1}>
        <Slot />
      </View>
    </>
  )
}

export default _layout