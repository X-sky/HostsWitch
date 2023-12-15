import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import MoveUpOutlinedIcon from '@mui/icons-material/MoveUpOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PowerSettingsNew from '@mui/icons-material/PowerSettingsNew';
import Stack from '@mui/material/Stack';
import {
  PANEL_MODE_LIST,
  PanelMode,
  usePanelDrawerState
} from '../../../store/panelDrawer';
import { useHostStore } from '../../../store/host';
import { useState } from 'react';
import SettingsMenu from '../SettingsMenu/SettingsMenu';

const modeIconMap: Record<string, JSX.Element> = {
  move: <MoveUpOutlinedIcon />,
  delete: <DeleteOutlineOutlinedIcon />
};

export default function HeaderBar() {
  const { isDrawerOpen, toggleDrawerState, setPanelMode } =
    usePanelDrawerState();
  const {
    currentHostInfo,
    addHostPanel,
    updatePanelItem,
    extensionEnabled,
    setExtensionEnabled
  } = useHostStore();
  const [editFlag, setEditFlag] = useState(false);

  const [modeActionList, updateModeActionList] = useState(
    PANEL_MODE_LIST.filter((mode) => mode).map((mode) => ({
      mode,
      active: false,
      component: modeIconMap[mode] || null
    }))
  );
  const clickModeActionBtn = (toggledMode: PanelMode) => {
    const newList = modeActionList.map((info) => ({
      ...info,
      // toggle if is toggledMode
      active: info.mode === toggledMode ? !info.active : false
    }));
    const nextMode = newList.find((info) => info.active)?.mode || '';
    updateModeActionList(newList);
    setPanelMode(nextMode);
  };

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
        variant="dense"
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
          title={isDrawerOpen ? 'hide panels' : 'show panels'}
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
          title="add a host panel"
        >
          <AddCircleOutlineIcon />
        </IconButton>
        {modeActionList.map((modeActionInfo) => (
          <IconButton
            key={modeActionInfo.mode}
            size="small"
            edge="start"
            color={modeActionInfo.active ? 'inherit' : 'default'}
            aria-label={`toggle ${modeActionInfo.mode} mode`}
            title={`toggle ${modeActionInfo.mode} mode`}
            onClick={() => clickModeActionBtn(modeActionInfo.mode)}
          >
            {modeActionInfo.component}
          </IconButton>
        ))}
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
        <SettingsMenu />
        <IconButton
          size="small"
          edge="start"
          color={extensionEnabled ? 'error' : 'default'}
          aria-label={
            extensionEnabled ? 'shut down extension' : 'turn on extension'
          }
          onClick={() => setExtensionEnabled((state) => !state)}
          sx={{
            ml: 1
          }}
        >
          <PowerSettingsNew />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
