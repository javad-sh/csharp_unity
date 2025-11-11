---
title: Quaternion (چرخش)
sidebar_position: 3
---

# Quaternion

کلاس Quaternion در یونیتی برای نمایش و انجام عملیات مربوط به دوران (rotation) در فضای سه‌بعدی استفاده می‌شود. برخلاف زاویه‌های اویلری که می‌توانند باعث مشکلاتی مانند گره خوردگی گیمبال (Gimbal Lock) شوند، کواترنیون‌ها پایدار، سریع و بدون این مشکل هستند.

## ساختار

```
Quaternion q = Quaternion.identity;

```

## پراپرتی ها

| پراپرتی       | نوع        | توضیح                         | مثال                                                                    | خروجی                |
| ------------- | ---------- | ----------------------------- | ----------------------------------------------------------------------- | -------------------- |
| `identity`    | Quaternion | کواترنیون پیش‌فرض (بدون چرخش) | `Quaternion q = Quaternion.identity;`                                   | (0, 0, 0, 1)         |
| `eulerAngles` | Vector3    | زاویه‌های اویلری معادل چرخش   | `Quaternion q = Quaternion.Euler(30, 0, 0); Vector3 e = q.eulerAngles;` | (30, 0, 0)           |
| `normalized`  | Quaternion | نسخه نرمال‌شده                | `q.normalized`                                                          | همان q اما با طول ۱  |
| `magnitude`   | float      | طول کواترنیون                 | `q.magnitude`                                                           | مثلاً 1.0 برای نرمال |

## متد ها

### ساخت کواترنیون‌ها

| متد                         | توضیح                              | مثال                                                       | خروجی                   |
| --------------------------- | ---------------------------------- | ---------------------------------------------------------- | ----------------------- |
| `Euler(x,y,z)`              | ساخت کواترنیون از زاویه‌های اویلری | `Quaternion q = Quaternion.Euler(0, 90, 0);`               | چرخش 90 درجه حول محور Y |
| `AngleAxis(angle, axis)`    | ساخت کواترنیون از زاویه و محور     | `Quaternion q = Quaternion.AngleAxis(45, Vector3.up);`     | 45 درجه حول محور Y      |
| `LookRotation(forward, up)` | ایجاد چرخش به سمتی خاص             | `Quaternion q = Quaternion.LookRotation(Vector3.forward);` | رو به جلو (Z+)          |

### ترکیب و بینابینی

| متد                             | توضیح                                       | مثال                                     | خروجی                 |
| ------------------------------- | ------------------------------------------- | ---------------------------------------- | --------------------- |
| `Slerp(a, b, t)`                | چرخش نرم بین دو کواترنیون                   | `Quaternion.Slerp(q1, q2, 0.5f);`        | چرخش بین q1 و q2      |
| `Lerp(a, b, t)`                 | خطی (کم دقت‌تر از Slerp)                    | `Quaternion.Lerp(q1, q2, 0.5f);`         | مثل بالا، ولی سریع‌تر |
| `RotateTowards(a, b, maxAngle)` | چرخش به سمت کواترنیون دیگر با محدودیت زاویه | `Quaternion.RotateTowards(q1, q2, 10f);` | حداکثر 10 درجه تغییر  |

### عملیات ریاضی

| متد           | توضیح                        | مثال                        | خروجی             |
| ------------- | ---------------------------- | --------------------------- | ----------------- |
| `Inverse(q)`  | برعکس چرخش                   | `Quaternion.Inverse(q)`     | چرخش معکوس        |
| `Dot(a, b)`   | شباهت چرخشی بین دو کواترنیون | `Quaternion.Dot(q1, q2);`   | مقدار بین -1 تا 1 |
| `Angle(a, b)` | زاویه بین دو چرخش            | `Quaternion.Angle(q1, q2);` | درجه              |

### تفاوت کواترنیون و اویلری

| ویژگی                  | Euler | Quaternion                     |
| ---------------------- | ----- | ------------------------------ |
| ثبات چرخش              | کمتر  | بیشتر                          |
| جلوگیری از Gimbal Lock | ندارد | دارد                           |
| آسانی خواندن           | بیشتر | کمتر                           |
| استفاده در انیمیشن     | مناسب | مناسب‌تر برای بینابینی (Slerp) |

### مثال

```
void Start()
{
    Quaternion q = Quaternion.Euler(0, 90, 0);
    Vector3 forward = q * Vector3.forward;
    Debug.Log(forward);
}
// خروجی
(1.0, 0.0, 0.0)

```

```
Quaternion q = Quaternion.Euler(0, 180, 0);
Vector3 result = q * Vector3.forward;
Debug.Log(result); // ➜ (-0.0, 0.0, -1.0)

```

```
Quaternion q = Quaternion.Euler(90, 0, 0);
Vector3 result = q * Vector3.forward;
Debug.Log(result); // ➜ (0.0, -1.0, 0.0)

```

```
Quaternion q = Quaternion.Euler(45, 45, 0);
Vector3 result = q * Vector3.forward;
Debug.Log(result); // ➜ (0.5, 0.0, 0.7071) حدودی

```
