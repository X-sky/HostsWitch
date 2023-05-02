import { atom, useAtom } from 'jotai';

const DEFAULT_DRAWER_W = 150;

const panelDrawerOpenAtom = atom(true);
const drawerWidthAtom = atom(DEFAULT_DRAWER_W);

export const usePanelDrawerState = () => {
  const [drawerWidth, setDrawerWidth] = useAtom(drawerWidthAtom);
  const [openState, setValue] = useAtom(panelDrawerOpenAtom);
  const toggleDrawerState = () => {
    if (openState) {
      // about to close
      setDrawerWidth(0);
    } else {
      setDrawerWidth(DEFAULT_DRAWER_W);
    }
    setValue((state) => !state);
  };
  return { drawerWidth, isDrawerOpen: openState, toggleDrawerState };
};
