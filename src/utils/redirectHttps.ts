import { DNSInfo } from './parser';
import { randomNumUtil } from './util';

/**redirect */
const getRedirectRule = (
  domain: string
): chrome.declarativeNetRequest.Rule => ({
  // change the scheme of the URLs which match the domains of hosts
  id: randomNumUtil.getNum(),
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
});

function getNewRulesByDNSList(
  dnsList: DNSInfo[]
): chrome.declarativeNetRequest.Rule[] {
  const domainList: string[] = [];
  dnsList.forEach((cur) => {
    domainList.push(...cur.domains);
  });
  const rules: chrome.declarativeNetRequest.Rule[] = [];
  domainList.forEach((domain) => {
    rules.push(getRedirectRule(domain));
  });
  return rules;
}

export function updateRedirectHttpsRules(dnsList: DNSInfo[]) {
  if (!chrome.declarativeNetRequest) return;
  const newRules = getNewRulesByDNSList(dnsList);
  chrome.declarativeNetRequest.getDynamicRules().then((curDynamicRules) => {
    const lastRuleIds = curDynamicRules.map((info) => info.id).filter(id=>Boolean(id));
    const updateOpt: chrome.declarativeNetRequest.UpdateRuleOptions = {
      removeRuleIds: lastRuleIds
    };
    if (newRules.length) {
      updateOpt.addRules = newRules;
    }
    // supported in chrome 87+
    chrome.declarativeNetRequest.updateDynamicRules(updateOpt);
  });
}
