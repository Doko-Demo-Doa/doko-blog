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

- This sections contains text-encoded graphic files, if the user opted to embed any pictures they used in the script. The binary picture files are text-encoded, which is inefficient, but ensures that SSA scripts can still be handled by any text editor, if required.

Each graphic file is started with a single line in the format:<br>
<b>filename: <name of file></b><br>
<br>
The word <b>“filename”</b> must be in lower case (upper case will be interpreted as part of a text-encoded file). <br>
<br>
<b><name of file></b> is the file name that SSA will use when saving the picture file. It will match the filename of a picture used in the script.<br>
<br>
SSA saves any files found in the script in a subdirectory off SSA's program directory, "Pictures"
eg. c:\program files\Sub Station Alpha v4.00\Pictures. SSA will attempt to load files using the paths specified in the script, but if they are not found, it will look in the "Pictures" subdirectory for them.<br>
<br>
The fontname line is followed by lines of printable characters, fontrepresenting the binary values which make up the picture font file - format is as per embedded font files.<br>
<h2><a name="3" href="#top">3. The line types in a Sub Station Alpha script</a></h2>
This briefly describes each of the line types that can appear in a Sub Station Alpha Script. Full details of the information held in each line type is in the next chapter.<br>
<table>
<tr><td><b>!:</b></td><td>Phần này không hiển thị khi xem, chỉ là một dạng metadata.</td></tr>
<tr><td><b>Title:</b></td><td>Mô tả script</td></tr>
<tr><td><b>Original Script:</b></td><td>Tác giả script</td></tr>
<tr><td><b>Original Translation:</b></td><td>(tùy chọn) Người dịch</td></tr>
<tr><td><b>Original Editing:</b></td><td>(tùy chọn) người chỉnh sửa.</td></tr>
<tr><td><b>Original Timing:</b></td><td>(tùy chọn) Whoever timed the original script</td></tr>
<tr><td><b>Synch Point:	</b></td><td>(tùy chọn) Description of where in the video the script should begin playback.</td></tr>
<tr><td><b>Script Updated By:</b></td><td>(tùy chọn) Names of any other subtitling groups who edited the original script.</td></tr>
<tr><td><b>Update Details:</b></td><td>The details of any updates to the original script made by other subtilting groups.</td></tr>
<tr><td><b>ScriptType:</b></td><td>Phiên bản script, ví dụ: "V3.00".</td></tr>
<tr><td><b>Collisions:</b></td><td>Cho biết phụ đề sẽ được di chuyển như thế nào.</td></tr>
<tr><td><b>PlayResY:</b></td><td>This is the height of the screen used by the authors when playing the script.</td></tr>
<tr><td><b>PlayResX:</b></td><td>This is the width of the screen used by the authors when playing the script.</td></tr>
<tr><td><b>PlayResX:</b></td><td>This is the colour depth used by the authors when playing the script.</td></tr>
<tr><td><b>Timer:</b></td><td>Tốc độ hiển thị của script, dưới dạng phần trăm.<br>
ví dụ. "100.0000" là đúng 100%.<br>
Timer được sử dụng dưới dạng số nhân.</td></tr>
<tr><td><b>Style:</b></td><td>Định nghĩa style, sử dụng để định dạng kiểu hiển thị trong file sub.</td></tr>
<tr><td><b>Dialogue:</b></td><td>This is a Dialogue event, ie. Some text to display.</td></tr>
<tr><td><b>Comment:</b></td><td>This is a "comment" event.<br>
This contains the same information as a Dialogue, Picture, Sound, Movie, or Command event, but it is ignored during script playback.</td></tr>
<tr><td><b>Picture:</b></td><td>This is a "picture" event, which means SSA will display the specified .bmp, .jpg, .gif, .ico or .wmf graphic.</td></tr>
<tr><td><b>Sound:</b></td><td>This is a "sound" event, which means SSA will play the specified .wav file.</td></tr>
<tr><td><b>Movie:</b></td><td>This is a "movie" event, which means SSA will play the specified .avi file.</td></tr>
<tr><td><b>Command:</b></td><td>This is a "command" event, which means SSA will execute the specified program as a background task.</td></tr>
</table>
<h2><a name="4" href="#top">4. Header lines, [Script Info] section</a></h2>
<table>
<tr><td><b>;</b></td><td>Semicolon. Any text can follow the semicolon<br>
This is a comment used in the script file only. It is not visible when you load the script into SSA. The semicolon <b>must</b> be the first character in the line. This replaces the <b>!:</b> line type used in previous script versions.</td></tr>
<tr><td><b>Title:</b></td><td>This is a description of the script. If the original author(s) did not provide this information then <untitled> is automatically substituted.</td></tr>
<tr><td><b>Original Script:</b></td><td>The original author(s) of the script. If the original author(s) did not provide this information then <unknown> is automatically substituted.</td></tr>
<tr><td><b>Original Translation:</b></td><td>(optional) The original translator of the dialogue. This entry does not appear if no information was entered by the author.</td></tr>
<tr><td><b>Original Editing:</b></td><td>(optional) The original script editor(s), typically whoever took the raw translation and turned it into idiomatic english and reworded for readability. This entry does not appear if no information was entered by the author.</td></tr>
<tr><td><b>Original Timing:</b></td><td>(optional) Whoever timed the original script. This entry does not appear if no information was entered by the author.</td></tr>
<tr><td><b>Synch Point:</b></td><td>(optional) Description of where in the video the script should begin playback. This entry does not appear if no information was entered by the author.</td></tr>
<tr><td><b>Script Updated By:</b></td><td>(optional) Names of any other subtitling groups who edited the original script. This entry does not appear if subsequent editors did not enter the information.</td></tr>
<tr><td><b>Update Details:</b></td><td>The details of any updates to the original script - made by other subtitling groups. This entry does not appear if subsequent editors did not enter any information.</td></tr>
<tr><td><b>Script Type:</b></td><td>This is the SSA script format version eg. "V4.00". It is used by SSA to give a warning if you are using a version of SSA older than the version that created the script.<br>
<br>
<span class="mark">ASS version is “V4.00+”.</span><br>
</td></tr>
<tr><td><b>Collisions:</b></td><td>This determines how subtitles are moved, when automatically preventing onscreen collisions.<br>
<br>
If the entry says <b>"Normal"</b> then SSA will attempt to position subtitles in the position specified by the "margins". However, subtitles can be shifted vertically to prevent onscreen collisions. With "normal" collision prevention, the subtitles will "stack up" one above the other - but they will always be positioned as close the vertical (bottom) margin as possible - filling in "gaps" in other subtitles if one large enough is available.<br>
<br>
If the entry says <b>"Reverse"</b> then subtitles will be shifted upwards to make room for subsequent overlapping subtitles. This means the subtitles can nearly always be read top-down - but it also means that the first subtitle can appear half way up the screen before the subsequent overlapping subtitles appear. It can use a lot of screen area.
</td></tr>
<tr><td><b>PlayResY:</b></td><td>This is the height of the screen used by the script's author(s) when playing the script. SSA v4 will automatically select the nearest enabled setting, if you are using Directdraw playback.</td></tr>
<tr><td><b>PlayResX:</b></td><td>This is the width of the screen used by the script's author(s) when playing the script. SSA will automatically select the nearest enabled, setting if you are using Directdraw playback.</td></tr>
<tr><td><b>PlayDepth:</b></td><td>This is the colour depth used by the script's author(s) when playing the script. SSA will automatically select the nearest enabled setting if you are using Directdraw playback.</td></tr>
<tr><td><b>Timer:</b></td><td>This is the Timer Speed for the script, as a percentage.<br>
<br>
eg. "100.0000" is exactly 100%. It has four digits following the decimal point.<br>
<br>
The timer speed is a time multiplier applied to SSA's clock to stretch or compress the duration of a script. A speed greater than 100% will reduce the overall duration, and means that subtitles will progressively appear sooner and sooner. A speed less than 100% will increase the overall duration of the script means subtitles will progressively appear later and later (like a positive ramp time).<br>
<br>
The stretching or compressing only occurs during script playback - this value does not change the actual timings for each event listed in the script.<br>
<br>
Check the SSA user guide if you want to know why "Timer Speed" is more powerful than "Ramp Time", even though they both achieve the same result.
</td></tr>
<tr><td><span class="mark">WrapStyle:</b></span></td><td><span class="mark">Defines the default wrapping style.<br>
0: smart wrapping, lines are evenly broken<br>
1: end-of-line word wrapping, only \N breaks<br>
2: no word wrapping, \n \N both breaks<br>
3: same as 0, but lower line gets wider.
</span></td></tr>
</table>
<h2><a name="5" href="#top">5. Style Lines, [v4+ Styles] section</a></h2>
Styles define the appearance and position of subtitles. All styles used by the script are are defined by a Style line in the script.<br>
<br>
Any of the the settings in the Style, (except shadow/outline type and depth) can overridden by control codes in the subtitle text.<br>
<br>
The fields which appear in each Style definition line are named in a special line with the line type “Format:”. The Format line must appear before any Styles - because it defines how SSA will interpret the Style definition lines. The field names listed in the format line must be correctly spelled! The fields are as follows:<br>
<br>
<b>Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, TertiaryColour, BackColour, Bold, Italic, <span class="mark">Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle</span>, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, AlphaLevel, Encoding</b><br>
<br>
The format line allows new fields to be added to the script format in future, and yet allow old versions of the software to read the fields it recognises - even if the field order is changed.<br>
<table>
<tr><td>Field 1:</td><td><b>Name.</b> The name of the Style. Case sensitive. Cannot include commas.</td></tr>
<tr><td>Field 2:</td><td><b>Fontname.</b> The fontname as used by Windows. Case-sensitive.</td></tr>
<tr><td>Field 3:</td><td><b>Fontsize.</b></td></tr>
<tr><td>Field 4:</td><td><b>PrimaryColour.</b> A long integer BGR (blue-green-red)  value. ie. the byte order in the hexadecimal equivelent of this number is BBGGRR<br>
<br>
This is the colour that a subtitle will normally appear in.</td></tr>
<tr><td>Field 5:</td><td><b>SecondaryColour.</b> A long integer BGR (blue-green-red)  value. ie. the byte order in the hexadecimal equivelent of this number is BBGGRR<br>
<br>
This colour may be used instead of the Primary colour when a subtitle is automatically shifted to prevent an onscreen collsion, to distinguish the different subtitles.</td></tr>
<tr><td>Field 6:</td><td><span class="mark">OutlineColour</span> <b><s>(TertiaryColour)</s></b> A long integer BGR (blue-green-red)  value. ie. the byte order in the hexadecimal equivelent of this number is BBGGRR<br>
<br>
This colour may be used instead of the Primary or Secondary colour when a subtitle is automatically shifted to prevent an onscreen collsion, to distinguish the different subtitles.</td></tr>
<tr><td>Field 7:</td><td><b>BackColour.</b> This is the colour of the subtitle outline or shadow, if these are used. A long integer BGR (blue-green-red)  value. ie. the byte order in the hexadecimal equivelent of this number is BBGGRR.</td></tr>
<tr><td><span class="mark">Field 4-7:</span></td><td><span class="mark">The color format contains the alpha channel, too. (AABBGGRR)</span></td></tr>
<tr><td>Field 8:</td><td><b>Bold.</b> This defines whether text is bold (true) or not (false). -1 is True, 0 is False. This is independant of the Italic attribute - you can have have text which is both bold and italic.</td></tr>
<tr><td>Field 9:</td><td><b>Italic.</b> This defines whether text is italic (true) or not (false). -1 is True, 0 is False. This is independant of the bold attribute - you can have have text which is both bold and italic.</td></tr>
<tr><td><span class="mark">Field 9.1:</span></td><td><span class="mark">Underline. [-1 or 0]</span></td></tr>
<tr><td><span class="mark">Field 9.2:</span></td><td><span class="mark">Strikeout. [-1 or 0]</span></td></tr>
<tr><td><span class="mark">Field 9.3:</span></td><td><span class="mark">ScaleX. Modifies the width of the font. [percent]</span></td></tr>
<tr><td><span class="mark">Field 9.4:</span></td><td><span class="mark">ScaleY. Modifies the height of the font. [percent]</span></td></tr>
<tr><td><span class="mark">Field 9.5:</span></td><td><span class="mark">Spacing. Extra space between characters. [pixels]</span></td></tr>
<tr><td><span class="mark">Field 9.6:</span></td><td><span class="mark">Angle.  The origin of the rotation is defined by the alignment. Can be a floating point number. [degrees]</span></td></tr>
<tr><td>Field 10:</td><td><b>BorderStyle.</b> 1=Outline + drop shadow, 3=Opaque box</td></tr>
<tr><td>Field 11:</td><td><b>Outline.</b> If BorderStyle is 1,  then this specifies the width of the outline around the text, in pixels.
Values may be 0, 1, 2, 3 or 4.</td></tr>
<tr><td>Field 12:</td><td><b>Shadow.</b> If BorderStyle is 1,  then this specifies the depth of the drop shadow behind the text, in pixels. Values may be 0, 1, 2, 3 or 4. Drop shadow is always used in addition to an outline - SSA will force an outline of 1 pixel if no outline width is given.</td></tr>
<tr><td>Field 13:</td><td><b>Alignment.</b> This sets how text is "justified" within the Left/Right onscreen margins, and also the vertical placing. Values may be 1=Left, 2=Centered, 3=Right. Add 4 to the value for a "Toptitle". Add 8 to the value for a "Midtitle".<br>
eg. 5 = left-justified toptitle</td></tr>
<tr><td><span class="mark">Field 13:</span></td><td><span class="mark">Alignment, but after the layout of the numpad (1-3 sub, 4-6 mid, 7-9 top).</span></td></tr>
<tr><td>Field 14:</td><td><b>MarginL.</b> This defines the Left Margin in pixels. It is the distance from the left-hand edge of the screen.The three onscreen margins (MarginL, MarginR, MarginV) define areas in which the subtitle text will be displayed.</td></tr>
<tr><td>Field 15:</td><td><b>MarginR.</b> This defines the Right Margin in pixels. It is the distance from the right-hand edge of the screen. The three onscreen margins (MarginL, MarginR, MarginV) define areas in which the subtitle text will be displayed.</td></tr>
<tr><td>Field 16:</td><td><b>MarginV.</b> This defines the vertical Left Margin in pixels.<br>
For a <b>subtitle</b>, it is the distance from the <b>bottom</b> of the screen.<br>
For a <b>toptitle</b>, it is the distance from the <b>top</b> of the screen.<br>
For a <b>midtitle</b>, the value is ignored - the text will be vertically centred
<br></td></tr>
<tr><td>Field 17:</td><td><b>AlphaLevel.</b> This defines the transparency of the text. SSA does not use this yet.</td></tr>
<tr><td><span class="mark">Field 17:</span></td><td><span class="mark">Not present in ASS.</span></td></tr>
<tr><td>Field 18:</td><td><b>Encoding.</b> This specifies the font character set or encoding and on multi-lingual Windows installations it provides access to characters used in multiple than one languages. It is usually 0 (zero) for English (Western, ANSI) Windows.<br>
<br>
<span class="mark">When the file is Unicode, this field is useful during file format conversions.</span></td></tr>
</table>
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