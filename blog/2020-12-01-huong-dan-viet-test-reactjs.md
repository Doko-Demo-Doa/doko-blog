---
slug: huong-dan-viet-test-reactjs
title: Hướng dẫn viết test ReactJS cho người mới bắt đầu
author: Doko
author_title: Administrator
author_url: https://github.com/Doko-Demo-Doa
author_image_url: https://i.imgur.com/UhtGS.png
hide_table_of_contents: false
tags: [vietnamese, programming, reactjs]
---

![react-testing](https://i.ibb.co/qR1jHkW/react-testing-library.png)

Các lập trình viên đều biết việc test là rất quan trọng trong quá trình phát triển phần mềm, nhất là với các ứng dụng lớn. Lý do thì rất nhiều:

- Bạn sẽ có thể làm vỡ, hỏng ứng dụng dù chỉ đổi 1 dòng code.
- Test thủ công sau mỗi lần sửa là quá phiền.
- Test giúp cho chúng ta tài liệu hoá các case khó, khoai.
- Biết viết test giúp cho chúng ta có ưu thế hơn các ứng viên khác khi tìm việc.

Tuy nhiên với nhiều người mới làm quen, việc viết test thực sự khá... lạ. Chúng ta sẽ phải làm việc trong một "môi trường" hoàn toàn mới, có thể là không biết bắt đầu từ đâu, đi như thế nào cho đúng. Có thể chúng ta sẽ mất hàng giờ chỉ để viết một cái test đơn giản chỉ vì viết phát là lỗi lên lỗi xuống. Hoặc cũng có thể chúng ta đã quá quen với việc nhấn F11 để debug cái DOM và console log trình duyệt một cách tiện lợi, còn viết test thì không như vậy.

Nhưng việc gì cũng có cách của nó. Viết test không khó. Và với cách tiếp cận đúng, chúng ta có thể tự tin viết test như thần, kể cả khi mới bắt đầu.

Mục tiêu của bài viết dài hơi này là để các bạn có thể tự viết case test đầu tay của mình. Chúng ta sẽ tạo một ứng dụng nhỏ và viết test cover cho nó. Chúng ta sẽ thảo luận xem: Cái gì nên test và tại sao lại test nó. Chúng ta sẽ dùng các kĩ thuật khác nhau để giúp chúng ta viết test mà không cần phải viết rồi xem thử trên trình duyệt.

<!--truncate-->

Do đây là một bài viết khá dài, tôi sẽ đặt mục lục ở đầu để các bạn có thể thấy nội dung chung của tất cả.

1. <a href="#sơ-lược">Sơ lược</a>
2. <a href="#tạo-ứng-dụng-để-test">Tạo ứng dụng để test</a>
3. <a href="#what-should-we-test">Chúng ta nên test gì?</a>
4. <a href="#writing-the-test">Viết test</a>
5. <a href="#dont-take-a-stab-in-the-dark">Đừng làm mò!</a>
6. <a href="#how-to-access-dom-tree">Làm sao để truy cập DOM tree</a>
7. <a href="#interacting-with-dom-elements">Tương tác với các phần tử trong DOM</a>
8. <a href="#test-if-the-correct-page-was-rendered">Test xem trang muốn test có được render đúng chưa</a>
9. <a href="#testing-the-form">Test form</a>
10. <a href="#prevent-duplication">Tránh trùng lặp với setup function</a>
11. <a href="#changing-and-submitting-form">Thay đổi dữ liệu và submit form</a>
12. <a href="#access-element-without-aria-role">Truy cập phần tử không có ARIA role</a>
13. <a href="#waiting-for-data">Chờ data bắn về</a>
14. <a href="#mock-api">Mock API</a>
15. <a href="#test-mock-functions">Test các hàm mock</a>

Trước khi vào cụ thể, chúng ta hãy có cái nhìn tổng thể về việc test app React nói chung.

 
## Sơ lược

Khi làm việc với một ứng dụng lớn, phức tạp, việc động chạm đến các phần code có thể sẽ gây hậu quá khá khó lường nếu không cẩn thận. Thậm chí chỉ cần đổi dấu chấm dấu phẩy thôi cũng có thể khiến ứng dụng đổ vỡ. Để tránh và giảm thiểu điều này, các lập trình viên viết test.

Mục đích của việc viết test nói chung là để đảm bảo cho ứng dụng hoạt động đúng. Nếu các chức năng quan trọng đều đã được cover hết bằng test thì khi bạn lỡ làm đổ bể gì đó, hệ thống sẽ báo lại. Và điều này khá quan trọng trong các ứng dụng lớn.

Về React nói riêng, khi nhắc đến test là không thể không nhắc đến <strong>jest</strong> và <strong>@testing-library/react</strong> (hay <em>Testing Library</em>). Có rất nhiều thư viện / framework test cho JS hiện nay. Ta chọn <strong>Jest</strong> là công cụ thay thế <strong>Mocha</strong>, <strong>Ava</strong>, <strong>Jasmine</strong>. Còn <em>Testing Library</em> là lựa chọn khác thay thế cho <em>Enzyme</em> của <em>airbnb</em> (đang được rất nhiều người sử dụng).

<em>Testing Library</em> tiếp cận việc test dưới góc độ của người dùng. Do đó nó sẽ dẫn bạn đến việc viết integration test, là lúc mà nhiều component được test đồng thời cùng nhau.

Cụ thể, hãy tưởng tượng trên trang web có một cái nút. Với Testing Library bạn sẽ không viết test kiểu "test xem prop onClick được truyền vào có được gọi ra không khi nút được click", mà ta test trường hợp "việc click vào cái nút đó có làm thay đổi hay kích hoạt điều gì không (như mở một cái modal chẳng hạn)".

 
## Tạo ứng dụng để test

<img class="center" src="https://i.ibb.co/k3cNwmk/react-testing-intro-2.gif" alt="reddit" />

Đây là một ứng dụng đơn giản, cho phép tìm các bài viết top trên một subreddit (/r/), nó chỉ bao gồm ô nhập text, một cái header và vài cái link. Nhưng ứng dụng này sẽ là khởi điểm tốt cho việc viết test.

Link ở phần header của trang đơn giản là điều hướng đến trang khác, vốn cũng là trang dạng trống, không có gì.

Trên trang chính sẽ có 1 form, form này chỉ có một field để điền tên của subreddit.

Sau khi điền tên, app sẽ call API để lấy số lượng top post trên subreddit đã điền.

Repo code đầy đủ nằm ở <a href="https://git.acaziasoft.com/acazia/beginners-guide-to-testing-react">đây</a>. Các bạn có thể clone về để xem cùng bài hướng dẫn này.

 
 
<h2 id="what-should-we-test">Chúng ta nên test gì?</h2>

Câu hỏi đầu tiên đặt ra là: Cái gì phải test ở đây? Thử lấy cái form làm ví dụ, code sẽ có dạng như này:

```jsx
function Form({ onSearch }) {
  const [subreddit, setSubreddit] = useState('javascript');

  const onSubmit = (event) => {
    event.preventDefault();
    onSearch(subreddit);
  };

  return (
    <FormContainer onSubmit={onSubmit}>
      <Label>
        r /
        <Input
          type="text"
          name="subreddit"
          value={subreddit}
          onChange={(event) => setSubreddit(event.target.value)}
        />
      </Label>

      <Button type="submit">
        Search
      </Button>
    </FormContainer>
  );
}
```

Form trên sẽ lưu giá trị của nó trong một biến state hook. Khi click nút thì prop <code>onSearch</code> truyền vào từ component cha sẽ được gọi ra.

Có thể bạn sẽ muốn biết data được lấy ra sao. Vậy soi trong component cha, nó như này:

```jsx
function Home() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('idle')

  const onSearch = async (subreddit) => {
    setStatus('loading');
    const url = `https://www.reddit.com/r/${subreddit}/top.json`;
    const response = await fetch(url);
    const { data } = await response.json();
    setPosts(data.children);
    setStatus('resolved');
  };

  return (
    <Container>
      <Section>
        <Headline>
          Find the best time for a subreddit
        </Headline>

        <Form onSearch={onSearch} />
      </Section>

      {
        status === 'loading' && (
          <Status>
            Is loading
          </Status>
        )
      }
      {
        status === 'resolved' && (
          <TopPosts>
            Number of top posts: {posts.length}
          </TopPosts>
        )
      }
    </Container>
  );
}
```

Component Home cha sẽ lưu response từ API trong một biến state và quản lý loading state của nó luôn. Khi search được kích hoạt trong form, API reddit sẽ được gọi ra. Khi data về thì cả 2 biến state được update và kết quả được đưa lên màn hình.

Giờ thì bạn đã có cái nhìn tổng quan về code nói chung, nhưng hãy thử tự hỏi: Làm sao chúng ta test được 2 component trên?

<hr />

Có thể trong đầu chúng ta lúc này đang loé lên ý tưởng: Viết unit test ngay và luôn. Test xem state đã được set đúng chưa, hoặc nếu onSearch prop được gọi ra thì giá trị nó được truyền vào (tên subreddit) đã đúng chưa. Đây là cách mà nhiều lập trình viên đã và đang làm khi dùng Enzyme.

Tuy nhiên với **Testing Library**, chúng ta không thể truy cập vào state. Chúng ta vẫn test được prop, nhưng không thể test được việc state đang nắm giá trị đúng hay không.

Lúc này chúng ta tạm thời đứng dậy, pha tách cafe, và quay lại...

*Xong chưa?*

OK, bạn đã từng đọc Doraemon chưa? Hẳn là rồi. Và bạn có để ý rằng: Trong hầu hết các câu chuyện, tác giả không giải thích về cấu tạo, thành phần của các bảo bối, mà tập trung vào việc "các bảo bối của Doraemon được sử dụng như thế nào, có tác dụng gì". Nobita không cần biết bảo bối đó cấu thành ra sao, chỉ cần biết mang đi mà vọc phá.

Đó chính là một ví dụ của "Implementation Detail". React và bảo bối của Doraemon chính là một "Implementation Detail". Trong trường hợp app ví dụ hiện tại, chúng ta hoàn toàn có thể chuyển cả app sang **VueJS** mà người dùng không hề biết (và cũng chẳng cần quan tâm). Và quay lại về testing, lúc này vấn đề không còn nằm ở kĩ thuật nữa, mà là tư tưởng.

Thay vì tập trung vào code và cách nó hoạt động, chúng ta thử đứng từ vị trí của người dùng. Điều này sẽ buộc chúng ta phải test vào những phần quan trọng của ứng dụng.

Khi bạn đã hiểu được "tư tưởng" của <em>Testing Library</em>, việc test không còn bí ấn hay đáng sợ nữa.
<blockquote>Ghi chú: Một người dùng ở đây có thể là người dùng cuối, hoặc cũng có thể là một developer khác đang dùng component mà bạn đã viết. Ví dụ như khi bạn viết một component hiện ảnh dạng gallery cho một dev cùng team. Cái ta cần test là gallery đã viết ra hoạt động đúng khi prop hay đổi chẳng hạn.</blockquote>

OK, ừ thì từ phía người dùng. Tạm thời chúng ta hãy quên đi các kiến thức về component mà thử ngó sang từ vị trí người dùng xem sao. Và từ phía người dùng, cái gì là quan trọng?

<blockquote>
1. Người dùng nhập liệu vào ô và ấn Submit.
2. App cho hiện lên loading trong khi chờ data.
3. Khi data về thì đưa lên hiển thị.
</blockquote>

Dễ thấy: Người dùng không cần quan tâm Form có lưu dữ liệu không, cũng chẳng quan tâm dữ liệu được lưu vào biến không hay cấu trúc dữ liệu ra sao. Chỉ có 3 cái quan trọng, chính là 3 con số ở trên.

Và tất nhiên là chúng ta cần test cả phần header. Vì header có chứa link, mà link hỏng thì thành thảm hoạ.

 
 
<h2 id="writing-the-test">Viết test</h2>

Giờ chúng ta sẽ duyệt lại phần trước và nhìn nhận vấn đề từ phía kĩ thuật xem sao:

Ta sẽ viết 2 phần test: Một cho link ở header và một cho phần form. Với header, chúng ta cần test xem link có trỏ đến đúng đích không. Với form, ta sẽ test việc thay đổi dữ liệu và submit form, trạng thái loading, và dữ liệu đổ về.

Nào, bắt đầu với phần header trước. Đầu tiên ta mở file <code>src/App.test.js</code> và bỏ phần code test cũ đi. Sau đó ta viết định nghĩa cho phần test bằng hàm <code>describe(...)</code> của Jest.


<blockquote>Ghi chú: Việc đóng code test vào <code>describe</code> không bắt buộc, nhưng nhờ nó chúng ta sẽ có thể nhóm các phần test lại khi chạy, và gộp lại cho dễ nhìn trong editor.</blockquote>

```jsx
describe('Header', () => {

});
```

Test case được khai báo bằng từ <code>test(...)</code> hoặc <code>it(...)</code>. Cả 2 cái này đều có trong Jest.

```jsx
describe('Header', () => {
  test('"How it works" link points to the correct page', () => {

  });
});
```

Chúng ta sẽ không test cái component Header riêng lẻ mà sẽ đưa nó vào ngữ cảnh của ứng dụng. Do đó chúng ta sẽ dùng component App trong phần test.

Đại khái là cái <code>App.tsx</code> trông như này:

```jsx
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import Header from './components/Header';
import Home from './pages/Home';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />

      <main>
        <Switch>
          <Route path="/how-it-works">
            <h1>How it works</h1>
          </Route>
          <Route path="/about">
            <h1>About</h1>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </main>
    </>
  );
}
```

App component trên dùng React Router như một ứng dụng đưa vào production, nó sẽ render header và một số route khác nhau, một trong số đó sẽ là home page.

Để ý thấy là không có Router ở đây. Vì mục đích test, ta sẽ render nó ra ngoài App trong file <code>index.js</code> mà ta sẽ <a href="https://reactrouter.com/web/guides/testing" target="_blank" rel="noopener noreferrer">bọc cái app trong một MemoryRouter</a>.

Do đó trong bước đầu tiên, ta sẽ render App component. <em>Testing Library</em> có cung cấp sẵn cho ta một hàm <code>render</code> để tạo ra DOM cho một component đã cho trước.

```jsx
import { render } from '@testing-library/react';
import App from './App';

describe('Header', () => {
  test('"How it works" link points to the correct page', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });
});
```

Vì app của chúng ta tạo từ <code>create-react-app</code>, mọi thứ cần và đủ cho <em>Testing Library</em> cũng đã đều được cài và thiết lập ổn từ đầu.

 
<h2 id="dont-take-a-stab-in-the-dark">Đừng làm mò!</h2>

Có thể ngay lúc này bạn đang thử tự mò mò viết một vài test khác, nhưng bạn có cảm thấy mình đang mất phương hướng? Bạn không biết điều gì đang xảy ra. Trước đây đang làm việc bình thường trên trình duyệt với Chrome Dev Tools ngon lành và đã quen rồi.

Giờ thì sao? Bạn phải làm việc trong một môi trường mới. Bạn cần một cách gì đó, một cái gì đó để giúp bạn hiểu xem chuyện gì đang xảy ra. Bạn cần làm gì khi test fail vì không tìm thấy element nào đó trong DOM?

Đây chính là lúc chúng ta cần đến <code>debug</code>. Nó sẽ giúp chúng ta in ra DOM tree ở mọi lúc mà ta muốn. Đương nhiên là nhìn không đẹp và tiện như Dev Tools nhưng nó đã giúp cho ta thấy điều gì xảy ra bên trong những dòng test.

Do mới bắt đầu tập viết test, đừng nên dựa vào kiểu viết "sai thì sửa". Hãy cố gắng dành chút thời gian đặt debug cho từng bước test.

Nói đi nói lại là cuối cùng chúng ta nên dùng hàm <code>debug</code>:

```jsx
import { render, screen } from '@testing-library/react';

describe('Header', () => {
  test('"How it works" link points to the correct page', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    screen.debug();
  });
});
```

Chạy test bằng lệnh npm run test hoặc yarn test, chúng ta sẽ thấy:

![debug](https://i.ibb.co/sKbCt1y/image.png)

OK, dễ thấy là header đang chứa vài link trong đó, bao gồm cả phần "How it works". Giờ chung ta sẽ tìm hiểu cách để <em>truy nhập</em> và <em>tương tác</em> với nó.

 
 
<h2 id="how-to-access-dom-tree">Làm sao để truy cập DOM tree</h2>

Cách ngon nhất vẫn là thông qua object screen, đi kèm với Testing Library. Object này có chứa những phương thức để truy vấn vào DOM.

- <strong>getBy*</strong> như <code>getByTestId</code>, <code>getByText</code>, hay <code>getByRole</code>. Những hàm này đều là các hàm đồng bộ (synchronous) và dùng để kiểm tra xem element đang có trong DOM hay không, nếu không thì bắn ra lỗi.

- <strong>findBy*</strong> như <code>findByText</code>: Các hàm này là các hàm bất đồng bộ. Chúng sẽ đợi một khoảng thời gian (mặc định là 5s) cho đến khi element xuất hiện trong DOM, nếu không thì bắn ra lỗi.

- <strong>queryBy</strong>: Cũng giống getBy nhưng khi không tìm thấy thì không bắn ra lỗi, mà chỉ trả về null.

Như có thể thấy, ta đã có ngay cơ số lựa chọn, mà trên đây mới <a href="https://testing-library.com/docs/dom-testing-library/api-queries">chỉ là một số nhỏ trong danh sách đầy đủ</a> mà thôi. Câu hỏi là: Ta nên dùng cái nào?

Thoạt nhìn thì có vẻ <code>getByTestId</code> là chuẩn bài. Chúng ta chỉ cần thêm test id vào element như sau:

```jsx
<div data-testid="some-content">
  Some content
</div>
```

Bây giờ chúng ta có thể truy cập vào cái div kia bằng hàm <code>getByTestId('some-content')</code>. Rất đơn giản, phải không?

Nhưng rõ ràng là ta đang phải sửa code chỉ để pass test, không tốt, không tốt. Liệu có cách nào tốt hơn?

<em>Testing Library</em> có hệ thống tài liệu khá ngon và đáng đọc. Và trong đó có phần tài liệu mô tả <a href="https://testing-library.com/docs/guide-which-query" target="_blank" rel="noopener noreferrer">truy vấn nào nên sử dụng trong trường hợp nào</a>.

Các query ngon nhất mà mọi người đều dùng được sẽ có ưu tiên cao hơn. Trong số đó <code>getByRole</code> sẽ là lựa chọn của chúng ta. <code>getByAltText</code> và <code>getByTitle</code> sẽ dược dùng trong một số trường hợp đặc biệt hoặc ngoại lệ, và <code>getByTestId</code> được xếp cuối. Chúng ta sẽ chỉ test theo ID khi không còn lựa chọn nào khác.

Nào, vậy ta sẽ thử `getByRole`. Tham số đầu tiên sẽ là role aria của element. Ở đây thì nó là <code>link</code>. Do có nhiều hơn một link trên page, ta sẽ phải chỉ định tên của element bằng tuỳ chọn `name`.

```jsx
render(
  <MemoryRouter>
    <App />
  </MemoryRouter>
);

const link = screen.getByRole('link', { name: /how it works/i })
```

Ở đây chúng ta dùng dạng biểu thức chính quy (regular expression): <code>/how it works/</code> thay vì viết dạng string kiểu <code>'How it works'</code>. Cách này sẽ giúp ta tránh được vấn đề về chữ hoa chữ thường (có thể bị gây ra sau khi áp CSS vào). Ngoài ra chúng ta cũng có thể lấy một phần string. <code>/how it/i</code> sẽ pass test, còn <code>'How it'</code> thì không.

Lưu lại và chạy thử, test sẽ pass, nghĩa là chúng ta có tìm thấy link.

Vì mới bắt đầu, tại sao ta không thử kiểm tra lại một lần nữa xem sao? Bạn còn nhớ function <code>debug</code> phía trên chứ? Nó có thể nhận thêm 1 tham số đầu vào, bằng cách này bạn có thể đưa một element đơn vào trong console để in ra:

<img src="https://i.ibb.co/17KvVTP/image.png" alt="" />

 
<h2 id="interacting-with-dom-elements">Tương tác với các phần tử trong DOM</h2>

Đến giờ phút này thì chúng ta đã biết cách truy cập vào DOM element, cụ thể là cái link "How it works" kia, nhưng chưa đủ. Có nhớ chúng ta cần test gì không?

Link khi click cần phải điều hướng đến đúng trang.

Để điều hướng trang được thì đầu tiên ta phải click. Với Testing Library ta có 2 lựa chọn:

- Dùng fireEvent.click có trong <code>@testing-library/react</code>
- Dùng function click có trong <code>@testing-library/user-event</code>

Lời khuyên là dùng cái thứ 2 vì có nhiều loại event hơn (ví dụ như double click, sát với thực tế).

Giờ chúng ta sẽ sửa code để cho nó "click" vào cái link:

```jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Header', () => {
  test('"How it works" link points to the correct page', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: /how it works/i });
    userEvent.click(link);
  });
});
```

 
<h2 id="test-if-the-correct-page-was-rendered">Test xem trang muốn test có được render đúng chưa</h2>

Một trong những cách để test là kiểm tra url. Cách này khả thi nhưng thực tế là người dùng đâu có quan tâm đến url, hoặc có những lúc url đúng nhưng lại trỏ đến trang 404.

Điều người dùng quan tâm là thấy được trang cần xem. Và trên trình duyệt thì nó trông như thế này:

<img src="https://i.ibb.co/Bw77Xg1/react-testing-intro-link.gif" alt="" />

Sau khi click vào link thì mong muốn là thấy một trang có chữ "How it works".

Nếu trên headline có Aria role, chúng ta có thể dùng lại <strong>getByRole</strong> một lần nữa để kiểm tra xem có đang ở trang mong muốn không. Theo tài liệu <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques#Roles" target="_blank" rel="noopener noreferrer">MDN</a> thì nó có: <code>heading</code>.

```jsx
userEvent.click(link);

screen.getByRole('heading', { name: /how it works/i });
```

Test đã pass. Chứng tỏ có headline mong muốn trong trang, và có nghĩa là chúng ta đang ở đúng trang mong muốn.

:::note

*Lưu ý*: Chúng ta không nên dùng `getBy*` để kiểm định (assert) element xem đã được render ra chưa. Thay vào đó ta dùng `expect(...).toBeInDocument()`:

:::


Dưới đây là code mô tả đầy đủ:

```jsx
test('"How it works" link points to the correct page', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const link = screen.getByRole('link', { name: /how it works/i });
  userEvent.click(link);

  expect(
    screen.getByRole('heading', { name: /how it works/i })
  ).toBeInTheDocument();
});
```

Như bạn có thể thấy: Mặc dù phần test ngắn nhưng chúng ta đã phải mất kha khá thời gian mới có thể hoàn thành. Đây chính là điều xảy ra với mọi lập trình viên khi bắt đầu viết test. Nhưng khi đã quen tay thì mọi thứ sẽ nhanh và dễ dàng hơn.

Trước khi tiếp tục test với form, điểm lại một chút. Hiện ta mới test với 1 link. Góc trên bên trái màn hình có một logo dẫn đến trang chủ và một link khác bên phải dẫn đến trang "About".

Các bạn có thể coi 2 cái link trên như bài tập để viết tiếp phần test. Gợi ý:

- Phần link bao quanh logo có thể được test bằng <code>getByRole('link', { name })</code>.

- Nếu bạn không biết nên dùng gì thì hãy lấy <code>screen.debug()</code> để kiểm tra đầu ra.

- Phần test cho "How it works" và "About" có thể được kết hợp bằng hàm <code>test.each</code>.

 
 
<h2 id="testing-the-form">Test form</h2>

Chúng ta đã test xong link trên header. Mọi thứ đang bắt đầu phức tạp hơn, và đối tượng tiếp theo là cái form nhập text. Nếu bạn đã quên thì trông nó như này:

<img src="https://i.ibb.co/nj4wWzz/react-testing-intro-form-1.gif" alt="" />

Như đã nói ở trên, chúng ta sẽ cần test các trường hợp:


<ul>1. Người dùng nhập liệu vào ô và ấn Submit.</ul>
<ul>2. App cho hiện lên loading trong khi chờ data.</ul>
<ul>3. Khi data về thì đưa lên hiển thị.</ul>


Và chúng ta có thể tiếp tục làm giống như cách mà ta đã làm với header:

```jsx
describe('Subreddit form', () => {
  test('loads posts that are rendered on the page', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });
});
```

<h2 id="prevent-duplication">Tránh trùng lặp với setup function</h2>

Bạn có thể thấy ngay là phần code trên có đoạn code render App giống cái mà ta đã viết. Cách thông thường để tránh lặp lại như vậy là tạo setup function:

```jsx
function setup() {
  return render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
}

...

describe('Subreddit form', () => {
  test('loads posts and renders them on the page', () => {
    setup();
  });
});
```

Giờ thì chúng ta chỉ cần gọi hàm setup ở đầu mỗi ca test là xong.

 
 
<h2 id="changing-and-submitting-form">Thay đổi dữ liệu và submit form</h2>

Bước đầu tiên trong 3 bước mô tả ở trên là "Người dùng nhập liệu vào ô và ấn Submit."

Trước khi truy cập vào <code>input</code>, chúng ta thử dùng <code>screen.debug()</code> để xem phần app được render ra sao.

<img src="https://i.ibb.co/rfsz8sC/3-debug-form.png" alt="" />

Dễ thấy là label cho ô input tên của subreddit bắt đầu với <code>r /</code>. Quay trở lại danh sách query, ta sẽ thấy <code>getByLabelText</code> là cách ổn nhất để tìm form input đó.

Để mô phỏng việc nhập liệu, ta sẽ mượn type function từ <code>@testing-library/user-event</code>

```jsx
setup();

const subredditInput = screen.getByLabelText('r /');
userEvent.type(subredditInput, 'reactjs');
```

Tiếp đến, chúng ta cần submit cái form. Trong cái log in ra từ screen.debug() các bạn có thể thấy là form có render ra một button. Và thế là lại có chỗ để dùng <strong>getByRole</strong>.

```jsx
const subredditInput = screen.getByLabelText('r /');
userEvent.type(subredditInput, 'reactjs');

const submitButton = screen.getByRole('button', { name: /search/i });
userEvent.click(submitButton);

screen.debug();
```

Ta sẽ đặt thêm một hàm debug nữa ở phía dưới để xem trạng thái hiện giờ của app. Và đầu ra là như này:

<img src="https://i.ibb.co/xCr3BVL/4-debug-loading.png" alt="" />

Ở phía dưới, ta có thể thấy chữ "Is loading". Đó chính là hành vi mà ta mong đợi sau khi click nút Submit.

<img src="https://i.ibb.co/nj4wWzz/react-testing-intro-form-1.gif" alt="" />

 
 
<h2 id="access-element-without-aria-role">Truy cập phần tử không có ARIA role</h2>

Bước thứ 2 là: App cho hiện lên loading trong khi chờ data.

Vì cái loading được bọc trong thẻ <code>div</code>, chúng ta không có Aria role để truy cập. Theo như tài liệu của <a href="https://testing-library.com/docs/guide-which-query" target="_blank" rel="noopener noreferrer">Testing Library</a> thì getByText sẽ là lựa chọn phù hợp hơn.

```jsx
userEvent.click(submitButton);

expect(screen.getByText(/is loading/i)).toBeInTheDocument();
```

Và phần test sẽ pass.

Giờ là lúc chúng ta duyệt phần cuối cùng: Khi data về thì đưa lên hiển thị.


 
 
<h2 id="waiting-for-data">Chờ data bắn về</h2>

Tính đến thời điểm này, khi click vào nút, chữ loading hiện ra. Có nghĩa là request API đã được gửi đi nhưng chưa được xử lý xong. Để test xem data đã được đưa lên đúng chưa, chúng ta sẽ phải đợi.

Và cũng đến thời điểm này, chúng ta mới đùng đến các query <strong>getBy*</strong> và chúng đều là các hàm đồng bộ. Các hàm đó đều tham chiếu vào trạng thái hiện có của ứng dụng. Nếu element mong muốn không tồn tại, tất nhiên là sẽ fail.

Bây giờ là lúc chúng ta cần đến loại query thứ hai: <strong>findBy*</strong>, nó sẽ đợi 5 giây cho đến khi element xuất hiện.

Và trước khi tiếp tục, ta cần tìm một cách nào đó để định danh cho element. Như đã biết, app sẽ hiển thị số lượng top post ở dưới ô nhập text khi request thành công. Dòng chữ hiện lên sẽ là: "Number of top posts: ...", nên ta sẽ dùng <code>findByText</code>.

Vì không biết con số được render ra sẽ là bao nhiêu, nên việc dùng regular expression có vẻ ngon hơn. Vì regular expression cho phép ta tìm element với một phần string nào đó.

```jsx
test('loads posts and renders them on the page', async () => {
  setup();

  const subredditInput = screen.getByLabelText('r /');
  userEvent.type(subredditInput, 'reactjs');

  const submitButton = screen.getByRole('button', { name: /search/i });
  userEvent.click(submitButton);

  const loadingMessage = screen.getByText(/is loading/i);
  expect(loadingMessage).toBeInTheDocument();

  const numberOfTopPosts = await screen.findByText(/number of top posts:/i);
  screen.debug(numberOfTopPosts);
});
```

Vì hàm <strong>findByText</strong> là hàm bất đồng bộ, ta sẽ phải dùng đến <em>await</em>. Do đó, ta cần thêm <em>async</em> ở đầu function.

Đầu ra sẽ như sau:

<img src="https://i.ibb.co/fNGMVmg/5-debug-number-of-top-posts.png" alt="" />

Ngon! Data trả về đã được render ra. Chúng ta đã xong hết 3 bước phía trên:

1. Người dùng nhập liệu vào ô và ấn Submit.
2. App cho hiện lên loading trong khi chờ data.
3. Khi data về thì đưa lên hiển thị.

Vậy là xong đúng không? Chưa, còn một thứ nữa...

 
 
<h2 id="mock-api">Mock API</h2>

Lúc này có thể bạn đã nhận ra việc test cái form kia tốn kha khá thời gian, mất khoảng gần 1s, có thể lâu hơn nếu server chậm. Vì chúng ta đang gửi request thật đến reddit api.

Và như thế là không ổn. Nhất là khi chạy test, chúng ta không nên gửi request thật đến server, vì những lý do sau:

- Mỗi API request sẽ tiêu tốn khá nhiều thời gian. Integration test thường được chạy trên máy thật trước khi push code lên repo git. Mỗi ca test như vậy thường được chạy qua pipeline của CI CD (một hệ thống theo dõi và deploy phần mềm tự động). Khi có nhiều test được chạy thì đồng nghĩa với việc có nhiều request được gửi đi, và điều đó ảnh hưởng đến trải nghiệm và năng suất của các lập trình viên.

- Chúng ta không thể điều khiển được các API request. Trong mỗi lần chạy integration test, ta cần test nhiều trạng thái của ứng dụng. Ví dụ như khi server API gặp trục trặc, mà rõ ràng là ta không thể cứ thế cầm server tắt đi chỉ để test. May mắn thay là chúng ta có thể giả lập trường hợp đó bằng các mock request.

- Test có thể fail dù code của chúng ta không có vấn đề, mà là do server sập. Ngon nhất là chạy automated test để xác định các trường hợp này, nhưng chạy end-to-end test khi đó thì vẫn hơn.

OK vậy thì ta cần làm mock API, nhưng làm cách nào?

Đầu tiên ta phải biết request được gửi đi như thế nào. Hãy xem lại component <code>Home</code>:

```jsx
function Home() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('idle')

  const onSearch = async (subreddit) => {
    setStatus('loading');
    const url = `https://www.reddit.com/r/${subreddit}/top.json`;
    const response = await fetch(url);
    const { data } = await response.json();
    setPosts(data.children);
    setStatus('resolved');
  };
  
  ...
```

Để mock request, ta sẽ dùng package <code>jest-fetch-mock</code>.

```bash
yarn add jest-fetch-mock --dev
```


Giờ thì chúng ta cần khai báo <code>jest-fetch-mock</code> ở đầu của file test.

[pastacode lang="javascript" manual="import%20fetchMock%20from%20'jest-fetch-mock'%3B%0A%0AfetchMock.enableMocks()%3B%0A" message="" highlight="" provider="manual"/]

Nếu chạy thử lúc này thì test sẽ fail. Vì chúng ta chưa chỉ cho mock fetch cách để phản hồi lại request.

Để tạo mock response, ta dùng đến Chrome dev tools để kiểm tra, submit thử form và copy cái response đó:

<img src="https://i.ibb.co/php4VBQ/6-copy-response.png" alt="" />

Tiếp đến, chúng ta cho cái response đó vào một file, ví dụ <code>src/__mocks__/subreddit-reactjs-response.json</code>.

Và nhờ thư viện <code>jest-fetch-mock</code>, chúng ta chỉ cần gọi <code>fetch.once</code> để định nghĩa mock response.

```jsx
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();
```


Giờ thì test pass chặt. Vì ta đang sử dụng mock response mà ta có thể điều khiển được. Do ta có thể chắc rằng số lượng bài post trả về là 25 nên ta có thể chỉnh sửa assert một chút như sau:

```jsx
import mockResponse from './__mocks__/subreddit-reactjs-response.json';

...

test('loads posts and renders them on the page', async () => {
  fetch.once(JSON.stringify(mockResponse));
  setup();
  ...
```

:::important

Khi ứng dụng cần gửi nhiều API request, cách mock kiểu này sẽ gây ra phiền toái kha khá. Lúc đó bạn nên xem xét việc sử dụng package [này](https://github.com/mswjs/msw). Thông tin thêm các bạn có thể tìm ở [đây](https://kentcdodds.com/blog/stop-mocking-fetch).

:::


<h2 id="test-mock-functions">Test các hàm mock</h2>

Đây mới là bước cuối cùng, chúng ta sẽ cần test xem endpoint API đã được gọi chuẩn chưa. Bằng cách này ta có thể chắc rằng user đang thấy được data đúng.

Do đang sử dụng <code>jest-mock-fetch</code>, hàm fetch đã được thay bằng function mock. Nhờ đó mà ta có thể dùng <code>toHaveBeenCalledWith</code> để kiểm tra URL đúng đã được gọi ra hay chưa.

```jsx
expect(fetch).toHaveBeenCalledWith('https://www.reddit.com/r/reactjs/top.json');
```


<blockquote>Ghi chú: Trong thời gian làm việc với testing, có thể bạn sẽ cần mock các hàm với nhiều công dụng khác nhau. Với jest bạn có thể sử dụng luôn <code>jest.fn()</code>, bản thân <code>jest-mock-fetch</code> cũng dùng nó đấy!</blockquote>

Xong! Phần test đầy đủ cho cái form sẽ như sau:

```jsx
describe('Subreddit form', () => {
  test('loads posts and renders them on the page', async () => {
    fetch.once(JSON.stringify(mockResponse));
    setup();

    const subredditInput = screen.getByLabelText('r /');
    userEvent.type(subredditInput, 'reactjs');

    const submitButton = screen.getByRole('button', { name: /search/i });
    userEvent.click(submitButton);

    expect(screen.getByText(/is loading/i)).toBeInTheDocument();

    expect(await screen.findByText(/Number of top posts: 25/i)).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith('https://www.reddit.com/r/reactjs/top.json');
  });
});
```

<h2>Tổng kết lại</h2>

Nếu đã làm đầy đủ đến đây thì xin chúc mừng. Rất mong là bạn đã cảm thấy tự tin viết test sau khi đọc và làm theo bài viết này 🎉.

Các vấn đề chính đã đề cập là:

- Test từ khía cạnh người dùng.
- Dùng `screen.debug()` khi không rõ chuyện gì đang xảy ra.
- Dùng `getByRole`, `findByRole` để truy cập DOM.
