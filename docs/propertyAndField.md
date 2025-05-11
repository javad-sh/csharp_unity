---
title: تفاوت پراپرتی با فیلد
sidebar_position: 6
---

# پراپرتی (Property)

در زبان #C، پراپرتی (Property) ترکیبی از فیلد (متغیر عضو کلاس) و متدهای get/set است که اجازه می‌دهد به صورت امن‌تر و کنترل‌شده‌تری به داده‌های کلاس دسترسی پیدا کنیم. پراپرتی‌ها امکان می‌دهند که خواندن و نوشتن مقدار یک فیلد با منطق خاصی انجام شود، بدون اینکه مستقیم به خود فیلد دسترسی داده شود.

```
private int _health; // فیلد پنهان

public int Health // پراپرتی
{
    get { return _health; }         // برای خواندن مقدار
    set { _health = Mathf.Max(0, value); } // برای مقداردهی (با کنترل خاص)
}
```

| اصطلاح  | معنی                                     |
| ------- | ---------------------------------------- |
| `get`   | زمانی که از بیرون مقدار را می‌خواهند     |
| `set`   | زمانی که از بیرون مقدار را تغییر می‌دهند |
| `value` | مقدار ورودی که هنگام `set` ارسال می‌شود  |

```
    private int _score;

    public int Score
    {
        get { return _score; }
        set
        {
            if (value >= 0)
                _score = value;
        }
    }

```

## پراپرتی Auto-Implemented

اگر ما نیازی خاصی به کنترل روی مثلا موارد set نداریم و فقط می خواهم اجازه ی نوشتن و یا خواندن را تعیین کنیم می توانیم از این روش بدون فیلد پشتیبان استفاده کنیم.

```
public int Age { get; private set; } // فقط از داخل کلاس قابل تغییر است

public string Password { private get; set; } // فقط از داخل کلاس خوانده می‌شود

```

معادل با فیلد پشتبان و تنظیم سطح دسترسی :

```
    private bool _isMuted; // فیلد خصوصی پشتیبان

    public bool IsMuted
    {
        get { return _isMuted; }           // همه جا قابل خواندن
        private set { _isMuted = value; }  // فقط داخل کلاس قابل نوشتن
    }

```

```
    private int _health;

    public int Health
    {
        get { return _health; }
        set
        {
            if (value >= 0) // شرط خاص
            {
                _health = value;
            }
            else
            {
                Debug.LogWarning("Health نمی‌تواند منفی باشد!");
            }
        }
    }

```

## نکته

این دو در واقع معادل یکدیگر هستند

```
private string _name;

public string Name
{
    get { return _name; }
    set { _name = value; }
}

```

و

```
public string Name;
```

اما باز هم استفاده از پراپرتی بهتره.

چرا با مثال :

استفاده از فیلد در اول پروژه :

```
public class Player : MonoBehaviour
{
    public int Score; // فیلد عمومی ساده
}

```

بعد از مدتی متوجه می‌شی که در بعضی موقعیت‌ها، Score مقدار منفی می‌گیره و بازی مشکل پیدا می‌کنه. پس می‌خوای موقع set شدن، بررسی کنی که مقدار منفی نباشه.

اما چون Score یک فیلد عمومیه، نمی‌تونی به‌راحتی منطق بهش اضافه کنی. پس باید بری کل پروژه رو بگردی و هر جا که از player.Score استفاده شده تغییر بدی! 😓

```
public class Player : MonoBehaviour
{
    private int _score;

    public int Score
    {
        get { return _score; }
        set { _score = Mathf.Max(0, value); } // منطق جدید اضافه شد
    }
}
```

```
scoreText.text = player.Score.ToString(); // بدون تغییر!
player.Score = -10; // حالا دیگه مقدار منفی پذیرفته نمی‌شه
```

:::tip
اگر فکر می‌کنی ممکنه بعداً بخوای شرط، log، یا event اضافه کنی:
✅ از همون اول پراپرتی استفاده کن—even اگر الان ساده باشه.
:::


:::caution
اگر با استفاده از [SerializeField] مقدار را در اینسپکتور تغییر دهیم به پراپرتی ها توجهی نمی شود و با مقدار اینسپکتور کار پیش می رود.
:::


راه حل ها :

| راه‌حل                                              | توضیح                                         |
| --------------------------------------------------- | --------------------------------------------- |
| فقط از پراپرتی استفاده کن و مقدار رو با کد تنظیم کن | از Inspector مقدار نده                        |
| مقدار رو در `Awake()` یا `OnValidate()` اصلاح کن    | بعد از لود شدن مقدار از Inspector، اصلاحش کن  |
| از Custom Inspector یا Odin Inspector استفاده کن    | ابزارهایی که پراپرتی‌ها رو هم پشتیبانی می‌کنن |
