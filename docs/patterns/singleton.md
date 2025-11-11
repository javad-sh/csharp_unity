---
title: الگوی Singleton
sidebar_position: 1
---


# Singleton 

```
void Awake()
{
    if (Instance != null && Instance != this)
    {
        Destroy(gameObject); // نمونه تکراری حذف می‌شود
        return;
    }

    Instance = this;
    DontDestroyOnLoad(gameObject); // در تغییر صحنه‌ها باقی می‌ماند
}

```