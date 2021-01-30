---
title: Sơ lược về Sub Station Alpha v4.00+ (ongoing)
author: Doko
author_title: Administrator
author_url: https://github.com/Doko-Demo-Doa
author_image_url: /img/avatar_doraemon.jpg
hide_table_of_contents: true
tags: [vietnamese, ssa, fansubs]
---

Dù bạn là người mới sử dụng Aegisub hay đã từng làm phụ đề một thời gian, chắc hẳn các bạn không còn lạ gì với các tập tin có định dạng .ass (Advanced Sub Station), chuẩn định dạng phụ đề 4.0 của định dạng Sub Station Alpha (trước đây sử dụng phổ biến với chương trình Medusa).

Định dạng này có thể làm được rất nhiều thứ, từ hiển thị chữ (cơ bản) đến định dạng chữ, màu, karaoke, điều chỉnh vị trí, quản lý kiểu chữ cùng rất nhiều các thông tin khác. Bài viết nhằm mô tả đầy đủ các thông tin có trong một file .ass. Các thông tin này có thể không hiển thị ngay khi mở bằng Aegisub, mà sử dụng một chương trình soạn thảo văn bản như Notepad chẳng hạn.

Bài viết này mô tả định dạng SSA 4.0 nguyên bản (có thể tìm thấy ở http://www.eswat.demon.co.uk). Các phần cập nhật và các phần có thể khác biệt được đánh dấu màu đỏ.

<!--truncate-->

## Thông tin chung

Tài liệu này mặc nhiên hiểu là bạn đã làm quen với khái niệm của Sub Station Alpha, một định dạng phụ đề khá phổ biển. Tài liệu của SSA có thể dễ dàng tìm thấy ở các file help hoặc google.

### Định dạng ASS (SSA v4) khác với các định dạng SSA trước đó

- SSA v4 có thể đọc lại các định dạng trước, nhưng các định dạng trước thì không đọc ngược lại được.

- Có một số trường thông tin cho phép các phiên bản sub decoder sau này có thể đọc lại, hoặc các phiên bản hiện thời có thể đọc các định dạng SSA mới hơn sau này. Tuy nhiên có một số trường thông tin chỉ có ở một số phiên bản.

### Các sub script đơn thuần chỉ là các file văn bản DOS.

- Tức là có thể được chỉnh sửa bằng hầu hết các trình soạn thảo văn bản hiện giờ, tốt hơn hết là có hỗ trợ Unicode (Notepad, Wordpad, Word,...v...v...). Tuy nhiên phải xem cái sub decoder có lỗi tương thích gì với cái script đang sử dụng hay không trước khi dùng. Hiện VSFilter và VSFiltermod thì không vấn đề gì cả.

### Script được chia thành các phần giống định dạng file .ini của Windows.

- Nhưng không có nghĩa SSA theo chuẩn file .ini của Windows. Tiêu đề các phần được đóng ngoặc vuông.

### Trước mỗi phần (section) thường có một vài dòng comment

- Các dòng này mô tả tính năng của phần đó nhưng không được sử dụng thực tế, cái này giống dấu // trong lập trình C, còn ở đây là dấu chấm phẩy.

### Các trường thông tin trong mỗi phần (section) được ngăn cách bởi dấu phẩy.

- Có nghĩa là thông tin về các Style chẳng hạn, không được sử dụng dấu phẩy ở phần tên. Trong Aegisub đặt cũng được, nhưng sẽ bị thay hết bằng dấu chấm phẩy.

### Định dạng SSA không quan trọng thứ tự trước sau của câu sub.

- Nghĩa là không cần đánh số thứ tự như SRT. Có xáo trộn các câu sub như thế nào đi nữa thì nó vẫn phát đúng theo thời gian bắt đầu và thời gian kết thúc được ghi ở mỗi dòng trong phần `[Events]`.

### Các dòng sai định dạng sẽ bị bỏ qua.

- Các dòng mà SSA không hiểu, nó sẽ bỏ qua, và đưa ra thông báo sau khi script được load vào bộ nhớ (ví dụ: Line có style là ABC nhưng trong Style Manager không có định dạng này, thì sẽ chuyển về Default).

### Các dòng không thể tách được.

- Mỗi mục chứa thông tin đều phải chứa đầy đủ thông tin trong một dòng.

### Nếu một style đã được định nghĩa mà trong hệ thống không có, font Arial sẽ được sử dụng.

- Tuy nhiên từ bản VSFilter 2.2 trở đi, chính xác là (như đã nói ở trên), font trong phần Default sẽ được kiểm tra và sử dụng trước khi xét đến lỗi này.

## Các thành phần trong script Sub Station Alpha

### [Script Info]

- Chứa thông tin chung của script, có thể coi là header của file.
- Phần `[Script Info]` luôn luôn là phần đầu trong một script v4.

### [v4 Styles]

- Định nghĩa các style được sử dụng trong script, tất cả đều phải khai báo ở đây.
- ASS sử dụng `[v4 Styles+]`

### [Events]

- Phần chính của script, chứa các dòng sub (dialogues, comments,...).

### [Fonts]

Phần chứa font nhúng trong script. Các font đều được mã hóa sang dạng văn bản. Chỉ sử dụng được font dạng True Type (.ttf). Mỗi file font được mở đầu theo kiểu:

```
fontname:
```

Từ `fontname` phải ghi thường (không ghi hoa, nếu ghi hoa sẽ bị xem như một phần của file mã hóa).

tên mà SSA dùng khi lưu file font. Cụ thể:

tên file true type font ban đầu,

có thêm dấu gạch dưới _,

có thêm chữ “B” nếu là In đậm,

có thêm chữ “I” nếu là In nghiêng,

thêm số ở sau nếu cần chỉ định mã hóa (xem trong style manager của Aegisub để biết thêm chi tiết, mặc định là 0 - default),

thêm đuôi “.ttf”

Ví dụ:

```ass
fontname: chaucer_B0.ttf
fontname: comic_0.ttf
```

Sau phần tên font là chuỗi ký tự mã hóa font, thể hiện dạng nhị phân của font đó. Mỗi dòng có 80 ký tự, dòng cuối có thể ít hơn.

Xem phần "Phụ lục B" để biết thêm chi tiết.

### [Graphics]

- Phần này chứa các file đồ họa đã được mã hóa văn bản, nếu như trước đó người dùng muốn sử dụng hình ảnh trong script. File ảnh được mã hóa text, dù không hiệu quả lắm nhưng đảm bảo cho việc các script SSA vẫn có thể được đọc bởi bất kì công cụ văn bản nào.

- Mỗi file đồ họa được bắt đầu bởi một dòng đơn, có khuôn dạng:

```bash
filename: <name of file>
```

`filename` phải ở dạng viết thường, nếu viết hoa sẽ được xem như một phần text thông thường.

`<name of file>` là tên file mà SSA sẽ lưu lại khi lưu file ảnh, sẽ có cùng tên với ảnh được sử dụng trong script.

SSA lưu bất kì file nào tìm thấy trong script trong một thư mục có tên "Pictures" cùng folder với file script. Nếu có đường dẫn được chỉ định rõ ràng thì sẽ tìm trong đó trước khi tìm trong "Pictures".

Ngay phía sau `fontname` là tên font dùng để embed vào script.


## 3. The line types in a Sub Station Alpha script

Phần sau đây mô tả các loại dòng có thể xuất hiện trong một file ASS. Chi tiết sẽ được đề cập ở phần sau.

| Tên thẻ | Ý nghĩa |
|-|-|
| !: | Phần này không hiển thị khi xem, chỉ là một dạng metadata. |
| Title | Tiêu đề script. |
| Original Script | Script gốc. |
| Original Translation | Bản dịch gốc. |
| Original Editing | Bản chỉnh sửa gốc. |
| Original Timing | Bản căn thời gian gốc. |
| Sync Point | Mô tả điểm bắt đầu play trong video. |
| Script Updated By | Tên người cập nhật script. |
| Update Details | Nội dung cập nhật script. |
| ScriptType | Phiên bản script, ví dụ: ". |
| Collisions | Cho biết phụ đề sẽ được di chuyển như thế nào. |
| PlayResY | Chiều cao của màn hình sử dụng bởi tác giả khi chạy script |
| PlayResX | Chiều ngang của màn hình sử dụng bởi tác giả khi chạy script |
| PlayDepth | Độ sâu màu (Color Depth) được sử dụng khi chạy script |
| Timer | Tốc độ hiển thị của script, dưới dạng phần trăm. Ví dụ. "100.0000" là đúng 100%. Timer được sử dụng dưới dạng số nhân. |
| Style | Định nghĩa style, sử dụng để định dạng kiểu hiển thị trong file sub. |
| Dialogue | Câu thoại. Text sẽ hiển thị ở đây. |
| Comment | Comment. Có nội dung giống Dialogue / Style, nhưng khi play sẽ được bỏ qua. |
| WrapStyle | Định nghĩa cách xuống dòng. <br>0: xuống dòng "thông minh", các dòng sẽ được chia đều <br>1: chỉ xuống dòng khi hết câu, cắt dòng bởi `\N` <br>2: không xuống dòng, `\n` `\N` đều cắt dòng <br>3: giống 0, nhưng dòng dưới sẽ rộng hơn. |


## 5. Dòng Style, `[v4+ Styles]`

"Style" chỉ định cách hiển thị và vị trí của phụ đề. Tất cả các style được dùng bởi script đều được định nghĩa bởi một dòng Style trong script.

Tất cả các tùy chỉnh trong Style (trừ Shadow, Outline và Depth) đều có thể được ghi đè bằng các thẻ viết trong phần text của phụ đề.

The fields which appear in each Style definition line are named in a special line with the line type “Format:”. The Format line must appear before any Styles - because it defines how SSA will interpret the Style definition lines. The field names listed in the format line must be correctly spelled! The fields are as follows:<br>

Các dòng trong phần định nghĩa style được đặt tên theo quy ước của một dòng đặc biệt có tên `Format:`. Dòng `Format` này xuất hiện trước tất cả các Style, vì nó sẽ quyết định cách SSA thông dịch các Style. Các trường trong mục Format đều phải được ghi đúng chính tả, bao gồm:

```
1. Name
2. Fontname
3. Fontsize
4. PrimaryColour
5. SecondaryColour
6. TertiaryColour
7. BackColour
8. Bold
9. Italic
9.1. Underline
9.2. StrikeOut
9.3. ScaleX
9.4. ScaleY
9.5. Spacing
9.6. Angle
10. BorderStyle
11. Outline
12. Shadow
13. Alignment
14. MarginL
15. MarginR
16. MarginV
17. AlphaLevel
18. Encoding
```

| Tên field | Ý nghĩa |
|-|-|
| Field 1 | Tên Style, có phân biệt hoa thường, không bao gồm dấu phẩy. |
| Field 2 | Tên font được dùng bởi Windows, có phân biệt hoa thường |
| Field 3 | Kích thước font. |
| Field 4 | PrimaryColor - màu chủ đạo, tức là màu của phần thịt chữ. |
| Original Editing | Bản chỉnh sửa gốc. |
| Original Timing | Bản căn thời gian gốc. |
| Sync Point | Mô tả điểm bắt đầu play trong video. |
| Script Updated By | Tên người cập nhật script. |
| Update Details | Nội dung cập nhật script. |
| ScriptType | Phiên bản script, ví dụ: ". |
| Collisions | Cho biết phụ đề sẽ được di chuyển như thế nào. |
| PlayResY | Chiều cao của màn hình sử dụng bởi tác giả khi chạy script |
| PlayResX | Chiều ngang của màn hình sử dụng bởi tác giả khi chạy script |
| PlayDepth | Độ sâu màu (Color Depth) được sử dụng khi chạy script |
| Timer | Tốc độ hiển thị của script, dưới dạng phần trăm. Ví dụ. "100.0000" là đúng 100%. Timer được sử dụng dưới dạng số nhân. |
| Style | Định nghĩa style, sử dụng để định dạng kiểu hiển thị trong file sub. |
| Dialogue | Câu thoại. Text sẽ hiển thị ở đây. |
| Comment | Comment. Có nội dung giống Dialogue / Style, nhưng khi play sẽ được bỏ qua. |
| WrapStyle | Định nghĩa cách xuống dòng. <br>0: xuống dòng "thông minh", các dòng sẽ được chia đều <br>1: chỉ xuống dòng khi hết câu, cắt dòng bởi `\N` <br>2: không xuống dòng, `\n` `\N` đều cắt dòng <br>3: giống 0, nhưng dòng dưới sẽ rộng hơn. |

```
<h2><a name="6" href="#top">6. Dialogue event lines, [Events] section</a></h2>
These contain the subtitle text, their timings, and how it should be displayed.<br>
The fields which appear in each Dialogue line are defined by a <b>Format</b>: line, which must appear before any events in the section. The format line specifies how SSA will interpret all following Event lines. The field names must be spelled correctly, and are as follows:<br>
<br>
<b>Marked, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text</b><br>
<br>
The last field will always be the Text field, so that it can contain commas. The format line allows new fields to be added to the script format in future, and yet allow old versions of the software to read the fields it recognises - even if the field order is changed.<br>
<table>
<tr><td>Field 1:</td><td><b>Marked</b><br>
Marked=0 means the line is not shown as "marked" in SSA.<br>
Marked=1 means the line is shown as "marked" in SSA.</td></tr>
<tr><td><span class="mark">Field 1:</span></td><td><span class="mark">Layer (any integer)<br>
<br>
Subtitles having different layer number will be ignored during the collusion detection.<br>
<br>
Higher numbered layers will be drawn over the lower numbered.</span></td></tr>
<tr><td>Field 2:</td><td><b>Start</b><br>
Start Time of the Event, in 0:00:00:00 format ie. Hrs:Mins:Secs:hundredths. This is the time elapsed during script playback at which the text will appear onscreen. Note that there is a single digit for the hours!</td></tr>
<tr><td>Field 3:</td><td><b>End</b><br>
End Time of the Event, in 0:00:00:00 format ie. Hrs:Mins:Secs:hundredths. This is the time elapsed during script playback at which the text will disappear offscreen. Note that there is a single digit for the hours!</td></tr>
<tr><td>Field 4:</td><td><b>Style</b><br>
Style name. If it is "Default", then your own *Default style will be subtituted.<br>
<br>
However, the Default style used by the script author IS stored in the script even though SSA ignores it - so if you want to use it, the information is there - you could even change the Name in the Style definition line, so that it will appear in the list of "script" styles.</td></tr>
<tr><td>Field 5:</td><td><b>Name</b><br>
Character name. This is the name of the character who speaks the dialogue. It is for information only, to make the script is easier to follow when editing/timing.</td></tr>
<tr><td>Field 6:</td><td><b>MarginL</b><br>
4-figure Left Margin override. The values are in pixels. All zeroes means the default margins defined by the style are used.</td></tr>
<tr><td>Field 7:</td><td><b>MarginR</b><br>
4-figure Right Margin override. The values are in pixels. All zeroes means the default margins defined by the style are used.</td></tr>
<tr><td>Field 8:</td><td><b>MarginV</b><br>
4-figure Bottom Margin override. The values are in pixels. All zeroes means the default margins defined by the style are used.</td></tr>
<tr><td>Field 9:</td><td><b>Effect</b><br>
Transition Effect. This is either empty, or contains information for one of the three transition effects implemented in SSA v4.x<br>
<br>
The effect names are case sensitive and must appear exactly as shown. The effect names do not have quote marks around them.<br>
<br>
<b>"Karaoke"</b> means that the text will be successively highlighted one word at a time.<br>
<br>
<span class="mark">Karaoke as an effect type is obsolete.</span><br>
<br>
<b>"Scroll up;y1;y2;delay<span class="mark">[;fadeawayheight]</span>"</b> means that the text/picture will scroll up the screen. The parameters after the words "Scroll up" are separated by semicolons.<br>
<br>
The y1 and y2 values define a vertical region on the screen in which the text will scroll. The values are in pixels, and it doesn't matter which value (top or bottom) comes first. If the values are zeroes then the text will scroll up the full height of the screen.<br>
<br>
The delay value can be a number from 1 to 100, and it slows down the speed of the scrolling - zero means no delay and the scrolling will be as fast as possible.<br>
<br>
<b>“Banner;delay”</b> means that text will be forced into a single line, regardless of length, and scrolled from right to left accross the screen.<br>
<br>
The delay value can be a number from 1 to 100, and it slows down the speed of the scrolling - zero means no delay and the scrolling will be as fast as possible.<br>
<br>
<span class="mark">"Scroll down;y1;y2;delay[;fadeawayheight]"<br>
<br>
“Banner;delay[;lefttoright;fadeawaywidth]”<br>
<br>
lefttoright 0 or 1. This field is optional.  Default value is 0 to make it backwards compatible.<br>
<br>
When delay is greater than 0, moving one pixel will take (1000/delay) second.<br>
<br>
(WARNING: Avery Lee’s “subtitler” plugin reads the “Scroll up” effect parameters as delay;y1;y2)<br>
<br>
fadeawayheight and fadeawaywidth parameters can be used to make the scrolling text at the sides transparent.</span></td></tr>
<tr><td>Field 10:</td><td><b>Text</b><br>
Subtitle Text. This is the actual text which will be displayed as a subtitle onscreen. Everything after the 9th comma is treated as the subtitle text, so it can include commas.<br>
<br>
The text can include \n codes which is a line break, and can include Style Override control codes, which appear between braces { }.</td></tr>
</table>
<h2><a name="7" href="#top">7. Comment event lines, [Events] section</a></h2>
These can contain the same information as any of the other event line types, but they will be ignored when the script is played.
<h2><a name="8" href="#top">8. 	Picture event lines, [Events] section</a></h2>
These contain the same information as Dialogue events, but Field 10 contains the full path and filename of the picture to display, instead of subtitle text.<br>
<br>
The Style specified is ignored. The "scroll up" transition effect can be used for picture events.<br>
<br>
The Left and Vertical Margin Overrides specify the bottom-left corner position of the picture. A left margin of all zeroes means that the picture will be horizontally centered. A vertical margin of all zeroes means that the picture will be vertically centered.
<h2><a name="9" href="#top">9. 	Sound event lines, [Events] section</a></h2>
These contain the same information as Dialogue events, but Field 10 contains the full path and filename of the wav file to play, instead of subtitle text.<br>
<br>
The Style and margins are ignored. The End time is also ignored - the wav will play until it finishes, or until another wav file is played.<br>
<br>
If an avi movie is played at the same time as a wav is already playing, then any sound in the avi will not be heard. Similarly, if a wav starts playing when an avi movie with sound is already playing then the wav will not be heard.
<h2><a name="10" href="#top">10. 	Movie event lines, [Events] section</a></h2>
These contain the same information as Dialogue events, but Field 10 contains the full path and filename of the avi file to play, instead of subtitle text.<br>
<br>
The Style is ignored. Transition effects are ignored.<br>
<br>
The End time specifies when the movie picture will disappear - but if th eavi file lasts longer, then the sound will continue to be heard.<br>
<br>
The Left and vertical Margin Overrides specify the TOP-LEFT corner position of the picture (unlike picture events). A left margin of all zeroes means that the picture will be horizontally centered. a vertical margin of all zeroes means that the picture will be verticall centered.<br>
<br>
If an avi movie is played at the same time as a wav is already playing, then any sound in the avi will not be heard. Similarly, if a wav starts playing when an avi movie with sound is already playing then the wav will not be heard.
<h2><a name="11" href="#top">11. Command event lines, [Events] section</a></h2>
These contain the same information as Dialogue events, but Field 10 contains the full path and filename of the program to execute, instead of subtitle text.<br>
<br>
The Style is ignored. The margins are ignored. Transition effects are ignored. The End time is also ignored - the program will execute until it ends, or is "manually" closed.<br>
<br>
<b>There are also internal SSA commands which can appear in SSA scripts - the "SSA:Pause", “SSA:Wait for trigger” command events, and genlock control commands. These all begin with "SSA:"</b><br>
<br>
The SSA:Pause command has the same effect as pressing "P" during script playback. It is useful as a second "synch point" to resume subtitling after switching sides of a laserdisk.<br>
<br>
The “SSA:Wait for audio trigger” command has the same effect as pressing "P" during script playback, but pausing is automatically cancelled if the audio input to the computer exceeds a specified “trigger” level. It is useful as a second "synch point" to resume subtitling after switching sides of a laserdisk. The audio triggering can be overridden to resume playback - by pressing "P".<br>
<br>
Audio triggering "times out" after 10 minutes - If no audio peak of sufficient magnitude is received, and "P" is not pressed within 10 minutes - then playback will resume anyway.
<h2><a name="apA" href="#top">Appendix A: Style override codes</a></h2>
This is a reference which may be useful for those of you who wish to learn the style override codes, so you can type them in manually without using the "override style" dialogue box.<br>
<br>
All Override codes appear within braces { } except the newline \n and \N codes.<br>
All override codes are always preceded by a backslash \<br>
Several overrides can be used within one set of braces.<br>
<br>
Each override affects all text following the override. To apply an override only to selected text, you need a second "cancelling" override after the selected text, to "undo" the effect of the first override.<br>
<br>
Some overrides automatically apply to ALL the text - currently this is just alignment overrides, but more may be added later (eg. Shadow/outline depth overrides).<br>
<table>
<tr><td><b>\n</b></td><td>New line (carriage return)<br>
\n is ignored by SSA if “smart-wrapping” is enabled<br>
<b>eg. This is the first line\nand this is the second</b></td></tr>
<tr><td><b>\N</b></td><td>New line (carriage return). This is used by SSA instead of \n if 
					“smart-wrapping” is enabled.</td></tr>
<tr><td><b>\b</b><0 or 1></td><td>\b1 makes the text bold. \b0 forces non-bold text.<br>
<b>eg. There is a {\b1}bold {\b0}word here</b><br>
<br>
<span class="mark">When this parameter is greater than 1, it will be used as the weight of the font.<br>
(400 = Normal, 700 = Bold, note: most fonts will quantize to 2 or 3 levels of thickness)</span></td></tr>
<tr><td><b>\i</b><0 or 1></td><td>\i1 makes the text italic. \i0 forces non-italic text.<br>
<b>eg. There is an {\i1}italicised {\i0}word here</b></td></tr>
<tr><td><span class="mark">\u<0 or 1></span></td><td><span class="mark">underline</span></td></tr>
<tr><td><span class="mark">\s<0 or 1></span></td><td><span class="mark">strikeout</span></td></tr>
<tr><td><span class="mark">\bord<width></span></td><td><span class="mark">border</span></td></tr>
<tr><td><span class="mark">\shad<depth></span></td><td><span class="mark">shadow</span></td></tr>
<tr><td><span class="mark">\be<0 or 1></span></td><td><span class="mark">blur edges</span></td></tr>
<tr><td><b>\fn</b><font name></td><td><font name> specifies a font which you have installed in Windows. This is case sensitive.<br>
<b>eg. Here is some {\fnCourier New}fixed space text</b><br>
<br>
If you use a font name that doesn't exist, then Arial will be used instead.</td></tr>
<tr><td><b>\fs</b><font size></td><td><font size> is a number specifying a font point size.<br>
<b>eg. {\fs16}This is small text. {\fs28}This is large text</b></td></tr>
<tr><td><span class="mark">\fsc<x or y><percent></span></td><td><span class="mark"><x or y> x scales horizontally, y scales vertically<br>
<percent> defines size</span></td></tr>
<tr><td><span class="mark">\fsp<pixels></span></td><td><span class="mark"><pixels> changes the distance between letters. (default: 0)</span></td></tr>
<tr><td><span class="mark">\fr[<x/y/z>]<degree></span></td><td><span class="mark"><degrees> sets the rotation angle around the x/y/z axis.<br>
<br>
\fr defaults to \frz.</span></td></tr>
<tr><td><b>\fe</b><charset></td><td><charset> is a number specifying the character set (font encoding)</td></tr>
<tr><td><b>\c&H</b><bbggrr><b>&</b></td><td><bbggrr> is a hexadecimal RGB value, but in reverse order. Leading zeroes are not required.<br>
<b>{\c&HFF&}This would be pure, full intensity red<br>
{\c&HFF00&}This would be pure, full intensity green<br>
{\c&HFF0000&}This would be pure, full intensity blue<br>
{\c&HFFFFFF&}This would be white<br>
{\c&HA0A0A&}This would be dark grey</b><br>
<br>
<span class="mark">\1c&Hbbggrr&, \2c&Hbbggrr&, \3c&Hbbggrr&, \4c&Hbbggrr& to set specific colors.<br>
<br>
\1a&Haa&, \2a&Haa&, \3a&Haa&, \4a&Haa& to set specific alpha channels.<br>
<br>
\alpha defaults to \1a<br></span></td></tr>
<tr><td><b>\a<alignment></td><td><alignment> is a number specifying the onscreen alignment/positioning of a subtitle.<br>
<br>
A value of 1 specifies a left-justified subtitle<br>
A value of 2 specifies a centered subtitle<br>
A value of 3 specifies a right-justified subtitle<br>
<br>
Adding 4 to the value specifies a "Toptitle"<br>
Adding 8 to the value specifies a "Midtitle"<br>
<br>
<span class="mark">0 or nothing resets to the style default (which is usually 2)</span><br>
<br>
{\a1}This would be a left-justified subtitle<br>
{\a2}This would be a centered subtitle<br>
{\a3}This would be a right-justified subtitle<br>
<br>
{\a5}This would be a left-justified toptitle<br>
{\a11}This would be a right-justified midtitle<br>
<br>
<span class="mark">Only the first appearance counts.</span></td></tr>
<tr><td><span class="mark">\an<alignment></span></td><td><span class="mark">numpad layout<br>
<br>
Only the first appearance counts.</span></td></tr>
<tr><td>\k<duration></td><td><duration> is the amount of time that each section of text is highlighted for in a dialogue event with the Karaoke effect. The durations are in hundredths of seconds.<br>
<br>
<b>eg. {\k94}This {\k48}is {\k24}a {\k150}karaoke {\k94}line</b><br>
<br>
<span class="mark">\k<duration> highlight by words<br>
\kf or \K<duration> fill up from left to right<br>
\ko<duration> outline highlighting from left to right</span></td></tr>
<tr><td><span class="mark">\q<num></span></td><td><span class="mark"><num> wrapping style</span></td></tr>
<tr><td><b>\r</b><span class="mark">[<style>]</span></td><td>This cancels all previous style overrides in a line<br>
<br>
<span class="mark"><style> restores to <style> instead of the dialogue line default.</span></td></tr>
</table>
<span class="mark">Any style modifier followed by no recognizable parameter resets to the default.<br>
<br>
<font size=5><u>Functions:</u></font><br>
<table class="mark">
<tr><td>\t([<t1>, <t2>, ][<accel>, ]<style modifiers>)</td><td><t1>, <t2> Animation beginning, ending time offset [ms] (optional)<br>
<br>
<accel> Modifies the linearity of the transformation (optional)<br>
<br>
<div style="margin-left:40px">The following calculation is performed to get the coefficient needed to interpolate between the given style modifiers: pow((t-t1)/(t2-t1), accel), where t is the time offset for the subtitle.<br>
<br>
The meaning of <accel>:<br>
<div style="margin-left:40px">1: the transformation is linear<br>
between 0 and 1: will start fast and slow down<br>
greater than 1: will start slow and get faster<br>
<br>
As an example, using 2 will make growing the letters (by {\fscx200\fscy200}) look linear rather than slowering.</div></div>
<br>
<style modifiers> Any style modifier which can be animated:<br>
<div style="margin-left:40px">\c,\1-4c,\alpha,\1-4a,\fs,\fr,\fscx,\fscy,\fsp,\bord,\shad,\clip (only the rectangular \clip)</div></td></tr>
<tr><td>\move(<x1>, <y1>, <x2>, <y2>[, <t1>, <t2>])</td><td><x1>, <y1> The coordinate to start at.<br>
<x2>, <y2> The coordinate to end at.<br>
<t1>, <t2> Animation beginning, ending time offset [ms] (optional)<br>
<br>
The origin of the movement is defined by the alignment type.</td></tr>
<tr><td>\pos(<x>, <y>)</td><td>Defaults to \move(<x>, <y>, <x>, <y>, 0, 0)</td></tr>
<tr><td>\org(<x>, <y>)</td><td>Moves the default origin at (x,y). This is useful when moving subtitles in the direction of rotation.</td></tr>
<tr><td colspan=2>WARNING: \t, \move and \pos will ignore collusion detection.</td></tr>
<tr><td>\fade(<a1>, <a2>, <a3>, <t1>, <t2>, <t3>, <t4>)</td><td><a1> Alpha value before <t1><br>
<a2> Alpha value between <t2> and <t3><br>
<a3> Alpha value after <t4><br>
<t1>, <t4> Animation beginning, ending time offset [ms]<br>
<t1> - <t2> Alpha value will be interpolated between <a1> and <a2><br>
<t2> - <t3> Alpha value will be set to <a2><br>
<t3> - <t4> Alpha value will be interpolated between <a2> and <a3></td></tr>
<tr><td>\fad(<t1>, <t2>)</td><td><t1> the time length of fading in<br>
<t2> the time length of fading out</td></tr>
<tr><td>\clip(<x1>, <y1>, <x2>, <y2>)</td><td>Clips any drawing outside the rectangle defined by the parameters.</td></tr>
<tr><td>\clip([<scale>,] <drawing commands>)</td><td>Clipping against drawn shapes.<br>
<br>
<scale> has the same meaning as in the case of \p<scale></td></tr>
</table>
<font size=5><u>Drawings:</u></font><br>
<table class="mark">
<tr><td>\p<scale></td><td><scale><br>
<br>
Turns on drawing mode and sets the magnification level of the coordinates at the same time. Scale is interpreted as two to the power of (<scale> minus one). For example {\p4} and the coordinate (8,16) will mean the same as {\p1} and (1,2). This feature can be useful for sub-pixel accuracy.<br>
<br>
If 0, drawing mode is turned off and the text is interpreted as usual.</td></tr>
<tr><td>\pbo<y></td><td><y> baseline offset. By default any drawings are positioned on the current baseline. With this value it is possible to move them up or down by <y> pixels.<br>
(up: y<0, down: y>0)</td></tr>
<tr><td colspan=2>Drawing commands:</td></tr>
<tr><td>m <x> <y></td><td>Moves the cursor to <x>, <y></td></tr>
<tr><td>n <x> <y></td><td>Moves the cursor to <x>, <y> (unclosed shapes will be left open)</td></tr>
<tr><td>l <x> <y></td><td>Draws a line to <x>, <y></td></tr>
<tr><td>b <x1> <y1> <x2> <y2> <x3> <y3></td><td>3rd degree bezier curve to point 3 using point 1 and 2 as the control points</td></tr>
<tr><td>s <x1> <y1> <x2> <y2> <x3> <y3> .. <xN> <yN></td><td>3rd degree uniform b-spline to point N, must contain at least 3 coordinates</td></tr>
<tr><td>p <x> <y></td><td>extend b-spline to <x>, <y></td></tr>
<tr><td>c</td><td>close b-spline</td></tr>
</table>
Things you should know:<br>
<br>
<div style="margin-left: 20px">Commands must appear after {\p1+} and before {\p0}.	(except for \clip(..))<br>
<br>
Drawings must always start with a move to command.<br>
<br>
Drawings must form a closed shape.<br>
<br>
All unclosed shape will be closed with a straight line automatically.<br>
<br>
Overlapping shapes in the Dialogue line will be XOR-ed with each-other.<br>
<br>
If the same command follows another, it isn’t needed to write its identifier letter again, only the coordinates.<br>
<br>
The coordinates are relative to the current cursor position (baseline) and the alignment mode.<br>
<br>
Commands p and c should only follow other b-spline commands.</div><br>
Examples:<br>
<br>
<div style="margin-left: 20px">Square: m 0 0 l 100 0 100 100 0 100<br>
<br>
Rounded square: m 0 0 s 100 0 100 100 0 100 c (c equals to “p 0 0 100 0 100 100” in this case)<br>
<br>
Circle (almost): m 50 0 b 100 0 100 100 50 100 b 0 100 0 0 50 0 (note that the 2nd ‘b’ is optional here)<br></div></span>
<h2><a name="apB" href="#top">Appendix B: embedded font/picture encoding</a></h2>
SSA’s font and picture file embeddeding is a form of UUEncoding.<br>
<br>
It takes a binary file, three bytes at a time, and converts the 24bits of those bytes into four 6-bit numbers. 33 is added to each of these four numbers, and the corresponding ascii character for each number is written into the script file.<br>
<br>
The offset of 33 means that lower-case characters cannot appear in the encoded output, and this is why the “filename” lines are always lower case.<br>
<br>
Each line of an encoded file is 80 characters long, except the last one, which may be shorter.<br>
<br>
If the length of the file being encoded is not an exact multiple of 3, then for odd-number filelengths, the last byte is multiplied by hexadecimal 100, and the most significant 12 bits are converted to two characters as above. For even-number filelengths, the last two bytes are multiplied by hexadecimal 10000, and the most significant 18 bits are converted to three characters as above.<br>
<br>
There is no terminating code for the embedded files. If a new [section] starts in the script, or if another filename line is found, or the end of the script file is reached then the file is considered complete.
```