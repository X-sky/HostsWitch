import { removeComment, isIP, getValidPacProtocol } from './util';

export interface DNSInfo {
  ip: string;
  domains: string[];
}
export interface ProxyInfo {
  protocol: string;
  targetIps: string[];
}

export interface ParsedInfo {
  dnsList: DNSInfo[];
  proxyList: ProxyInfo[];
  directList: string[];
}
export function parseContent(content: string): ParsedInfo {
  const dnsList: DNSInfo[] = [];
  const proxyList: ProxyInfo[] = [];
  const directList: string[] = [];
  const linesWithNoComment = removeComment(content).split('\n');
  linesWithNoComment.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine) {
      const [first, ...rest] = trimmedLine.split(/\s+/);
      const proxyProtocol = getValidPacProtocol(first);
      if (first === 'DIRECT') {
        directList.push(...rest);
      } else if (proxyProtocol) {
        proxyList.push({
          protocol: proxyProtocol,
          targetIps: rest
        });
      } else if (isIP(first)) {
        dnsList.push({
          ip: first,
          domains: rest
        });
      }
    }
  });
  return {
    dnsList,
    proxyList,
    directList
  };
}
