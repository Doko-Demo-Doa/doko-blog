---
title: RxJava Legacy (01) - Retro Lambda
authors: [doko]
hide_table_of_contents: false
tags: [vietnamese, programming, java, rxjava]
---

:::info

Đây là bài viết cũ, ở thời điểm hiện tại RxJava 3 đã ra mắt nhưng concept và các khái niệm cơ bản vẫn còn dùng được. Series gốc có thể tìm thấy tại [đây](https://github.com/mgp/effective-rxjava).

:::

Java 8+ với rất nhiều tính năng và cú pháp mới được giới thiệu, trong đó có Lambda Expression được sử dụng để viết anonymous class ngắn gọn hơn. Hiện nay Android Studio 3 đã hỗ trợ cú pháp Java 8 gần như hoàn chỉnh (đã hoàn chỉnh ở API 24) nhưng vì lý do nào đó mà các bạn không thể sử dụng Android Studio 3 thì [Retrolambda](https://github.com/orfjackal/retrolambda) chính là giải pháp.

<!--truncate-->

Trong RxJava, chúng ta sẽ sử dụng rất nhiều anonymous class và interface như <code>Func</code> và <code>Action</code>

Các bạn có thể xem trang github của project Retrolambda:

- [Maven Plugin](https://github.com/orfjackal/retrolambda)
- [Gradle Plugin](https://github.com/evant/gradle-retrolambda)

Ví dụ nếu sử dụng Retrolambda, đoạn code như sau:

```java
mContentDatabase
    .fetchContentItems(ImmutableSet.of(contentItemId))
    .map(new Func1<Map<ContentItemIdentifier, ContentItem>, ContentItem>() {
        @Override
        public ContentItem call(final Map<ContentItemIdentifier, ContentItem> resultSet) {
            return checkNotNull(resultSet.get(contentItemId));
        }
    })
    .map(new Func1<ContentItem, TopicPath>() {
        @Override
        public TopicPath call(final ContentItem contentItem) {
            return contentItem.topicPath();
        }
    })
    .subscribe(new Action1<TopicPath>() {
        @Override
        public void call(final TopicPath topicPath) {
            openContentViewActivity(contentItemId, topicPath);
        }
    });
```

sẽ trở thành:

```java
mContentDatabase
    .fetchContentItems(ImmutableSet.of(contentItemId))
    .map(resultSet -> checkNotNull(resultSet.get(contentItemId)))
    .map(ContentItem::topicPath)
    .subscribe(topicPath -> {
        openContentViewActivity(contentItemId, topicPath);
    });
```

Ưu điểm rõ ràng nhất là code trở nên ngắn gọn hơn, tập trung một chỗ, bước thực hiện đi từ trên xuống dưới. Nhược điểm ở đây là chỉ hỗ trợ cú pháp chứ không hỗ trợ Java 8 API (ví dụ: class `Time` mới của Java 8 thay cho `Calendar` / `Date` của các bản Java trước đó).
