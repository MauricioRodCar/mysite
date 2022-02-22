import {React,useEffect,useLayoutEffect,useState} from 'react';
import SideBar from '../Sidebar';
import PhoneNavBar from '../PhoneNavBar'
import Networks from '../Networks';

function Layout({ children }){
  const [isPhone, setIsPhone] = useState(window.matchMedia("(max-width: 415px)").matches)


  useLayoutEffect(() => {
    function updateSize() {
      setIsPhone(window.innerWidth <= 415);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);



  return(
    <>
    {isPhone?
    <PhoneNavBar/>
    :
    <SideBar/>
    }

    {children}

    {isPhone?
      null
    :
    <Networks/>
    }

    </>

  )
}

export default Layout;
