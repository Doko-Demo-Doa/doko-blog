---
title: RxJava Legacy (02) - Immutable
author: Doko
author_title: Administrator
author_url: https://github.com/Doko-Demo-Doa
author_image_url: /img/avatar_doraemon.jpg
hide_table_of_contents: false
tags: [vietnamese, programming, java, rxjava]
---

:::info

Đây là bài viết cũ, ở thời điểm hiện tại RxJava 3 đã ra mắt nhưng concept và các khái niệm cơ bản vẫn còn dùng được. Series gốc có thể tìm thấy tại [đây](https://github.com/mgp/effective-rxjava).

:::

## Bất biến

Có 2 vấn đề mà lập trình viên luôn luôn phải giải quyết trong quá trình làm việc:

- Xử lý vấn đề.
- Giảm thiểu độ phức tạp của công việc.

Cái thứ nhất thì không phải bàn cãi.

<!--truncate-->

Dự án `ReactiveCocoa`, một dự án tương tự `RxJava` nhưng dành cho phía nhà Mac. Có ghi định nghĩa về project của họ:

> streams of values over time.

Trong Reactive Programming, dữ liệu được coi như các stream (dòng thông tin). Làm việc với Reactive Programming nói chung và RxJava nói riêng là làm việc với những dòng dữ liệu đó. Từ định nghĩa trên, chúng ta có thể hiểu mở rộng ý đó thêm như sau:

> "truyền dòng dữ liệu bất biến" (streams of immutable values over time) bất cứ khi nào có thể.

Một trích đoạn khác từ loạt hướng dẫn *Android Development Best Practices guide của Khan Academy*:


:::info

Với vai trò lập trình viên, nhiệm vụ của chúng ta là đơn giản hóa các vấn đề phức tạp. Trạng thái của một biến có thể thay đổi không ngừng, và đó chính là nguyên nhân khiến mọi sự việc trở nên phức tạp.

Nếu được sử dụng một cách đúng đẵn, các đối tượng bất biến có thể giúp tăng tốc độ xử lý và giảm thiểu mức độ sử dụng bộ nhớ. Ví dụ đơn giản là hash value của một object `String`, tham số truyền vào một URL bất biến, và khoảng cách tính toán được từ những chuỗi tọa độ trên bản đồ,… chúng đều có một tính chất chung: Bất biến. Và chính vì bất biến, nên chúng ta có thể lưu lại giá trị của chúng (cache lại) để tái sử dụng cho việc tính toán sau này.

Giá trị bất biến được coi là "an toàn" trong rất nhiều trường hợp, rất nhiều ngữ cảnh khác nhau. Chúng ta có thể chia sẻ dữ liệu bất biến cho client mà không sợ giá trị bị thay đổi ở một khúc nào đó. Ngược lại, giá trị bất biến cũng có thể được client chấp nhận dưới dạng tham số mà không cần qua sao chép. Giá trị bất biến cũng có tính thread-safe, tức là client phải có được lock (khóa) để có thể đọc được giá trị mà một client khác đang sửa đổi. Java có hỗ trợ xử lý đa luồng, và đây là ưu thế không thể bàn cãi.

:::

Nói tóm gọn, giá trị bất biến giúp ta giảm thiểu độ phức tạp. Trong `RxJava`, nguồn dữ liệu bao bởi một `Observable` sẽ luôn truyền đúng dữ liệu đó đi mà không làm thay đổi gì bên trong. Nếu như dữ liệu nguồn thay đổi, `Observable` sẽ truyền giá trị của nguồn dữ liệu mới, và nhắc lại một lần nữa, không thay đổi bất kì giá trị nào khác.

## AutoValue

`AutoValue` là một thư viện nguồn mở do Google phát triển. Được sử dụng để tạo ra các biến giá trị bất biến trong Java, hỗ trợ Java 6 trở lên.

Các instance được tạo ra bởi `AutoValue` không có hành vi, chỉ có giá trị. Vì nếu có hành vi thì khả năng các hành vi đó khiến cho giá trị bị thay đổi là rất lớn.

Để sử dụng `AutoValue`, tạo một abstract class với abstract getter cho từng trường mong muốn. Ví dụ, class `ArticleViewFragment`, dùng để hiển thị các bài viết, bên trong có định nghĩa một static inner class có tên `ToolbarViewData`, sử dụng annotation `@AutoValue` :

```java
@AutoValue
static abstract class ToolbarViewData {
    abstract Article article();
    abstract ContentItemThumbnailData thumbnailData();
}
```

Khi compile, bộ xử lý annotation của `AutoValue` sẽ tạo ra một subclass rời rạc của `ToolbarViewData`, có tên `AutoValue_ArticleViewFragment_ToolbarViewData` . Class này có một constructor, được khởi tạo với một instance của Article và `ContentItemThumbnailData`. Những giá trị này được gán thành **private** và final, mà 2 giá trị này cũng được getter của thực thể `article` và `thumbnailData` trả về:

```java
@Override
Article article() {
  return article;
}

@Override
ContentItemThumbnailData thumbnailData() {
  return thumbnailData;
}
```

Class cũng có implement các phương thức `equals` và `hashCode`. Nhằm mục đích cho các giá trị được tạo ra có thể sử dụng được trong set, hoặc key trong các map.

```java
@Override
public boolean equals(Object o) {
    if (o == this) {
      return true;
    }
    if (o instanceof ArticleViewFragment.ToolbarViewData) {
        ArticleViewFragment.ToolbarViewData that = (ArticleViewFragment.ToolbarViewData) o;
        return (this.article.equals(that.article()))
                && (this.thumbnailData.equals(that.thumbnailData()));
    }
    return false;
}

@Override
public int hashCode() {
    int h = 1;
    h *= 1000003;
    h ^= article.hashCode();
    h *= 1000003;
    h ^= thumbnailData.hashCode();
    return h;
}
```

Class đó cũng có phương thức `toString` dùng để log lại dữ liệu:

```java
@Override
public String toString() {
    return "ToolbarViewData{"
            + "article=" + article + ", "
            + "thumbnailData=" + thumbnailData
            + "}";
}
```

Vì để tên `AutoValue_ArticleViewFragment_ToolbarViewData` nhìn hơi bựa, quy ước được đặt ra là thêm một phương thức static factory có tên create cho mỗi class có annotation `@AutoValue`. Phương thức này sẽ tạo ra và trả về implementation mà `AutoValue` đã tạo ra tương ứng. Ví dụ, `ToolbarViewData` định nghĩa:

```java
public static ToolbarViewData create(final Article article,
                                     final ContentItemThumbnailData thumbnailData) {
    return new AutoValue_ArticleViewFragment_ToolbarViewData(article, thumbnailData);
}
```

Client giờ đây đã có thể gọi phương thức static factory trên của ToolbarViewData để tạo ra instance của `AutoValue_ArticleViewFragment_ToolbarViewData`.

Một số quy ước khi sử dụng AutoValue khác bao gồm:

- Class được tạo ra luôn đảm bảo mỗi tham số truyền vào constructor đều không null. Trừ khi getter của abstract class gốc được gắn annotation `@Nullable`.
- Một builder luôn được tạo ra tự động khi qua sử dụng annotation `@AutoValue.Builder`.
- Class được tạo ra có tính serializable nếu abstract class gốc có serializable.

Tham khảo repo của [AutoValue](https://github.com/google/auto) để biết thêm chi tiết.

Khi sử dụng AutoValue cho Android, nên sử dụng [Parcelable extension cho AutoValue](https://github.com/rharter/auto-value-parcel). Thư viện này sẽ hỗ trợ sinh code value type có implement interface `Parcelable` để truyền dữ liệu trong các `Bundle`. Rất hữu ích khi truyền data qua Intent hoặc lưu trạng thái của các `Fragment`.

## Google Guava

**Guava** chứa một số core library cho các dự án sử dụng Java của hãng. Điều dễ thấy ở đây là bên trong đó chứa implementation của collection, giúp hỗ trợ tạo immutable `List`, `Map`, `Set`, `SortedMap` và `SortedSet`. Tại sao sorted (sắp xếp) mà vẫn được đưa vào mục bất biến này vì các phương thức trong các collection interface này như `add`, `set`, `remove`, đều là các hành động không bắt buộc.

Nếu một `Observable` phải truyền một collection, sử dụng **Guava** để khởi tạo và truyền đi bản sao bất biến của collection gốc, ví dụ:

```java
private void emitUpdatedFiles() {
    final Set<File> updatedFiles = ImmutableSet.copyOf(mDownloadsByFile.keySet());
    mDownloadsSubject.onNext(updatedDownloads);
}
```

Nếu phần tử trong collection được thêm hoặc xóa khỏi `mDownloadsByFile`, những thay đổi sẽ không ảnh hưởng đến `Set` đã được truyền vì bản được truyền là bản sao.

Các class này cũng hữu ích trong việc đảm bảo các thực thể của `AutoValue` được khởi tạo với immutable collection, do đó thực thể của `AutoValue` cũng là immutable. Ví dụ:

```java
@AutoValue
public abstract class ProcessedConversionsError {
    public abstract List<String> failedConversionNames();
    public abstract List<String> invalidConversionNames();

    public static ProcessedConversionsError create(
            List<String> failedConversionNames,
            List<String> invalidConversionNames) {
        return new AutoValue_ProcessedConversionsError(
                ImmutableList.copyOf(failedConversionNames),
                ImmutableList.copyOf(invalidConversionNames)
        );
    }
}
```

Nếu bên gọi làm thay đổi tham số được truyền vào constructor, những thay đổi đó sẽ không có trong instance của `ProcessedConversionsError`, vì bản sao được tạo ra.

Cuối cùng, nên ghi chú lại rằng giá trị được truyền vào phương thức `copyOf` vốn là một thực thể của một immutable collection. Chính vì vậy phương thức `copyOf` đơn thuần chỉ trả về tham số đã được truyền vào. Xem tài liệu hướng dẫn của `Guava` để biết thêm chi tiết.

## Các nguồn tham khảo về immutable khác

Một số thư viện được thiết kế tốt cũng có các lớp bất biến trừu tượng để sử dụng. Nếu đang dùng OkHttp / Retrofit, thì có thể dùng ngay class `HttpUrl` để đại diện cho immurable URL. Hơn nữa, `OkHttp` cũng có chứa `Okio` dưới dạng dependency, `Okio` có chứa lớp `ByteString`, dùng để biểu thị chuỗi byte bất biến.
