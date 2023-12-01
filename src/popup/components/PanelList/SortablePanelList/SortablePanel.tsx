import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
import { HostPanelInfo, useHostStore } from '../../../../store/host';
import { useSortable } from '@dnd-kit/sortable';
import { CSSProperties } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { usePanelDrawerState } from '../../../../store/panelDrawer';

interface SortablePanelProps {
  item: HostPanelInfo;
}
export default function SortablePanel({ item }: SortablePanelProps) {
  const {
    selectedPanelId,
    togglePanelItem,
    extensionEnabled,
    setSelectedPanelId,
    removeHostPanel
  } = useHostStore();
  const { panelMode } = usePanelDrawerState();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const itemStyle: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <ListItemButton
      title={item.name}
      divider
      disableGutters
      key={item.id}
      id={item.id}
      selected={selectedPanelId === item.id}
      sx={{
        '& .MuiListItemText-root': {
          overflow: 'hidden'
        },
        ...itemStyle
      }}
      onClick={() => setSelectedPanelId(item.id)}
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
        disabled={panelMode !== ''}
      />
      <ListItemText primary={item.name} sx={{ pl: 1 }} />
      {/* move mode  */}
      {panelMode === 'move' && (
        <IconButton
          size="small"
          edge="start"
          aria-label="delete"
          color="default"
          sx={{
            cursor: 'move'
          }}
          ref={setNodeRef}
          {...attributes}
          {...listeners}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
      )}
      {/* delete mode */}
      {panelMode === 'delete' && (
        <IconButton
          size="small"
          edge="start"
          aria-label="delete"
          color="error"
          onClick={() => removeHostPanel(item)}
        >
          <RemoveSharpIcon fontSize="small" />
        </IconButton>
      )}
    </ListItemButton>
  );
}
