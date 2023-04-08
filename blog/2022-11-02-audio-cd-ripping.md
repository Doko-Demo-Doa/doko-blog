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

- Click vào tab Filename và điền vào khuôn dạng tên mong muốn, sau đây là ví dụ gợi ý:
  - Naming scheme: Điền dạng `%tracknr2% - %artist% - %title%`
  - Tick vào ô "Use various artist naming scheme", điền `%tracknr2% - %artist% - %title%`

(Cũng có thể sẽ có người thích bỏ `%artist%` ra khỏi các track không có nhiều tác giả, tùy họ).

![eac_options_filename](/img/audio-cd-guide/eac_options_filename.png)

- Click vào tab **Character replacements** để thay các kí tự mà hệ điều hành không cho phép bằng kí tự bạn mong muốn. Ở đây cũng không cần phải sửa gì.

![eac_options_charracter_replacements](/img/audio-cd-guide/eac_options_charracter_replacements.png)

- Click vào tab **Directories** và điền theo ý muốn, không thì để nguyên. Đây là nơi chỉ định đường dẫn các file kết quả xuất ra. If you want a fixed location for your rips, then select **Use this directory**, **Browse…** and select folder.

![eac_options_directories](/img/audio-cd-guide/eac_options_directories.png)

- Click **OK**

### Drive Options

- Mở Drive Optons bằng cách vào menu **EAC -> Drive Options...**

![eac_eac_menu-1024x467](/img/audio-cd-guide/eac_eac_menu-1024x467.png)

- Click OK ở bảng thông báo này:

![eac_drive_options_important_information](/img/audio-cd-guide/eac_drive_options_important_information.png)

- Click vào **Extraction Method** và click **Detect Read Features...**. Đút đĩa vào kiểm tra và xem kết quả.

![eac_drive_options_drive_feature_analyzing](/img/audio-cd-guide/eac_drive_options_drive_feature_analyzing.png) ![eac_drive_options_drive_feature_result](/img/audio-cd-guide/eac_drive_options_drive_feature_result.png)

- Chọn **Secure mode with following drive features (recommended)**
  - Tick vào "**Drive has ‘Accurate Stream’ feature**" (nếu nãy có test ra Yes)
  - Check "**Drive caches audio data**" (nếu nãy có test ra Yes)
  - Bỏ tick **Drive is compatible of retrieving C2 error information** (Kể cả có test ra Yes). Tính năng này phụ thuộc vào ổ đĩa có hỗ trợ hay không, và thường là không hoặc ổ đĩa đó không đáng tin cậy.

![eac_drive_options_extraction_method](/img/audio-cd-guide/eac_drive_options_extraction_method.png)

- Click vào tab Drive và click "**Autodetect read commands now**". Ô "**Drive read command**" sẽ được tự điền. 3 tùy chọn sau đó cứ để nguyên, trừ khi bạn có lý do đặc biệt nào đó.

![eac_drive_options_drive](/img/audio-cd-guide/eac_drive_options_drive.png)

- Click vào tab **Offset / Speed** và điền như sau:
  - Bỏ tick **Overread intro Lead-In and Lead-Out** (mặc định), trừ khi bạn chắc là ổ đĩa có hỗ trợ.
  - Tick vào **Allow speed reduction during extraction** (mặc định)
  - Tick vào **Use AccurateRip with this drive** (mặc định)

![eac_drive_options_offset_speed](/img/audio-cd-guide/eac_drive_options_offset_speed.png)

- Click vào tab **Gap Detection** và điền như sau:

  - **Gap/Index retrieval method**: "**Detection method A**" (Chọn B hoặc C nếu gặp vấn đề gì đó khi nhận diện khoảng lặng giữa các track).
  - **Detection accuracy**: **Secure**

![eac_drive_options_gap_detection](/img/audio-cd-guide/eac_drive_options_gap_detection.png)

- Click "**OK**"

### Compression Options

- Mở Compression Options bằng cách vào menu **EAC -> Compression Options...**

![eac_eac_menu](/img/audio-cd-guide/eac_eac_menu.png)

- Click vào tab **External Compression** và điền như sau:

  - Chọn **Use external program for compression**
  - Chọn **Parameter passing scheme:** **User Defined Encoder**
  - Chọn **Use external program for compression**.
  - Chọn **Parameter passing scheme: User Defined Encoder**.
  - Viết `.flac` trong phần **Use file extension:**.
  - Phía dưới **Program, including path used for compression** chọn đường dẫn đén file `flac.exe` (có trong EAC `program files, Exact Audio Copy\Flac\flac.exe`)
  - In the **Additional command-line options**, copy và paste vào đoạn bên dưới:

  ```
  -8 -V -T "ARTIST=%artist%" -T "TITLE=%title%" -T "ALBUM=%albumtitle%" -T "DATE=%year%" -T "TRACKNUMBER=%tracknr%" -T "GENRE=%genre%" -T "PERFORMER=%albuminterpret%" -T "COMPOSER=%composer%" %haslyrics%–tag-from-file=LYRICS="%lyricsfile%"%haslyrics% -T "ALBUMARTIST=%albumartist%" -T "DISCNUMBER=%cdnumber%" -T "TOTALDISCS=%totalcds%" -T "TOTALTRACKS=%numtracks%" -T "COMMENT=%comment%" %source% -o %dest%
  ```

  - Tick vào **Delete WAV after compression** (mặc định)
  - Tick **Use CRC check** (mặc định)
  - Bỏ tick **Add ID3 tag**
  - Tick **Check for external programs return code**

![eac_compression_options_external_compression](/img/audio-cd-guide/eac_compression_options_external_compression.png)

- Click vào tab **ID3 tag** và điền như sau:
  - Bỏ tick tất cả, trừ **Write cover image to extraction folder**
  - Ở ô **naming scheme**: viết "Cover" (hoặc bất kì tên file cover nào mà bạn muốn đặt)
  - Click **OK**

![eac_compression_options_id3_tag](/img/audio-cd-guide/eac_compression_options_id3_tag.png)

### Metadata Options

- Mở Compression Options bằng cách vào menu **EAC -> Metadata Options...**

![eac_eac_menu](/img/audio-cd-guide/eac_eac_menu.png)

- Click vào tab **Metadata Provider** và điền như sau:
  - Ở ô **Select metadata provider** chọn **CUETools DB Metadata Plugin V2.1.6** (hoặc phiên bản nào đó mới hơn)
  - Click **Show options of the selected metadata provider**
  - Chọn **Extensive** phía dưới **Metadata search mode** và **Large** phía dưới **Cover search mode**. Cả 2 lựa chọn này đều không bắt buộc.
  - Click **OK**.

![eac_metadata_options_metadata_provider](/img/audio-cd-guide/eac_metadata_options_metadata_provider.png)

- Click vào tab **freedb** và điền như sau:
  - Ở ô **Your e-mail address**: điền email vào, email giả cũng được.
  - Click **OK**

![eac_metadata_options_freedb](/img/audio-cd-guide/eac_metadata_options_freedb.png)

Và chúng ta đã xong khâu chuẩn bị, giờ thì bắt đầu rip đĩa CD thật này.
