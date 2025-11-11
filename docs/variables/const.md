---
title: const & readonly
sidebar_position: 3
---

## const

در زبان‌های برنامه‌نویسی از جمله #C و JavaScript، کلیدواژهٔ const برای تعریف ثابت‌ها (Constants) استفاده می‌شود. یعنی متغیری که مقدارش فقط یک‌بار قابل مقداردهی است و بعد از آن نمی‌توان آن را تغییر داد.

ویژگی‌ها:

-   باید همان لحظه که تعریف می‌شود مقداردهی شود.

-   مقدارش در زمان کامپایل مشخص می‌شود (Compile-time constant).

-   نمی‌توان بعداً مقدار آن را تغییر داد.

-   معمولاً برای ثابت‌های ریاضی، تنظیمات ثابت و ... استفاده می‌شود.

-   معمولاً با حروف بزرگ نوشته می‌شود (طبق Convention)

```
const numbers = [1, 2, 3];
numbers.push(4);      // مجاز است
// numbers = [5, 6];  // ❌ خطا: نمی‌توان مقدار جدید assign کرد
```

## readonly

در زبان #C، کلیدواژه‌ی readonly برای تعریف فیلدهایی (Fields) استفاده می‌شود که مقدارشان فقط یک‌بار قابل تعیین است، آن هم یا:

1. هنگام تعریف متغیر

2. یا درون سازنده (constructor)

و پس از آن دیگر قابل تغییر نیستند.

```
public class Player
{
    public readonly int maxHealth = 100;

    public Player(int health)
    {
        maxHealth = health; // مجاز است چون در constructor است
    }

    public void ChangeHealth()
    {
        // maxHealth = 200; // ❌ خطا: مقدار readonly را نمی‌توان اینجا تغییر داد
    }
}

```

:::caution
❌ نمی‌توان به readonly فیلد مقدار Random.Range داد، چون مقدار آن در زمان اجرا داده می‌شود و C# فقط اجازه می‌دهد readonly داخل constructor مقدار بگیرد، ولی در MonoBehaviour constructor را کنترل نمی‌کنیم.

```
public class Enemy : MonoBehaviour
{
    public readonly int id = Random.Range(1, 100); // ❌ خطا می‌دهد!
}

```

```
public class Enemy : MonoBehaviour
{
    public readonly int id;

    void Awake()
    {
        id = Random.Range(1, 100); // ❌ باز هم خطا می‌دهد چون خارج constructor است
    }
}

```

:::caution
نمی توان این گونه مقداردهی کرد چون در زمان اجرای بازی یا همان runtime مقداردهی می شوند در حالی که باید یا همان اول یا در کانستراکتر مقداردهی شوند.
:::
:::

## تفاوت readonly با const:

| ویژگی             | `const`                         | `readonly`                        |
| ----------------- | ------------------------------- | --------------------------------- |
| زمان مقداردهی     | هنگام تعریف (Compile-time)      | در تعریف یا constructor (Runtime) |
| نوع قابل استفاده  | فقط انواع ساده (int, string...) | انواع ساده و شیء (object)         |
| تغییر بعد از ساخت | ❌ غیرممکن                      | فقط در constructor مجاز است       |
| سطح کاربرد        | بیشتر برای مقدارهای عمومی ثابت  | بیشتر برای فیلدهای شیء            |

یکی از مهم ترین تفاوت های این دو در قبول مقدار شی است.
const:
فقط می‌تونه مقادیر اولیهٔ ساده (primitive types) یا ثابت‌های compile-time رو نگه‌داره.

چون مقدارش باید در زمان کامپایل مشخص باشه، نمی‌تونه شیء (object) باشه یا با new چیزی بسازه.

```
const Player player = new Player(); // ❌ خطا

```

```

public class Game
{
    public readonly Player player = new Player(); // ✅ مشکلی ندارد
}
```

یا

```

public class Game
{
    public readonly Player player;

    public Game()
    {
        player = new Player(); // ✅ مجاز
    }
}
```
