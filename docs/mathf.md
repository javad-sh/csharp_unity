---
title: Mathf
sidebar_position: 15
---

# Mathf

در یونیتی، کلاس Mathf یک کلاس استاتیک (static) است که شامل مجموعه‌ای از توابع ریاضی پرکاربرد است، مخصوصاً برای بازی‌سازی. این کلاس در فضای‌نام UnityEngine قرار دارد و مخصوص کار با مقادیر float طراحی شده است.

کلاس ‎Mathf‎ تقریباً تمام نیازهای محاسباتی روزمرهٔ بازی‌سازی (از مثلثات تا نویز و تبدیل رنگ) را پوشش می‌دهد؛ کافی است به جای ‎System.Math‎ از آن استفاده کنید تا مزایای ‎float‎ تک‌دقت، عملکرد بهینه و سازگاری پلتفرمی یونیتی را یک‌جا به‌دست آورید.

## درون‌یابی (Interpolation)

| متد                            | توضیح                             | مثال                                        |
| ------------------------------ | --------------------------------- | ------------------------------------------- |
| `Mathf.Lerp(a, b, t)`          | درون‌یابی خطی بین a و b با ضریب t | `Mathf.Lerp(0f, 10f, 0.5f) // 5f`           |
| `Mathf.LerpUnclamped(a, b, t)` | مشابه Lerp ولی بدون محدودیت t     | `Mathf.LerpUnclamped(0f, 10f, 1.5f) // 15f` |
| `Mathf.SmoothStep(a, b, t)`    | درون‌یابی نرم با منحنی صاف        | `Mathf.SmoothStep(0f, 1f, 0.5f)`            |

## محدودسازی (Clamping)

| متد                            | توضیح                           | مثال                               |
| ------------------------------ | ------------------------------- | ---------------------------------- |
| `Mathf.Clamp(value, min, max)` | محدود کردن مقدار بین دو عدد     | `Mathf.Clamp(15f, 0f, 10f) // 10f` |
| `Mathf.Clamp01(value)`         | محدود کردن مقدار به بازه 0 تا 1 | `Mathf.Clamp01(1.5f) // 1f`        |

## مثلثات (Trigonometry)

| متد                 | توضیح                          | مثال                            |
| ------------------- | ------------------------------ | ------------------------------- |
| `Mathf.Sin(x)`      | سینوس زاویه (بر حسب رادیان)    | `Mathf.Sin(Mathf.PI / 2) // 1f` |
| `Mathf.Cos(x)`      | کسینوس زاویه                   | `Mathf.Cos(0f) // 1f`           |
| `Mathf.Tan(x)`      | تانژانت زاویه                  | `Mathf.Tan(Mathf.PI / 4) // 1f` |
| `Mathf.Asin(x)`     | آرک‌سینوس                      | `Mathf.Asin(1f) // 1.57`        |
| `Mathf.Acos(x)`     | آرک‌کسینوس                     | `Mathf.Acos(0f) // 1.57`        |
| `Mathf.Atan(x)`     | آرک‌تانژانت                    | `Mathf.Atan(1f) // 0.78`        |
| `Mathf.Atan2(y, x)` | زاویه نقطه (x, y) نسبت به مبدا | `Mathf.Atan2(1f, 1f) // 0.78`   |

## توان و ریشه (Power & Root)

| متد               | توضیح              | مثال                      |
| ----------------- | ------------------ | ------------------------- |
| `Mathf.Pow(a, b)` | محاسبه a به توان b | `Mathf.Pow(2f, 3f) // 8f` |
| `Mathf.Sqrt(x)`   | ریشه دوم عدد       | `Mathf.Sqrt(9f) // 3f`    |
| `Mathf.Exp(x)`    | توان e (عدد نپر)   | `Mathf.Exp(1f) // 2.71f`  |

## گرد کردن (Rounding)

| متد                   | توضیح                         | مثال                          |
| --------------------- | ----------------------------- | ----------------------------- |
| `Mathf.Floor(x)`      | گرد به پایین                  | `Mathf.Floor(3.7f) // 3f`     |
| `Mathf.Ceil(x)`       | گرد به بالا                   | `Mathf.Ceil(3.2f) // 4f`      |
| `Mathf.Round(x)`      | گرد به نزدیک‌ترین عدد         | `Mathf.Round(3.5f) // 4f`     |
| `Mathf.FloorToInt(x)` | گرد به پایین و تبدیل به `int` | `Mathf.FloorToInt(3.7f) // 3` |
| `Mathf.CeilToInt(x)`  | گرد به بالا و تبدیل به `int`  | `Mathf.CeilToInt(3.2f) // 4`  |
| `Mathf.RoundToInt(x)` | گرد به نزدیک‌ترین عدد و `int` | `Mathf.RoundToInt(3.5f) // 4` |

## مقایسه و بررسی (Comparison)

| متد                         | توضیح                      | مثال                                             |
| --------------------------- | -------------------------- | ------------------------------------------------ |
| `Mathf.Min(a, b)`           | مقدار کمتر را برمی‌گرداند  | `Mathf.Min(3f, 7f) // 3f`                        |
| `Mathf.Max(a, b)`           | مقدار بیشتر را برمی‌گرداند | `Mathf.Max(3f, 7f) // 7f`                        |
| `Mathf.Abs(x)`              | قدر مطلق عدد               | `Mathf.Abs(-5f) // 5f`                           |
| `Mathf.Sign(x)`             | علامت عدد (1 یا -1)        | `Mathf.Sign(-7f) // -1f`                         |
| `Mathf.Approximately(a, b)` | بررسی تقریبی مساوی بودن    | `Mathf.Approximately(0.1f + 0.2f, 0.3f) // true` |

## حرکت تدریجی (Motion)

| متد                                                 | توضیح                            | مثال                                           |
| --------------------------------------------------- | -------------------------------- | ---------------------------------------------- |
| `Mathf.MoveTowards(current, target, maxDelta)`      | حرکت یکنواخت به سمت هدف          | `Mathf.MoveTowards(0f, 10f, 3f) // 3f`         |
| `Mathf.MoveTowardsAngle(current, target, maxDelta)` | حرکت یکنواخت زاویه‌ای            | `Mathf.MoveTowardsAngle(350f, 10f, 15f) // 5f` |
| `Mathf.PingPong(t, length)`                         | حرکت رفت و برگشتی بین 0 و length | `Mathf.PingPong(Time.time, 3f)`                |
| `Mathf.Repeat(t, length)`                           | تکرار مقدار بین 0 و length       | `Mathf.Repeat(Time.time, 2f)`                  |

## ثابت‌ها و تبدیل‌ها (Constants & Conversions)

| متد                      | توضیح                            | مثال                                 |
| ------------------------ | -------------------------------- | ------------------------------------ |
| `Mathf.Deg2Rad`          | تبدیل درجه به رادیان             | `30 * Mathf.Deg2Rad // 0.523f`       |
| `Mathf.Rad2Deg`          | تبدیل رادیان به درجه             | `Mathf.PI * Mathf.Rad2Deg // 180f`   |
| `Mathf.DeltaAngle(a, b)` | کمترین اختلاف زاویه‌ای بین a و b | `Mathf.DeltaAngle(350f, 10f) // 20f` |
