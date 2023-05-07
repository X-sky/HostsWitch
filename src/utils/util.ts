
export const randomNumUtil = (function () {
  /**idx to pick number length from numLenPool */
  const MAX_LEN = 4;
  const numLenPool = Array.from({
    length: MAX_LEN
  }).map((v, idx) => idx + 1);
  let curNumLenIdx = 0;
  const pickRandomLen = () => {
    // reduce chance of repeating by generate in different length
    curNumLenIdx++;
    return numLenPool[curNumLenIdx % MAX_LEN];
  };
  const resetCurNumLenIdx = () => (curNumLenIdx = 0);
  const usedNumSet = new Set<number>();
  return {
    getNum() {
      let num = 0;
      do {
        const multiplyTimes = Math.pow(10, pickRandomLen());
        num = Math.random() * multiplyTimes;
      } while (num === 0 || usedNumSet.has(num));
      usedNumSet.add(num);
      resetCurNumLenIdx();
      return num;
    },
    clear() {
      usedNumSet.clear();
    }
  };
})();

export const generateUniqueId = () => {
  const charNum = 10;
  const charBit = charNum / 2;
  const arr = new Uint8Array(charBit);
  window.crypto.getRandomValues(arr);
  return Array.prototype.map
    .call(arr, (byte) => `0${byte.toString(16)}`.slice(-2))
    .join('');
};

const VALID_PAC_PROTOCOLS = ['SOCKS5', 'SOCKS4', 'SOCKS', 'HTTP', 'HTTPS'];

export const removeComment = (str: string) => str.replace(/#.+/gm, '');

export const isIP = (address: string) => {
  const portIdx = address.indexOf(':');
  let testAddress = address;
  if (portIdx >= 0) {
    testAddress = address.slice(0, portIdx);
  }
  return /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(
    testAddress
  );
};

export const getValidPacProtocol = (str: string) => {
  let validProtocolInStr = '';
  VALID_PAC_PROTOCOLS.some((protocol) => {
    if (str.trim().toUpperCase() === protocol) {
      validProtocolInStr = protocol;
      return true;
    }
  });
  return validProtocolInStr;
};
