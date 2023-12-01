import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { usePanelDrawerState } from '../../../store/panelDrawer';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import SortablePanelList from './SortablePanelList/SortablePanelList';

export default function PanelListDrawer() {
  const { drawerWidth, isDrawerOpen } = usePanelDrawerState();

  return (
    <Drawer
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          top: '50px',
          height: 400 - 65,
          boxSizing: 'border-box'
        }
      }}
      variant="persistent"
      anchor="left"
      open={isDrawerOpen}
    >
      <SimpleBar
        style={{ maxHeight: '100%', width: '100%', overflowX: 'hidden' }}
      >
        <SortablePanelList />
      </SimpleBar>
      <Divider orientation="vertical" flexItem />
    </Drawer>
  );
}
