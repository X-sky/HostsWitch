import { useEffect, useMemo } from 'react';
import { useHostStore } from '../store/host';
import {
  ParsedInfo,
  parseContent,
  setProxy,
  clearProxy,
  updateRedirectHttpsRules
} from '../utils/index';

export default function useAutoUpdateConfig() {
  const { extensionEnabled, hostContent } = useHostStore();
  const parsedInfo = useMemo<ParsedInfo>(
    () => parseContent(hostContent.content),
    [hostContent]
  );
  // update proxy when toggle extension or host content changed
  useEffect(() => {
    if (extensionEnabled) {
      updateRedirectHttpsRules(parsedInfo.dnsList);
      setProxy(parsedInfo);
    } else {
      updateRedirectHttpsRules([]);
      clearProxy();
    }
  }, [extensionEnabled, parsedInfo]);
}
