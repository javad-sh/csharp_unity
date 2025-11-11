---
title: System.IO
sidebar_position: 4
---

# System.IO

فضای نام (Namespace) System.IO در #C برای کار با فایل‌ها، دایرکتوری‌ها، استریم‌ها (جریان داده)، خواندن/نوشتن داده‌ها، و دسترسی به سیستم فایل طراحی شده است.

 جدول: کلاس‌ها و اینترفیس‌های کلیدی در System.IO

| نوع                      | نام                | توضیح                                   | نمونه استفاده                                  |
| ------------------------ | ------------------ | --------------------------------------- | ---------------------------------------------- |
| **کلاس**                 | `File`             | کلاس استاتیک برای کار مستقیم با فایل‌ها | `File.WriteAllText("file.txt", "Hello");`      |
| **کلاس**                 | `FileInfo`         | نسخه شی‌ء‌گرا برای فایل‌ها              | `new FileInfo("file.txt").Delete();`           |
| **کلاس**                 | `Directory`        | کلاس استاتیک برای پوشه‌ها               | `Directory.CreateDirectory("Folder");`         |
| **کلاس**                 | `DirectoryInfo`    | نسخه شی‌ء‌گرا برای پوشه‌ها              | `new DirectoryInfo("Folder").Delete(true);`    |
| **کلاس**                 | `Path`             | کلاس کمکی برای ترکیب و جدا کردن مسیرها  | `Path.Combine("folder", "file.txt")`           |
| **کلاس پایه (abstract)** | `Stream`           | پایه تمام استریم‌های ورودی/خروجی        | -                                              |
| **کلاس**                 | `FileStream`       | برای خواندن/نوشتن فایل به صورت باینری   | `new FileStream("file.dat", FileMode.Create)`  |
| **کلاس**                 | `StreamReader`     | خواندن فایل متنی                        | `new StreamReader("file.txt").ReadToEnd();`    |
| **کلاس**                 | `StreamWriter`     | نوشتن فایل متنی                         | `new StreamWriter("file.txt").Write("Hello");` |
| **کلاس**                 | `BinaryReader`     | خواندن داده‌های باینری با نوع مشخص      | `reader.ReadInt32();`                          |
| **کلاس**                 | `BinaryWriter`     | نوشتن داده‌های باینری با نوع مشخص       | `writer.Write(123);`                           |
| **کلاس**                 | `MemoryStream`     | استریم حافظه، بدون نیاز به فایل فیزیکی  | `new MemoryStream()`                           |
| **کلاس**                 | `BufferedStream`   | افزایش کارایی خواندن/نوشتن با بافر      | `new BufferedStream(fileStream)`               |
| **اینترفیس**             | `IDisposable`      | برای آزادسازی منابع (مثل فایل)          | استفاده با `using`                             |
| **اینترفیس**             | `IAsyncDisposable` | آزادسازی منابع به‌صورت async            | استفاده با `await using`                       |
