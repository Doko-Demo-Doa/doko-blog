---
title: Solidity self-notes
author: Doko
author_title: Administrator
author_url: https://github.com/Doko-Demo-Doa
author_image_url: /img/avatar_doraemon.jpg
tags: [programming, english]
---

Trong solidity, các hàm trong interface luôn phải có từ khoá `external`:

```solidity
// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.4;

import "./Library.sol";

interface IAccountVault {
    function deposit(address account, uint256 amount) external;

    function withdraw(address account, uint256 amount) external;
}
```

cũng có thể có thêm `view`:

```solidity
function deposit(address account, uint256 amount) external;
```

nhưng không có `internal`:

```solidity
// Sẽ bị compiler báo lỗi
function deposit(address account, uint256 amount) internal;
```