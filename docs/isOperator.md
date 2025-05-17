---
title: عملگر is
sidebar_position: 17
---

# عملگر is در سی شارپ

1. بررسی نوع (Type Check)

```
if (obj is SomeType)
```

2. هم‌زمان بررسی + تبدیل (Pattern Matching) – از C# 7 به بعد

```
if (obj is SomeType variableName)
```

این کار دو کار هم‌زمان انجام می‌ده:

✅ بررسی می‌کنه که obj از نوع SomeType هست
✅ اگر هست، اونو کست می‌کنه و در variableName ذخیره می‌کنه

## مثال

```
object value = "Hello";

if (value is string text)
{
    Console.WriteLine(text.ToUpper());
}

```
