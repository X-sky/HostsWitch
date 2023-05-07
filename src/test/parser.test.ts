import { describe, test, expect } from 'vitest';

import { DNSInfo, parseContent, ProxyInfo } from '../utils/parser';

// parse Rules
describe('core parse rules', () => {
  const content = `
    # panel1
    127.0.0.1:8080   test.domain.com #just comment
    192.168.100.200  test.sub.domain.com
    # panel2
    SOCKS5   127.0.0.1:1080 127.0.0.1# just comment
    SOCKS  127.0.0.1:7890
    # panel3
    192.168.200.200  a.b.domain.local abc.domain.local
    # panel4
    DIRECT direct.com.cn direct2.com
  `;
  const expectDNSList: DNSInfo[] = [
    {
      ip: '127.0.0.1:8080',
      domains: ['test.domain.com']
    },
    {
      ip: '192.168.100.200',
      domains: ['test.sub.domain.com']
    },
    {
      ip: '192.168.200.200',
      domains: ['a.b.domain.local', 'abc.domain.local']
    }
  ];
  const expectProxyList: ProxyInfo[] = [
    {
      protocol: 'SOCKS5',
      targetIps: ['127.0.0.1:1080', '127.0.0.1']
    },
    {
      protocol: 'SOCKS',
      targetIps: ['127.0.0.1:7890']
    }
  ];
  const expectDirectList = ['direct.com.cn', 'direct2.com'];
  const { dnsList, proxyList, directList } = parseContent(content);
  test('dnsList', () => {
    expect(dnsList).toEqual(expectDNSList);
  });
  test('proxyList', () => {
    expect(proxyList).toEqual(expectProxyList);
  });
  test('directList', ()=>{
    expect(directList).toEqual(expectDirectList)
  })
});
