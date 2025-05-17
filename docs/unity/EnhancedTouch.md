---
title: EnhancedTouch
sidebar_position: 6
---

# EnhancedTouch


حتماً جان! این هم جدول کامل و ساده از همهٔ **ویژگی‌ها، متدها، و موارد استفادهٔ EnhancedTouch** در Unity Input System جدید، همراه با توضیح و مثال کاربردی برای هر مورد. این سبک جدول، خوانا و سریع برای مرور و یادگیریه:

---

## 🧠 **ویژگی‌ها و متدهای EnhancedTouch – همراه با توضیح و مثال**

| مورد                             | نوع                             | توضیح                                                         | مثال استفاده                                     |
| -------------------------------- | ------------------------------- | ------------------------------------------------------------- | ------------------------------------------------ |
| `EnhancedTouchSupport.Enable()`  | متد                             | فعال‌سازی سیستم EnhancedTouch؛ حتماً قبل از استفاده لازم است. | `EnhancedTouchSupport.Enable();` در `OnEnable()` |
| `EnhancedTouchSupport.Disable()` | متد                             | غیرفعال کردن سیستم، معمولاً در `OnDisable()` استفاده می‌شود.  | `EnhancedTouchSupport.Disable();`                |
| `EnhancedTouchSupport.enabled`   | ویژگی (`bool`)                  | آیا EnhancedTouch فعال است یا نه                              | `if (EnhancedTouchSupport.enabled)`              |
| `Touch.activeTouches`            | ویژگی (`ReadOnlyArray<Touch>`)  | لیست همهٔ لمس‌های فعّال در این فریم                           | `foreach (var t in Touch.activeTouches)`         |
| `Finger.activeFingers`           | ویژگی (`ReadOnlyArray<Finger>`) | لیست انگشت‌هایی که الان روی صفحه هستند                        | `foreach (var f in Finger.activeFingers)`        |
| `Finger.allFingers`              | ویژگی (`ReadOnlyArray<Finger>`) | همهٔ انگشت‌هایی که تاکنون دیده شده‌اند (حتی رها شده‌ها)       | برای ذخیره سابقه                                 |
| `Touch.onFingerDown`             | رویداد (`Action<Finger>`)       | وقتی یک انگشت پایین می‌آید فعال می‌شود                        | `Touch.onFingerDown += f => ...`                 |
| `Touch.onFingerMove`             | رویداد (`Action<Finger>`)       | وقتی انگشت حرکت می‌کند فراخوانی می‌شود                        | `Touch.onFingerMove += f => ...`                 |
| `Touch.onFingerUp`               | رویداد (`Action<Finger>`)       | وقتی انگشت برداشته می‌شود فراخوانی می‌شود                     | `Touch.onFingerUp += f => ...`                   |
| `Touch.onFingerTap`              | رویداد (`Action<Finger>`)       | هنگام تپ (tap) شدن انگشت، با تشخیص خودکار Unity               | `Touch.onFingerTap += f => ...`                  |

---

## ✋ ویژگی‌های کلاس `Touch`

| ویژگی                 | نوع          | توضیح                                            | مثال استفاده                |
| --------------------- | ------------ | ------------------------------------------------ | --------------------------- |
| `screenPosition`      | `Vector2`    | موقعیت لمس روی صفحه (پیکسل)                      | `touch.screenPosition`      |
| `startScreenPosition` | `Vector2`    | موقعیت شروع لمس                                  | `touch.startScreenPosition` |
| `delta`               | `Vector2`    | بردار جابه‌جایی از فریم قبل                      | `touch.delta`               |
| `time`                | `double`     | زمان فریم فعلی لمس                               | `touch.time`                |
| `startTime`           | `double`     | زمان آغاز لمس                                    | `touch.startTime`           |
| `touchId`             | `int`        | شناسه یکتا برای هر تماس                          | `touch.touchId`             |
| `pressure`            | `float`      | میزان فشار وارد شده (در صورت پشتیبانی سخت‌افزار) | `touch.pressure`            |
| `radius`              | `Vector2`    | ابعاد بیضی تماس (در صورت پشتیبانی)               | `touch.radius`              |
| `phase`               | `TouchPhase` | وضعیت فعلی لمس (Began, Moved, Ended...)          | `touch.phase`               |
| `finger`              | `Finger`     | انگشت مرتبط با این تماس                          | `touch.finger`              |

---

## 👆 ویژگی‌های کلاس `Finger`

| ویژگی          | نوع      | توضیح                                           | مثال استفاده                         |
| -------------- | -------- | ----------------------------------------------- | ------------------------------------ |
| `index`        | `int`    | شماره انگشت (۰ برای اولی، ۱ برای دومی و...)     | `finger.index`                       |
| `currentTouch` | `Touch`  | تماس فعلی مرتبط با این انگشت                    | `finger.currentTouch.screenPosition` |
| `lastTouch`    | `Touch`  | آخرین تماس قبل از فعلی                          | `finger.lastTouch.delta`             |
| `tapCount`     | `int`    | شمارش تپ‌ها روی این انگشت                       | `if (finger.tapCount == 2)`          |
| `userData`     | `object` | نگهداری داده دلخواه برای هر انگشت (مثلاً Trail) | `finger.userData = trailObj;`        |

---

## 📌 موارد استفاده عملی EnhancedTouch

| کاربرد                           | ابزارها                                           | خلاصه کد                                   |
| -------------------------------- | ------------------------------------------------- | ------------------------------------------ |
| کشیدن (Drag) با انگشت            | `Touch.activeTouches` یا `onFingerMove`           | `box.position = touch.screenPosition`      |
| نمایش مسیر انگشت                 | `Finger.userData`, `onFingerDown`, `onFingerMove` | ساخت Trail یا LineRenderer متصل به انگشت   |
| دابل تپ (Double Tap)             | `onFingerTap`, `tapCount`                         | `if (finger.tapCount == 2) SpawnObject();` |
| ژست Pinch to Zoom                | `Finger.activeFingers`، بررسی فاصلهٔ دو انگشت     | محاسبه `Vector2.Distance()` بین دو انگشت   |
| فقط زمانی اجرا شدن که لمس رخ دهد | `onFingerDown/Up/Move/Tap`                        | بدون نیاز به `Update()`                    |

---
