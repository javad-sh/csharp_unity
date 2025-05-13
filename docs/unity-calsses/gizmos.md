---
title: Gizmos 
sidebar_position: 6
---


# Gizmos
در یونیتی، `Gizmos` یک ابزار توسعه (و نه یک بخش از بازی نهایی) است که برای **ترسیم اشیاء کمکی و بصری‌سازی اطلاعات در ویرایشگر Unity** استفاده می‌شود. این ابزار به شما اجازه می‌دهد تا **در صحنه (Scene view)** اطلاعاتی مانند برد یک دشمن، مسیر حرکت، ناحیه دید، موقعیت نقاط مهم و... را **بصورت گرافیکی نمایش دهید**.

---

### ✅ کاربردهای رایج Gizmos:

* نمایش محدوده دید یک دشمن یا برج دفاعی.
* نشان دادن نقاط مسیر (waypoints).
* بصری‌سازی ناحیه برخورد (collider) یا محدودیت‌های حرکت.
* مشخص‌کردن ناحیه‌ی تحت تأثیر یک اسکریپت (مثلاً ناحیه‌ای که باعث آسیب می‌شود).

---

### 🧠 مهم:

Gizmos فقط در **Scene view** نمایش داده می‌شوند و **در اجرای بازی (Game view یا Build نهایی)** اثری ندارند.

---

### 📌 نحوه‌ی استفاده:

برای استفاده از Gizmos باید متدی به نام `OnDrawGizmos` یا `OnDrawGizmosSelected` را در یک `MonoBehaviour` تعریف کنید.

---

### ✅ تفاوت `OnDrawGizmos` و `OnDrawGizmosSelected`:

| متد                    | توضیح                                                       |
| ---------------------- | ----------------------------------------------------------- |
| `OnDrawGizmos`         | همیشه در حالت انتخاب و غیر انتخاب اجرا می‌شود               |
| `OnDrawGizmosSelected` | فقط زمانی اجرا می‌شود که شی انتخاب شده باشد (در Scene view) |

---

### 🎯 مثال ساده:

```csharp
using UnityEngine;

public class VisionRange : MonoBehaviour
{
    public float radius = 5f;

    void OnDrawGizmos()
    {
        Gizmos.color = Color.yellow;
        Gizmos.DrawWireSphere(transform.position, radius);
    }
}
```

📌 این کد یک **دایره‌ی زرد رنگ** به شعاع `radius` در اطراف آبجکت ترسیم می‌کند.

---

### ✴️ انواع متدهای مهم Gizmos:

| متد                                                   | توضیح                                               |
| ----------------------------------------------------- | --------------------------------------------------- |
| `Gizmos.DrawLine(Vector3 a, Vector3 b)`               | رسم خط بین دو نقطه                                  |
| `Gizmos.DrawWireSphere(Vector3 center, float radius)` | رسم کره‌ی سیمی (توخالی)                             |
| `Gizmos.DrawSphere(Vector3 center, float radius)`     | رسم کره‌ی پر (توپ)                                  |
| `Gizmos.DrawCube(Vector3 center, Vector3 size)`       | رسم مکعب پر                                         |
| `Gizmos.DrawWireCube(Vector3 center, Vector3 size)`   | رسم مکعب سیمی                                       |
| `Gizmos.color = Color.red`                            | تعیین رنگ رسم‌شده‌ها                                |
| `Gizmos.matrix = transform.localToWorldMatrix`        | تغییر سیستم مختصات (برای رسم دقیق‌تر نسبت به آبجکت) |

---

### 💡 نکته پیشرفته:

اگر خواستی از گیزموهایی استفاده کنی که فقط در حال اجرا دیده شوند (مثلاً برای تست محدوده برخورد یا گیم‌پلی)، می‌تونی از `Debug.DrawLine` یا `Debug.DrawRay` در حالت Play استفاده کنی که فقط در Game view دیده می‌شوند.

---