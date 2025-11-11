---
title: ترتیب نوشتن پیشوندها
sidebar_position: 3
---

# ترتیب نوشتن پیشوندها

ترتیب پیشنهادی مایکروسافت (و مورد پشتیبانی کامپایلر):

```
[سطح دسترسی] [کلمات کلیدی دیگر] نوع نام

```

مثلا :

```
public static readonly int MaxValue = 100;

```

ترتیب معمول پیشوندها (قابل حفظ کردن):
| ترتیب | پیشوند | توضیح |
| ----- | --------------------------------------------------------- | ----------------------------------------- |
| ۱ | `public` / `private` / `protected` / `internal` | **سطح دسترسی** |
| ۲ | `static` | **وابسته به کلاس** نه شیء |
| ۳ | `readonly` / `const` | **ثابت بودن مقدار** |
| ۴ | `virtual` / `override` / `abstract` / `sealed` / `extern` | **رفتار ارث‌بری یا پیاده‌سازی خاص** |
| ۵ | `unsafe` | برای کد unsafe مثل pointer ها |
| ۶ | `async` | برای متدهای ناهمگام |
| ۷ | `partial` | وقتی کلاس یا متد در چند فایل تعریف می‌شود |

## مثال‌های مرتب‌شده

فیلد معمولی

```
private static readonly float Gravity = 9.81f;

```

متد قابل override

```
public virtual void Attack() { }

```

متد override شده

```
protected override void Attack() { }

```

متد async

```
public async Task LoadDataAsync() { }

```

کلاس partial

```
public partial class PlayerManager { }

```

## نکات :

-   ترتیب اشتباه باعث خطا نمی‌شود، ولی برای خوانایی کد و استاندارد نویسی بهتر است رعایت شود.

-   کامپایلر ممکن است در مواردی مثل static public هم خطا ندهد ولی این ترتیب توصیه نمی‌شود.

-   در ابزارهایی مثل Rider, Visual Studio، این ترتیب به صورت خودکار رعایت یا هشدار داده می‌شود.
