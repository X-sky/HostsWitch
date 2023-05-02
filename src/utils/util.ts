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

export const addPort2Ip = (ip: string) =>
  ip.indexOf(':') < 0 ? `${ip}:80` : ip;

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
