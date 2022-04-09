import React from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import '../../Css/admin/sidebar.css'

const Sidebar = () => {
    return (
        <>
            <div className='topbar'>
                <div className='topbarWrapper'>
                    <div className='topLeft'>
                        <div className='logo'>Admin</div>
                    </div>
                    <div className='topRight'>
                        <div className='topbarIconContainer'>
                            <NotificationsNoneIcon />
                            <span className='topiconBadge'>2</span>
                        </div>
                        <div className='topbarIconContainer'>
                            <LanguageIcon />
                            <span className='topiconBadge'>2</span>
                        </div>
                        <div className='topbarIconContainer'>
                            <SettingsIcon />
                        </div>
                    </div>

                
                </div>

            </div>

        </>
    );
};

export default Sidebar;