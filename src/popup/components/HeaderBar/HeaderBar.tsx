import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
// import SettingsIcon from '@mui/icons-material/Settings';
import PowerSettingsNew from '@mui/icons-material/PowerSettingsNew';
import { usePanelDrawerState } from '../../../store/panelDrawer';
import { useHostStore } from '../../../store/host';
import { useState } from 'react';
import { Stack } from '@mui/material';

export default function HeaderBar() {
  const { isDrawerOpen, toggleDrawerState } = usePanelDrawerState();
  const {
    currentHostInfo,
    addHostPanel,
    updatePanelItem,
    extensionEnabled,
    setExtensionEnabled
  } = useHostStore();
  const [editFlag, setEditFlag] = useState(false);

  const dblNameClickHandler = () => {
    if (!currentHostInfo.enabled) {
      setEditFlag(true);
    }
  };
  return (
    <AppBar
      position="absolute"
      color="transparent"
      sx={{
        width: '100%',
        borderBottom: 1,
        borderColor: '#ddd',
        bgColor: '#fefefe',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          px: 1,
          color: 'primary.main'
        }}
      >
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="toggle panel drawer"
          onClick={toggleDrawerState}
        >
          {isDrawerOpen ? (
            <ArrowBackIosNewOutlinedIcon />
          ) : (
            <ViewSidebarOutlinedIcon
              sx={{
                transform: 'rotate(180deg)'
              }}
            />
          )}
        </IconButton>
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="add a panel"
          onClick={addHostPanel}
        >
          <AddCircleOutlineIcon />
        </IconButton>
        <Typography
          variant="h5"
          component="div"
          sx={{
            px: 2,
            flexGrow: 1,
            color: 'text.primary',
            verticalAlign: 'middle',
            textAlign: 'center',
            flexWrap: 'nowrap',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            wordBreak: 'break-all',
            textOverflow: 'ellipsis'
          }}
        >
          {editFlag ? (
            <Input
              placeholder="panel name"
              inputProps={{
                'aria-label': 'edit panel name'
              }}
              value={currentHostInfo.name}
              onChange={(e) => {
                updatePanelItem({
                  id: currentHostInfo.id,
                  name: e.target.value
                });
              }}
              onBlur={() => setEditFlag(false)}
              autoFocus
            />
          ) : (
            <Stack direction="row" sx={{ display: 'inline-flex' }}>
              {currentHostInfo.name}
              {/* editable when enabled */}
              {!currentHostInfo.enabled && (
                <IconButton
                  size="small"
                  edge="start"
                  color="primary"
                  aria-label="edit panel name"
                  onClick={dblNameClickHandler}
                  sx={{ ml: 1 }}
                >
                  <ModeEditOutlinedIcon fontSize="small" />
                </IconButton>
              )}
            </Stack>
          )}
        </Typography>

        {/* <IconButton size="small" edge="start" aria-label="system settings">
          <SettingsIcon />
        </IconButton> */}
        <IconButton
          size="small"
          edge="start"
          color={extensionEnabled ? 'error' : 'default'}
          aria-label={
            extensionEnabled ? 'shut down extension' : 'turn on extension'
          }
          onClick={() => setExtensionEnabled((state) => !state)}
        >
          <PowerSettingsNew />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
