import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import { usePanelDrawerState } from '../../../store/panelDrawer';

export default function PanelList() {
  const { drawerWidth, isDrawerOpen } = usePanelDrawerState();
  const [checked, setChecked] = useState(true);

  const handleToggle = (item: any) => {
    console.log('🚀 ~ file: PanelList.tsx:12 ~ handleToggle ~ item:', item);
    setChecked((state) => !state);
  };
  return (
    <Drawer
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          top: '65px',
          height: 400 - 65,
          boxSizing: 'border-box'
        }
      }}
      variant="persistent"
      anchor="left"
      open={isDrawerOpen}
    >
      <List
        dense
        sx={{
          width: '100%',
          height: '100%'
        }}
      >
        <ListItem
          disableGutters
          secondaryAction={
            <IconButton edge="start" aria-label="delete" color="error">
              <DeleteIcon />
            </IconButton>
          }
        >
          <Switch
            size="small"
            edge="end"
            onChange={() => handleToggle('wifi')}
            checked={checked}
            inputProps={{
              'aria-labelledby': 'switch-list-label-wifi'
            }}
          />
          <ListItemText primary="Wi-Fi" sx={{ pl: 1 }} />
        </ListItem>
        <Divider />
      </List>
      <Divider orientation="vertical" flexItem />
    </Drawer>
  );
}
