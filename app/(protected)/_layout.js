import { useEffect, useState } from 'react';
import { Slot, usePathname } from 'expo-router';
import { HeaderBack, HeaderHome } from '../../components';
import { Box } from 'native-base';

const _layout = () => {

  const pathname = usePathname();
  const [location, setLocation] = useState('/');

  useEffect(() => {
    setLocation(pathname);
  }, [pathname]);

  return (
    <>
      {location === '/' ? <HeaderHome /> : <HeaderBack />}
      <Box
        h={'full'}
        mb={"40px"}
        pt={3}
        px={2}
      >
        <Slot />
      </Box>
    </>
  )
}

export default _layout