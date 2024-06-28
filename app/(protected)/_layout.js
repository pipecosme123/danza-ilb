import { useEffect, useState } from 'react';
import { Slot, usePathname } from 'expo-router';
import { HeaderBack, HeaderHome } from '../../components';
import { Box } from 'native-base';

const LayoutHome = () => {

  const pathname = usePathname();
  const [location, setLocation] = useState('/');

  useEffect(() => {
    setLocation(pathname);
  }, [pathname]);

  return (
    <>
      {location !== '/response' ? location === '/' ? <HeaderHome /> : <HeaderBack /> : null}
      <Box
        h={'full'}
        mb={"40px"}
        pt={3}
        px={1}
      >
        <Slot />
      </Box>
    </>
  )
}

export default LayoutHome