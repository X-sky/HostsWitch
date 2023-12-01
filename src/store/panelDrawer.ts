import { atom, useAtom } from 'jotai';


/** 
 * Panel Edit Mode
 * move: able to change the orders of the panels
 * delete: able to delete panels
 */
export const PANEL_MODE_LIST = ['move', 'delete'] as const;
export type PanelMode = typeof PANEL_MODE_LIST[number] | '';

const DEFAULT_DRAWER_W = 150;

const panelDrawerOpenAtom = atom(true);
const drawerWidthAtom = atom(DEFAULT_DRAWER_W);
const panelModeAtom = atom<PanelMode>('');

export const usePanelDrawerState = () => {
  const [drawerWidth, setDrawerWidth] = useAtom(drawerWidthAtom);
  const [openState, setValue] = useAtom(panelDrawerOpenAtom);
  const [panelMode, setPanelMode] = useAtom(panelModeAtom);

  const toggleDrawerState = () => {
    if (openState) {
      // about to close
      setDrawerWidth(0);
    } else {
      setDrawerWidth(DEFAULT_DRAWER_W);
    }
    setValue((state) => !state);
  };
  return { drawerWidth, isDrawerOpen: openState, toggleDrawerState, panelMode, setPanelMode };
};
