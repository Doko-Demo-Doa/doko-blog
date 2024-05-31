---
title: Flutter Architecture với Provider và Provider Architecture MVVM (phần 1)
authors: [doko]
image: https://i.ibb.co/dfLcSvg/Untitled-1.jpg
hide_table_of_contents: false
tags: [vietnamese, flutter, provider]
---

![flutter](https://i.ibb.co/dfLcSvg/Untitled-1.jpg)

Để khỏi mất thời gian giới thiệu. Chúng ta có luôn 2 từ khoá, cũng là 2 thư viện được sử dụng để thiết kế khung code cho Flutter. Do Flutter là UI framework dạng widget/component tương tự với React, ta cũng có thể dùng Redux nhưng khối lượng code sẽ dày lên không cần thiết. Và qua một thời gian nghiên cứu, thì Provider architecture có vẻ phù hợp hơn cả:

Tại thời điểm viết bài, 2 lib cần thiết có version tương ứng là:

```yml
provider: 4.0.2
provider_architecture: 1.0.5
```

Chúng ta sẽ xây dựng một app đơn giản: 2 màn hình:

<!--truncate-->

- Ở màn hình (1): Có 1 nút mà khi ở trạng thái _Unauthenticated_ (tạm gọi là trạng thái A) thì sẽ điều hướng sang màn hình thứ (2).
- Ở màn hình thứ (2): Có 1 nút mà khi click vào, chúng ta sẽ giả lập thao tác login: Click vào, sau 2 giây thì trạng thái Unauthenticated sẽ chuyển sang Authenticated. Khi quay lại màn hình (1) thì cái nút ở màn (1) bấm vào chỉ còn print ra console chữ gì đó tuỳ.

Bài viết mặc định hiểu là bạn đã từng làm việc với React / Redux nên sẽ có một số khái niệm đưa ra mang tính ánh xạ sang Redux.

_Provider_ ở đây không khác gì Provider component trong React Redux, và cũng hoạt động theo dạng bên cung (provider) và bên cầu (consumer). Do Dart là ngôn ngữ optional static typing nên tác giả của lib Provider có chia làm một số loại cho dễ dùng:

## Provider

Nhận một giá trị vào nhưng giá trị đó không được update cho bên consumer. Nhưng nó không giúp bạn update UI khi giá trị mà nó nhận vào thay đổi một cách tự động.

Ví dụ, lấy một `ViewModel` như sau:

```dart
class MyModel {
  String someValue = 'Hello';  void doSomething() {
    someValue = 'Goodbye';
    print(someValue);
  }
}
```

Sau đó bọc cái widget root bằng widget Provider, rồi tham chiếu đến ViewModel đã tạo bằng widget Consumer.

```dart title="main.dart"
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Provider<MyModel>( //                                <--- Provider
      create: (context) => MyModel(),
      child: MaterialApp(
        home: Scaffold(
          appBar: AppBar(title: Text('My App')),
          body: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[

              Container(
                padding: const EdgeInsets.all(20),
                color: Colors.green[200],
                child: Consumer<MyModel>( //                    <--- Consumer
                  builder: (context, myModel, child) {
                    return RaisedButton(
                      child: Text('Do something'),
                      onPressed: (){
                        // We have access to the model.
                        myModel.doSomething();
                      },
                    );
                  },
                )
              ),

              Container(
                padding: const EdgeInsets.all(35),
                color: Colors.blue[200],
                child: Consumer<MyModel>( //                    <--- Consumer
                  builder: (context, myModel, child) {
                    return Text(myModel.someValue);
                  },
                ),
              ),

            ],
          ),
        ),
      ),
    );
  }
}

class MyModel { //                                               <--- MyModel
  String someValue = 'Hello';
  void doSomething() {
    someValue = 'Goodbye';
    print(someValue);
  }
}
```

Kết quả ta được:

![01](https://i.ibb.co/RjptYmD/provider.png)

- Phần UI được build với chữ "Hello" lấy từ `ViewModel`.
- Nhấn nút Do something sẽ kích hoạt hàm `doSomething()` trong `ViewModel`, nhưng UI không được update vì `Provider` vốn chẳng lắng nghe sự kiện nào cả.

## ChangeNotifierProvider

Cái này dùng là tiện nhất, nó sẽ tự động bỏ lắng nghe khi cần thiết (VD: Khi widget không còn hiện). Nó cũng tự lắng nghe và update data, khiến cho widget được build lại. Tuy nhiên cần phải viết ViewModel cho nó, và cũng là phần chính trong bài viết này.

Trong phần code trên, đổi Provider sang `ChangeNotifierProvider`. ViewModel class cần phải sử dụng `ChangeNotifier` mixin hoặc (bằng từ khoá with hoặc extends) để có thể dùng được hàm notifyListeners() và mỗi khi dùng nó, `ChangeNotifierProvider` sẽ được thông báo, và `Consumer` sẽ rebuild widget.

Code đầy đủ:

```dart title="main.dart"
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<MyModel>( //      <--- ChangeNotifierProvider
      create: (context) => MyModel(),
      child: MaterialApp(
        home: Scaffold(
          appBar: AppBar(title: Text('My App')),
          body: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[

              Container(
                  padding: const EdgeInsets.all(20),
                  color: Colors.green[200],
                  child: Consumer<MyModel>( //                  <--- Consumer
                    builder: (context, myModel, child) {
                      return RaisedButton(
                        child: Text('Do something'),
                        onPressed: (){
                          myModel.doSomething();
                        },
                      );
                    },
                  )
              ),

              Container(
                padding: const EdgeInsets.all(35),
                color: Colors.blue[200],
                child: Consumer<MyModel>( //                    <--- Consumer
                  builder: (context, myModel, child) {
                    return Text(myModel.someValue);
                  },
                ),
              ),

            ],
          ),
        ),
      ),
    );
  }
}

class MyModel with ChangeNotifier { //                          <--- MyModel
  String someValue = 'Hello';

  void doSomething() {
    someValue = 'Goodbye';
    print(someValue);
    notifyListeners();
  }
}
```

- Trong hầu hết các trường hợp, các `ViewModel` sẽ được đặt trong file rời khác nhau (giống reducer của Redux) và dùng `flutter/foundation.dart` để sử dụng `ChangeNotifier`.
- `Consumer` sẽ rebuild lại toàn bộ widget con của nó mỗi khi `notifyListeners()` được gọi. Cái nút trong UI không cần được update, nên thay vì dùng Consumer, bạn cũng có thể dùng `Provider.of` và set thuộc tính `listen = false`. Đây cũng là practice được khuyến cáo của thư viện provider.\\

## StreamProvider

Về cơ bản thì đây là wrapper cho `StreamBuilder`. Lắng nghe sự thay đổi data và notify mỗi khi nó thay đổi. Stream Controller gắn liền với Provider này sẽ bắn ra giá trị mới nhất mà nó phát hiện được.

```dart title="main.dart"
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return StreamProvider<MyModel>( //                       <--- StreamProvider
      initialData: MyModel(someValue: 'default value'),
      create: (context) => getStreamOfMyModel(),
      child: MaterialApp(
        home: Scaffold(
          appBar: AppBar(title: Text('My App')),
          body: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[

              Container(
                padding: const EdgeInsets.all(20),
                color: Colors.green[200],
                child: Consumer<MyModel>( //                    <--- Consumer
                  builder: (context, myModel, child) {
                    return RaisedButton(
                      child: Text('Do something'),
                      onPressed: (){
                        myModel.doSomething();
                      },
                    );
                  },
                )
              ),

              Container(
                padding: const EdgeInsets.all(35),
                color: Colors.blue[200],
                child: Consumer<MyModel>( //                    <--- Consumer
                  builder: (context, myModel, child) {
                    return Text(myModel.someValue);
                  },
                ),
              ),

            ],
          ),
        ),
      ),
    );

  }
}

Stream<MyModel> getStreamOfMyModel() { //                        <--- Stream
  return Stream<MyModel>.periodic(Duration(seconds: 1),
          (x) => MyModel(someValue: '$x'))
      .take(10);
}

class MyModel { //                                               <--- MyModel
  MyModel({this.someValue});
  String someValue = 'Hello';
  void doSomething() {
    someValue = 'Goodbye';
    print(someValue);
  }
}
```

![stream](https://i.ibb.co/2cL8yFd/streamprovider.gif)

- `StreamProvider` sẽ báo cho `Consumer` biết để rebuild khi có stream event mới.
- Dùng Hot Restart `(Shift + R)` để trở về giá trị ban đầu.
- Để ý rằng khi nhấn `Do something` thì sẽ chẳng có gì xảy ra. Nếu cần thì bạn nên dùng cái `ChangeNotifierProvider` chứ không phải `StreamProvider`.
- Có thể dùng `StreamProvider` để làm BLoC.

## FutureProvider

Về cơ bản, đây chỉ là một wrapper quanh `FutureBuilder`. Ta cung cấp cho nó một giá trị ban đầu để hiện UI, sau khi xong Future thì báo cho các `Consumer` biết để update. Ví dụ:

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return FutureProvider<MyModel>( //                      <--- FutureProvider
      initialData: MyModel(someValue: 'default value'),
      create: (context) => someAsyncFunctionToGetMyModel(),
      child: MaterialApp(
        home: Scaffold(
          appBar: AppBar(title: Text('My App')),
          body: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[

              Container(
                padding: const EdgeInsets.all(20),
                color: Colors.green[200],
                child: Consumer<MyModel>( //                    <--- Consumer
                  builder: (context, myModel, child) {
                    return RaisedButton(
                      child: Text('Do something'),
                      onPressed: (){
                        myModel.doSomething();
                      },
                    );
                  },
                )
              ),

              Container(
                padding: const EdgeInsets.all(35),
                color: Colors.blue[200],
                child: Consumer<MyModel>( //                    <--- Consumer
                  builder: (context, myModel, child) {
                    return Text(myModel.someValue);
                  },
                ),
              ),

            ],
          ),
        ),
      ),
    );

  }
}

Future<MyModel> someAsyncFunctionToGetMyModel() async { //  <--- async function
  await Future.delayed(Duration(seconds: 3));
  return MyModel(someValue: 'new data');
}

class MyModel { //                                               <--- MyModel
  MyModel({this.someValue});
  String someValue = 'Hello';
  Future<void> doSomething() async {
    await Future.delayed(Duration(seconds: 2));
    someValue = 'Goodbye';
    print(someValue);
  }
}
```

![future](https://i.ibb.co/SVj14Zb/futureprovider.gif)

- `FutureProvider` sẽ báo cho Consumer biết để rebuild lại widget khi Future đã xử lý xong.
- Dùng Hot Restart để rebuild app với các giá trị ban đầu.
- Để ý rằng khi nhấn `Do something`, UI không được update lại (kể cả sau khi `Future` đã hoàn thành) vì đơn giản là nó không có nhiệm vụ đó). Nếu cần chức năng đó thì bạn nên dùng `ChangeNotifierProvider`
- `FutureProvider` có thể dùng để đọc / ghi data từ file, hoặc call API. Nhưng ta cũng có thể làm việc đó với `FutureBuilder` mà không cần đến package Provider này. Nói chung cái Widget này không mấy hữu ích.

## ValueListenableProvider

Cái này gần giống `ChangeNotifierProvider` nhưng phức tạp hơn một chút.

Nếu bạn có một class `ViewModel` với `ValueNotifier` như sau:

```dart
class MyModel {
  ValueNotifier<String> someValue = ValueNotifier('Hello');
  void doSomething() {
    someValue.value = 'Goodbye';
  }
}
```

thì sử dụng `ValueListenableProvider`, bạn sẽ có thể lắng nghe thay đổi. Tuy nhiên, nếu muốn dùng method trên model từ UI, thì cũng phải cung cấp model. Đoạn code sau đây mô tả việc Provider cung cấp `MyModel` cho Consumer, để đưa `ValueNotifier` cho `ValueListenableProvider`.

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Provider<MyModel>(//                              <--- Provider
      create: (context) => MyModel(),
      child: Consumer<MyModel>( //                           <--- MyModel Consumer
          builder: (context, myModel, child) {
            return ValueListenableProvider<String>.value( // <--- ValueListenableProvider
              value: myModel.someValue,
              child: MaterialApp(
                home: Scaffold(
                  appBar: AppBar(title: Text('My App')),
                  body: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[

                      Container(
                          padding: const EdgeInsets.all(20),
                          color: Colors.green[200],
                          child: Consumer<MyModel>( //       <--- Consumer
                            builder: (context, myModel, child) {
                              return RaisedButton(
                                child: Text('Do something'),
                                onPressed: (){
                                  myModel.doSomething();
                                },
                              );
                            },
                          )
                      ),

                      Container(
                        padding: const EdgeInsets.all(35),
                        color: Colors.blue[200],
                        child: Consumer<String>(//           <--- String Consumer
                          builder: (context, myValue, child) {
                            return Text(myValue);
                          },
                        ),
                      ),

                    ],
                  ),
                ),
              ),
            );
          }),
    );
  }
}

class MyModel { //                                             <--- MyModel
  ValueNotifier<String> someValue = ValueNotifier('Hello'); // <--- ValueNotifier
  void doSomething() {
    someValue.value = 'Goodbye';
    print(someValue.value);
  }
}
```

Kết quả tả được:

![value](https://i.ibb.co/zn4Rk1K/lvp.gif)

- Nhấn nút sẽ khiến chữ "Hello" thành "Goodbye" nhờ `ValueListenableProvider`.
- Nên sử dụng `Provider.of(context, listen: false)` để tránh update liên tục.
- Provider cung cấp `myModel` cho cả `ValueListenableProvider` và closure của button `Do something`.
- Consumer cho widget `Text` biết lấy value từ `ValueListenableProvider` vì kiểu `T` trong generic đều khớp (đều là `String`).

## MultiProvider

Lấy luôn ví dụ cho dễ hiểu: Ta có thể kết hợp nhiều Provider thành dạng mảng, như này:

```dart
Provider<Something>(
  create: (_) => Something(),
  child: Provider<SomethingElse>(
    create: (_) => SomethingElse(),
    child: Provider<AnotherThing>(
      create: (_) => AnotherThing(),
      child: someWidget,
    ),
  ),
),
```

sẽ thành:

```dart
MultiProvider(
  providers: [
    Provider<Something>(create: (_) => Something()),
    Provider<SomethingElse>(create: (_) => SomethingElse()),
    Provider<AnotherThing>(create: (_) => AnotherThing()),
  ],
  child: someWidget,
)
```

ở phần 2, chúng ta sẽ thực hiện đưa thư viện `provider_architecture` vào sử dụng theo dạng **MVVM** cho ứng dụng.
