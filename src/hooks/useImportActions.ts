import { useHostStore } from "../store/host";

export default function useImportAction() {
  const { importHosts, setPanelUpdating } = useHostStore();
  const inputEl = document.createElement('input');
  inputEl.type = 'file';
  inputEl.accept = '.txt,.json,application/json';
  inputEl.addEventListener('change', async () => {
    setPanelUpdating(true);
    try {
      const jsonFile = inputEl.files?.[0];
      if (jsonFile) {
        const text = await jsonFile.text();

        const ret = JSON.parse(text);
        if (Array.isArray(ret)) {
          importHosts(ret);
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