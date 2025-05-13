---
title: Lerp
sidebar_position: 15
---

# Lerp

تابع Lerp که مخفف Linear Interpolation هست، به معنی «درون‌یابی خطی» می‌باشد.

در C# و مخصوصاً در Unity، Lerp برای محاسبه یک مقدار بین دو مقدار دیگر، بر اساس یک درصد (t) استفاده می‌شود.

```
Lerp(a, b, t) = a + (b - a) * t
```

که:

a: مقدار شروع

b: مقدار پایان

t: عددی بین 0 و 1 که میزان پیشرفت از a به b را مشخص می‌کند.

:::tip
به این معنی است که اختلاف، بین a و b را حساب کن و به مقدار درصدی t (یعنی t\*10) از اختلاف به a اضافه کن.
:::

:::note
این از کلاس Mathf متعلق به namespace UnityEngine می آید.

Mathf = Math Functions یا Math Float 
:::

در UnityEngine کلاس‌هایی مثل Mathf, Vector2, Vector3, Color, Quaternion و ... این تابع را دارند.

## مثال ها :

```
float a = 0f;
float b = 10f;
float t = 0.5f;

float result = Mathf.Lerp(a, b, t);  // مقدار: 5

```

مثال با Vector3.Lerp برای حرکت نرم:

```
public class MoveObject : MonoBehaviour
{
    public Transform target;
    public float speed = 2f;

    void Update()
    {
        transform.position = Vector3.Lerp(transform.position, target.position, Time.deltaTime * speed);
    }
}

```
