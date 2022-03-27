import React from 'react';
import NewFile from './NewFile';
import SidebarItems from './SidebarItems';
import '../assets/stylesheets/Sidebar.css';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import StorageIcon from '@material-ui/icons/Storage';
const Sidebar = () => {
  return(
    <div className='sideBar'>
        <NewFile />
        <div className='sideBar__ItemsContainer'>
            <SidebarItems arrow icon={(<InsertDriveFileIcon />)} label={'My Drive'} />
            <SidebarItems arrow icon={(<ImportantDevicesIcon />)} label={'Computers'} />
            <SidebarItems icon={(<PeopleAltIcon />)} label={'Shared with me'} />
            <SidebarItems icon={(<QueryBuilderIcon />)} label={'Recent'} />
            <SidebarItems icon={(<StarBorderIcon />)} label={'Starred'} />
            <SidebarItems icon={(<DeleteOutlineIcon />)} label={'Bin'} />
                
            <hr/>
                
            <SidebarItems icon={(<StorageIcon />)} label={'Storage'} />
            
        </div>

        
    </div>
  )
}

export default Sidebar;
