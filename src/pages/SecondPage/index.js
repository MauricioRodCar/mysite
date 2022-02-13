import {Link} from 'react-router-dom';

const MainPage = () => {
  return (
    <div>
      <Link to="/">
        <p style={{height:"50px", width:"50px", backgroundColor:"blue"}}>a</p>
      </Link>
    </div>
  )
}

export default MainPage;
