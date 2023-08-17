import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PushPinSharpIcon from '@mui/icons-material/PushPinSharp';
import Switch from '@mui/material/Switch';
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
import Divider from '@mui/material/Divider';
import { usePanelDrawerState } from '../../../store/panelDrawer';
import { ALL_HOST_ID, ALL_HOST_NAME, useHostStore } from '../../../store/host';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

export default function PanelList() {
  const { drawerWidth, isDrawerOpen } = usePanelDrawerState();
  const {
    hostPanels,
    selectedPanelId,
    setSelectedPanelId,
    removeHostPanel,
    togglePanelItem,
    extensionEnabled
  } = useHostStore();

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
      <SimpleBar style={{ maxHeight: '100%' }}>
        <List
          dense
          sx={{
            width: '100%',
            height: '100%',
            color: extensionEnabled ? '' : 'GrayText'
          }}
        >
          <ListItemButton
            divider
            disableGutters
            selected={selectedPanelId === ALL_HOST_ID}
            onClick={() => setSelectedPanelId(ALL_HOST_ID)}
            sx={{
              pl: 1
            }}
          >
            {extensionEnabled ? (
              <PushPinSharpIcon fontSize="small" />
            ) : (
              <PushPinOutlinedIcon fontSize="small" />
            )}
            <ListItemText primary={ALL_HOST_NAME} sx={{ pl: 1 }} />
          </ListItemButton>
          {hostPanels.map((item) => (
            <ListItemButton
              divider
              disableGutters
              key={item.id}
              selected={selectedPanelId === item.id}
              onClick={() => setSelectedPanelId(item.id)}
              sx={{
                '& .MuiListItemText-root': {
                  overflow: 'hidden'
                }
              }}
              title={item.name}
            >
              <Switch
                size="small"
                edge="end"
                onChange={() => {
                  togglePanelItem(item);
                }}
                checked={item.enabled}
                inputProps={{
                  'aria-labelledby': 'switch-host-panel'
                }}
                color={extensionEnabled ? 'primary' : 'default'}
              />
              <ListItemText primary={item.name} sx={{ pl: 1 }} />
              <IconButton
                size="small"
                edge="start"
                aria-label="delete"
                color="error"
                onClick={() => removeHostPanel(item)}
              >
                <RemoveSharpIcon fontSize="small" />
              </IconButton>
            </ListItemButton>
          ))}
        </List>
      </SimpleBar>
      <Divider orientation="vertical" flexItem />
    </Drawer>
  );
}
