---
title: UnityEvent و UnityAction - سیستم رویداد یونیتی
sidebar_position: 5
---


# UnityEvent / UnityAction
بسیار خوب، به سراغ یکی از قدرتمندترین و پرکاربردترین ابزارهای مخصوص یونیتی می‌رویم: `UnityEvent` و `UnityAction`. این سیستم رویداد، ستون فقرات بسیاری از تعاملات در ویرایشگر یونیتی است و به طراحان بازی اجازه می‌دهد بدون نوشتن حتی یک خط کد، منطق بازی را به هم متصل کنند.

### UnityAction و UnityEvent چیست؟

*   **`UnityAction`**: این دقیقاً معادل یونیتی برای `System.Action` است. `UnityAction` یک `delegate` است که یونیتی برای سیستم رویداد خود از آن استفاده می‌کند. مانند `Action`، نسخه‌های مختلفی دارد که می‌توانند پارامترهای متفاوتی را بپذیرند (`UnityAction`, `UnityAction<T0>`, `UnityAction<T0, T1>` و غیره).

*   **`UnityEvent`**: این کلاس، قلب سیستم رویداد یونیتی است. `UnityEvent` یک کلاس قابل سریال‌سازی (Serializable) است که لیستی از `UnityAction` ها را در خود نگه می‌دارد. **مهم‌ترین ویژگی `UnityEvent` این است که در پنجره Inspector یونیتی نمایش داده می‌شود.** این به شما اجازه می‌دهد تا به صورت بصری و با کشیدن و رها کردن (Drag & Drop)، مشخص کنید که با فراخوانی این رویداد، کدام متدها از کدام کامپوننت‌ها باید اجرا شوند.

### تفاوت‌های کلیدی بین `C# event` و `UnityEvent`

| ویژگی | `event` (با `Action` یا `delegate` سفارشی) | `UnityEvent` |
| :--- | :--- | :--- |
| **نمایش در Inspector** |  خیر | **بله (ویژگی اصلی)** |
| **سریال‌سازی** | خیر (اتصالات در زمان اجرا ایجاد می‌شوند) | **بله (اتصالات در صحنه یا Prefab ذخیره می‌شوند)** |
| **دسترسی برای طراحان** | خیر (فقط برنامه‌نویس می‌تواند متدها را متصل کند) | **بله (طراحان بازی می‌توانند منطق را در Inspector متصل کنند)** |
| **عملکرد (Performance)** | بسیار سریع (فراخوانی مستقیم delegate) | کمی کندتر (به دلیل استفاده از Reflection برای فراخوانی) |
| **ایمنی نوع (Type Safety)** | در زمان کامپایل (Compile-time) | در زمان ویرایش (Editor-time). متدهای نامناسب در لیست Inspector نشان داده نمی‌شوند. |
| **فراخوانی متدهای با پارامتر**| فقط به صورت پویا از طریق کد | **هم به صورت پویا و هم با مقدار ثابت از Inspector** |

---

### مثال ۱: ساده (دکمه بازکننده در)

این کلاسیک‌ترین مثال برای `UnityEvent` است. یک دکمه داریم که با فشرده شدن، یک در را باز می‌کند، بدون اینکه این دو اسکریپت هیچ اطلاعی از هم داشته باشند.

**اسکریپت `Door.cs` (دارای متد قابل فراخوانی):**

```csharp
using UnityEngine;

public class Door : MonoBehaviour
{
    // متد عمومی که قرار است از بیرون فراخوانی شود
    public void OpenDoor()
    {
        Debug.Log("در باز شد!");
        // در اینجا می‌توانید انیمیشن باز شدن در را اجرا کنید
        gameObject.transform.Rotate(0, 90, 0);
    }
}
```

**اسکریپت `PressurePlate.cs` (ناشر رویداد):**

```csharp
using UnityEngine;
using UnityEngine.Events; // این namespace برای UnityEvent ضروری است

public class PressurePlate : MonoBehaviour
{
    // 1. تعریف یک UnityEvent عمومی تا در Inspector نمایش داده شود
    public UnityEvent OnPlatePressed;

    private void OnTriggerEnter(Collider other)
    {
        // بررسی اینکه آیا بازیکن روی صفحه قدم گذاشته است
        if (other.CompareTag("Player"))
        {
            Debug.Log("صفحه فشرده شد، رویداد فراخوانی می‌شود...");
            // 2. فراخوانی رویداد. تمام متدهای ثبت‌شده در Inspector اجرا خواهند شد.
            OnPlatePressed.Invoke();
        }
    }
}
```

**نحوه تنظیم در ویرایشگر یونیتی:**

1.  یک آبجکت `Door` و یک آبجکت `PressurePlate` (با یک `Collider` از نوع Trigger) در صحنه بسازید.
2.  اسکریپت `Door.cs` را به آبجکت در و اسکریپت `PressurePlate.cs` را به آبجکت صفحه فشاری متصل کنید.
3.  آبجکت `PressurePlate` را انتخاب کنید. در Inspector، کامپوننت `PressurePlate` را پیدا کنید. شما فیلد `On Plate Pressed` را خواهید دید.
4.  روی دکمه `+` کلیک کنید.
5.  آبجکت `Door` را از Hierarchy به داخل فیلدی که نوشته `None (Object)` بکشید و رها کنید.
6.  از منوی کشویی سمت راست که نوشته `No Function`، ابتدا `Door` و سپس متد `OpenDoor()` را انتخاب کنید.

تمام! حالا هر زمان که بازیکن وارد Trigger صفحه فشاری شود، متد `OpenDoor` از اسکریپت `Door` به صورت خودکار فراخوانی می‌شود.

---

### مثال ۲: متوسط (ارسال داده با `UnityEvent<T>`)

در این مثال، یک رویداد برای آسیب زدن به دشمن ایجاد می‌کنیم که مقدار آسیب را نیز به عنوان پارامتر ارسال می‌کند.

**اسکریپت `EnemyHealth.cs` (دارای متد قابل فراخوانی با پارامتر):**

```csharp
using UnityEngine;
using UnityEngine.UI;

public class EnemyHealth : MonoBehaviour
{
    public float health = 100;
    public Slider healthSlider;

    // متد عمومی که مقدار آسیب را دریافت می‌کند
    public void TakeDamage(float damageAmount)
    {
        health -= damageAmount;
        Debug.Log($"دشمن {damageAmount} آسیب دید. سلامتی فعلی: {health}");

        if(healthSlider != null)
        {
            healthSlider.value = health / 100f;
        }

        if (health <= 0)
        {
            Destroy(gameObject);
        }
    }
}
```

**اسکریپت `PlayerAttack.cs` (ناشر رویداد با پارامتر):**

```csharp
using UnityEngine;
using UnityEngine.Events;

// 1. یک کلاس جدید برای رویداد خود تعریف می‌کنیم تا بتوانیم نوع پارامتر را مشخص کنیم
// این کار باعث می‌شود که در Inspector به درستی نمایش داده شود
[System.Serializable]
public class DamageEvent : UnityEvent<float> { }

public class PlayerAttack : MonoBehaviour
{
    public float attackDamage = 25f;

    // 2. یک نمونه از کلاس رویداد خودمان را تعریف می‌کنیم
    public DamageEvent OnAttackHit;

    void Update()
    {
        // با کلیک چپ ماوس، حمله کن
        if (Input.GetMouseButtonDown(0))
        {
            // در یک بازی واقعی، اینجا باید با Raycast برخورد با دشمن را تشخیص دهیم
            // اما برای سادگی، فقط رویداد را فراخوانی می‌کنیم
            Debug.Log("حمله انجام شد، رویداد آسیب فراخوانی می‌شود...");
            
            // 3. فراخوانی رویداد و ارسال مقدار آسیب به عنوان پارامتر
            OnAttackHit.Invoke(attackDamage);
        }
    }
}
```

**نحوه تنظیم در ویرایشگر یونیتی:**

1.  اسکریپت `PlayerAttack` را به بازیکن و اسکریپت `EnemyHealth` را به یک دشمن متصل کنید.
2.  آبجکت `Player` را انتخاب کنید. در Inspector، رویداد `On Attack Hit` را می‌بینید.
3.  روی `+` کلیک کرده و آبجکت `Enemy` را به فیلد آبجکت بکشید.
4.  از منوی کشویی توابع، به بخش **Dynamic float** بروید و `EnemyHealth.TakeDamage` را انتخاب کنید.
    *   **نکته مهم:** وقتی شما یک تابع را از بخش "Dynamic" انتخاب می‌کنید، مقداری که در کد با `Invoke` ارسال می‌شود (`attackDamage`) به صورت خودکار به آن متد پاس داده می‌شود. اگر از بخش "Static" انتخاب کنید، خودتان باید یک مقدار ثابت را در Inspector وارد کنید.

حالا با هر بار کلیک، `PlayerAttack` رویداد را با مقدار `25` فراخوانی کرده و متد `TakeDamage` در `EnemyHealth` با همین مقدار اجرا می‌شود.

---

### مثال ۳: پیشرفته (ترکیب `UnityEvent` با ثبت‌نام از طریق کد)

`UnityEvent` فقط برای استفاده در Inspector نیست. شما می‌توانید از طریق کد نیز به آن Listener (شنونده) اضافه کنید. این روش بهترین ویژگی‌های هر دو دنیا را ترکیب می‌کند: انعطاف‌پذیری Inspector برای طراحان و قدرت برنامه‌نویسی برای سیستم‌های پیچیده.

**`GameClock.cs` (ناشر رویداد):**

```csharp
using UnityEngine;
using UnityEngine.Events;

public class GameClock : MonoBehaviour
{
    // این رویداد هم در Inspector قابل تنظیم است و هم از طریق کد
    public UnityEvent OnMinutePassed;
    public UnityEvent<int> OnHourPassed; // رویداد با پارامتر ساعت جدید

    private float timer = 0f;
    private int currentHour = 0;

    void Update()
    {
        timer += Time.deltaTime;

        // فرض کنیم هر 1 ثانیه، 1 دقیقه در بازی است
        if (timer >= 1f)
        {
            timer = 0f;
            // فراخوانی رویداد دقیقه
            OnMinutePassed.Invoke();
        }
    }

    // این متد توسط OnMinutePassed از طریق Inspector فراخوانی خواهد شد
    public void CheckForHourChange()
    {
        // فرض کنیم هر 60 دقیقه یک ساعت است
        // این یک مثال ساده است
        currentHour = (currentHour + 1) % 24;
        OnHourPassed.Invoke(currentHour);
    }
}
```

**`WeatherSystem.cs` (مشترک رویداد از طریق کد):**

```csharp
using UnityEngine;

public class WeatherSystem : MonoBehaviour
{
    // رفرنس به ناشر رویداد
    public GameClock gameClock;

    private void OnEnable()
    {
        // 1. ثبت‌نام یک متد در رویداد از طریق کد
        // از AddListener برای این کار استفاده می‌کنیم
        if (gameClock != null)
        {
            gameClock.OnHourPassed.AddListener(ChangeWeather);
        }
    }

    private void OnDisable()
    {
        // 2. لغو ثبت‌نام برای جلوگیری از خطا
        // از RemoveListener استفاده می‌کنیم
        if (gameClock != null)
        {
            gameClock.OnHourPassed.RemoveListener(ChangeWeather);
        }
    }

    // متدی که با فراخوانی رویداد OnHourPassed اجرا می‌شود
    private void ChangeWeather(int hour)
    {
        if (hour >= 6 && hour < 18)
        {
            Debug.Log($"ساعت {hour} است. هوا آفتابی شد.");
            // تغییر Skybox به روز
        }
        else
        {
            Debug.Log($"ساعت {hour} است. هوا تاریک شد.");
            // تغییر Skybox به شب
        }
    }
}
```

**نحوه تنظیم:**

1.  در صحنه، یک آبجکت `GameClock` و یک آبجکت `WeatherSystem` بسازید. اسکریپت‌های مربوطه را به آن‌ها متصل کنید.
2.  در `WeatherSystem`، آبجکت `GameClock` را به فیلد `gameClock` اختصاص دهید.
3.  حالا آبجکت `GameClock` را انتخاب کنید. در رویداد `On Minute Passed` روی `+` کلیک کنید.
4.  خود آبجکت `GameClock` را به فیلد آبجکت بکشید.
5.  از لیست توابع، `GameClock.CheckForHourChange` را انتخاب کنید.

**توضیحات:**
در این معماری، یک زنجیره رویداد داریم:
*   هر "دقیقه" (هر ثانیه در دنیای واقعی)، `OnMinutePassed` فراخوانی می‌شود.
*   ما از طریق Inspector تنظیم کرده‌ایم که این رویداد، متد `CheckForHourChange` را از خود `GameClock` اجرا کند.
*   متد `CheckForHourChange` رویداد `OnHourPassed` را فراخوانی می‌کند.
*   اسکریپت `WeatherSystem` از طریق کد به رویداد `OnHourPassed` گوش می‌دهد و با هر بار فراخوانی، آب و هوا را تغییر می‌دهد.

این روش به طراح اجازه می‌دهد تا سرعت گذر زمان را از طریق رویداد اول کنترل کند، در حالی که سیستم‌های پیچیده‌تر مانند آب و هوا به صورت برنامه‌نویسی به رویدادهای سطح بالاتر متصل می‌شوند.