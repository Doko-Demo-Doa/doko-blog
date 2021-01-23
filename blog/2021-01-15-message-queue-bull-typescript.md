---
title: Message Queue với Bull (NodeJS + TypeScript)
author: Doko
author_title: Administrator
author_url: https://github.com/Doko-Demo-Doa
author_image_url: /img/avatar_doraemon.jpg
hide_table_of_contents: false
tags: [vietnamese, programming, nodejs, typescript, message-queue]
---

[Bull](https://github.com/OptimalBits/bull) là một trong số các thư viện hỗ trợ [message queue](https://www.cloudamqp.com/blog/2014-12-03-what-is-message-queuing.html) rất tốt trên NodeJS (bên cạnh [RabbitMQ](https://www.rabbitmq.com/tutorials/tutorial-three-javascript.html), [Kafka](https://kafka.apache.org/), [rsmq](https://github.com/smrchy/rsmq), [agenda](https://github.com/agenda/agenda),...), và dựa trên Redis để lưu dữ liệu.

Message queue là giải pháp để giải quyết các vấn đề trong công nghệ, thường là backend:

- Xử lý background.
- Gửi thông tin theo hàng đợi.
- Xử lý đồng bộ, concurrency.

Bull là thư viện có thể giúp cả 3 vấn đề trên, và bản thân cũng có 3 thành phần chính:

- __Producer__: Thành phần tạo ra các công việc (job) và ném chúng vào queue (hàng đợi).
- __Consumer__: Thành phần nhận việc từ queue.
- __Listener__: Thành phần lắng nghe các sự kiện diễn ra trong hàng đợi (completed, failed, stalled).

<!--truncate-->

Về cơ bản, message queue là cơ chế đưa các thông tin vào dãy để xử lý dần, và mặc định với Bull thì hàng đợi là dạng FIFO (dữ liệu vào trước thì ra trước).

Có thể đọc đến đây bạn vẫn chưa hiểu message queue để làm gì phải không? OK cũng không sao, vì tôi cũng phải mất vài ngày mới ngẫm được và lờ mờ phần nào tác dụng của nó.

Bạn sẽ làm gì khi bạn cần chạy một hàm nào đó trong tương lai?

- Dùng cronjob.
- Dùng... setTimeout.

Cả 2 phương án đều không sai. Vâng, không hề sai. Nhưng hãy để ý ở trên, tôi đề cập đến là "một hàm", vậy nếu muốn chạy nhiều hàm? Và mỗi hàm lại có một đặc trưng khác nhau? Ví dụ:

- Hàm A chỉ được chạy lúc 6h tối.
- Hàm B chỉ được chạy sau khi có user với email là xxx@yyy.com đăng kí.
- Hàm C chỉ được gọi khi A và B đã được chạy.
- Hàm D chỉ được chạy một lần sau khi hàm A chạy, và không được chạy lại cho đến khi ngày tết âm lịch mùng 1 đến.

Vâng, trên đây chỉ là vài ví dụ về những thứ mà message queue có thể giúp chúng ta. Lấy ví dụ như sau: Ta gửi lời chúc cho các user đã đăng kí vào 4h chiều mỗi ngày. Khi đó:

## Tạo một queue

Cú pháp rất đơn giản như sau:

```ts
import Queue from 'bull';

export const reminderQueue = new Queue('loi-chuc-moi-ngay');
```

Và như vậy là xong, ta đã có một hàng đợi, luôn được chờ xử lý khi bắt đầu chạy `reminderQueue.process()` mà ta sẽ tìm hiểu ngay phía dưới.

Tô vẽ thêm một chút:

```ts
export const reminderQueue = new Queue('loi-chuc-moi-ngay', {
    limiter: {
      max: 1000,
      duration: 60000,
    },
  });
```

để đảm bảo rằng trong 1 phút (60.000 miligiây) không có quá 1.000 tác vụ được xử lý, tránh quá tải server.

## Đưa job vào hàng đợi

Theo Bull định nghĩa, "job" là một cục object / array chỉ chứa data thuần, có thể serialize được (tức là không chứa hàm, truyền qua internet thì các ngôn ngữ khác cũng có thể đọc được).

Vậy ta có 1 job dạng như sau:

```ts
reminderQueue.add(
  'REMINDER_JOB_NAME',
  {
    user_id: userId,
    message: 'Message',
  },
  {
    attempts: 2,
    removeOnComplete: true,
  }
);
```

(Còn tiếp...)