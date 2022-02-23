import Routes from './routes';
import { Router } from 'react-router-dom';
import './App.css';
import Layout from "./components/Layout"
import { useState, useLayoutEffect} from 'react';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();



const App = () => {

  const [isPhone,setIsPhone] = useState(window.matchMedia("(max-height: 415px) and (max-width: 850px)").matches)

  useLayoutEffect(() => {
    function updateSize() {
      setIsPhone(window.innerWidth <= 850 && window.innerHeight <= 415);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <>
    {
      isPhone ? (
        <div className="rotate-alert">
          <p className="rotate-text">Please rotate your device</p>
        </div>
      )
      :
      (<Router  history={history}>
        <Layout>
          <Routes/>
        </Layout>
      </Router>)
    }
    </>
  );
}

export default App;
