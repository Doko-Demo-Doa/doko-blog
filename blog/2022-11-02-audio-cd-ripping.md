---
title: Hướng dẫn rip đĩa CD sang FLAC bằng Exact Audio Copy
authors: [doko]
image: /img/audio-cd-guide/eac_eac_menu.png
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

## Rip CD

Việc rip CD sẽ yêu cầu làm thêm một số bước, cũng có nghĩa là sẽ tốn thêm chút thời gian. Tuy nhiên kết quả đạt được sẽ tốt hơn đa số các phần mềm khác.

Các bước bạn đã làm phía trên là chuẩn bị cho chương trình, làm một lần thôi. Còn các bước dưới đây là các bước bạn sẽ cần làm lại mỗi khi rip một đĩa CD mới. Lưu ý là các bước dưới đây cần được thực hiện theo thứ tự được viết.

### Metadata

Bước đầu tiên là download metadata cho các file từ **CUETools metadata database**

- Đút đĩa vào ổ
- Click vào mũi tên nhỏ bên cạnh nút có biểu tượng 2 đĩa CD và một dấu cộng như hình, sau đó chọn **CUETools DB Metadata Plugin V2.1.6** (hoặc mới hơn)

![eac_select_metadata_provider_cuetools_db_metadata_plugin-1024x467](/img/audio-cd-guide/eac_select_metadata_provider_cuetools_db_metadata_plugin-1024x467.png)

- Click vào chính giữa biểu tượng đó
- Click vào nút **Yes**

![eac_metadata_provider_warning](/img/audio-cd-guide/eac_metadata_provider_warning.png)

Chọn kết quả sát nhất và nhấn **OK**

![eac_metadata_provider_ctdb_metadata_lookup](/img/audio-cd-guide/eac_metadata_provider_ctdb_metadata_lookup.png)

Sau khi metadata được tổng hợp lại, kiểm tra xem đã đúng chưa. Tất cả các trường metadata giờ có thể được chỉnh sửa ở trong cửa sổ chính của EAC.

## Nhận diện Gaps

"Gaps" ở đây là các khoảng lặng giữa các track nhạc. Các khoảng lặng này không ảnh hưởng đến chất lượng âm thanh, nhưng phải được phát hiện ra để quá trình copy và cắt bài được thực hiện đứng.

- Click vào **Action** và tick vào **Append Gaps To Previous track (default)**.
- Cũng trong menu **Action**, click **Detect Gaps** và đợi nó thực hiện xong. Sau khi xong thì mục "Gap" sẽ chuyển từ "unknown" sang mã thời gian.

![eac_action_detect_gaps-1024x466](/img/audio-cd-guide/eac_action_detect_gaps-1024x466.png)

## Tạo CUE Sheet

CUE Sheet là một file văn bản nhỏ, lưu trữ thông tin về cách và nơi các track được ghi lại lên ổ đĩa cứng, kèm theo một số thông tin có thể sẽ cần thiết nếu sau này bạn burn những track nhạc này lên đĩa CD khác. CUE Sheet không phải bắt buộc, nhưng khuyến cáo là nên tạo để có thông tin kiểm chứng sau này.

- Click **Action** -> **Create CUE Sheet** -> **Multiple WAV Files With Gaps… (Noncompliant)** và đợi analyzing xong.

![eac_action_create_cue_sheet-1024x466](/img/audio-cd-guide/eac_action_create_cue_sheet-1024x466.png)

## Extract và nén file

Bước còn lại cuối cùng là rip. Bước này sẽ xả file từ CD, kiểm tra và sửa lỗi (nếu có), sau đó nén file dưới định dạng FLAC.

- Click **Action** -> **Test & Copy Selected Tracks** -> **Compressed...**

![eac_action_test_and_copy_selected_tracks-1024x466](/img/audio-cd-guide/eac_action_test_and_copy_selected_tracks-1024x466.png)

- Popup **Extraction Audio Data** sẽ hiện ra, báo hiệu quá trình rip bắt đầu. Tùy theo tình trạng đĩa CD, quá trình này có thể sẽ lâu (nhưng không quá lâu).

![eac_extracting_audio_data](/img/audio-cd-guide/eac_extracting_audio_data.png) ![eac_extracting_audio_data_done](/img/audio-cd-guide/eac_extracting_audio_data_done.png)

Sau khi hoàn thành, folder đầu ra sẽ chứa các file `.flac`, file `.log` và `.cue` (và cả file `.jpg` cover nếu có).

![eac_output_files-1024x679](/img/audio-cd-guide/eac_output_files-1024x679.png)

## Kiểm tra thành quả

Sau quá trình xả và nén, ta nên kiểm tra lại quá trình đó đã thành công (hay không). Đầu tiên là kiểm tra xem tất cả các file được lưu dạng `.flac`, do cũng có lúc bộ mã hóa thất bại nhưng không báo trong file log.

### Kiểm tra file .log

Bạn sẽ cần mở file `.log` bằng chương trình đọc văn bản nào đó (Notepad chẳng hạn) và kiểm tra tình hình:

Nếu rip thành công thì file log sẽ trông như này:

```
All tracks accurately ripped

No errors occurred

End of status report
```

Nếu thất bại thì trông như này, kèm theo thông tin cũng như các lỗi mà EAC không sửa được:

```
Some tracks could not be verified as accurate

There were errors

End of status report
```

Nếu có lỗi, bạn có thể nhìn vào từng track một để xem.

Trong ví dụ phía dưới, có ghi là quá trình Copy hoàn tất, nhưng không thể kiểm tra ở đoạn 0:02:05 - 0:02:11, vậy là có vấn đề ở đoạn này. Có lúc có thể nhận diện được tự động, cũng có lúc không, nên cần kiểm tra bằng tai.

```
Track 16

     Filename C:\EAC_OUTPUT\16 - The Nightfall' (fripside).wav

     Suspicious position 0:02:05 - 0:02:11

     Peak level 100.0 %
     Extraction speed 0.7 X
     Track quality 96.9 %
     Test CRC 434BD8B4
     Copy CRC D020485F
     Cannot be verified as accurate (confidence 3)  [254AB38A], AccurateRip returned [E5981F6F]  (AR v2)
     Copy finished
```

Còn đây là khi rip thành công, có chữ "Accurately ripped" và "Copy OK"

Track quality có lúc bị dưới 100%, có nghĩa là cần chỉnh sửa. Nhưng lỗi đã được sửa tự động và bản copy này hoàn hảo 100%, không bị hụt chất lượng.

```
Track  2

     Filename C:\EAC_OUTPUT\02 - The Pitcher - Little Bitch.wav

     Peak level 100.0 %
     Extraction speed 0.9 X
     Track quality 99.9 %
     Test CRC 5F2A6E3A
     Copy CRC 5F2A6E3A
     Accurately ripped (confidence 1)  [FAA3D707]  (AR v2)
     Copy OK
```

Ở cuối file log sẽ có báo cáo riêng của CUETools DB Plugin, nó dùng để so sánh với các bản rip khác có trên hệ thống. Chỉ cần thấy "Accurately ripped" và tham chiếu "CTDB TOCID" trùng với kết quả gửi lên là ok (tham khảo bên dưới).

```
---- CUETools DB Plugin V2.1.6

[CTDB TOCID: KyVydx1nYbdEYuAsw3Ke1nt8Qks-] found
Submit result: KyVydx1nYbdEYuAsw3Ke1nt8Qks- has been confirmed
Track | CTDB Status
1 | (4/5) Accurately ripped
2 | (4/5) Accurately ripped
3 | (4/5) Accurately ripped
4 | (4/5) Accurately ripped
5 | (4/5) Accurately ripped
6 | (4/5) Accurately ripped
7 | (4/5) Accurately ripped
8 | (4/5) Accurately ripped
9 | (4/5) Accurately ripped
10 | (4/5) Accurately ripped
11 | (4/5) Accurately ripped
12 | (4/5) Accurately ripped
13 | (4/5) Accurately ripped
14 | (4/5) Accurately ripped
15 | (4/5) Accurately ripped
16 | (4/5) Accurately ripped
17 | (4/5) Accurately ripped
```

## Kết luận

Vậy là xong quá trình rip đĩa CD. Dung lượng rip đĩa thì tùy CD nhưng sẽ rơi vào đâu đó khoảng 10-25MB / track. Bạn nên nén các file này vào file zip/rar để bảo quản về sau.

Have fun
