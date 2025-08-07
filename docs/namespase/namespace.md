---
title: namespace
sidebar_position: 1
---

# namespace


**namespace در سی شارپ چیه ؟**

در زبان سی‌شارپ (C#)، واژه‌ی namespace برای سازمان‌دهی کدها و جلوگیری از تداخل نام‌ها استفاده می‌شود.

namespace یعنی فضای نام. این فضا مجموعه‌ای از کلاس‌ها، اینترفیس‌ها، استراکچرها و سایر کدهای مربوط به هم را در یک گروه قرار می‌دهد.

```
namespace MyGame
{
    class Player
    {
        public void Move()
        {
            Console.WriteLine("Player is moving.");
        }
    }
}

```

**کاربرد های namespace چیست ؟**

-   برای جلوگیری از تداخل اسامی (یعنی ممکنه ما بخوایم دو کلاس به نام یکسان داشته باشیم یا از پکیجی استفاده کنیم که مثلا کلاسی هم نام به کلاس ما داره)

-   ساختاردهی و گروه‌بندی کدها (Organization of Code)

```
namespace Game.Characters
{
    class Enemy { ... }
    class Hero { ... }
}

namespace Game.Weapons
{
    class Sword { ... }
    class Gun { ... }
}
```
در اینجا . وظیفه ی ساختن زیرپوشه را دارد و به تعداد دلخواه می توان با . زیرپوشه ساخت.

- با کمک namespace میشه کدهای پراستفاده رو در یک دسته بندی قرار داد و هربار ننویسم و به جاش using می گنیم اون namespace رو. (Reusable Code)

:::note
همه ی مواردی که using می شوند یک namespace هستند.
:::

:::note
می توانیم بدون وارد کردن تمام namespace از بخشی از آن که می خواهیم استفاده کنیم اما سخت تر و هربار باید نام namespace را بنویسیم.

```
system.Console.WriteLine("Player is moving.");
```
:::note
مثلا در اینجا Console نام کلاس است و WriteLine نام یک متد درون آن کلاس که وظیفه ی لاگ گرفتن دارد.
:::
:::


**معروف ترین namespace های کدامند ؟**

| Namespace                        | کاربرد اصلی                                                                              |
| -------------------------------- | ---------------------------------------------------------------------------------------- |
| **`System`**                     | پایه‌ای‌ترین فضای نام؛ شامل انواع پایه مثل `String`, `Int32`, `DateTime`, `Console` و... |
| **`System.Collections`**         | ساختارهای داده مثل `ArrayList`, `Hashtable`, `Queue`, `Stack`                            |
| **`System.Collections.Generic`** | نسخه Generic ساختارهای داده مثل `List<T>`, `Dictionary<TKey, TValue>`                    |
| **`System.IO`**                  | کار با فایل‌ها، فولدرها و جریان داده (خواندن/نوشتن فایل)                                 |
| **`System.Text`**                | کار با رشته‌ها، انکودینگ، `StringBuilder`                                                |
| **`System.Linq`**                | عملیات روی مجموعه‌ها مثل فیلتر، مرتب‌سازی، جستجو (`Where`, `Select`, ...)                |
| **`System.Threading`**           | مدیریت تردها (Threads) و پردازش‌های همزمان                                               |
| **`System.Net`**                 | کار با شبکه مثل ارسال درخواست HTTP، کلاینت TCP/UDP                                       |
| **`System.Data`**                | کار با دیتابیس‌ها، دیتاست‌ها، DataTable و ...                                            |
| **`Microsoft.AspNetCore`**       | مخصوص برنامه‌های تحت وب ASP.NET Core                                                     |
| **`System.Diagnostics`**         | مانیتورینگ و دیباگ کردن برنامه (مثل نوشتن در EventLog یا اجرا کردن برنامه‌ها)            |


**معروف ترین namespace های یونیتی کدامند ؟**

| Namespace                         | کاربرد اصلی                                                                                     |
| --------------------------------- | ----------------------------------------------------------------------------------------------- |
| **`UnityEngine`**                 | پایه‌ای‌ترین فضای نام یونیتی. شامل تمام کلاس‌های مربوط به گیم‌آبجکت‌ها، فیزیک، ورودی، صدا، و... |
| **`UnityEngine.UI`**              | کار با رابط کاربری مثل `Button`, `Text`, `Canvas`, `Image`                                      |
| **`UnityEngine.SceneManagement`** | بارگذاری و مدیریت صحنه‌ها (Scenes)                                                              |
| **`UnityEngine.InputSystem`**     | سیستم جدید ورودی یونیتی (ماوس، کیبورد، کنترلر و ...)                                            |
| **`UnityEditor`**                 | ابزارهایی که فقط در محیط ادیتور یونیتی اجرا می‌شن (در زمان اجرا روی دستگاه اجرا نمی‌شن)         |
| **`UnityEngine.Events`**          | تعریف و مدیریت رویدادها (Event System در یونیتی)                                                |
| **`UnityEngine.Animations`**      | مدیریت انیمیشن‌ها و Animator                                                                    |
