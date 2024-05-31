---
title: Thủ thuật Timing trong Aegisub
authors: [doko]
hide_table_of_contents: true
tags: [vietnamese, aegisub, fansubs]
---

Timing hiểu đơn giản là căn thời gian cho câu phù hợp với mạch nói trong phim. Và tiêu chuẩn của mình là thế này:

- Không bao giờ được đặt 2 câu do 2 người nói trên cùng 1 frame hoặc cùng 1 style. Cái này gặp trên các file sub trên subscene rất nhiều. Nhưng mình không cho phép. Mỗi câu phải có một line riêng, không có gạch đầu dòng.

Điều quan trọng trong lúc time là câu nói phải phù hợp. Ở đây lấy cái Stand By Me hôm nọ làm ví dụ.

<!--truncate-->

- **Bước 1**: Mở Aegisub, kéo thả file sub và file video vào. Sau đó chọn Audio > Open Audio from Video:

Như có thể thấy, biểu đồ bên phải đã hiện.

![sbm](https://i.ibb.co/fN9Xkg3/image.png)

- **Bước 2**: Nghe và timing theo:

Rất đơn giản, chọn line muốn timing (có thể chọn nhiều line), sau đó ở đồ thị sóng, chọn điểm đầu và cuối bằng cách kéo thả:

![sbm2](https://i.ibb.co/yVCbQ4H/image.png)

Đó, chỉ có 2 bước, nhưng điểm quan trọng ở đây là khi hết cutscene thì câu cũng phải mất. Để mình giải thích kỹ hơn một chút:

Hãy để ý vạch hồng hồng trên thanh đồ thị, ngay sau vạch đó, cảnh phim sẽ chuyển. Và bắt buộc sub cũng phải chuyển theo. Do đó dù câu nói của nhân vật có ngân sang đoạn đó một chút thì cũng phải cắt, trừ trường hợp ngân quá dài. Hiện tượng quá vạch này gọi là bleeding, kiểu như chảy máu sub. Sub sẽ bị chờm sang scene tiếp theo, rất ngứa mắt.

:::info

Tóm lại: Để ý vạch hồng, không được để chờm ở những đoạn cần thiết.

:::

:::caution

Lưu ý: Với trường hợp load video từ script `AVISynth` (thường xuyên):
Khi load video qua `AVISynth`, trên đồ thị sẽ không hiển thị Keyframe bởi Keyframe chỉ có sau pass 1 của công đoạn encoding hoặc ở file video đã encode hoàn chỉnh. Vậy nếu muốn hiển thị thì làm thế nào? Đơn giản là tạo ra nó.

:::

Có nhiều cách để thực hiện. Có thể là dùng `x264`, `VirtualDub` với `xvid_encraw` (download `xvid_encraw` ở [đây](https://www.mediafire.com/download/qeuae15wb54ffzn/xvid_encraw.zip)).

- Bấm `Win+R` (hoặc mở `Start > Run`). Gõ `shell:sendto`. Một cửa sổ Windows mở ra, lưu file script này vào thư mục đó. Chỉnh sửa script đó bằng notepad, sửa đường dẫn `xvid_encraw` ở dòng thứ 7 (thay chữ `xvid_encraw` bằng đường dẫn đúng, ví dụ: `D:\xvid_encraw`) rồi lưu lại.

- Chuột phải vào file MKV > Send to > Create Pass file. Đợi xong là ta có file có đuôi .pass.

- Vào `Aegisub > Video > Open Keyframes...` và chọn file .pass vừa tạo.

Với x264 thì cách thực hiện đơn giản hơn nữa.

- Với `MeGUI`: Chạy ở 2-pass mode nhưng chỉ chạy `first pass`:

![x264](https://i.ibb.co/Dkw9cQx/image.png)

- Hoặc có thể chạy theo command line:

```bash
x264 –pass 1 –bitrate 1500 –stats “.stats” -o <output> <input> –output NUL "input"
```

Sau đó nạp file `.stats` vào Aegisub như trên là xong.

Tuy vậy, trong nhiều trường hợp bất khả kháng, hay lỗi quá nhiều mà không thể sửa hết trước hạn (nếu ai định đua theo đường speed sub) thì có một cách chữa cháy tạm thời là thêm fading cho tất cả các dòng sub. Ngày xưa có mấy cái script macro của Youka viết nhưng bay đâu hết rồi, giờ tìm link không còn. Dùng tạm cái Add edgeblur (Automation Add edgeblur) rồi Replace toàn bộ các tag `\be1` vậy. Nhưng nhớ là chỉ nên đặt fad trong tầm 50-100 thôi.

Ngoài ra cũng nên check các dòng bị overlap (chồng chéo lên nhau). Cũng trong menu `Automation > Select Overlap`, tránh hiện tượng câu này nói chưa hết câu khác đã hiện.

![aegis](https://i.ibb.co/QkB2WzC/image.png)

Khi timing, việc chừa một khoảng thời gian ngắn đầu và cuối câu cũng rất cần thiết để người xem có thể đọc kịp chữ. "Kịp" ở đây mang tính phản xạ, tức là sau khi sub hiện, phải mất tầm 100-200ms người ta mới nắm bắt được chữ, và đọc. Đại khái là:

![saenai](https://i.ibb.co/TLkmCzY/image.png)

Như hình trên, trước khi phần âm bắt đầu nói thì để chừa 1 đoạn ngắn ở đầu và 1 đoạn dài hơn phía sau. Tuy nhiên phải chú ý các vạch Keyframe và ngắt khi cần thiết.
