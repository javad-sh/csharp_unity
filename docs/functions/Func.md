---
title: Func و Delegate
sidebar_position: 3
---

# Func

در C#، System.Func یک delegate جنریک است که نمایانگر یک تابع بازگشتی است (یعنی تابعی که مقداری را برمی‌گرداند).
به زبان ساده‌تر، Func برای اشاره به متدی استفاده می‌شود که:

یک یا چند ورودی می‌گیرد.

یک خروجی (یا مقدار بازگشتی) دارد.

```
public delegate TResult Func<in T1, ..., in Tn, out TResult>()

```

پارامترهای جنریک T1 تا Tn نوع پارامترهای ورودی هستند.

پارامتر آخر (TResult) نوع خروجی تابع است.

## مثال های کاربرد

بدون ورودی، فقط خروجی

```
Func<int> getRandom = () => UnityEngine.Random.Range(1, 100);
Debug.Log(getRandom()); // مثلاً 42

```

یک ورودی، یک خروجی

```
Func<int, int> square = x => x * x;
Debug.Log(square(5)); // 25
```

چند ورودی، یک خروجی

```
Func<int, int, int> add = (a, b) => a + b;
Debug.Log(add(3, 7)); // 10
```

استفاده در متدهای LINQ (خیلی رایج):

```
List<string> names = new List<string> { "Ali", "Sara", "Mehdi" };
var shortNames = names.Where(name => name.Length <= 4);  // اینجا هم Func استفاده شده
```

## مثال در جایی که نمی شود از متد استفاده کرد

```
using System;
using System.Collections.Generic;
using UnityEngine;

public class StrategyExample : MonoBehaviour
{
    private List<Func<int>> strategies;

    void Start()
    {
        strategies = new List<Func<int>>
        {
            () => UnityEngine.Random.Range(1, 10),
            () => UnityEngine.Random.Range(100, 200),
            () => 42
        };

        int index = UnityEngine.Random.Range(0, strategies.Count);
        int result = strategies[index]();
        Debug.Log("Result: " + result);
    }
}

```

برای انجام این کار با تابع باید سه تابع جداگانه تعریف کرد

```
int Strategy1() => UnityEngine.Random.Range(1, 10);
int Strategy2() => UnityEngine.Random.Range(100, 200);
int Strategy3() => 42;
```

اما باز هم نمی شود آن ها را در لیست قرار داد.
چون توابع بر خلاف func نمی توانند عضو لیست شوند.

:::tip
جایی که تابع باید به‌صورت داده (Data) ذخیره، ارسال یا انتخاب شود، فقط Func (یا delegate) جواب می‌دهد.
توابع معمولی به‌خودی‌خود نمی‌تونن در لیست یا دیکشنری قرار بگیرن یا پاس داده بشن.
:::
