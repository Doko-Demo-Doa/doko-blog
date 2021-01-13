---
title: TypeScript + CRA 3 + Absolute Import + Electron
author: Doko
author_title: Administrator
author_url: https://github.com/Doko-Demo-Doa
author_image_url: /img/avatar_doraemon.jpg
image: https://i.ibb.co/zNZsCjV/electron-web-combo.jpg
hide_table_of_contents: false
tags: [vietnamese, programming, reactjs, electron]
---

:::info

*Lưu ý*: Ở thời điểm hiện tại, CRA 3.0 đã hỗ trợ absolute import. Ta không cần phải dùng đến craco để import mà có thể dựa vào `src/` làm alias gốc.

:::

Kể từ phiên bản Create React App (CRA 2.0), ta đã có thể tạo project với TypeScript mà không cần dùng đến `create-react-app-typescript`. Và nhờ có Babel 7 với khả năng hỗ trợ TypeScript mạnh, việc migrate sang TypeScript trở nên dễ dàng hơn rất nhiều.

Tuy nhiên...

<!--truncate-->

Một trong những tính thiếu của CRA là hỗ trợ absolute import với custom alias (thường là dạng `~/` hoặc `@/`). Tức là thay vì import kiểu:

```js
import MyComponent from '../../../my-component'
```

thì ta chỉ cần:

```js
import MyComponent from '~/components/my-component'
```

Tuy nhiên, cũng một phần do sử dụng Babel để transpile code, tính năng absolute import của CRA khá hạn chế và có một số quy định bắt buộc bạn phải theo. Ví dụ như khi chạy dev hoặc build, 2 trường `paths` và `baseUrl` bị loại bỏ khỏi `tsconfig.json`. Nghĩa là nếu muốn custom đường dẫn import, chỉ còn cách duy nhất là eject ra.

Nhưng giờ thì không cần nữa, vì ta đã có công cụ rất ngon là [craco](https://github.com/gsoft-inc/craco).

## Trước khi bắt đầu

Như team CRA đã khuyến cáo, nếu eject project hoặc rewire project tạo bằng CRA thì tức là bạn đã bỏ mất cơ hội được [team CRA hỗ trợ](https://github.com/facebookincubator/create-react-app/issues/99#issuecomment-234657710) và phải chịu trách nhiệm với config của mình.

Nhưng may mắn thay là với `craco`, ta hoàn toàn có thể cho quay về config cũ (`react-scripts`) nếu có điều gì xảy ra, và đương nhiên là sẽ an toàn hơn so với việc phải eject cả project.

## Cài đặt `craco`

[craco](https://github.com/gsoft-inc/craco) là một công cụ tuyệt vời, giúp ta tùy biến project tạo bằng CRA mà không cần eject. Đây được coi như hậu bối của [react-app-rewired](https://github.com/timarney/react-app-rewired)

```bash
# yarn
$ yarn add @craco/craco

# npm
$ npm install @craco/craco
```

Sau khi cài xong, tạo một file có tên `craco.config.js`, ta sẽ dùng đến sau.

```js title="craco.config.js"
module.exports = {
  // ...
}
```

Sau đó đổi file `package.json` thành:

```js {3,5,7}
   "scripts": {
-     "start": "react-scripts start",
+     "start": "craco start",
-     "build": "react-scripts build",
+     "build": "craco build"
-     "test": "react-scripts test",
+     "test": "craco test"
   }
```

Bằng cách này, ta sẽ có thể chạy CRA qua `craco`, và các setting trong file `craco.config.js` cũng sẽ được inject vào.

## Extend các path từ một file lẻ

Theo mặc định, CRA sẽ ghi đè lên file `tsconfig.json` mỗi khi ta chạy `npm start`, do đó ta cần phải tìm cách để sửa từ một file riêng.

Ta có thể đặt tên file này tùy thích, do CRA luôn ghi đè file `tsconfig.json` nên ta sẽ luôn define `paths` và `baseUrl` trong file này. Ta tạm đặt tên là `tsconfig.custom.json`.

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "~/*": ["./src/*"],
    },
  }
}
```

Vậy là ta đã có thể import được từ các folder con trong `src` như `components/MyComponent`. Sau đó ta extend trong file `tsconfig.json`:

```json {2}
{
  "extends": "./tsconfig.custom.json",
  "compilerOptions": {
    // ...phần còn lại
  }
}
```

## Nối với webpack alias bằng `craco`

Giờ thì ta cần chỉ định cho transpiler gán đặc danh cho thư mục gốc của project để trỏ vào đường dẫn đúng. Có 2 cách thực hiện:

- Sử dụng `babel-plugin-module-resolver`
- Config webpack alias.

Ta sẽ chọn cách thứ 2, vì đơn giản là không cần cài thêm gì cả.

Mở file `craco.config.js` và sửa lại như sau:

```js title="craco.config.js"
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '~': path.resolve(__dirname, 'src/')
    },
  },
};

```

Vậy là ta import được theo kiểu:

```js
import { auth } from '~/redux/features/auth/auth-slice';
```

Nếu muốn chỉ định chỉ 1 số thư mục thì ta có thể làm dạng:

```js title="craco.config.js"
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '~/components': path.resolve(__dirname, 'src/components')
    },
  },
};

```

Restart lại server, và lúc này absolute import đã có thể dùng được.

## Config `moduleNameMapper` cho Jest

Nếu sử dụng Jest để viết test, ta cần viết thêm một chút để nó biết đường dẫn import, và việc này cũng được `craco` hỗ trợ.

```js {4} title="craco.config.js"
  jest: {
    configure: {
      moduleNameMapper: {
        '^~(.*)$': '<rootDir>/src$1'
      },
    },
  },
```

File đầy đủ sẽ có dạng:

```js title="craco.config.js"
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '~': path.resolve(__dirname, 'src/')
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^~(.*)$': '<rootDir>/src$1'
      },
    },
  },
};

```

## Tích hợp Electron

Phần này hoàn toàn là phụ lục, khả năng là bạn sẽ không cần. Nhưng nếu yêu cầu project của bạn cần thêm phần build app Electron với React thì sau đây là hướng dẫn:

Cài đặt các package cần thiết:

```bash
$ yarn add electron-devtools-installer electron-is-dev
```

```bash
$ npm install --save electron-devtools-installer electron-is-dev
```

:::warning

Không được thêm cờ `--dev` (nếu dùng `yarn`) hoặc `--save-dev` (nếu dùng `npm`), nếu không sẽ không có tác dụng.

:::

Và cài các package sau, các package này thì phải cài đặt ở dạng `devDependencies`:

```bash
$ yarn add concurrently cross-env electron-builder electron electron-reload wait-on --dev
```

```bash
$ npm install concurrently electron-builder electron electron-reload wait-on --save-dev
```

Trong đó có 2 package đặc biệt:

- `wait-on`: Chờ webpack xử lý, sau đó mới chạy electron.
- `concurrently`: Chạy các tác vụ song song với nhau để tiết kiệm thời gian xử lý.

Tiếp theo, ta bố sung thêm 1 số lệnh vào phần `scripts` của `package.json`:

```json title="package.json" {2,11-14}
{
  "homepage": "./",
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "eject": "react-scripts eject",
    "clean": "rimraf build dist",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "postinstall": "electron-builder install-app-deps",
    "electron:dev": "cross-env BROWSER=none concurrently \"npm run start\" \"wait-on http://localhost:3000 && tsc -p electron -w\" \"wait-on http://localhost:3000 && tsc -p electron && electron .\"",
    "electron:build": "npm run build && tsc -p electron && electron-builder",
    "electron:build-win": "npm run build && tsc -p electron && electron-builder -w",
    "electron:package": "cross-env NODE_ENV=production tsc -p electron && electron-builder"
  },
}
```

Thêm phần sau vào file `tsconfig.json`:

```json title="tsconfig.json" {4-7}
{
  "extends": "./tsconfig.custom.json",
  ...
  "include": [
    "src",
    "electron"
  ]
}
```

Tạo một thư mục cùng cấp với `src`, đặt tên là `electron`, bên trong là file `main.ts` như sau:

```ts title="electron/main.ts"
import { app, BrowserWindow } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

let win: BrowserWindow | null = null;

const preDefinedWidth = 1000;
const predefinedHeight = 780;

function createWindow() {
  win = new BrowserWindow({
    width: preDefinedWidth,
    height: predefinedHeight,
    minWidth: preDefinedWidth,
    minHeight: predefinedHeight,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  if (isDev) {
    win.loadURL('http://localhost:3000/');
  } else {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`);
  }

  win.on('closed', () => {
    win = null;
  });

  // Hot Reloading
  if (isDev) {
    // 'node_modules/.bin/electronPath'
    // eslint-disable-next-line global-require
    require('electron-reload')(__dirname, {
      electron: path.join(__dirname, '..', '..', 'node_modules', '.bin', 'electron'),
      forceHardReset: true,
      hardResetMethod: 'exit',
    });
  }

  app.whenReady().then(() => {
    installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));
  });

  win.webContents.on('did-frame-finish-load', () => {
    if (isDev) {
      win.webContents.openDevTools();
    }
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
```

Vậy là ta đã có một app electron với kích thước cửa sổ mặc định là 1000x700.

Tiếp theo, tạo file `tsconfig.json` trong thư mục electron:

```json title="electron/tsconfig.json"
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "esModuleInterop": true,
    "outDir": "../build",
    "rootDir": "../",
    "noEmitOnError": true,
    "typeRoots": [
      "node_modules/@types"
    ]
  }
}
```

Và thế là xong, ta đã có một app electron chạy hoàn chỉnh được trên cả web:

```bash
npm run start
```

và electron:

```bash
npm run electron:dev
```

Để build thì câu lệnh cũng rất đơn giản, với web:

```bash
npm run build
```

và với electron:

```bash
npm run electron:build && npm run electron:package
```

![combo](https://i.ibb.co/zNZsCjV/electron-web-combo.jpg)

Chúc các bạn thành công.
