---
title: System.Linq
sidebar_position: 8
---

# System.Linq

LINQ مخفف Language Integrated Query است.

به شما اجازه می‌دهد روی مجموعه‌ها با استفاده از سینتکس شبیه به SQL یا متدهای زنجیره‌ای عملیات انجام دهید.

قابلیت استفاده در:

آرایه‌ها (int[], string[])

لیست‌ها `(List<T>)`

دیتابیس‌ها (Entity Framework)

XML و JSON

Unity (برای کار با مجموعه‌ها در گیم‌پلی)


| نوع          | نام                                      | توضیح                                                                                                                          |
| ------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **کلاس**     | `Enumerable`                             | کلاس اصلی LINQ برای مجموعه‌های **`IEnumerable<T`>**. همه متدهای اصلی LINQ (مثل `Where`, `Select`, `ToList`) اینجا تعریف شده‌اند. |
| **کلاس**     | `Queryable`                              | برای مجموعه‌هایی از نوع `IQueryable<T>` که معمولاً برای دیتابیس‌ها استفاده می‌شود (Entity Framework).                          |
| **اینترفیس** | `IOrderedEnumerable<T>`                  | خروجی متدهایی مثل `OrderBy` و `ThenBy` است. ترتیب را نگه می‌دارد.                                                              |
| **کلاس**     | `Lookup<TKey, TElement>`                 | نوع خاصی از ساختار داده برای گروه‌بندی با کلید. شبیه Dictionary ولی اجازه چند مقدار برای یک کلید را می‌دهد.                    |
| **کلاس**     | `Grouping<TKey, TElement>`               | نمایان‌گر یک گروه در متد `GroupBy`. کلید و عناصر را نگه می‌دارد.                                                               |
| **کلاس**     | `EnumerableExecutor` و `EnumerableQuery` | برای پیاده‌سازی سفارشی در کوئری‌های LINQ به کار می‌روند، معمولاً در پشت صحنه. کاربرد خاص دارند.                                |


```
using System.Linq;
using System.Collections.Generic;
using UnityEngine;

public class Example : MonoBehaviour
{
    void Start()
    {
        List<int> scores = new List<int> { 10, 20, 30, 40, 50 };

        // فیلتر کردن
        var highScores = scores.Where(score => score > 25).ToList();

        // میانگین
        float avg = scores.Average();

        // تبدیل
        var stringScores = scores.Select(s => "امتیاز: " + s).ToList();

        foreach (var s in stringScores)
            Debug.Log(s);
    }
}


```