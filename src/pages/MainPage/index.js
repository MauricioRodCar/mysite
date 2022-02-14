import {Link} from 'react-router-dom';
import Container from '../../components/Container'
import './mainpage.css';

const MainPage = () => {
  return (
    <Container title="Who am i?">
      <div>
        <p id="greeting">
          <span className="emphasis"><span id="hi">Hi,</span> im Mauricio.</span><br/> A software engineer and i build web applications.
        </p>
      </div>
    </Container>
  )
}

export default MainPage;
