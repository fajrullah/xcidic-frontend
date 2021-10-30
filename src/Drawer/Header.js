import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
export default function Header() {
  return (
    <div>
       <Toolbar>
          <Typography variant="h6" noWrap component="div">
            FatBellies
          </Typography>
      </Toolbar>
    </div>
  );
}