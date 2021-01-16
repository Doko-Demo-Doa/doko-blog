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

(To be continued...)
