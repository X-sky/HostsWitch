import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Chip from '@mui/material/Chip';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import Switch from '@mui/material/Switch';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Divider from '@mui/material/Divider';
import { usePanelDrawerState } from '../../../store/panelDrawer';
import { ALL_HOST_ID, ALL_HOST_NAME, useHostStore } from '../../../store/host';

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
        <ListItemButton
          divider
          disableGutters
          selected={selectedPanelId === ALL_HOST_ID}
          onClick={() => setSelectedPanelId(ALL_HOST_ID)}
          sx={{
            pl: 1
          }}
        >
          <PushPinOutlinedIcon fontSize="small" />
          <ListItemText primary={ALL_HOST_NAME} sx={{ pl: 1 }} />
          {!extensionEnabled && (
            <Chip
              label="off"
              size="small"
              sx={{
                fontSize: 10
              }}
            />
          )}
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
            />
            <ListItemText primary={item.name} sx={{ pl: 1 }} />
            <IconButton
              size="small"
              edge="start"
              aria-label="delete"
              color="error"
              onClick={() => removeHostPanel(item)}
            >
              <ClearOutlinedIcon />
            </IconButton>
          </ListItemButton>
        ))}
      </List>
      <Divider orientation="vertical" flexItem />
    </Drawer>
  );
}
