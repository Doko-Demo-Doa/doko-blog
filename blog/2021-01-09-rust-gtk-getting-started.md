---
slug: rust-gtk-getting-started
title: Rust + GTK on Windows - Getting Started
author: Doko
author_title: Administrator
author_url: https://github.com/Doko-Demo-Doa
author_image_url: /img/avatar_doraemon.jpg
hide_table_of_contents: false
tags: [english, programming, rust, gtk]
---

![rust-gtk](https://i.ibb.co/1QrgS8q/rust-gtk.jpg)

Okay, if you are reading this, you may (probably) have been searching for something like "rust gtk getting started" on Google. Most of them points to another awesome guides such as [here](https://nora.codes/tutorial/speedy-desktop-apps-with-gtk-and-rust/).

Rust is an interesting language and I decided to get along with it (after years of working with JavaScript, Java and Dart). I decided to give it a try with desktop UI development, but bumped into toolchain obstacles.

<!--truncate-->

Why GTK, you ask? At the time of writing:

- Azul is still in alpha. And the output binary is too large (5MB for a simple HelloWorld app).
- Iced is in 0.1 (it's good still, I may create a new writeup for this later).
- gtk-rs is complete and stable already.

Trust me, I had a hellish time with stuff like Cmake, MSYS, MinGW,... on Windows. No, I don't hate them, but there was a time when the term "A software distribution and building platform on Windows" doesn't make sense to me. I just... don't get it at all.

But I know I have to, eventually. And there it is! I bumped into <a href="https://www.devdungeon.com/content/install-gcc-compiler-windows-msys2-cc" rel="noopener noreferrer" target="_blank">this article</a> via Google and I realized something I should a long time ago:

- **Msys** / **Msys2** / **MSVC**,... they are the name of "toolchains", a collection of software to get something (mostly app development) done. Microsoft provides Visual Studio and Visual Studio Build Tools (which we might know as MSVC), it's great. And yes, it's locked into Windows ecosystem. But if you're interested in cross-platform development (like me), then you will want <a href="https://www.msys2.org/" rel="noopener noreferrer" target="_blank">Msys2</a> and its fabulous GNU toolchain. It consists of 3 `subsystems`, from the `Introduction` section:

>The mingw subsystems provide native Windows programs and are the main focus of the project. These programs are built to co-operate well with other Windows programs, independently of the other subsystems. This part builds on the MinGW-w64 project.

>The <code>msys2</code> subsystem provides an emulated mostly-POSIX-compliant environment for building software, package management, and shell scripting. These programs live in a virtual single-root filesystem (the root is the MSYS2 installation directory). Some effort is made to have the programs work well with native Windows programs, but it's not seamless. This part builds on the Cygwin project.

>Each of the subsystems provides its own native (i.e. target=host) compiler toolchain, in <code>msys2-devel</code>, <code>mingw-w64-i686-toolchain</code>, and <code>mingw-w64-x86_64-toolchain</code>. There are also cross compiler toolchains with `host={i686,x86_64}-pc-msys` and `target={i686,x86_64}-w64-mingw32` in `mingw-w64-cross-toolchain`, but these are of limited use because there are no library packages for them.


### 1. Installing Rust

The best way is to follow official [instruction](https://www.rust-lang.org/tools/install). If you are on Windows (probably, because that's why you are reading this post), you'd better go with downloading `rust-init.exe` (64-bit version).

After installing, check your rust installation with:

```bash
rustc --version
```

To update Rust itself, use:

```bash
rustup update
```

### 2. Add the GNU toolchain

Yes, this is the most important part. Simply use this command:

```sh
rustup target add x86_64-pc-windows-gnu
```

Because gtk-rs doesn't support MSVC toolchain yet, you will bump into several problems if you forgot to add that target. Then use this command to show current targets:

```sh
rustup show
```

You will see something like this:

```bash
stable-x86_64-pc-windows-gnu
stable-x86_64-pc-windows-msvc (default)
```

To switch to GNU toolchain, use this:

```sh
rustup default stable-x86_64-pc-windows-gnu
```

### 3. Install MSYS2

First, grab the installer [here](https://www.msys2.org/)

Then set these environment variables. You can see it by right-clicking on __"This PC" > Properties > Advanced System Settings__

```powershell
SET GTK_LIB_DIR=C:\msys64\mingw64\lib
SET PATH=%PATH%;C:\msys64\mingw64\bin
SETX GTK_LIB_DIR %GTK_LIB_DIR%
SETX PATH %PATH%
```

Next, use following commands in `MSYS Shell` (**NOT** `Command Prompt` or `Windows PowerShell`):

```bash
pacman -S mingw-w64-x86_64-gtk3
pacman -S mingw-w64-x86_64-toolchain
```

By this way, **MSYS** will download necessary toolchain to compile GTK apps, then our project will be able to find it by looking up the environment variables.

If there are missing dependencies, you can easily install them by using **MSYS Shell** with `pacman`. This command can cover most of them (including `cmake`, `automake` and `sed`)

```bash
pacman -S base-devel gcc vim cmake
```

Now it's on, you should be able to get GTK app up and running. Please kepe in mind that gtk-rs is not supporting MSVC at the moment. Track the issue [here](https://github.com/rust-lang/pkg-config-rs/issues/59).
