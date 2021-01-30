---
title: Đổi git remote origin
author: Doko
author_title: Administrator
author_url: https://github.com/Doko-Demo-Doa
author_image_url: /img/avatar_doraemon.jpg
image: https://i.ibb.co/6Rr2X6R/git-commands.png
hide_table_of_contents: true
tags: [vietnamese, git, terminal]
---

![git](https://i.ibb.co/6Rr2X6R/git-commands.png)

Mặc định khi clone một project từ git (github, gitlab,…), trong thư mục của project sẽ có một thư mục con tên .git. Trong đó có một số file và thư mục có dạng:

<!--truncate-->

Cái ta quan tâm ở đây là file config. Nội dung của file có dạng:

```ini
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
	ignorecase = true
	precomposeunicode = true
[remote "origin"]
	url = https://github.com/organization_name/repo_name.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "develop"]
	remote = origin
	merge = refs/heads/develop
[user]
% 09email = quanpv@acaziasoft.com
	name = Quan Pham
```

Để ý rằng khi ta push code lên server, hầu hết chúng ta sẽ gõ lệnh:

```bash
git push origin develop
```

Và lúc đó code sẽ được đẩy lên git, và vào đúng repo https://github.com/organization_name/repo_name.git ở trên. Để chuyển sang server git khác, ví dụ `gitlab`. Ta cần làm một số bước:

### 1. Đăng kí tài khoản của trang Git đó

### 2. Tạo repo

Hầu hết các project đều đã có repo ánh xạ nên có thể bỏ qua bước này. Tạo một repository mới với cùng tên, và tốt nhất là cùng description.

### 3. Đổi URL của repo trong project git trên máy.

Sau khi tạo xong repo. Chúng ta sẽ có 2 link để clone: HTTPS và SSH:

Tuỳ project cũ sử dụng link HTTPS hay SSH, chúng ta sẽ thay vào dòng url tương ứng:

Ví dụ file config cũ là:

```graphql
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
	ignorecase = true
	precomposeunicode = true
[remote "origin"]
	url = https://github.com/organization_name/repo_name.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "develop"]
	remote = origin
	merge = refs/heads/develop
[user]
	email = quanpv@acaziasoft.com
	name = Quan Pham
```

Sẽ được đổi thành:

```graphql {9}
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
	ignorecase = true
	precomposeunicode = true
[remote "origin"]
	url = https://git.acaziasoft.com/organization_name/repo_name.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "develop"]
	remote = origin
	merge = refs/heads/develop
[user]
	email = quanpv@acaziasoft.com
	name = Quan Pham
```

Tiếp theo, để đồng bộ tên và email hiển thị trên server git mới, chúng ta nên sửa lại tên và email bằng lệnh git config, ví dụ như sau (nhớ thay tên và email tương ứng):

```bash
git config user.name "Dev Acazia"
git config user.email "testuser@acaziasoft.com"
```

Hoặc thao tác chỉnh sửa file config url ở trên có thể thay bằng 1 lệnh duy nhất:

```bash
git remote set-url origin https://git.acaziasoft.com/USERNAME/REPOSITORY.git
```

Lúc này ta đã có thể gõ git push origin develop như bình thường, và code sẽ được đẩy lên repository ở server mới.

### 4. Thêm URL của repo trong project git trên máy

Tuy nhiên, nếu như ta muốn giữ cả 2 link repo trong cùng một project thì sao? Đơn giản là ta chỉ cần thêm remote source cho nó. Có thể bỏ qua bước 3 ở trên và dùng lệnh sau để thêm repo git mới mà không đè lên git cũ:

```bash
git remote add upstream https://git.acaziasoft.com/acazia/test-repo.git
```

Lưu ý là với cách này, để push code lên server mới chúng ta cần gõ lệnh (chú ý chỗ upstream, vì nếu để là origin, code vẫn được push lên server git cũ):

```bash
git push upstream develop
```

Lúc này toàn bộ code sẽ được đưa lên repo mới.