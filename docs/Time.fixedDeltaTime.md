---
title: Time.fixedDeltaTime
sidebar_position: 17
---


# Time.fixedDeltaTime

در یونیتی، `Time.fixedDeltaTime` یکی از کلیدی‌ترین مفاهیم برای **محاسبات فیزیکی دقیق و پایدار** است. در ادامه به‌صورت کامل و دقیق توضیح می‌دهم:

---

## ✅ تعریف:

`Time.fixedDeltaTime` مدت زمانی است (بر حسب ثانیه) که **بین هر بار اجرای تابع `FixedUpdate`** می‌گذرد.

---

## 🔧 تفاوت `deltaTime` و `fixedDeltaTime`

| ویژگی          | `Time.deltaTime`         | `Time.fixedDeltaTime`               |
| -------------- | ------------------------ | ----------------------------------- |
| به‌روزرسانی در | هر فریم (Update)         | در زمان‌بندی ثابت (FixedUpdate)     |
| برای           | انیمیشن، ورودی، حرکت نرم | فیزیک، Rigidbody، شبیه‌سازی ثابت    |
| وابسته به FPS؟ | بله                      | خیر                                 |
| مقدار پیش‌فرض  | متغیر با FPS             | `0.02` ثانیه (یعنی 50 بار در ثانیه) |

---

## 🧪 مقدار پیش‌فرض `fixedDeltaTime`

```csharp
Time.fixedDeltaTime = 0.02f; // یعنی 50 بار در ثانیه (1 / 0.02)
```

اگر بخواهی بازی فیزیکی دقیقی داشته باشی، باید این مقدار را متناسب با نیاز تغییر دهی (مثلاً 0.01 برای دقت بیشتر).

---

## 📌 کاربرد اصلی:

* اعمال نیرو به اجسام Rigidbody
* کار با فیزیک (مثل Gravity، Collision)
* شبیه‌سازی با زمان ثابت (مثل Time-Based Simulation)
* نرم کردن حرکات فیزیکی

---

## 🧠 مثال ساده – استفاده در FixedUpdate:

```csharp
void FixedUpdate()
{
    // حرکت Rigidbody به سمت جلو با سرعت ثابت
    rb.MovePosition(rb.position + Vector3.forward * speed * Time.fixedDeltaTime);
}
```

اگر از `Update()` استفاده کنی و `deltaTime` بدهی، چون فریم‌ها ناپایدارند ممکنه جسم فیزیکی پرش داشته باشد.

---

## ⚠️ نکته مهم:

نباید در `FixedUpdate()` از کدی استفاده کنی که به ورودی کاربر یا انیمیشن مربوط باشد، چون `FixedUpdate` ممکنه در یک فریم چند بار اجرا شود.

---

## 🎯 چه چیزهایی باید در `FixedUpdate` باشند؟

* `Rigidbody.AddForce`
* `Rigidbody.MovePosition`
* کنترل حرکت با فیزیک
* Simulating physical objects

---

## ✍️ مثالی از تفاوت:

### اشتباه (در Update):

```csharp
void Update()
{
    rb.AddForce(Vector3.forward * 10f * Time.deltaTime); // ❌ ناپایدار
}
```

### درست (در FixedUpdate):

```csharp
void FixedUpdate()
{
    rb.AddForce(Vector3.forward * 10f); // ✅ پایدار
}
```
