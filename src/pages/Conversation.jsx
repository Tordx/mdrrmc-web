
import Chat from '../components/Chat'
import { useNavigate, Link } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'
import Header from '../components/Header';
import '../style.css'
import Navbar from '../components/Navbar';
const Conversation = () => {
  return (
    <div className='chatContainer'>
      {/* <Header/> */}
      <div className="container">
        <Navbar/>
        <Chat/>
      </div>
    </div>
  )
}

export default Conversation