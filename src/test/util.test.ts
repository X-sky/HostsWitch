import { describe, test, expect } from 'vitest';
import {
  removeComment,
  isIP,
  getValidPacProtocol,
  generateUniqueId,
  randomNumUtil
} from '../utils/util';

const testDuplicate = (mapFunc: () => number | string, length = 30) => {
  const list = Array.from({
    length
  }).map(mapFunc);
  const listValueSet = new Set(list);
  return listValueSet.size === list.length;
};

// utils
describe('utils', () => {
  test('getRandomNum', () => {
    expect(testDuplicate(randomNumUtil.getNum)).toBeTruthy();
  });
  test('generateUniqueId', () => {
    expect(testDuplicate(generateUniqueId)).toBeTruthy();
  });
  test('removeComment', () => {
    expect(removeComment('')).toEqual('');
    expect(removeComment('test # comment content')).toEqual('test ');
    expect(removeComment('test # comment content \nanother line')).toEqual(
      'test \nanother line'
    );
  });
  test('isIP', () => {
    expect(isIP('')).toBe(false);
    expect(isIP('https://192.168.1.1')).toBe(false);
    expect(isIP('192.168.1.1')).toBe(true);
    expect(isIP('192.168.1.1:8080')).toBe(true);
    expect(isIP('192.168.1')).toBe(false);
    expect(isIP('256.168.1.1')).toBe(false);
  });
  test('getValidPacProtocol', () => {
    expect(getValidPacProtocol('')).toEqual('');
    expect(getValidPacProtocol('SoCksTest')).toBe('');
    expect(getValidPacProtocol('SoCks')).toBe('SOCKS');
    expect(getValidPacProtocol('SoCks4')).toBe('SOCKS4');
    expect(getValidPacProtocol('socks5')).toBe('SOCKS5');
    expect(getValidPacProtocol('hTTps')).toBe('HTTPS');
    expect(getValidPacProtocol('HTTp')).toBe('HTTP');
  });
});
