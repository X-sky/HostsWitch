import { DNSInfo, ProxyInfo, ParsedInfo } from './parser';

const DEFAULT_METHOD = 'SYSTEM';

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

const getDirectPacRuleConditions = (domains: string[]) =>
  'host === "localhost"' +
  domains.reduce((acc, domain) => {
    acc += `||host==="${domain}"`;
    return acc;
  }, '');
export function setProxy({ dnsList, proxyList, directList }: ParsedInfo) {
  const hostContent = dnsList.reduce(
    (acc, cur) => (acc += getDNSPacRule(cur)),
    ''
  );
  const proxyContent = proxyList.reduce(
    (acc, cur) => (acc += getProxyPacRule(cur)),
    ''
  );

  const directCondition = getDirectPacRuleConditions(directList);

  /**
   * hostContent: '\nif(host == \"test\"){\nreturn \"PROXY 127.0.0.1:80; SYSTEM\";}\n';
   * proxyContent: ''
   */
  const concatProxyMethod = `${proxyContent} ${DEFAULT_METHOD}`;
  const proxyFallback = hostContent
    ? `else { return "${concatProxyMethod}"; }`
    : `return "${concatProxyMethod}";`;
  // only proxy for http & https
  const pacContent = `
  function FindProxyForURL(url, host) {
    alert('in pac'+url)
    if (shExpMatch(url, "http:*")) {
      if (${directCondition}) {
        return "DIRECT";
      } else {
        ${hostContent}
        ${proxyFallback}
      }
    } else if (shExpMatch(url, "https:*")) {
      if (${directCondition}) {
        return "DIRECT";
      }
      return "${concatProxyMethod}";
    } else {
      return "${DEFAULT_METHOD};"
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
