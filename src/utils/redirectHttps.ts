import { DNSInfo } from './parser';
let lastRuleIds: number[] = [];

function getNewRuleByDomains(
  domainList: string[]
): chrome.declarativeNetRequest.Rule {
  return {
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
      initiatorDomains: domainList,
      // available redirect types of request
      resourceTypes: [
        chrome.declarativeNetRequest.ResourceType.MAIN_FRAME,
        chrome.declarativeNetRequest.ResourceType.SCRIPT,
        chrome.declarativeNetRequest.ResourceType.STYLESHEET,
        chrome.declarativeNetRequest.ResourceType.IMAGE,
        chrome.declarativeNetRequest.ResourceType.MEDIA
      ]
    }
  };
}

export function updateRedirectHttpsRules(dnsList: DNSInfo[]) {
  if (!chrome.declarativeNetRequest) return;
  const domainList: string[] = [];
  dnsList.forEach((cur) => {
    domainList.push(...cur.domains);
  });
  if (domainList.length) {
    const newRules = [getNewRuleByDomains(domainList)];
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
