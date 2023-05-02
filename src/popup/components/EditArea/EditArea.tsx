import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { usePanelDrawerState } from '../../../store/panelDrawer';

export default function EditArea() {
  const { drawerWidth } = usePanelDrawerState();
  return (
    <Box
      component="form"
      sx={{
        paddingTop: 8,
        width: `calc(100% - ${drawerWidth}px)`,
        position: 'relative',
        left: `${drawerWidth}px`,
        '& .MuiTextField-root': { m: 2, width: '95%' },
        '& .MuiInputBase-input': { whiteSpace: 'nowrap' }
      }}
      noValidate
      autoComplete="off"
    >
      <TextField label="hosts info" multiline rows={12} />
    </Box>
  );
}
