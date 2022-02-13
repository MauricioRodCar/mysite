import Routes from './routes';
import { Router } from 'react-router-dom';
import './App.css';
import Layout from "./components/Layout"
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

function App() {
  return (
    <Router  history={history}>
      <Layout>
        <Routes/>
      </Layout>
    </Router>
  );
}

export default App;
