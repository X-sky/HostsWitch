import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { usePanelDrawerState } from '../../../store/panelDrawer';
import { ALL_HOST_ID, useHostStore } from '../../../store/host';

export default function EditArea() {
  const { drawerWidth } = usePanelDrawerState();
  const { currentHostInfo, updatePanelItem } = useHostStore();
  const placeholderText = `
    127.0.0.1 localhost
    `;
  return (
    <Box
      component="form"
      sx={{
        paddingTop: 8,
        width: `calc(100% - ${drawerWidth}px)`,
        position: 'relative',
        left: `${drawerWidth}px`,
        '& .MuiTextField-root': { m: 2, width: '95%' },
        '& .MuiInputBase-input': {
          whiteSpace: 'nowrap',
          '&.Mui-disabled': {
            whiteSpace: 'pre-wrap'
          }
        }
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        label={
          currentHostInfo.enabled
            ? currentHostInfo.id !== ALL_HOST_ID
              ? 'switch this panel off to edit panel name and content'
              : 'ALL_HOST panel is readonly'
            : 'content area'
        }
        multiline
        rows={12}
        placeholder={placeholderText}
        disabled={currentHostInfo.enabled}
        value={currentHostInfo.content}
        InputLabelProps={{
          shrink: true
        }}
        onChange={(e) => {
          updatePanelItem({
            id: currentHostInfo.id,
            content: e.target.value
          });
        }}
      />
    </Box>
  );
}
