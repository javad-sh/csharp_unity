---
title: Vector
sidebar_position: 1
---

# Vector

کلاس‌های Vector2 و Vector3 در یونیتی نمایانگر بردارهای دو‌بعدی و سه‌بعدی هستند که برای موقعیت، جهت، حرکت، و بسیاری از عملیات ریاضی در فضای بازی استفاده می‌شن. این کلاس‌ها از پرکاربردترین‌ها در یونیتی هستند.

منظور از بردار بیشتر همان پوزیشن است.
منظور از طول بردار فاصله ی نقطه تا موقعیت 0 است.

برای فاصله بین دو بردار یا همان موقعیت :

```
Vector3 a = new Vector3(2, 1, 0);
Vector3 b = new Vector3(5, 5, 0);
Vector3 dir = b - a;

float length = dir.magnitude;

// یا

float distance = Vector3.Distance(a, b); // همون طول dir

```

این مقدار `transform.forward` یک بردار نرمالایز شده را بر میگرداند که جهت جلوی شی را نشان می دهد.
و این مقدار براساس transform لوکال آبجکت است. یعنی اگر آبجکت چرخانده شده باشد ممکن است این مقدار نیز عوض شود.

| ویژگی                | نوع       | چی رو نشون می‌ده؟          | تغییر می‌ده؟                            |
| -------------------- | --------- | -------------------------- | --------------------------------------- |
| `transform.position` | `Vector3` | موقعیت شیء در صحنه         | ✅ بله – می‌تونی بهش مقدار بدی          |
| `transform.forward`  | `Vector3` | جهت نگاه شیء (محور z محلی) | ❌ نه – فقط **می‌خونی** نه **می‌نویسی** |

مثلا در این مثال میگیم شی رو به جلوی خودش حرکت کنه

```
transform.position += transform.forward * speed * Time.deltaTime;
```

نرمالایز کردن یک بردار به این معنی است که یک بردار به ما میدهد که طول آن برابر با 1 است اما جهتش با جهت بردار قبلی یکی است.

## Vector2

### ساختار

```
Vector2 myVec = new Vector2(3f, 4f);

```

### ویژگی‌ها (Properties)

| ویژگی                         | توضیح                                    | مثال                             | خروجی      |
| ----------------------------- | ---------------------------------------- | -------------------------------- | ---------- |
| `x`, `y`                      | مؤلفه‌های بردار                          | `new Vector2(2, 5).x`            | 2          |
| `magnitude`                   | طول بردار (ریشه مجموع مربعات)            | `new Vector2(3, 4).magnitude`    | 5          |
| `sqrMagnitude`                | مجذور طول بردار (سریع‌تر از `magnitude`) | `new Vector2(3, 4).sqrMagnitude` | 25         |
| `normalized`                  | بردار نرمال‌شده (طول = 1)                | `new Vector2(3, 4).normalized`   | (0.6, 0.8) |
| `zero`                        | بردار (0, 0)                             | `Vector2.zero`                   | (0, 0)     |
| `one`                         | بردار (1, 1)                             | `Vector2.one`                    | (1, 1)     |
| `up`, `down`, `left`, `right` | جهت‌های اصلی                             | `Vector2.up`                     | (0, 1)     |

### متدهای پرکاربرد

| متد                            | توضیح                               | مثال                                                            | خروجی  |
| ------------------------------ | ----------------------------------- | --------------------------------------------------------------- | ------ |
| `Dot(a, b)`                    | ضرب داخلی بین دو بردار              | `Vector2.Dot(new Vector2(1, 0), new Vector2(0, 1))`             | 0      |
| `Angle(a, b)`                  | زاویه بین دو بردار                  | `Vector2.Angle(new Vector2(1, 0), new Vector2(0, 1))`           | 90     |
| `Distance(a, b)`               | فاصله بین دو نقطه                   | `Vector2.Distance(new Vector2(1, 2), new Vector2(4, 6))`        | ≈5     |
| `Lerp(a, b, t)`                | میان‌یابی خطی                       | `Vector2.Lerp(new Vector2(0, 0), new Vector2(10, 10), 0.5f)`    | (5, 5) |
| `MoveTowards(a, b, maxDist)`   | حرکت از A به B با حداکثر فاصله مشخص | `Vector2.MoveTowards(new Vector2(0, 0), new Vector2(10, 0), 3)` | (3, 0) |
| `ClampMagnitude(v, maxLength)` | محدود کردن طول بردار                | `Vector2.ClampMagnitude(new Vector2(10, 0), 2)`                 | (2, 0) |
| `Reflect(dir, normal)`         | بازتاب بردار                        | `Vector2.Reflect(new Vector2(1, -1), Vector2.up)`               | (1, 1) |

## Vector3

### ساختار

```
Vector3 myVec = new Vector3(3f, 4f, 5f);
```

### ویژگی ها

| ویژگی                                            | توضیح           | مثال                                | خروجی                    |
| ------------------------------------------------ | --------------- | ----------------------------------- | ------------------------ |
| `x`, `y`, `z`                                    | مؤلفه‌های بردار | `new Vector3(1, 2, 3).z`            | 3                        |
| `magnitude`                                      | طول بردار       | `new Vector3(1, 2, 2).magnitude`    | 3                        |
| `sqrMagnitude`                                   | مجذور طول بردار | `new Vector3(1, 2, 2).sqrMagnitude` | 9                        |
| `normalized`                                     | نرمال‌شده       | `new Vector3(1, 2, 2).normalized`   | (\~0.33, \~0.66, \~0.66) |
| `zero`                                           | بردار صفر       | `Vector3.zero`                      | (0, 0, 0)                |
| `one`                                            | بردار واحد      | `Vector3.one`                       | (1, 1, 1)                |
| `up`, `down`, `left`, `right`, `forward`, `back` | جهت‌ها          | `Vector3.forward`                   | (0, 0, 1)                |

### متدهای پرکاربرد

| متد                            | توضیح                                       | مثال                                                        | خروجی     |
| ------------------------------ | ------------------------------------------- | ----------------------------------------------------------- | --------- |
| `Dot(a, b)`                    | ضرب داخلی                                   | `Vector3.Dot(new Vector3(1, 0, 0), new Vector3(0, 1, 0))`   | 0         |
| `Cross(a, b)`                  | ضرب خارجی (برای یافتن جهت عمود بر دو بردار) | `Vector3.Cross(Vector3.forward, Vector3.right)`             | (0, 1, 0) |
| `Angle(a, b)`                  | زاویه بین دو بردار                          | `Vector3.Angle(Vector3.up, Vector3.right)`                  | 90        |
| `Distance(a, b)`               | فاصله بین دو نقطه                           | `Vector3.Distance(Vector3.zero, new Vector3(3, 4, 0))`      | 5         |
| `Lerp(a, b, t)`                | میان‌یابی خطی                               | `Vector3.Lerp(Vector3.zero, new Vector3(10, 10, 10), 0.5f)` | (5, 5, 5) |
| `Slerp(a, b, t)`               | میان‌یابی کروی (برای چرخش‌ها)               | کاربرد در Quaternion                                        |           |
| `MoveTowards(a, b, maxDist)`   | حرکت محدود                                  | `Vector3.MoveTowards(Vector3.zero, Vector3.one * 10, 3)`    | (3, 3, 3) |
| `ClampMagnitude(v, maxLength)` | محدود کردن طول بردار                        | `Vector3.ClampMagnitude(new Vector3(10, 0, 0), 2)`          | (2, 0, 0) |
| `Project(a, b)`                | تصویر بردار a روی b                         | `Vector3.Project(new Vector3(1, 2, 3), Vector3.up)`         | (0, 2, 0) |
| `Reflect(dir, normal)`         | بازتاب                                      | `Vector3.Reflect(new Vector3(1, -1, 0), Vector3.up)`        | (1, 1, 0) |
