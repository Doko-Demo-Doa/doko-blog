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

### Tùy chỉnh trong EAC

- Mở phần options bằng cách vào EAC -> EAC Options...

![eac_eac_menu](/img/audio-cd-guide/eac_eac_menu.png)

- Click vào tab **Extraction** và điền như sau:
  - Tick vào "Full up missing offset samples with silence" (mặc định là có tick)
  - Tick vào "Synchronize between tracks"
  - Chỉnh "Error recovery quality" lên mức "High"
  - Còn lại để như mặc định

![eac_options_extraction](/img/audio-cd-guide/eac_options_extraction.png)

- Click vào tab **General** và điền như sau:
  - Tick vào "Use alternate CD Play routines"
  - Tick vào "Disable 'CD Autostart' for audio and data CDs while EAC running"
  - Tick vào "On unknown CDs" và chọn "automatically access online metadata database"
  - Tick vào "Create log files always in english language"
  - Chỗ còn lại để mặc định.

![eac_options_general](/img/audio-cd-guide/eac_options_general.png)

- Click vào tab **Tools** và điền như sau:
  - Tick vào "Retrieve UPC / ISRC codes in CUE sheet generation"
  - Tick vào "Use CD-Text information in CUE sheet generation"
  - Tick vào "Automatically write status report after extraction"
  - Tick vào "Append checksum to status report"
  - Tick vào "Convert BMP image files automatically to JPG"
  - Bỏ tick vào "On extraction, start external compressors queued in the backround"
  - Bỏ tick vào "Activate beginner mode, disable all advanced features"
  - Chỗ còn lại để mặc định.

![eac_options_tools](/img/audio-cd-guide/eac_options_tools.png)

- Click vào tab **Normalize** và bỏ tick "**Normalize**"

![eac_options_normalize](/img/audio-cd-guide/eac_options_normalize.png)
