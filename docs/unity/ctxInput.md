---
title: تاچ در ctx و اینپوت اکشن
sidebar_position: 6
---

## هندل تارچ در اینپوت اکشن و ctx

عالی جان! حالا بریم سراغ **روش دوم** یعنی:

> ✅ استفاده از **Input Actions + `CallbackContext (ctx)`** برای مدیریت لمس (Touch) در Unity Input System جدید.

اینجا هم برات همه‌چیزو با **جدول‌های ساده، شفاف، و همراه با مثال** آماده کردم – دقیقاً مثل چیزی که برای EnhancedTouch انجام دادیم.

---

# 🧠 Input Actions + `ctx` برای Touch در Input System

---

## 📦 ابتدا: چه چیزهایی نیاز داری؟

| مورد                                    | توضیح                                                                     |
| --------------------------------------- | ------------------------------------------------------------------------- |
| **Input Action Asset**                  | یک فایل `.inputactions` که شامل Actionهایی برای لمس باشه                  |
| **Binding به Touch**                    | مثلاً: `<Touchscreen>/touch*/press` یا `<Touchscreen>/primaryTouch/press` |
| **کد با `ctx.control as TouchControl`** | برای استخراج جزئیات لمس از رویداد اکشن                                    |

---

## ✅ جدول ویژگی‌های موردنیاز در این روش

| مورد                         | نوع            | توضیح                                                   | مثال                                               |
| ---------------------------- | -------------- | ------------------------------------------------------- | -------------------------------------------------- |
| `InputAction.performed`      | event          | زمانی که اکشن اجرا می‌شود (مثلاً فشردن touch)           | `action.performed += OnTouch;`                     |
| `CallbackContext ctx`        | پارامتر        | اطلاعات کامل در مورد اینکه چه چیزی این اکشن رو فعال کرد | `void OnTouch(InputAction.CallbackContext ctx)`    |
| `ctx.control`                | `InputControl` | کنترل (مثلاً `TouchControl`) که این اکشن رو فعال کرده   | `if (ctx.control is TouchControl touch)`           |
| `touch.position.ReadValue()` | `Vector2`      | مختصات لمس روی صفحه                                     | `Vector2 pos = touch.position.ReadValue();`        |
| `touch.phase.ReadValue()`    | `TouchPhase`   | وضعیت تماس (began, moved, ended, ...)                   | `if (touch.phase.ReadValue() == TouchPhase.Began)` |
| `touch.touchId.ReadValue()`  | `int`          | شناسه انگشت فعلی                                        | `int id = touch.touchId.ReadValue();`              |

---

## 🎮 انواع Binding های پرکاربرد برای Touch

| مسیر Binding                       | توضیح                                             |
| ---------------------------------- | ------------------------------------------------- |
| `<Touchscreen>/primaryTouch/press` | فقط انگشت اول (مثل موس)                           |
| `<Touchscreen>/touch*/press`       | همهٔ انگشت‌ها – از هر انگشت Press دریافت می‌کنی   |
| `<Touchscreen>/touch*/position`    | دریافت موقعیت هر انگشت (به شرطی که نگه‌داشته بشه) |

---

## 🔧 مثال کامل – دریافت پوزیشن لمس

```csharp
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.InputSystem.Controls;

public class TouchHandler : MonoBehaviour
{
    [SerializeField] private InputAction touchPressAction;

    void OnEnable() => touchPressAction.Enable();
    void OnDisable() => touchPressAction.Disable();

    void Start()
    {
        touchPressAction.performed += OnTouch;
    }

    private void OnTouch(InputAction.CallbackContext ctx)
    {
        if (ctx.control is TouchControl touch)
        {
            Vector2 pos = touch.position.ReadValue();
            Debug.Log($"Touch at {pos}");

            TouchPhase phase = touch.phase.ReadValue();
            Debug.Log($"Phase: {phase}");

            int id = touch.touchId.ReadValue();
            Debug.Log($"Touch ID: {id}");
        }
    }
}
```

---

## 🛠 موارد کاربردی رایج با InputAction + ctx

| کاربرد                                           | ابزار                                    | خلاصه کد                                           |
| ------------------------------------------------ | ---------------------------------------- | -------------------------------------------------- |
| تشخیص اولین لمس                                  | `<Touchscreen>/primaryTouch/press`       | فقط انگشت اصلی درگیر می‌شود                        |
| پشتیبانی از multi-touch                          | `<Touchscreen>/touch*/press`             | `ctx.control as TouchControl` برای گرفتن انگشت خاص |
| تشخیص فاز لمس                                    | `touch.phase.ReadValue()`                | بررسی شروع یا پایان تماس                           |
| استفاده در سیستم‌های ترکیبی (تاچ + موس + گیم‌پد) | همان InputAction                         | همه ورودی‌ها در یک ساختار واحد هندل می‌شن          |
| تلفیق با UI                                      | `InputSystemUIInputModule` + این اکشن‌ها | استفاده برای کلیک UI و لمس با هم                   |

---

## 📌 مقایسه با EnhancedTouch

| ویژگی                        | InputAction + ctx   | EnhancedTouch             |
| ---------------------------- | ------------------- | ------------------------- |
| نیاز به asset و binding      | ✅ بله              | ❌ خیر                    |
| دسترسی مستقیم به انگشت‌ها    | ⚠️ سخت‌تر           | ✅ راحت‌تر                |
| Tap / Pinch / Gestures آماده | ❌ باید دستی بنویسی | ✅ در دسترس               |
| مناسب چند ورودی هم‌زمان      | ✅ بسیار مناسب      | ⚠️ فقط مخصوص touch        |
| نیاز به Enable دستی          | ❌ نه               | ✅ بله (Enable لازم دارد) |
| رویداد onFingerDown          | ❌ نه               | ✅ بله                    |
| ترکیب با UI                  | ✅ عالی             | ❌ نه مستقیم              |

---

## ✨ جمع‌بندی

> اگر پروژه‌ات نیاز داره به ورودی ساختارمند، ترکیب کیبورد، گیم‌پد، موس، و تاچ:
>
> ✅ **InputAction + ctx بهترین گزینه است.**

ولی اگه فقط دنبال کنترل لمسی پیشرفته هستی (multi-touch، Tap، Pinch):

> ✅ **EnhancedTouch دقیق‌تر، سریع‌تر، و تخصصی‌تره.**
