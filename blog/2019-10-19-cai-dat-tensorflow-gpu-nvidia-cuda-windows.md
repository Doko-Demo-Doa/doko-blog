---
slug: cai-dat-tensorflow-gpu-nvidia-cuda-windows
title: Cài đặt Tensorflow-GPU với Conda và NVIDIA CUDA Toolkit trên Windows
author: Doko
author_title: Administrator
author_url: https://github.com/Doko-Demo-Doa
author_image_url: https://i.imgur.com/UhtGS.png
hide_table_of_contents: false
tags: [vietnamese, programming, nvidia, cuda, tensorflow]
---


PIP là công cụ quản lý gói (package manager) cho Python, và thường thì để cài đặt Tensorflow chúng ta thường sử dụng ngay lệnh:

```bash
pip install tensorflow
```

Tuy nhiên còn có một cách khác tốt hơn và cung cấp hiệu năng cao hơn là sử dụng Conda/Anaconda để cài đặt. Conda cũng là một package manager, dùng để cài đặt các gói phần mềm cần thiết cho việc nghiên cứu AI, data,... và tất nhiên là có cả Python. Có 2 lý do để sử dụng Conda cho việc cài đặt Tensorflow:

## Hiệu năng CPU cao hơn

![tensor](https://i.ibb.co/pyMRkKW/Tensor-Flow-Training.png)

<center>(Hình ảnh tư liệu được lấy từ <a href="https://www.anaconda.com/tensorflow-in-anaconda/">link</a>)</center>

Sở dĩ có được hiệu năng như vậy là do Conda đã sử dụng **Intel Math Kernel Library for Deep Neural Networks (MKL-DNN)** từ phiên bản 1.9.0. Điều này có ý nghĩa rất lớn với những người dùng CPU để train.

Thêm vào đó, nếu sử dụng Anaconda, package hỗ trợ CUDA và CuDNN cũng sẽ được cài đặt tự động, không như khi ta cài bằng PIP.

## Cài đặt

Có 2 cách cài đặt Conda là [Miniconda](https://conda.io/miniconda.html) và [Anaconda](https://www.anaconda.com/download). Miniconda chỉ bao gồm Conda và các dependency của nó, còn Anaconda sẽ cài sẵn kha khá những package khác (tổng khoảng 400 MB). Sau khi cài đặt Conda, thử lệnh sau:

```bash
conda install tensorflow
```

hoặc nếu như cần hỗ trợ GPU thì:

```bash
conda install tensorflow-gpu
```

Các thông tin khác về Conda và Tensorflow các bạn có thể đọc thêm tại [đây](https://www.anaconda.com/blog/developer-blog/tensorflow-in-anaconda/). Tài liệu về tối ưu MKL cũng có thể tìm ở [đây](https://docs.anaconda.com/mkl-optimizations/).

Để có được bộ CUDA Toolkit, các bạn sẽ cần một tài khoản NVIDIA miễn phí. Đăng ký tại <a href="http://Cài đặt Tensorflow-GPU với Conda và NVIDIA CUDA Toolkit trên Windows">đây</a>.

Tùy đời card đồ họa mà ta sẽ có phiên bản tương thích tương ứng. Ví dụ với GTX 1080Ti thì combo sau sẽ là chuẩn nhất:

**CUDA Toolkit 10.0**: [Link](https://developer.nvidia.com/cuda-10.0-download-archive?target_os=Windows&target_arch=x86_64&target_version=10&target_type=exelocal) (Có thể sẽ phải click 2 lần).
**Download cuDNN v7.5.0 (Feb 21, 2019), for CUDA 10.0**: [Link](https://developer.nvidia.com/rdp/cudnn-archive)