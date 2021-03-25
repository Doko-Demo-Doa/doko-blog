---
title: RxJava Legacy (03) - Observable và chuỗi Observer hoạt động ra sao?
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

## Cách hoạt động của Observable và chuỗi observer

Chuỗi `Observable` và `Observer` rất quan trọng. Cần phải hiểu cách hoạt động của chúng để hiểu được RxJava hoạt động ra sao.

Để bắt đầu, chúng ta lấy một ví dụ đơn giản của đơn giản:

<!--truncate-->

```java
Observable.just(1, 2, 3, 4, 5)
    .filter(x -> (x % 2) == 1)
    .map(x -> x * x)
    .subscribe(integer -> System.out.println("Received value: " + integer));
```

Khi chạy, kết quả đầu ra sẽ là:

```
Received value: 1
Received value: 9
Received value: 25
```

Kể cả những người mới làm quen cũng hiểu được tại sao những giá trị trên được in ra màn hình. Nhiều khả năng là họ đã thấy `filter` và `map` trong các ngôn ngữ khác, vậy nên họ cũng hiểu được các giá trị số nguyên được sàng lọc qua đoạn code trên như thế nào.

Tuy nhiên, họ cũng có thể chẳng hiểu tại sao đoạn code sau lại xịt:

```java
mBookmarkDatabase.addBookmark(contentItemId);
```

Phương thức `addBookmark` trả về một **Observable**, **Observable** này truyền đi `true` nếu một bookmark mới đã được thêm vào item với một định danh nào đó đã được tạo ra hợp lệ trước đó, hoặc `false` nếu đã có bookmark trước đó rồi (cũng giống như việc phương thức add của Collection trả về true nếu collection đã được thay đổi). Nhưng trong trường hợp này, chúng ta không quan tâm giá trị nào đã được truyền đi, vậy nên **Observable** trả về không được gán cho giá trị nào khác.

Tuy nhiên đoạn lệnh trên không gán bookmark vào database nếu như nó chưa tồn tại. Nguyên nhân bởi **Observable** trả về không được subscribe, trực tiếp hay qua một chuỗi các **Observable** khác.

Để hiểu được RxJava xử lý ra sao, chúng ta phải hiểu được chuỗi xử lý này.

## Quá trình tạo thành một Observable chain

Các phương thức khởi tạo như just và map trả về một thực thể **Observable**. Trong đó just là phương thức static, được gọi trực tiếp ra từ class **Observable**, còn filter và map thì được gọi ra từ thực thể **Observable** đã tạo. 2 loại phương thức nói trên có trạng thái khác nhau, hành vi khác nhau, và sử dụng cho những mục đích khác nhau:

- Thông tường, các **Observable** tạo ra từ phương thức static sẽ không có upstream **Observable** instance. Những phương thức này là những phương thức gốc của bất kì chuỗi **Observable** nào. Lúc khởi tạo chúng sẽ đi kèm một số việc, chi tiết phía dưới.

- Các **Observable** tạo ra từ instance factory sẽ có upstream **Observable** instance. Upstream **Observable** instance là cái gì thì mời bạn đọc lại gạch đầu dòng ở trên. Các **Observable** này nằm giữa hoặc nằm cuối một chuỗi **Observable**. Chúng được tạo ra với các logic để xử lý hoặc chuyển đổi giá trị truyền đi.

Chúng ta cùng xem xét ví dụ:

```java
Observable<Integer> o1 = Observable.just(1, 2, 3, 4, 5);
Observable<Integer> o2 = o1.filter(x -> (x % 2) == 1);
Observable<Integer> o3 = o2.map(x -> x * x);
```

Chúng có thể được đưa lên dạng sơ đồ như sau:

![01](https://raw.githubusercontent.com/mgp/effective-rxjava/master/items/images/observable-chain.png)

Và bây giờ chúng ta hãy cùng xem điều gì xảy ra khi client gọi đến phương thức subscribe tại `o3` :

## Khởi tạo Observer chain

Chúng ta thường nói nhiều về việc `subscribe` vào các **Observable** instance, hay việc các **Observable** lọc dữ liệu hoặc chuyển đổi giá trị. Nhưng để hiểu sâu vào cơ chế hoạt động, chúng ta cần có cái nhìn khác. Khi subscribe được gọi, client không thật sự `subscribe` vào **Observable** instance. Như đã nói ở trên, việc gọi phương thức `subscribe` sẽ tạo ra một chuỗi song song các **Observer**.

Client lúc này sẽ kí gửi chính nó thành một downstream observer trong chuỗi observer được tạo ra:

![02](https://raw.githubusercontent.com/mgp/effective-rxjava/master/items/images/observer-chain-subscribe-o3.png)

`o3` sau đó subscribe ngầm vào upstream **Observable**, ở đây là `o2`. `o3` truyền một implementation có tác dụng đưa event đến observer mà client truyền xuống phương thức subscribe ở `o3`. Tuy nhiên implementation cung cấp bởi o3 cũng có implement các hành vi có được khi o3 được khởi tạo, do đó, observer sẽ thực hiện phép tính bình phương giá trị trước khi truyền đi. Phương thức `onNext` lúc này sẽ là:

```java
void onNext(T value) {
    // func là x -> x * x, được cấp khi o3 hình thành
    final T transformedValue = func.call(value);
    downstreamObserver.onNext(transformedValue);
}
```

Đồ thị lúc này sẽ có dạng:

![03](https://raw.githubusercontent.com/mgp/effective-rxjava/master/items/images/observer-chain-subscribe-o2.png)

Một lần nữa, `o3` lại gọi ngầm subscribe đến `o2`. Một quá trình tương tự lại lặp lại, `o2` gọi ngầm subscribe `o1`. `o2` truyền vào phương thức này một implementation chỉ truyền số lẻ, cũng là hành vi mà nó được khởi tạo. phương thức `onNext` của observer này có kiểu như sau:

```java
void onNext(T value) {
    // func là x -> (x % 2) == 1, được cấp khi o2 hình thành
    final boolean isSatisfied = func.call(value);
    if (isSatisfied) {
        downstreamObserver.onNext(value);
    }
}
```

Và đồ thị có dạng:

![04](https://raw.githubusercontent.com/mgp/effective-rxjava/master/items/images/observer-chain-subscribe-o1.png)

Lại một lần nữa, `o2` gọi ngầm đến `subscribe` của `o1`. Nhưng `o1` không có upstream **Observable** nào. Lần gọi này cũng đã hoàn thành observer chain và bắt đầu truyền event.

Truyền giá trị trong chuỗi `Observable`

`o3` và `o2` được cài đặt để biến đổi và lọc giá trị. `o1` được cài đặt để truyền giá trị. Khi phương thức subscribe được kích hoạt với implementation của observer, `o1` sẽ emit (truyền đi) giá trị mà nó được khởi tạo tới observer đó. Tóm lại, **Observable** nằm ở gốc của chuỗi dây chuyền được cài đặt để xử lý một tác vụ nào đó khi phương thức subscribe được gọi ra. Tác vụ này chính là hiệu ứng phụ (side-effect) dẫn đến việc truyền đi 0 hoặc nhiều giá trị, kết quả sau đó là event đã được xử lý thành công.

Giờ thì chúng ta đã hiểu tại sao `addBookmark` không thực sự ghi dữ liệu vào database: Tác dụng phụ của tác vụ "ghi database" chỉ xảy ra khi subscribe được gọi trên **Observable** được trả về. Khi gọi subscribe, tác vụ sau được thực thi:

```java
mBookmarkDatabase.addBookmark(contentItemId)
        .subscribe(didNotExist -> { /* success */ });
```

Quay trở lại ví dụ trên, việc mà `o1` cần làm là truyền các giá trị tới observer, sau đó là bắn event hoàn thành. Có thể mô tả như sau:

```java
for (T element : list) {
    observer.onNext(element);
}
observer.onCompleted();
```

Các event này lần lượt duyệt qua chuỗi observer, tới nơi observer tạo ra bởi `o2` đang lọc dữ liệu, rồi đến observer tạo bởi `o3` đang bình phương giá trị lên. Các giá trị này sau đó được đưa tới phương thức subscribe của `o3`, có tác dụng in ra màn hình.

## Unsubscribing

Lưu ý rằng trong ví dụ trên, phương thức `subscribe` của `o1` truyền ngay lập tức các dữ liệu của nó tới observer, sau đó hoàn thành. Đoạn code có thể coi là hoạt động đồng bộ.

Nhưng có thể có nhiều **Observable** khác cần xử lý với lượng thời gian lớn hơn, hoặc được định sẵn để khởi chạy vào một thời điểm nào đó trong tương lai, ví dụ như call api mạng, hoặc ghi dữ liệu lên bộ nhớ trên một luồng khác. Với các trường hợp này, thời gian **Observable** hoàn thành công việc của nó có thể sẽ bị quá thời gian của client gọi phương thức subscribe. Trong nhiều trường hợp, chúng ta không muốn kéo dài thời gian sống của client, mà muốn `unsubscribe` khỏi chuỗi observer.

Để thực hiện điều này, chúng ta giữ lại `Subscription` trả về bởi phương thức subscribe của **Observable**:

```java
Subscription s = o3.subscribe(integer -> System.out.println("Received value: " + integer));
```

Nếu client gọi phương thức ubsubscibe trên thực thể Subscription này, observer được đưa tới phương thức subscribe ở o3 không nhận được event nào cả.

Để hiểu được điều gì xảy ra bên dưới, lưu ý rằng không chỉ có mỗi observer trong chuỗi observer theo dõi downstream observer mà nó truyền event tới, mà mỗi observer tham chiếu đến upstream observer nó sẽ nhận dữ liệu từ đó. Mỗi observer được tạo ra ngầm có thể unsubscribe tới upstream observer theo thứ tự như sau:

- Client gọi `s.unsubscribe()`, có tác dụng unsubscribe client khởi observer (bình phương) ngầm, tạo ra bởi phương thức subscribe tại `o3`.
- Observer bình phương này sau đó sẽ unsubscribe ngầm khỏi observer (lọc số) tạo ra bởi phương thức subscribe ở `o2`.
- Observer lọc số sau đó `unsubscribe` khỏi nguồn `o1`.

Lời gọi tới unsubscribe do đó sẽ tiêu hủy chuỗi observer đã được tạo ngầm ra bởi lệnh gọi subscribe.

## Tiếp theo

Giờ thì bạn đã hiểu điều gì xảy ra khi chúng ta viết nối tiếp các dòng operator trong **RxJava**, và chuỗi observer được tạo thành bởi Observable thành hình như thế nào. Bài tiếp theo, sử dụng mẫu trên, chúng ta sẽ tìm hiểu sự khác nhau giữa `subscribeOn` và `observeOn`, 2 phương thức rất quen thuộc khi lập trình đa luồng với RxJava. Cùng với đó là observable "nóng" và "lạnh".
