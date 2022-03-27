import { ArrowRightOutlined } from '@material-ui/icons';
import React from 'react';
import '../assets/stylesheets/SidebarItems.css';

function SidebarItems({arrow, icon, label}) {
  return(
    <div className='sidebarItem'>
        <div className='sidebarItem__arrow'>
            {arrow && <ArrowRightOutlined />}
        </div>
        <div className='sidebarItem__main'>
            {icon}
            <p>{label}</p>
        </div>
    </div>
  ) 
}

export default SidebarItems;
