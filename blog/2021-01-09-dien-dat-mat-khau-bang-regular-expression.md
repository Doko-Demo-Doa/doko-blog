---
title: Diễn đạt mật khẩu bằng Regular Expression
author: Doko
author_title: Administrator
author_url: https://github.com/Doko-Demo-Doa
author_image_url: /img/avatar_doraemon.jpg
hide_table_of_contents: true
tags: [vietnamese, programming, regular-expression]
---


Ví dụ có một yêu cầu đặt ra như sau: Sử dụng regex (regular expression) để kiểm tra quy ước đặt tên:

– Gồm **8 ký tự**, không hơn không kém.
– Có một chữ cái in hoa.
– Có một ký tự đặc biệt.
– Có số.

Vậy làm sao để viết regex kiểm tra được hết?

<!--truncate-->


Để đáp ứng các yêu cầu trên, đoạn regex rất phức tạp nên dựa theo từng yêu cầu con, chúng ta có thể chia ra làm nhiều phần nhỏ để xử lý:

Theo C# và Java chúng ta có thể thêm .length để kiểm tra. Trong C++ là `.length()`

– Một ký tự hoa: `[A-Z]+`

– Một ký tự đặc biệt: `\W` hoặc `[!@#]` để chỉ định danh sách các ký tự muốn cho vào.

– Một ký tự là số: `\w+`

Cụ thể:

```bash
(?=.*\d) # Chứa một ký tự số
(?=.*[A-Z]) # Chứa một ký tự viết hoa
(?=.*\W) # Chứa một ký tự đặc biệt
. # Có ít nhất một trong các luật đã đưa ra
{8,8} # Có ít nhất 8 và tối đa 8 ký tự
```

Gộp lại thành 1 dòng:

```js
((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,8})
```