---
title: ctx
sidebar_position: 3
---

# ctx چیست ؟

ctx در یونیتی و مخصوصاً در سیستم جدید ورودی (Unity Input System)، کوتاه‌شده‌ی CallbackContext هست و نمایان‌گر اطلاعات مربوط به اتفاق افتادن یک اکشن (Action) است.

## جدول ویژگی‌ها (Properties)

| ویژگی (Property) | نوع داده            | توضیح فارسی                                                                  | مثال استفاده              |
| ---------------- | ------------------- | ---------------------------------------------------------------------------- | ------------------------- |
| `action`         | `InputAction`       | ارجاع به اکشن (Action) که این کانتکست مربوط به آن است                        | `ctx.action.name`         |
| `control`        | `InputControl`      | کنترل ورودی (مثل keyboard/space یا gamepad/buttonSouth) که باعث فعال‌سازی شد | `ctx.control.displayName` |
| `interaction`    | `IInputInteraction` | تعامل خاص (مثل `Hold`, `Tap`, `Press`) که فعال شده                           | `ctx.interaction`         |
| `phase`          | `InputActionPhase`  | وضعیت فعلی اکشن: `Started`, `Performed`, `Canceled`, ...                     | `ctx.phase`               |
| `started`        | `bool`              | آیا فاز فعلی `Started` است؟                                                  | `if (ctx.started)`        |
| `performed`      | `bool`              | آیا فاز فعلی `Performed` است؟                                                | `if (ctx.performed)`      |
| `canceled`       | `bool`              | آیا فاز فعلی `Canceled` است؟                                                 | `if (ctx.canceled)`       |
| `enabled`        | `bool`              | آیا اکشن در حالت فعال (Enabled) است؟                                         | `if (ctx.action.enabled)` |
| `time`           | `double`            | زمان رویداد از زمان شروع بازی (بر حسب ثانیه)                                 | `Debug.Log(ctx.time)`     |
| `startTime`      | `double`            | زمان شروع این تعامل                                                          | `ctx.startTime`           |
| `duration`       | `double`            | مدت زمان بین `startTime` و `time`                                            | `ctx.duration`            |

## جدول متدها (Methods)

| متد                         | بازگشتی  | توضیح فارسی                                                           | مثال استفاده                              |
| --------------------------- | -------- | --------------------------------------------------------------------- | ----------------------------------------- |
| `ReadValue<T>()`            | `T`      | مقدار ورودی را به نوع خاص (مثلاً `float`, `Vector2`, `bool`) می‌خواند | `ctx.ReadValue<float>()`                  |
| `ReadValueAsObject()`       | `object` | مقدار ورودی را به‌صورت شیء بدون نوع‌دهی مشخص بازمی‌گرداند             | `object val = ctx.ReadValueAsObject()`    |
| `HasValue`                  | `bool`   | آیا این کانتکست مقدار قابل خواندن دارد؟                               | `if (ctx.HasValue)`                       |
| `GetValueType()`            | `Type`   | نوع داده‌ای که اکشن مقدار می‌دهد را بازمی‌گرداند                      | `Debug.Log(ctx.GetValueType())`           |
| `Matches(InputActionPhase)` | `bool`   | بررسی اینکه آیا وضعیت اکشن با مقدار مورد نظر برابر است یا نه          | `ctx.Matches(InputActionPhase.Performed)` |

## دسترسی به ctx در کد

### در send messages (روش قدیمی و غیرایمن)

در این روش، ctx به‌صورت غیرمستقیم و فقط از طریق پارامتر object ارسال می‌شود.

```
public InputAction jumpAction;

void OnEnable()
{
    jumpAction.Enable();
    jumpAction.performed += ctx => SendMessage("OnJump", ctx);
}

void OnJump(object obj)
{
    var ctx = (InputAction.CallbackContext)obj;
    Debug.Log("🟢 Jump: " + ctx.phase);
}

```

دسترسی به ctx:
🔶 فقط اگر خودت ctx را به متد مقصد بفرستی
🔴 ولی تابع گیرنده نمی‌تونه مستقیماً InputAction.CallbackContext رو به‌صورت تایپ‌دار دریافت کنه؛ چون SendMessage فقط object می‌فرسته

# C# Events (روش حرفه‌ای و امن)

در این روش، ctx به‌صورت مستقیم در اختیار تابع قرار می‌گیره.

```
public InputAction moveAction;

void OnEnable()
{
    moveAction.Enable();
    moveAction.performed += OnMovePerformed;
}

void OnDisable()
{
    moveAction.performed -= OnMovePerformed;
    moveAction.Disable();
}

void OnMovePerformed(InputAction.CallbackContext ctx)
{
    Vector2 input = ctx.ReadValue<Vector2>();
    Debug.Log("⬅️ Move Performed: " + input);
}

```

### مثال کامل از استفاده از c# events

```
using UnityEngine;
using UnityEngine.InputSystem;

public class PlayerInputHandler : MonoBehaviour
{
    private PlayerControls input; // ۱. نگه‌داری از کلاس ورودی که اتوماتیک ساخته شده

    private void Awake()
    {
        input = new PlayerControls(); // ۲. نمونه‌سازی از فایل جنریت‌شده
    }

    private void OnEnable()
    {
        input.Enable(); // ۳. فعال‌سازی کل سیستم ورودی

        // ۴. ثبت تابع به ایونت performed (C# Event)
        input.Basic.Left.performed += OnLeftPerformed;
    }

    private void OnDisable()
    {
        // ۵. حذف ثبت ایونت موقع غیرفعال شدن شیء
        input.Basic.Left.performed -= OnLeftPerformed;
        input.Disable(); // ۶. غیرفعال‌سازی سیستم ورودی
    }

    // ۷. تابعی که وقتی پلیر دکمه چپ رو بزنه، اجرا میشه
    private void OnLeftPerformed(InputAction.CallbackContext ctx)
    {
        Debug.Log("⬅️ رفت به چپ!");
        Debug.Log("Phase: " + ctx.phase); // ۸. استفاده از ctx برای اطلاعات دقیق‌تر
    }
}

```

:::caution
یعنی ctx در خصوص اطلاعات کلی رویداد مثل این که اجرا شده یا نه به ما اطلاعات میده و در خصوص جزئیات ایونت ما باید از کلاس خودش استفاده کنیم.
:::
ctx به ما فقط وضعیت وقوع ایونت رو می‌ده، مثلاً:

آیا این ایونت شروع شده؟

آیا در حال اجراست؟

آیا پایان یافته (لغو شده)؟

و با ctx.phase یا هندلرهای مثل started, performed, canceled می‌تونیم بفهمیم کِی ایونت اجرا شده.


 اما ctx جزئیات دقیق رویداد رو نمی‌ده
مثل:

موقعیت تاچ یا ماوس

کدوم دکمه زده شده

تعداد لمس‌ها

سرعت، فشار، زاویه و...

اینا رو باید مستقیماً از کلاس مربوطه مثل Mouse.current, Touchscreen.current, یا Gamepad.current بخونی.