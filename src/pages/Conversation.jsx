
import Chat from '../components/Chat'
import { useNavigate, Link } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'
import Header from '../components/Header';
import '../style.css'
import Sidebar from '../components/navbar/sidebar';
import sidebar_menu from '../components/navbar/sidebarmenu';
const Conversation = () => {
  return (
    <div className='chatContainer'>
      {/* <Header/> */}
      <div className="container">
        <Sidebar menu={sidebar_menu}/>
        <Chat/>
      </div>
    </div>
  )
}

export default Conversation