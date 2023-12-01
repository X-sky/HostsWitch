import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent
} from '@dnd-kit/core';
import {
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates
} from '@dnd-kit/sortable';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PushPinSharpIcon from '@mui/icons-material/PushPinSharp';
import {
  ALL_HOST_ID,
  ALL_HOST_NAME,
  useHostStore
} from '../../../../store/host';
import SortablePanel from './SortablePanel';

export default function SortablePanelList() {
  const {
    hostPanels,
    selectedPanelId,
    setSelectedPanelId,
    moveHostPanel,
    extensionEnabled
  } = useHostStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      const data = active.data;
      const activeIndex = data.current?.sortable.index;
      const overIndex = over.data.current?.sortable.index || 0;

      moveHostPanel(activeIndex, overIndex);
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <List
        dense
        sx={{
          width: '100%',
          height: '100%',
          color: extensionEnabled ? '' : 'GrayText'
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
          {extensionEnabled ? (
            <PushPinSharpIcon fontSize="small" />
          ) : (
            <PushPinOutlinedIcon fontSize="small" />
          )}
          <ListItemText primary={ALL_HOST_NAME} sx={{ pl: 1 }} />
        </ListItemButton>
        <SortableContext items={hostPanels} strategy={rectSortingStrategy}>
          {hostPanels.map((item) => (
            <SortablePanel item={item} key={item.id} />
          ))}
        </SortableContext>
      </List>
    </DndContext>
  );
}
