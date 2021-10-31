import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
export default function ListDrawer(props) {
  return (
    <div>
       <List>
            <ListItem button onClick={() => props.onClickToolbar('branches')}>
              <ListItemIcon>
                <KeyboardArrowRightIcon />
              </ListItemIcon>
              <ListItemText primary="Branches" />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => props.onClickToolbar('timeslots')}>
              <ListItemIcon>
                <KeyboardArrowRightIcon />
              </ListItemIcon>
              <ListItemText primary="Timeslots" />
            </ListItem>
            <ListItem button onClick={() => props.onClickToolbar('demands')}>
              <ListItemIcon>
                <KeyboardArrowRightIcon />
              </ListItemIcon>
              <ListItemText primary="Simulate on-demand" />
            </ListItem>
            <ListItem button onClick={() => props.onClickToolbar('reservations')}>
              <ListItemIcon>
                <KeyboardArrowRightIcon />
              </ListItemIcon>
              <ListItemText primary="Simulate Reservations" />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => props.onClickToolbar('search')}>
              <ListItemIcon>
                <KeyboardArrowRightIcon />
              </ListItemIcon>
              <ListItemText primary="Search" />
            </ListItem>
        </List>
    </div>
  );
}