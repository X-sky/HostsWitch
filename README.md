# HostsWitch

> Enjoy the very fast and instant host-switching experience with ✨HostsWitch✨ !

## Features

- ⚡️ Real-time hosts switching
- 🪄 Compatible with socket proxy
- 📦 Browser-scoped, no system-level access

## Coming soon

- import/export host files
- dark mode
- firefox support
- custom direct proxy
- syntax highlight

## Install

- ~~[Chrome Web Store(not valid)]()~~
- [download the .crx file](https://github.com/X-sky/HostsWitch/blob/main/HostsWitch_0.0.1.crx) and refer to [this article](https://www.turnoffthelights.com/support/browser-extension/how-to-install-chrome-extensions-in-3-easy-steps/) to install the `.crx` file

## Rules

```
# custom any rules as you want
# in a single file or in separated files

# hosts
192.168.100.1 domain.com domain.com.cn domain2.com
192.168.100.2 test.com

# proxy
SOCKS5 127.0.0.1:1080
SOCKS 127.0.0.1:1080
```

## Possible Side Effects

- WILL unsafely downgrade all `HTTPS` requests that matched host rules in your browser URL bar or iframe to `HTTP` to make HostsWitch take effect. Please make sure this extension is enabled only on websites with secure content.
- strict Cookie strategy (`SameSite=Strict` or `SameSite=Lax`) may cause problems in 'URL-host-matched' `Iframe`. Because with these strategies, the REDIRECTED UNSAFE Iframe request will be blocked by browsers to set cookies and therefore fail to load `Iframe` pages correctly.

## Powered By

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [MUI](https://mui.com/)
- [Jotai](https://jotai.org/)

Inspired by [SwitchHosts](https://github.com/oldj/SwitchHosts), an App for managing system-level hosts file, it is based on Electron, React, Jotai, Chakra UI, CodeMirror, etc.

## License

[MIT](https://opensource.org/licenses/MIT)
