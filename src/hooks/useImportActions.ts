import { useHostStore } from '../store/host';

export default function useImportAction() {
  const { importHosts, setPanelUpdating } = useHostStore();
  const inputEl = document.createElement('input');
  inputEl.type = 'file';
  inputEl.accept = '.txt,.json,application/json';
  inputEl.addEventListener('change', async () => {
    setPanelUpdating(true);
    try {
      const file = inputEl.files?.[0];
      if (file) {
        const text = await file.text();
        if (text.startsWith('[') || text.startsWith('{')) {
          // maybe exported by HostsWitch
          const ret = JSON.parse(text);
          importHosts(ret);
        } else {
          // normal text, try direct import
          importHosts({
            name: file.name,
            content: text
          });
        }
      }
    } catch (err) {
      console.warn('🚀 parse content failed. Is it exported by HostsWitch?');
    }
    setPanelUpdating(false);
  });
  const triggerImportFile = () => {
    inputEl.click();
  };
  return {
    triggerImportFile
  };
}