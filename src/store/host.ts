import { arrayMove } from '@dnd-kit/sortable';
import { generateUniqueId } from '../utils/util';
import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useMemo } from 'react';

const EXT_DB_PREFIX = 'HOSTS_WITCH';
export const ALL_HOST_ID = 'ALL_HOST';
export const ALL_HOST_NAME = 'ALL_HOST';

export interface HostPanelInfo {
  id: string;
  name: string;
  content: string;
  enabled: boolean;
}

enum DATA_KEY {
  /**host info list */
  HOST_PANELS = 'HOST_PANELS',
  /**is extension enabled */
  EXT_ENABLED = 'EXT_ENABLED'
}
const getDataKey = (key: DATA_KEY) => `${EXT_DB_PREFIX}${key}`;

const generateHostPanelInfo = (
  info = {} as Partial<HostPanelInfo>
): HostPanelInfo => ({
  id: generateUniqueId(),
  name: 'unnamed',
  content: '',
  enabled: false,
  ...info
});

const extensionEnabledAtom = atomWithStorage(
  getDataKey(DATA_KEY.EXT_ENABLED),
  true
);
const hostPanelsAtom = atomWithStorage<HostPanelInfo[]>(
  getDataKey(DATA_KEY.HOST_PANELS),
  []
);
const selectedPanelIdAtom = atom(ALL_HOST_ID);

export function useHostStore() {
  const [extensionEnabled, setExtensionEnabled] = useAtom(extensionEnabledAtom);
  const [hostPanels, setHostPanels] = useAtom(hostPanelsAtom);
  const [selectedPanelId, setSelectedPanelId] = useAtom(selectedPanelIdAtom);

  const updatePanelItem = (
    target: Pick<HostPanelInfo, 'id'> & Partial<HostPanelInfo>
  ) => {
    setHostPanels(
      hostPanels.map((item) => {
        if (item.id === target.id) {
          return {
            ...item,
            ...target
          };
        }
        return item;
      })
    );
  };
  const togglePanelItem = (target: HostPanelInfo) => {
    updatePanelItem({
      id: target.id,
      enabled: !target.enabled
    });
  };
  const addHostPanel = () => {
    const maxPanelNum = 20;
    if (hostPanels.length < maxPanelNum) {
      setHostPanels((s) => [...s, generateHostPanelInfo()]);
    }
  };
  const removeHostPanel = (target: HostPanelInfo) => {
    // TODO: confirm modal
    setHostPanels((s) => s.filter((info) => info.id !== target.id));
  };
  const moveHostPanel = (from: number, to: number)=>{
    setHostPanels(arrayMove(hostPanels, from, to));
  }

  const hostContent = useMemo(
    () => ({
      id: ALL_HOST_ID,
      name: ALL_HOST_NAME,
      // concat all enabled host
      content:
        hostPanels.reduce((acc, cur) => {
          if (cur.enabled) {
            acc += `# ${cur.name}\n`;
            acc += `${cur.content || '# ' + cur.name + ' is empty'}\n`;
          }
          return acc;
        }, '') || '# empty',
      enabled: extensionEnabled
    }),
    [hostPanels, extensionEnabled]
  );

  const currentHostInfo = useMemo(() => {
    const ret = generateHostPanelInfo({
      id: selectedPanelId,
      name: ALL_HOST_ID,
      content: hostContent.content,
      enabled: true
    });
    if (selectedPanelId !== ALL_HOST_ID) {
      const curHostInfo = hostPanels.find(
        (info) => info.id === selectedPanelId
      );
      if (curHostInfo) {
        return generateHostPanelInfo({
          id: selectedPanelId,
          name: curHostInfo.name,
          content: curHostInfo.content,
          enabled: curHostInfo.enabled
        });
      }
    }
    return ret;
  }, [selectedPanelId, hostContent, hostPanels]);

  return {
    extensionEnabled,
    setExtensionEnabled,
    hostPanels,
    setHostPanels,
    updatePanelItem,
    togglePanelItem,
    selectedPanelId,
    setSelectedPanelId,
    addHostPanel,
    removeHostPanel,
    moveHostPanel,
    hostContent,
    currentHostInfo
  };
}
