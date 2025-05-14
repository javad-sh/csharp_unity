---
title: استفاده از Input Actions
sidebar_position: 2
---

# استفاده از Input Actions

ما در کل به چهار(دو) روش می توانیم از Input Actionsی که ساختیم استفاده کنیم.



برای این کار کامپوننت player input را به آبجکت مد نظر اضافه می کنیم و فایل اینپوت اکشن را به آن کامپوننت اضافه می کنیم.




کامپوننت **`Player Input`** در یونیتی (Input System جدید) یک گزینه مهم به نام **Behavior** داره که تعیین می‌کنه:

> «وقتی یک اکشن اجرا شد، \*\*چطور به اسکریپت‌ها اطلاع بده؟» 📣

---

## 🔧 گزینه‌ی Behavior در Player Input

در Inspector از Player Input، بخش:

```
Behavior: [Send Messages | Invoke Unity Events | Broadcast Messages | Invoke C# Events]
```

هر کدوم از این رفتارها (Behaviors) روش خاصی برای _فراخوانی کد_ هنگام اجرای یک Input Action دارن.

الان همه رو دقیق و مقایسه‌ای برات توضیح می‌دم:

---

## ✅ 1. **Send Messages**

### 📌 معنی:

وقتی یک اکشن اجرا بشه، **متدی به اسم اون اکشن در همون گیم‌ابجکت صدا زده می‌شه.**

### 🎯 مثال:

اگر یه اکشن به اسم `Jump` داشته باشی، باید در اسکریپتی که روی همون گیم‌آبجکت هست بنویسی:

```csharp
void OnJump()
{
    Debug.Log("Jump called!");
}
```

> 🔸 یونیتی خودش `OnJump()` رو صدا می‌زنه، لازم نیست دستی متصل کنی.

### ⚠️ نکته:

-   اسم متد باید دقیقاً با `On<Name>` یکی باشه (وگرنه اجرا نمی‌شه).
-   فقط روی همون GameObject اجرا می‌شه.

---

## ✅ 2. **Broadcast Messages**

### 📌 معنی:

مثل `Send Messages` هست، اما فرقش اینه که:

> علاوه بر خود گیم‌آبجکت، **روی تمام فرزندانش (Child objects)** هم متد رو صدا می‌زنه.

### 🎯 مثال:

```csharp
void OnShoot()
{
    Debug.Log("Shoot received (any child)");
}
```

اگه این متد توی یکی از اسکریپت‌های child هم باشه، باز اجرا می‌شه.

---

:::note
در send mesaages متد ها فقط روی اسکریپت های در دسترس هستند که روی خود آن ابجکت اتچ شده باشند اما در broadcast در اسکریپت هایی که به فرزندان اتچ شده اند هم متدهای event قابل دسترسی هستند.
:::

| متد                 | زمانی اجرا می‌شود                                    | کاربرد                           |
| ------------------- | ---------------------------------------------------- | -------------------------------- |
| `OnDeviceLost`      | وقتی دستگاه ورودی (مثلاً دسته) از دسترس خارج میشه    | نمایش پیغام "کنترلر قطع شد"      |
| `OnDeviceRegained`  | وقتی همون دستگاه دوباره متصل بشه                     | مخفی‌کردن پیغام قطع و ادامه بازی |
| `OnControlsChanged` | وقتی نوع کنترل از یک دستگاه به دستگاه دیگه تغییر کنه | تشخیص سوییچ بین دسته و کیبورد    |


## ✅ 3. **Invoke Unity Events**

### 📌 معنی:

در Inspector، برای هر Input Action یک **Event** نمایان می‌شه که می‌تونی دستی تعریف کنی چه متدی اجرا بشه.

### 🎯 مزیت:

-   نیازی به نوشتن متد با اسم خاص (`OnJump`) نداری
-   توی Inspector می‌تونی مشخص کنی کدوم متد صدا زده بشه
-   برای استفاده گرافیکی، Drag & Drop عالیه

### ⚠️ نکته:

-   کد باید `public` باشه تا توی Inspector دیده بشه
-   پارامتر متد باید `InputAction.CallbackContext` باشه:

```csharp
public void Jump(InputAction.CallbackContext ctx)
{
    if (ctx.performed)
        Debug.Log("Jump via Unity Event!");
}
```

---

## ✅ 4. **Invoke C# Events** (یا `C# Callback Interfaces`)

### 📌 معنی:

برای کسانی که کد‌نویسی جدی‌تر انجام می‌دن! این حالت **به سبک اینترفیس** عمل می‌کنه.

### 🎯 مراحل استفاده:

1. اکشن‌ها را در `.inputactions` تعریف کن
2. Generate C# Class رو فعال کن
3. کلاسی که می‌خوای اکشن‌ها رو بگیره، باید اینترفیس `IYourActionsNameActions` رو پیاده کنه

### 🧪 مثال:

اگر فایل `PlayerControls.inputactions` داشته باشی:

```csharp
public class MyPlayer : MonoBehaviour, PlayerControls.IPlayerActions
{
    PlayerControls controls;

    void Awake()
    {
        controls = new PlayerControls();
        controls.Player.SetCallbacks(this);
        controls.Player.Enable();
    }

    public void OnMove(InputAction.CallbackContext ctx)
    {
        Vector2 dir = ctx.ReadValue<Vector2>();
        Debug.Log("Move: " + dir);
    }

    public void OnJump(InputAction.CallbackContext ctx)
    {
        if (ctx.performed) Debug.Log("Jump!");
    }
}
```

> ✳️ این روش برای پروژه‌های تمیز و ماژولار خیلی توصیه می‌شه.

---

## 📊 جدول مقایسه رفتارها

| Behavior              | روش اجرا             | نیاز به نام خاص؟ | قابل Drag در Inspector؟ | مناسب برای                   |
| --------------------- | -------------------- | ---------------- | ----------------------- | ---------------------------- |
| `Send Messages`       | `OnActionName()`     | بله              | ❌                      | ساده‌ترین راه                |
| `Broadcast Messages`  | به کل درخت آبجکت     | بله              | ❌                      | اگر چند child باشن           |
| `Invoke Unity Events` | انتخاب دستی          | ❌               | ✅                      | برای طراحی بصری در Inspector |
| `C# Callbacks`        | اینترفیس/کلاس تولیدی | نه (اتوماتیک)    | ❌                      | پروژه‌های ماژولار و تمیز     |

---

## ✅ کدوم یکی برای تو خوبه؟

| نیاز تو                                | Behavior پیشنهادی                        |
| -------------------------------------- | ---------------------------------------- |
| سریع و ساده برای تست                   | Send Messages                            |
| دکمه‌ها و حرکات مختلف روی اجزای فرعی   | Broadcast Messages                       |
| استفاده از Inspector بدون کدنویسی زیاد | Invoke Unity Events                      |
| معماری حرفه‌ای و منعطف                 | C# Callback Interfaces (generated class) |

---


:::tip
استفاده از روش چهارم لزوما نیازی به کامپوننت input player ندارد اما با استفاده از آن به چند آپشن اضافی هم می توانیم دسترسی داشته باشیم.
:::

مزیت ها و کارایی هر کدام
اطلاعاتی که می دن