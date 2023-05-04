import { DNSInfo } from './parser';
let lastRuleIds: number[] = [];

function getNewRuleByDNSList(
  dnsList: DNSInfo[]
): chrome.declarativeNetRequest.Rule[] {
  const domainList: string[] = [];
  dnsList.forEach((cur) => {
    domainList.push(...cur.domains);
  });
  return domainList.map((domain) => ({
    // change the scheme of the URLs which match the domains of hosts
    id: Number(crypto.getRandomValues(new Uint16Array(1))),
    priority: 1,
    action: {
      type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
      redirect: {
        transform: { scheme: 'http' }
      }
    },
    condition: {
      urlFilter: `||${domain}`,
      resourceTypes: [
        chrome.declarativeNetRequest.ResourceType.MAIN_FRAME,
        chrome.declarativeNetRequest.ResourceType.SUB_FRAME
      ]
    }
  }));
}

export function updateRedirectHttpsRules(dnsList: DNSInfo[]) {
  if (!chrome.declarativeNetRequest) return;
  const newRules = getNewRuleByDNSList(dnsList);
  if (newRules.length) {
    chrome.declarativeNetRequest.updateDynamicRules(
      {
        addRules: newRules,
        removeRuleIds: lastRuleIds
      },
      () => {
        lastRuleIds = newRules.map((info) => info.id);
      }
    );
  } else {
    chrome.declarativeNetRequest.updateDynamicRules(
      {
        removeRuleIds: lastRuleIds
      },
      () => {
        lastRuleIds = [];
      }
    );
  }
}
