import {Link} from 'react-router-dom';

const MainPage = () => {
  return (
    <div>
      <Link to="/b">
        <p style={{height:"50px", width:"50px", backgroundColor:"red"}}>a</p>
      </Link>
    </div>
  )
}

export default MainPage;
