import {Link} from 'react-router-dom';
import Container from '../../components/Container';

const MainPage = () => {
  return (
    <Container>
      <Link to="/">
        <p style={{height:"50px", width:"50px", backgroundColor:"blue"}}>a</p>
      </Link>
    </Container>
  )
}

export default MainPage;
