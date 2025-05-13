---
title: enum
sidebar_position: 13
---

# enum

در C#، enum (مخفف enumeration) یک نوع داده‌ای خاصه که به شما اجازه می‌ده مجموعه‌ای از مقادیر ثابت و نام‌گذاری‌شده رو تعریف کنید.

enum بیشتر برای حالت های مختلف به کار می رود.
مثل :

-   وضعیت بازی (GameState)

-   نوع دشمن (EnemyType)

-   جهت حرکت (Direction)

-   دسته‌بندی آیتم‌ها (ItemCategory)

ما از enum استفاده می کنیم چون ثابت و به لحاظ کدنویسی امن تر هستند زیرا مثلا بر خلاف دیکشنری امکان تغییر آن ها پس از تعریف وجود ندارد.

-   ثابت (const-like)

-   تغییرناپذیر

-   مقداردهی‌شده فقط هنگام تعریف

تعریف :

```
enum Direction
{
    North,
    South,
    East,
    West
}

```

enum ها مقادیر عددی پنهان دارند که توسط خود سی شارپ داده می شود. این مقادیر مثل ایندکس از 0 شروع شده و یکی یکی اضافه می شود.
ما در enum نمی توانیم نام تکراری داشته باشیم. در اصل نام ها مانند key در آبجکت یا آیدی هستند و باید یونیک باشند اما مقادیر عددی می توانند تکراری باشند.

در صورت نیاز ما می توانیم مقادیر عددی را خودمان تعیین کنیم. این کار برای عدد های معنا دار مثل کد های رسپانس api می تواند مفید باشد.

مقداردهی دستی :

```
enum GameState
{
    Starting = 1,
    Playing = 2,
    Paused = 4,
    GameOver = 8
}

```

:::note
اگر ما همه را مقداردهی نکنیم باقی موارد خودشان به ترتیب مقداردهی می شوند.
:::

```
enum Level
{
    Low = 5,     // 5
    Medium,      // 6
    High         // 7
}

```

نمونه ای از مقداردهی معنادار :

```
enum StatusCode
{
    OK = 200,
    NotFound = 404,
    InternalError = 500
}

```

گرفتی مقدار عددی enum :

```
Direction dir = Direction.South;
int value = (int)dir;  // ➜ 1
```

گرفتن مقدار از طریق عدد :

```
Direction dir = (Direction)2;
Console.WriteLine(dir);  // ➜ East

```

:::note
enum از طریق اینسپکتور قابل مشاهده و دسترسی است.
:::

در enum عدد های (که همان مقادیر هستند) می توانند تکراری باشند اما کلمات حتما باید یونیک باشند.
:::note
در صورتی که دو کلمه مقدار یکسان داشته باشند به نوعی با هم یکسان هستند (مثلا در موارد شرطی).

```
enum Status
{
    OK = 200,
    Success = 200,
    NotFound = 404
}

class Program
{
    static void Main()
    {
        Status status = Status.Success;

        switch (status)
        {
            case Status.OK:
                Console.WriteLine("همه چیز خوبه!");
                break;

            case Status.NotFound:
                Console.WriteLine("پیدا نشد!");
                break;
        }
    }
}

```

خروجی

```
همه چیز خوبه!

```

:::

:::caution
با این طور کدنویسی خطا دریافت می کنیم. چون هردو یک مقدار هستند.

```

case Status.OK:
    Console.WriteLine("OK");
    break;

case Status.Success:
    Console.WriteLine("Success");
    break;

```

باید به جای کد بالا در صورت نیاز به استفاده از هردو اسم به این شکل بنویسیم :

```
if (status == Status.OK || status == Status.Success)
{
    Console.WriteLine("همه چیز خوبه!");
}

```

:::

:::tip
در مجموع و نهایتا :
**ما از enum استفاده می‌کنیم چون می‌خواهیم متغیری داشته باشیم که فقط "مقدارهایی مشخص و از پیش تعیین‌شده" را بپذیرد.**
:::

در enum ما متوانیم مقادیر را به شکل زیر هم تعریف کنیم که یعنی ترکیبی از داه های دیگر.

```
enum PermissionLevel
{
    Read = 1,       // 0001
    Write = 2,      // 0010
    Execute = 4,    // 0100
    Full = Read | Write | Execute  // 0001 | 0010 | 0100 = 0111 → 7
}

```

## مثال ها :

```
// در این مثال نوع currentState از نوع GameState هست و می تواند فقط 4 مقدار از پیش تعیین شده را بگیرد.

public enum GameState
{
    MainMenu,
    Playing,
    Paused,
    GameOver
}

public class GameManager : MonoBehaviour
{
    public GameState currentState;

    void Start()
    {
        currentState = GameState.MainMenu;
    }

    void Update()
    {
        switch (currentState)
        {
            case GameState.MainMenu:
                Debug.Log("نمایش منو اصلی");
                break;
            case GameState.Playing:
                Debug.Log("بازی در حال اجراست");
                break;
            case GameState.Paused:
                Debug.Log("بازی متوقف شده");
                break;
            case GameState.GameOver:
                Debug.Log("پایان بازی");
                break;
        }
    }
}
```

```
enum UserRole
{
    Guest,
    User,
    Moderator,
    Admin
}

class AccessManager
{
    public static void CheckPermission(UserRole role)
    {
        switch (role)
        {
            case UserRole.Guest:
                Console.WriteLine("فقط مشاهده مجاز است.");
                break;
            case UserRole.User:
                Console.WriteLine("اجازه ارسال نظر دارید.");
                break;
            case UserRole.Moderator:
                Console.WriteLine("می‌توانید نظرات را مدیریت کنید.");
                break;
            case UserRole.Admin:
                Console.WriteLine("دسترسی کامل دارید.");
                break;
        }
    }
}

class Program
{
    static void Main()
    {
        AccessManager.CheckPermission(UserRole.Moderator);
    }
}
```
