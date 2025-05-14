---
title: Boot Scene
sidebar_position: 2
---

# صحنه ی boot

معمولا اولین صحنه ی بازی است که برای اینشیالایز کردن بازی استفاده می شود.

مثلا برای تعیین فریم ریت :

```
using UnityEngine;

public class BootConfig : MonoBehaviour
{
    [SerializeField] int targetFPS = 60;

    void Awake()
    {
        QualitySettings.vSyncCount = 0;             // غیرفعال کردن VSync
        Application.targetFrameRate = targetFPS;    // محدود کردن فریم‌ریت
        DontDestroyOnLoad(gameObject);              // حفظ این شی در صحنه‌های بعدی (در صورت نیاز)
    }
}

// اگر از vSyncCount استفاده کنی (مثلاً 1 یا 2)، یونیتی فریم‌ریت رو خودش تنظیم می‌کنه و ممکنه targetFrameRate رو نادیده بگیره. برای کنترل کامل، همیشه vSyncCount = 0 بذار.
```
