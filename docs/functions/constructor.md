---
title: Constructor (سازنده)
sidebar_position: 2
---

# Constructor یا تابع سازنده

Constructor یا تابع سازنده تابعی است که وقتی که ما از یک کلاس شی می سازیم (با استفاده از new) اجرا می شود. و وظیفه ی آن معمولا مقداردهی اولیه ی اعضای کلاس مثل فیلد ها و پراپرتی ها است.

این تابع هم نام با کلاس نوشته می شود و مقداری را برنمی گرداند. حتی نوشتن void هم لازم نیست.

:::note
اگر هیچ کانستراکتوری ننویسی، کامپایلر خودکار یک کانستراکتور بدون پارامتر اضافه می‌کند.

اما اگر حتی یک کانستراکتور بنویسی (مثلاً پارامتردار)، دیگه کامپایلر به صورت خودکار کانستراکتور پیش‌فرض اضافه نمی‌کنه. و اگه لازم داری، باید خودت بنویسی.
:::

## مثال ها

```
// مقدار دهی پیش فرض
// در این مثال هنگام ساخت شی مقادیر پیش فرض جایگذاری می شوند

public class Player
{
    public string name;
    public int health;

    // Constructor
    public Player()
    {
        name = "Unknown";
        health = 100;
    }
}

```

```
// پارامتر دار
public class Weapon
{
    public string Name;
    public int Damage;

    // Constructor
    public Weapon(string name, int damage)
    {
        Name = name;
        Damage = damage;
    }
}

Weapon sword = new Weapon("Sword", 25);


```

```
// استاتیک

public class Config
{
    public static string appName;

    static Config()
    {
        appName = "MyApp";
    }
}


```

## روش های تعریف مقدار پیش فرض

```
// تعریف مقدار پیش فرض برای پارامتر در تابع

public class Player
{
    public string Name;

    // مقدار پیش‌فرض در پارامتر قرار داده شده
    public Player(string name = "Unknown")
    {
        Name = name;
    }
}

Player p1 = new Player();         // مقدار name = "Unknown"
Player p2 = new Player("Ali");    // مقدار name = "Ali"

```

```
// استفاده از چند کانستراکتور

public class Player
{
    public string Name;

    // کانستراکتور بدون پارامتر
    public Player()
    {
        Name = "Unknown";
    }

    // کانستراکتور با پارامتر
    public Player(string name)
    {
        Name = name;
    }
}

Player p1 = new Player();         // name = "Unknown"
Player p2 = new Player("Ali");    // name = "Ali"

```

:::tip
ما هنوز می توانیم از روش قدیمی برای مقداردهی استفاده کنیم اما استفاده از کانستراکتور حداقل 2 مزیت مهم دارد:

1. جلوگیری از مقداردهی ناقص : وقتی ما از کانستراکتور استفاده می کنیم مجبور می شویم همه مقادیر را بدهیم چون در غیر این صورت خطا دریافت می کنیم.

2. افزایش خوانایی و ساده سازی کد

روش قدیمی :

```
Player p = new Player();
p.Name = "Sara";
p.Health = 80;

```

:::
