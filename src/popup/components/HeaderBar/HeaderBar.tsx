import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import PowerSettingsNew from '@mui/icons-material/PowerSettingsNew';
import { usePanelDrawerState } from '../../../store/panelDrawer';

export default function HeaderBar() {
  const { isDrawerOpen, toggleDrawerState } = usePanelDrawerState();
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
          {isDrawerOpen ? <ArrowBackIosNewOutlinedIcon /> : <TuneOutlinedIcon />}
        </IconButton>
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="add a panel"
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
          <Chip
            label="read only"
            size="small"
            sx={{
              position: 'relative',
              right: '10px',
              fontSize: '10px'
            }}
          />
          Panel Name
        </Typography>
        <IconButton size="small" edge="start" aria-label="system settings">
          <SettingsIcon />
        </IconButton>
        <IconButton
          size="small"
          edge="start"
          color="error"
          aria-label="shut down extension"
        >
          <PowerSettingsNew />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
