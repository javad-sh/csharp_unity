---
title: متد OnValidate
sidebar_position: 3
---

# متد OnValidate

متد OnValidate() فقط در Editor Mode و در زمان تغییر مقادیر از طریق Inspector اجرا می‌شه — نه در زمان اجرا (Play Mode) و نه در زمان تغییر مقدار از طریق کد و برای اعتبارسنجی مقادیر استفاده میشه.

```
[SerializeField] private int health;

void OnValidate()
{
    if (health < 0)
    {
        Debug.LogWarning("مقدار health نمی‌تواند منفی باشد. اصلاح شد.");
        health = 0;
    }
}

```

```
[SerializeField] [Range(0f, 10f)] private float speed;

void OnValidate()
{
    speed = Mathf.Clamp(speed, 0f, 10f);
}

```

```
[SerializeField] private GameObject bulletPrefab;

void OnValidate()
{
    if (bulletPrefab == null)
        Debug.LogError("BulletPrefab باید تنظیم شود!");
}

```

```
[SerializeField] private Color backgroundColor;

void OnValidate()
{
    if (backgroundColor.a == 0) // اگر رنگ بی‌رنگ بود
        backgroundColor = Color.white;
}

```

```
[SerializeField] private string enemyType;

void OnValidate()
{
    gameObject.name = $"Enemy - {enemyType}";
}

```

```
[SerializeField] private List<Transform> waypoints;

void OnValidate()
{
    if (waypoints.Count == 0)
        waypoints.AddRange(GetComponentsInChildren<Transform>());
}

```
| موقعیت                                    | اجرا می‌شود؟         |
| ----------------------------------------- | -------------------- |
| مقداردهی از **Inspector** (در حالت Edit)  | ✅ بله                |
| تغییر اسکریپت (ذخیره فایل .cs)            | ✅ بله                |
| اجرای بازی (`Play`)                       | ✅ یک‌بار قبل از اجرا |
| تغییر مقدار از Inspector در زمان اجرا     | ❌ خیر                |
| تغییر مقدار با کد (در زمان اجرا)          | ❌ خیر                |
| ساختن یا اضافه کردن کامپوننت به گیم‌آبجکت | ✅ بله                |
