---
title: Hướng dẫn rip đĩa CD sang FLAC bằng Exact Audio Copy
author: Doko
author_title: Administrator
author_url: https://github.com/Doko-Demo-Doa
author_image_url: /img/avatar_doraemon.jpg
image: /img/yugioh/shooting-majestic-star-dragon.png
tags: [software, vietnamese, guide]
---

Bài viết này sẽ hướng dẫn cách rip (sao chép và nén) đĩa nhạc sang định dạng WAV và chuyển đổi tiếp sang dạng nhỏ hơn (nhưng vẫn đảm bảo không mất dữ liệu - hay còn gọi là lossess): FLAC. Ngoài ra còn có thêm file log và cue sheet (dùng để định danh các track nhạc trong đĩa).

<!-- truncate -->

## Cài dặt và config

### Cài đặt Exact Audio Copy (EAC)

- Tải về phiên bản mới nhất của Exact Audio Copy tại [đây](https://www.exactaudiocopy.de/en/index.php/resources/download/).
- Bộ cài này dành cho Windows. Quá trình cài đặt khá đơn giản, bạn cũng có thể bỏ chọn _GD3 Metadata Plugin_ vì plugin này phải trả phí.
- Bản cài đặt sẽ chiếm khoảng 20MB. Trong quá trình cài đặt bạn sẽ được yêu cầu cài thêm [.NET Framework Runtime 3.5](https://learn.microsoft.com/en-gb/dotnet/framework/install/dotnet-35-windows). Cứ tiếp tục cài kèm là xong.

### Khởi chạy

Nếu ở bước trước bạn vẫn cài đặt GD3 Metadata Plugin. Sẽ có popup hỏi dạng:

:::info

The test version of the GD3 metadata provider was installed together with EAC. Do you want to use the 10 album lookups test version as the current metadata provider?

:::

thì chọn cancel, vì ta sẽ không sử dụng phần này.

### Calibrate CD với AccurateRip

**AccurateRip** plugin sẽ được sử dụng để kiểm tra checksum với một cái đĩa đã có sẵn trong database. Sau khi đút đĩa vào ổ, nếu đĩa có thông tin trong database của AccurateRip, popup sau sẽ hiện ra. Nếu đĩa dùng được thì popup sẽ hiện.

![eac_accuraterip_popup](/img/audio-cd-guide/eac_accuraterip_popup.png)

Click vào nút Configure, popup sau có thể sẽ hiện ra. Nội dung:

![eac_accuraterip_set_up_correctly](/img/audio-cd-guide/eac_accuraterip_set_up_correctly.png)

> _Congratulations, AccurateRip has been set up correctly. It is recommended that this disc is ripped to test the accuracy of your drive. Calculated offset value: +6 samples, +24 bytes._

Logo AccurateRip góc dưới bên phải sẽ cho biết AccurateRip đã được calibrate.
