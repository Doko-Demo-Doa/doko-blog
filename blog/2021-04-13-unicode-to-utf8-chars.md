---
title: Chuyển Unicode thành UTF8 char
authors: [doko]
tags: [vietnamese, programming, unicode]
hide_table_of_contents: true
---

![Chuyển Unicode thành ký tự UTF-8.](/img/unicode-logo.png)

Trước tiên hãy xem bảng sau, bên trái là khoảng các kí tự unicode, bên phải là dạng nhị phân sau khi convert:

```
U-00000000 – U-0000007F: 	0xxxxxxx
U-00000080 – U-000007FF: 	110xxxxx 10xxxxxx
U-00000800 – U-0000FFFF: 	1110xxxx 10xxxxxx 10xxxxxx
U-00010000 – U-001FFFFF: 	11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
U-00200000 – U-03FFFFFF: 	111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
U-04000000 – U-7FFFFFFF: 	1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
```

Và dĩ nhiên là tất cả tính toán đều phải đưa về dạng nhị phân.
Các chữ cái `x` đều phải được điền bằng giá trị tương ứng.

<!--truncate-->

Ví dụ:

Chữ "あ" có mã unicode là 3042:

| 3    | 0    | 4    | 2    |
| ---- | ---- | ---- | ---- |
| 0011 | 0000 | 0100 | 0010 |

_3042 (`U-00003042`) sẽ đi theo luật 3 (3x UTF8 character):_

Lý do: Trích từ Wikipedia:

> Three bytes are needed for characters in the rest of the Basic Multilingual Plane, which contains virtually all characters in common use, including most **Chinese, Japanese and Korean** characters

Dựa vào bảng chuyển đổi sau (lấy từ [Wikipedia](https://en.wikipedia.org/wiki/UTF-8), thật ra chính là phiên bản rút gọn của bảng trên cùng):

| First code point | Last code point |     Byte 1 | Byte 2     | Byte 3     | Byte 4     |
| ---------------: | --------------: | ---------: | ---------- | ---------- | ---------- |
|           U+0000 |          U+007F | `0xxxxxxx` | -          | -          | -          |
|           U+0080 |          U+07FF | `110xxxxx` | `10xxxxxx` | -          | -          |
|           U+0800 |          U+FFFF | `1110xxxx` | `10xxxxxx` | `10xxxxxx` | -          |
|          U+10000 |        U+10FFFF | `11110xxx` | `10xxxxxx` | `10xxxxxx` | `10xxxxxx` |

Ta được (phần đậm là phần đã convert):

1110**0011** 10**000001** 10**000010**

Chuyển đổi sang:

- Dạng thập lục: `E3 81 82`
- Dạng thập phân: `227 129 130`

Lấy dạng thập phân, ta được kết quả: "あ" sẽ có mã UTF-8 là `\227\129\130`

Code C++ cho quá trình chuyển đổi trên:

```cpp
#include <string.h>
#include <windows.h>

wchar_t* CtoCW(char* c)
{
    int wc_len = MultiByteToWideChar(CP_UTF8, 0, c, strlen(c), 0, 0);
    wchar_t *wc = new wchar_t[wc_len+1];
    MultiByteToWideChar(CP_UTF8, 0, c, strlen(c), wc, wc_len);
    wc[wc_len] = L'\0';
    return wc;
}

char* WCtoC(wchar_t* wc)
{
    int c_len = WideCharToMultiByte(CP_UTF8, 0, wc, wcslen(wc), 0, 0, 0, 0);
    char *c = new char[c_len+1];
    WideCharToMultiByte(CP_UTF8, 0, wc, wcslen(wc), c, c_len, 0, 0);
    c[c_len] = '\0';
    return c;
}
```

Tham khảo thêm: [Bảng chữ cái Hiragana trong Unicode](http://i18nguy.com/unicode/hiragana.html)
