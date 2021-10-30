import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import ListDrawer from './List';
import Header from './Header';
import Branches from './Branches';
// import Demands from './Branches';
// import Search from './Search';
// import Reservations from './Reservations';
// import Timeslots from './Timeslots';

const drawerWidth = 240;
export default function PermanentDrawerLeft() {
  const [menu, setMenu] = useState(false);
  const onClickToolbar = (data) => setMenu(data)
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
        <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
          <Header />
        </AppBar>
        <Drawer sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />
          <ListDrawer onClickToolbar={onClickToolbar} />
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
        <Toolbar />
          {
            menu === 'branches' &&  <Branches/>
          }
        
      </Box>
    </Box>
  );
}