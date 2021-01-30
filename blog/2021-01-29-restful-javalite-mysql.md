---
title: RESTful với JavaLite và MySQL / SQLite
author: Doko
author_title: Administrator
author_url: https://github.com/Doko-Demo-Doa
author_image_url: /img/avatar_doraemon.jpg
image: https://i.ibb.co/3WqBzR9/javalite-rest.png
hide_table_of_contents: false
tags: [vietnamese, java, javalite, mysql]
---

![javalite](https://i.ibb.co/3WqBzR9/javalite-rest.png)

## 1. Giới thiệu

JavaLite là một bộ frameworks (gồm nhiều framework con) dùng để đơn giản hóa một số tác vụ, đầu việc thường làm khi phát triển ứng dụng, thường là web. Bài hướng dẫn sau đây tập trung vào việc tạo một ứng dụng Restful với MySQL / SQLite.

<!--truncate-->

## 2. Cài đặt

Chúng ta vẫn sẽ bắt đầu với một project chạy trên maven bình thường, và 2 thứ chúng ta sẽ dùng là ActiveWeb và ActiveJDBC, 2 framework con mà JavaLite tích hợp.

```xml
<dependency>
  <groupId>org.javalite</groupId>
  <artifactId>activeweb</artifactId>
  <version>1.15</version>
</dependency>
```

Do `ActiveWeb` đã bao gồm `ActiveJDBC` nên chúng ta sẽ không cần cái thứ 2, phiên bản mới nhất của `ActiveWeb` có thể lên [MavenCentral](https://search.maven.org/classic/#search%7Cgav%7C1%7Cg%3A%22org.javalite%22%20AND%20a%3A%22activeweb%22) tìm.

Tiếp theo, chúng ta cần một connector (bộ kết nối) với MySQL (SQLite thì không cần, sẽ cài sau):

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.45</version>
</dependency>
```

Và tiếp theo là một plugin cho JavaLite: `Instrumentation`:

```xml
<plugin>
    <groupId>org.javalite</groupId>
    <artifactId>activejdbc-instrumentation</artifactId>
    <version>1.4.13</version>
    <executions>
        <execution>
            <phase>process-classes</phase>
            <goals>
                <goal>instrument</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

Sau khi đã có đủ đồ chơi, chúng ta cần chắc rằng có một DB nào đó đang chạy, trong ví dụ này là MySQL hoặc SQLite.

## 3. ORM

### 3.1. Mapping và Instrumentation

Ta sẽ bắt đầu với bài tập truyền thống là làm 1 cái backend REST cho web bán hàng. Và để bán hàng thì đầu tiên cần có sản phẩm:

```java title="Product.java"
public class Product {}
```

Tiếp theo, tạo bảng, chạy lệnh SQL:

```sql
CREATE TABLE PRODUCTS (
    id int(11) DEFAULT NULL auto_increment PRIMARY KEY,
    name VARCHAR(128)
);
```

và sau đó ta có thể biến cái Product kia thành model:

```java title="Product.java"
public class Product extends Model {}
```

Cái hay ở đây là gì? Là chúng ta chỉ cần extend cái `org.javalite.activejdbc.Model`. `ActiveJDBC` tự đọc schema từ DB, do đó chúng ta không cần phải viết thêm getter setter gì cả.
Hơn thế nữa, `ActiveJDBC` tự biết map cái model Product kia vào bảng `PRODUCTS` luôn (dù có để số nhiều hay số ít theo tiếng Anh).

Cuối cùng là chạy `Instrumentation`, đây là một bước mà `ActiveJDBC` yêu cầu, để sinh code dạng getter setter cho các model. Chúng ta không cần làm gì thêm vì ở bước trên đã có plugin `instrumentation` rồi. Khi chạy thì ở terminal sẽ hiện dạng như này:

```
...
[INFO] --- activejdbc-instrumentation:1.4.11:instrument (default) @ javalite ---
**************************** START INSTRUMENTATION ****************************
Directory: ...\tutorials\java-lite\target\classes
Instrumented class: .../tutorials/java-lite/target/classes/app/models/Product.class
**************************** END INSTRUMENTATION ****************************
...
```

Tiếp theo chúng ta sẽ chạy thử:

### 3.2. Test

Cách test thử rất đơn giản: Tạo kết nối đến database, tạo 1 product, và get nó về lại:

```java title="TestProduct.java"
@Test
public void givenSavedProduct_WhenFindFirst_ThenSavedProductIsReturned() {
    Base.open(
      "com.mysql.jdbc.Driver",
      "jdbc:mysql://localhost/dbname",
      "user",
      "password");
 
    Product toSaveProduct = new Product();
    toSaveProduct.set("name", "Bread");
    toSaveProduct.saveIt();
 
    Product savedProduct = Product.findFirst("name = ?", "Bread");
 
    assertEquals(
      toSaveProduct.get("name"), 
      savedProduct.get("name"));
}
```

Vậy là chỉ cần 1 plugin và 1 model rỗng, chúng ta có thể có được những thứ như trên trong nháy mắt.

Tiếp theo, đến lượt controller, vì đơn giản là cần controller/routing thì mới gửi request được:

## 4. Controller

Mở đầu với `ProductsController` như sau:

```java title="ProductsController.java"
@RESTful
public class ProductsController extends AppController {
 
    public void index() {
        // ...
    }
 
}
```

Với đoạn code trên, ActiveWeb sẽ tự map thành địa chỉ như sau:

```
http://<host>:<port>/products
```

Các controller có annotation `@Restful` sẽ tự động được đánh thêm các method như trong bảng:

| Phương thức | Tên trong Java | Kiểu | URI |
|-|-|-|-|
| CREATE | `create()` | POST | `http://host:port/products` |
| READ ONE | `show()` | GET | `http://host:port/products/{id}` |
| READ ALL | `index()` | GET | `http://host:port/products/` |
| UPDATE | `update()` | PUT | `http://host:port/products/{id}` |
| DELETE | `delete()` | DELETE | `http://host:port/products/{id}` |

Và nếu như thêm đầy đủ thì nó trông như này:

```java title="ProductsController.java"
@RESTful
public class ProductsController extends AppController {
 
    public void index() {
        // Lấy hết products
    }
 
    public void create() {
        // Tạo product mới
    }
 
    public void update() {
        // Sửa product
    }
 
    public void show() {
        // Tìm product
    }
 
    public void destroy() {
        // Xóa product
    }
}
```

Chạy thôi... mà khoan. Trước khi chạy tiếp, chúng ta cần phải có thêm một bước cài đặt cho project.

## 5. Config

ActiveWeb là framework dựa trên tư tưởng convention over configuration, tức là cứ sắp xếp đúng theo nó muốn, là chạy được. Do đó, các file code cũng phải được sắp xếp theo mẫu như sau:

```bash
src
 |----main
       |----java.app
       |     |----config
       |     |----controllers
       |     |----models
       |----resources
       |----webapp
             |----WEB-INF
             |----views
```

Trong package `java.app.config`, chúng ta sẽ tạo 3 class:

```java title="DbConfig.java"
public class DbConfig extends AbstractDBConfig {
    @Override
    public void init(AppContext appContext) {
        this.configFile("/database.properties");
    }
}
```

Class trên sẽ tự động config kết nối với database, với thông tin lấy từ file `database.properties` nằm trong thư mục gốc của project:

```cpp
development.driver=com.mysql.jdbc.Driver
development.username=user
development.password=password
development.url=jdbc:mysql://localhost/dbname
```

Class thứ hai cần tạo là `AppControllerConfig`

```java title="AppControllerConfig.java"
public class AppControllerConfig extends AbstractControllerConfig {
    @Override
    public void init(AppContext appContext) {
        add(new DBConnectionFilter()).to(ProductsController.class);
    }
}
```

Class trên sẽ gán kết nối database mà ta đã tạo với controller tương ứng.

Class thứ 3 sẽ là class điều chỉnh context của app, cũng là class đảm nhiệm việc bootstrap ứng dụng:

```java title="AppBootstrap.java"
public class AppBootstrap extends Bootstrap {
    public void init(AppContext context) {}
}
```

Sau khi tạo xong 3 class, chúng ta cần 1 file config tên là web.xml ở ngoài (vì `ActiveWeb` cũng dựa trên Java EE mà thôi):

```xml title="web.xml"
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns=...>
 
    <filter>
        <filter-name>dispatcher</filter-name>
        <filter-class>org.javalite.activeweb.RequestDispatcher</filter-class>
        <init-param>
            <param-name>exclusions</param-name>
            <param-value>css,images,js,ico</param-value>
        </init-param>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>UTF-8</param-value>
        </init-param>
    </filter>
 
    <filter-mapping>
        <filter-name>dispatcher</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
 
</web-app>
```

Sau khi xong xuôi, ta sẽ bắt đầu thêm code logic chính cho CRUD dữ liệu.

## 6. Xử lý CRUD

ActiveWeb, phần nào như tên gọi, cũng sử dụng dạng tham chiếu dữ liệu ActiveRecord (thay vì datamapper như Spring), phù hợp với các dự án vừa và nhỏ. Sau đây là ví dụ CRUD cho cái Product đã tạo:

```java title="ProductsController.java"
@RESTful
public class ProductsController extends AppController {
 
    private ObjectMapper mapper = new ObjectMapper();    
 
    public void index() {
        List<Product> products = Product.findAll();
        // ...
    }
 
    public void create() {
        Map payload = mapper.readValue(getRequestString(), Map.class);
        Product p = new Product();
        p.fromMap(payload);
        p.saveIt();
        // ...
    }
 
    public void update() {
        Map payload = mapper.readValue(getRequestString(), Map.class);
        String id = getId();
        Product p = Product.findById(id);
        p.fromMap(payload);
        p.saveIt();
        // ...
    }
 
    public void show() {
        String id = getId();
        Product p = Product.findById(id);
        // ...
    }
 
    public void destroy() {
        String id = getId();
        Product p = Product.findById(id);
        p.delete();
        // ...
    }
}
```

Nếu copy paste đoạn code trên, hiển nhiên là nó chưa trả về gì cả, mà chúng ta sẽ phải xử lý các view của __ActiveWeb__ ngay sau đây.

## 7. View

ActiveWeb tích hợp [Apache FreeMarker](https://freemarker.apache.org/), một template engine cho việc hiển thị view. Đường dẫn chứa các view phải được đặt trong `src/main/webapp/WEB-INF/views`

Các view tương ứng sẽ được đặt vào folder con tương ứng. Trong ví dụ này là `src/main/webapp/WEB-INF/views/products`. Giờ chúng ta sẽ tạo template đầu tiên có tên `_product.ftl`:

```handlebars title="_product.ftl"
{
    "id" : ${product.id},
    "name" : "${product.name}"
}
```

Ta có thể nhận ra cái view này chính là một dạng json. Tuy nhiên dữ liệu trả về khi truy vấn product lại là dạng mảng, vậy nên sẽ cần một file nữa tên `index.ftl`:

```
[<@render partial="product" collection=products/>]
```

Và thế là chúng ta có được một array json, mỗi phần tử là một Product, định dạng bởi file `_product.ftl`.

Cuối cùng, chúng ta cần gán dữ liệu từ controller đến view tương ứng:

```java title="ProductsController.java"
@RESTful
public class ProductsController extends AppController {
    public void index() {
        List<Product> products = Product.findAll();
        view("products", products);
        render();
    }
 
    public void show() {
        String id = getId();
        Product p = Product.findById(id);
        view("product", p);
        render("_product");
    }
}
```

Dễ thấy ở đây có 2 cái là `index()` và `show()`. Ở phương thức đầu tiên, chúng ta gán danh sách product cho template có tên `products`.

Tiếp đó, do không để tên view ở hàm render, file `index.ftl` sẽ được sử dụng.

Ở `show()`, chúng ta gán trực tiếp product p cho phần tử product trong view, và chỉ định rõ luôn view nào render cái đó.

Ngoài ra chúng ta có thể thêm `message.ftl`, dùng cho hiển thị các thông báo chung:


```
{
  "message" : "${message}",
  "code" : ${code}
}
```

Sau đó gọi ra từ bất kì phương thức nào trong class ProductsController:

```java title="ProductsController.java"
view("message", "There was an error.", "code", 200);
render("message");
```

Class `ProductsController.java` sẽ đầy đủ như sau:

```java title="ProductsController.java"
@RESTful
public class ProductsController extends AppController {
    private ObjectMapper mapper = new ObjectMapper();
 
    public void index() {
        view("products", Product.findAll());
        render().contentType("application/json");
    }
 
    public void create() {
        Map payload = mapper.readValue(getRequestString(), Map.class);
        Product p = new Product();
        p.fromMap(payload);
        p.saveIt();
        view("message", "Successfully saved product id " + p.get("id"), "code", 200);
        render("message");
    }
 
    public void update() {
        Map payload = mapper.readValue(getRequestString(), Map.class);
        String id = getId();
        Product p = Product.findById(id);
        if (p == null) {
            view("message", "Product id " + id + " not found.", "code", 200);
            render("message");
            return;
        }
        p.fromMap(payload);
        p.saveIt();
        view("message", "Successfully updated product id " + id, "code", 200);
        render("message");
    }
 
    public void show() {
        String id = getId();
        Product p = Product.findById(id);
        if (p == null) {
            view("message", "Product id " + id + " not found.", "code", 200);
            render("message");
            return;
        }
        view("product", p);
        render("_product");
    }
 
    public void destroy() {
        String id = getId();
        Product p = Product.findById(id);
        if (p == null) {
            view("message", "Product id " + id + " not found.", "code", 200);
            render("message");
            return;
        }
        p.delete();
        view("message", "Successfully deleted product id " + id, "code", 200);
        render("message");
    }
 
    @Override
    protected String getContentType() {
        return "application/json";
    }
 
    @Override
    protected String getLayout() {
        return null;
    }
}
```

Lúc này chương trình đã hoàn thành và có thể chạy thử:

## 8. Chạy thử

Trước khi chạy thử, chúng ta thêm đoạn sau vào trong file pom.xml:

```xml title="pom.xml"
<plugin>
    <groupId>org.eclipse.jetty</groupId>
    <artifactId>jetty-maven-plugin</artifactId>
    <version>9.4.8.v20171121</version>
</plugin>
```

Để ứng dụng chạy được (vì không có file main để bootstrap), ta cần plugin trên. Có thể tìm phiên bản mới nhất của [jetty-maven-plugin](https://search.maven.org/classic/#search%7Cgav%7C1%7Cg%3A%22org.eclipse.jetty%22%20AND%20a%3A%22jetty-maven-plugin%22) trên Maven.

Tiếp theo là chạy:

```bash
mvn jetty:run
```

Chúng ta có thể kiểm tra các REST API bằng Postman hoặc dùng `curl`. Các ví dụ sau sử dụng curl, có thể copy paste các payload trong cái `-d` vào Postman để thử:

```bash
$ curl -X POST http://localhost:8080/products
  -H 'content-type: application/json'
  -d '{"name":"Water"}'
{
    "message" : "Successfully saved product id 1",
    "code" : 200
}
```

```bash
$ curl -X POST http://localhost:8080/products
  -H 'content-type: application/json'
  -d '{"name":"Bread"}'
{
    "message" : "Successfully saved product id 2",
    "code" : 200
}
```

Sau khi tạo 2 sản phẩm, lấy về thử:

```bash
$ curl -X GET http://localhost:8080/products
[
    {
        "id" : 1,
        "name" : "Water"
    },
    {
        "id" : 2,
        "name" : "Bread"
    }
]
```

Update thử một sản phẩm:

```bash
$ curl -X PUT http://localhost:8080/products/1
  -H 'content-type: application/json'
  -d '{"name":"Juice"}'
{
    "message" : "Successfully updated product id 1",
    "code" : 200
}
```

Đọc sản phẩm vừa update:

```bash
$ curl -X GET http://localhost:8080/products/1
{
    "id" : 1,
    "name" : "Juice"
}
```

Cũng như xóa thử:

```bash
$ curl -X DELETE http://localhost:8080/products/2
{
    "message" : "Successfully deleted product id 2",
    "code" : 200
}
```

## 9. Nhìn lại

JavaLite có khá nhiều công cụ để giúp tạo ứng dụng nhanh, tuy nhiên do dựa theo convention nên lúc đầu sẽ cần tìm hiểu quy định về tên và nơi đặt các file tương ứng. Mặt khác, đúng như cái  tên “lite”, JavaLite phù hợp với các dự án nhỏ và vừa.

Ví dụ trên chỉ là giới thiệu hương hoa về **ActiveWeb** và **ActiveJDBC**. Tôi viết bài này khi đang tích hợp một framework web nhỏ cho con bot Discord, có hỗ trợ SQLite và JavaLite rất phù hợp cho việc đó. Các bạn có thể xem thêm hướng dẫn trên [website](https://javalite.io/). Code mẫu có thể tìm thấy tại link [Github](https://github.com/javalite/javalite-examples/tree/master/activeweb-rest) này.
