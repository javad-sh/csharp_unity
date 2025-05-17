---
title: ایونت Touch در اینپوت سیستم جدید
sidebar_position: 3
---

## ایونت Touch در اینپوت سیستم جدید

ما به دو روش می توانیم به تاچ در اینپوت سیستم جدید دسترسی پیدا کنیم.

## 1. **EnhancedTouch** (پیشرفته و سطح بالا)

### ویژگی‌ها:

-   بدون نیاز به InputAction
-   دارای رویدادهای آماده مثل `onFingerDown`, `onFingerUp`, `onFingerTap`, …
-   دسترسی به کلاس‌های `Touch`, `Finger`, و تاریخچه لمس
-   دقیق، بدون از دست دادن لمس‌های کوتاه
-   مستقل و event-driven

📌 فعال‌سازی:

```csharp
EnhancedTouchSupport.Enable();
```

---

## 2. **Input Actions** با `CallbackContext (ctx)`

_(معمولاً بهش می‌گن روش “اکشنی”)_

### ویژگی‌ها:

-   با استفاده از `InputActionAsset` و binding مثل:
    `<Touchscreen>/touch*/press` یا `<Touchscreen>/primaryTouch/press`
-   کد تمیز و متمرکز با متد کال‌بک مثل:

```csharp
void OnTouch(InputAction.CallbackContext ctx)
{
    if (ctx.control is TouchControl touch)
    {
        Vector2 pos = touch.position.ReadValue();
    }
}
```

-   مناسب برای پروژه‌هایی که چند ورودی دارند (تاچ + گیم‌پد + کیبورد)

---

## 📌 جدول مقایسه سریع

| ویژگی                                 | `EnhancedTouch` | `InputAction + ctx`                    |
| ------------------------------------- | --------------- | -------------------------------------- |
| نیازی به اکشن ندارد؟                  | ✅              | ❌                                     |
| رویدادهای آماده (onFingerDown…)       | ✅              | ❌                                     |
| راحت برای Gesture (Swipe, Tap, Pinch) | ✅              | ⚠️ دستی‌تر                             |
| مناسب برای چند نوع ورودی هم‌زمان      | ⚠️ فقط لمس      | ✅ عالی                                |
| استفاده در سیستم‌های UI               | ❌ نه مستقیم    | ✅ همراه با `InputSystemUIInputModule` |
| تاریخچه دقیق لمس                      | ✅              | ⚠️ فقط وضعیت لحظه‌ای                   |
| مناسب‌ترین برای بازی‌های لمسی         | ✅ بله          | ✅ بله، اگر ساختارمند بخوای            |

---

### 🟢 نتیجه نهایی:

> ✔ اگر فقط با لمس کار می‌کنی و دقت و راحتی برات مهمه → **EnhancedTouch**
> ✔ اگر ورودی چندگانه (تاچ + گیم‌پد + موس) می‌خوای و همه رو با یک ساختار هندل کنی → **InputAction با ctx**
