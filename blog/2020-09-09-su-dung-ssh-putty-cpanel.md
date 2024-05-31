---
title: Sử dụng SSH với cPanel và Putty
authors: [doko]
hide_table_of_contents: false
tags: [vietnamese, networking, ssh, cpanel]
---

SSH là một giao thức bảo mật dùng để truyền tải thông tin an toàn có mã hóa qua mạng. Có 2 cách để thực hiện là truy cập bằng username / password (những ai hay sử dụng VPS chắc không lạ) và truy cập qua SSH key.

Các hosting con hỗ trợ cPanel cũng có tính năng này (tất nhiên là bên quản trị host phải bật SSH phía server). Linux được xây dựng giao thức này đi kèm, trong khi người sử dụng Windows cần sử dụng một chương trình ngoài, ở đây đề cập tới Putty.

## Bước 1: Tạo cặp key Public/Private

- Đăng nhập vào cPanel với username và password của bạn.

![cpanel](https://i.ibb.co/3zXDC9d/img.webp)

<!--truncate-->

- Vào mục SSH/Terminal hoặc SSH trong cửa sổ chính (ở đây sử dụng theme Lantern mới nên chỉ có chữ SSH):

![cpanel2](https://i.ibb.co/XCFvXLB/2.webp)

- Chọn **Manage Key**.
- Có 2 cách để thực hiện: Tạo key phía server và import vào Putty hoặc tạo key từ Putty và import vào server. Ở đây làm theo cách thứ nhất.
- Chọn Generate New Key. Có các form phải nhập:

![cpanel3](https://i.ibb.co/54chTb0/3.webp)

- Key Name: Đặt tên key.
- Key Password: Passphrase của key.
- Key Type: Kiểu mã hóa key, có 2 kiểu là RSA và DSA. DSA tạo khóa trao đổi nhanh hơn trong khi RSA xác thực nhanh hơn. Mình thì thích RSA hơn.
- Key Size: 2048 là đủ, 4096 tăng thời gian mã hóa / giải mã hơn.

Nhấn `Generate Key`. sau đó `Go Back`.

![key](https://i.ibb.co/RYwgZLG/4.webp)

Lúc này sẽ có 2 khóa được tạo: Public và Private. Vào Manage cái Public key trước (khoanh đỏ thứ 1), nhấn Authorize cho nó (để cho phép dùng được với cái hosting đang thao tác). Sau đó Go Back.

Vào View/Download của key private (khoanh đỏ thứ 2). Nếu sử dụng Putty, thì nhập Passphrase (lúc tạo nhập ý) vào và convert key sang dạng .ppk cho Putty luôn, nếu không thì thôi, xử lý sau. Ở đây chúng ta dùng Putty nên convert luôn cho tiện.

## Bước 2: Sử dụng Putty

Link download cả bộ, và cả các tool liên quan:

```
http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html
```

(Lấy file `Putty.exe` thôi nhé).

Khởi động, tóm lại là sẽ có 3 chỗ cần lưu ý:

![p](https://i.ibb.co/027cswj/6.webp)

Ở `Session`:

- Hostname: IP của máy chủ (không biết thì gõ cái domain vào, ví dụ doko.ani.vn)
- Port: Mặc định SSH là 22, còn không thì gửi email hỏi bên cung cấp xem họ sử dụng port nào.

![p](https://i.ibb.co/qnXmnpv/7.webp)

_SSH > Auth:_

Chọn file key `.ppl` lúc nãy save.

![p](https://i.ibb.co/w0WkkCn/8.webp)

_Connection > Data:_

Auto-login username là tên đăng nhập vào cPanel.

Sau đó chọn Open. Lần đầu nó sẽ hỏi confirm cái Fingerprint, chọn Yes. Và thế là OK.
