import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useState} from "react";
import { Link } from 'react-router-dom';
    

const SideBarItem = ({ item, active }) => {
    const [hover, setHover] = useState(false);
    return (
        <Link 
            to={item.path} 
            className={active ? 'sidebar-item-active' : 'sidebar-item'} >
               <FontAwesomeIcon className={active ? "sidebar-svg-active " : "sidebar-svg"} icon={item.icon} size = '1x' />
                <span className={active ? 'sidebar-item-label-active' : 'sidebar-item-label'}>{item.title}</span>
        </Link>
    )
}
export default SideBarItem;