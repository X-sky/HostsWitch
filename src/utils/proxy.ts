import { DNSInfo, ProxyInfo, ParsedInfo } from './parser';

const getDNSPacRule = (dnsInfo: DNSInfo) =>
  dnsInfo.domains.reduce((acc, domain) => {
    acc += `if(host==="${domain}"){return "PROXY ${dnsInfo.ip};SYSTEM"}`;
    return acc;
  }, '');

const getProxyPacRule = (proxyInfo: ProxyInfo) =>
  proxyInfo.targetIps.reduce((acc, ip) => {
    acc += `${proxyInfo.protocol} ${ip};`;
    return acc;
  }, '');

export function setProxy({ dnsList, proxyList }: ParsedInfo) {
  const hostContent = dnsList.reduce(
    (acc, cur) => (acc += getDNSPacRule(cur)),
    ''
  );
  const proxyContent = proxyList.reduce(
    (acc, cur) => (acc += getProxyPacRule(cur)),
    ''
  );

  /**
   * hostContent: '\nif(host == \"test\"){\nreturn \"PROXY 127.0.0.1:80; SYSTEM\";}\n';
   * proxyContent: ''
   */
  const defaultMethod =
    localStorage.getItem('AWESOME_HOST_otherProxies') || 'SYSTEM';

  const pacContent = `
  function FindProxyForURL(url, host) {
    if (shExpMatch(url, "http:*") || shExpMatch(url, "https:*")) {
      if (host === "localhost") {
        return "DIRECT";
      } else {
        ${hostContent}
        ${
          hostContent
            ? `else { return "${proxyContent} ${defaultMethod}"; }`
            : `return "${proxyContent} ${defaultMethod}";`
        }
      }
    } else {
        return "SYSTEM";
    }
  }`;

  console.log('proxy to:\n' + pacContent);
  if (typeof chrome.proxy === 'undefined') return false;
  if (hostContent !== '' || proxyContent !== '') {
    clearProxy(function () {
      chrome.proxy.settings.set({
        value: {
          mode: 'pac_script',
          pacScript: {
            data: pacContent
          }
        },
        scope: 'regular'
      });
    });
  } else {
    clearProxy();
  }
}
export function clearProxy(
  cb = () => {
    /**no function workaround */
  }
) {
  console.log('clear.');
  if (typeof chrome.proxy === 'undefined') return false;
  chrome.proxy.settings.set(
    {
      value: { mode: 'system' },
      scope: 'regular'
    },
    cb
  );
}
