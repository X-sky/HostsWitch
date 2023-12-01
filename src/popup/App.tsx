import CssBaseLine from '@mui/material/CssBaseline';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { teal } from '@mui/material/colors';
import HeaderBar from './components/HeaderBar/HeaderBar';
import PanelListDrawer from './components/PanelList/PanelListDrawer';
import EditArea from './components/EditArea/EditArea';
import useAutoUpdateConfig from '../hooks/useUpdateConfig';

const theme = createTheme({
  palette: {
    primary: {
      main: teal[500]
    }
  }
});

function App() {
  useAutoUpdateConfig();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseLine />
      <Box
        sx={{
          width: 600,
          height: 400,
          backgroundColor: '#fff',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <HeaderBar />
        <Box
          sx={{
            height: 400 - 65,
            pt: '2px'
          }}
        >
          <PanelListDrawer />
          <EditArea />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
