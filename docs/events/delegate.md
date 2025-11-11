---
title: Delegate سفارشی (Custom Delegate)
sidebar_position: 4
---

بسیار عالی! درخواست شما به یک موضوع کلیدی و بسیار مهم در معماری نرم‌افزار با سی‌شارپ اشاره دارد. استفاده از `delegate` و `event` های سفارشی (Custom) زمانی اهمیت پیدا می‌کند که `Action` و `Func` های پیش‌ساخته، گویای معنای رویداد شما نباشند و یا بخواهید یک API خواناتر و واضح‌تر طراحی کنید.

### Delegate و Event سفارشی: چرا و چه زمانی؟

همانطور که دیدیم، `Action` یک `delegate` بسیار کاربردی است. اما فرض کنید در یک پروژه بزرگ، چندین رویداد مختلف دارید که همگی یک امضای یکسان دارند، مثلاً `Action<int, string>`. این موضوع می‌تواند باعث سردرگمی شود:

*   `public event Action<int, string> OnPlayerScored;`
*   `public event Action<int, string> OnItemPurchased;`
*   `public event Action<int, string> OnQuestCompleted;`

اگرچه این کد کار می‌کند، اما خوانایی بالایی ندارد. یک برنامه‌نویس دیگر (یا حتی خودتان در آینده) ممکن است به اشتباه متدی که برای امتیازدهی است را به رویداد خرید آیتم متصل کند و کامپایلر هیچ خطایی نخواهد گرفت.

**راه‌حل، تعریف `delegate` سفارشی است.** با این کار، شما یک "نوع" جدید برای امضای متد خود ایجاد می‌کنید که نام آن، گویای هدف آن است. این کار به شدت خوانایی کد را بالا برده و از خطاهای منطقی جلوگیری می‌کند.

**قاعده کلی:**
*   **برای رویدادهای داخلی و سریع:** از `Action` و `Func` استفاده کنید.
*   **برای طراحی API های عمومی، فریم‌ورک‌ها، یا رویدادهای مهم در معماری سیستم:** از `delegate` های سفارشی استفاده کنید تا "قرارداد" (Contract) واضحی تعریف کرده باشید.

---

### مثال ۱: ساده (رویداد شروع بازی)

در این مثال، یک رویداد ساده برای اعلام "شروع بازی" بدون هیچ پارامتری ایجاد می‌کنیم.

**`GameManager.cs` (ناشر رویداد):**

```csharp
using UnityEngine;

// 1. تعریف Delegate سفارشی
// نام آن به وضوح نشان می‌دهد که برای چه کاری است.
public delegate void GameStartDelegate();

public class GameManager : MonoBehaviour
{
    // 2. تعریف Event با استفاده از Delegate سفارشی
    // این رویداد فقط می‌تواند متدهایی با امضای GameStartDelegate را در خود نگه دارد.
    public static event GameStartDelegate OnGameStarted;

    void Start()
    {
        // پس از 3 ثانیه، بازی را شروع کن
        Invoke("StartGame", 3f);
    }

    void StartGame()
    {
        Debug.Log("رویداد شروع بازی فراخوانی شد!");
        // 3. فراخوانی (Raise) رویداد
        OnGameStarted?.Invoke();
    }
}
```

**`PlayerSpawner.cs` (مشترک رویداد):**

```csharp
using UnityEngine;

public class PlayerSpawner : MonoBehaviour
{
    public GameObject playerPrefab;

    private void OnEnable()
    {
        // ثبت‌نام در رویداد با استفاده از delegate سفارشی
        GameManager.OnGameStarted += SpawnPlayer;
    }

    private void OnDisable()
    {
        // لغو ثبت‌نام برای جلوگیری از نشت حافظه
        GameManager.OnGameStarted -= SpawnPlayer;
    }

    // متدی که با امضای GameStartDelegate مطابقت دارد
    private void SpawnPlayer()
    {
        Debug.Log("بازیکن در صحنه ایجاد شد!");
        Instantiate(playerPrefab, transform.position, Quaternion.identity);
    }
}
```

**توضیحات:**
ما یک نوع جدید به نام `GameStartDelegate` تعریف کردیم. حالا `OnGameStarted` فقط و فقط می‌تواند متدهایی را بپذیرد که هیچ ورودی ندارند و `void` برمی‌گردانند و از نظر معنایی به شروع بازی مرتبط هستند.

---

### مثال ۲: متوسط (ارسال اطلاعات مربوط به امتیاز با Delegate سفارشی)

در این مثال، می‌خواهیم وقتی بازیکنی امتیازی کسب می‌کند، نام بازیکن و مقدار امتیاز کسب شده را از طریق یک رویداد ارسال کنیم.

**`ScoreSystem.cs` (ناشر رویداد):**

```csharp
using UnityEngine;

// 1. تعریف Delegate سفارشی با پارامترهای مشخص و معنادار
public delegate void ScoreAddedDelegate(string playerName, int newScore);

public class ScoreSystem : MonoBehaviour
{
    // 2. تعریف Event با استفاده از delegate سفارشی
    public static event ScoreAddedDelegate OnScoreAdded;

    private int score;

    // متدی برای افزودن امتیاز و انتشار رویداد
    public void AddScore(string playerName, int amount)
    {
        score += amount;
        Debug.Log($"امتیاز {amount} به بازیکن {playerName} اضافه شد.");

        // 3. فراخوانی رویداد و ارسال داده‌ها
        OnScoreAdded?.Invoke(playerName, score);
    }

    // برای تست
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.A))
        {
            AddScore("Player 1", 10);
        }
    }
}
```

**`ScoreUI.cs` (مشترک رویداد):**

```csharp
using UnityEngine;
using UnityEngine.UI;

public class ScoreUI : MonoBehaviour
{
    public Text scoreText;

    private void OnEnable()
    {
        // ثبت‌نام در رویداد
        ScoreSystem.OnScoreAdded += UpdateUI;
    }

    private void OnDisable()
    {
        // لغو ثبت‌نام
        ScoreSystem.OnScoreAdded -= UpdateUI;
    }

    // این متد باید دقیقاً امضای ScoreAddedDelegate را داشته باشد
    private void UpdateUI(string name, int totalScore)
    {
        scoreText.text = $"بازیکن: {name} | امتیاز: {totalScore}";
    }
}
```

**توضیحات:**
`ScoreAddedDelegate` به وضوح نشان می‌دهد که این رویداد مربوط به امتیاز است و دو پارامتر، یکی برای نام بازیکن و دیگری برای امتیاز جدید، ارسال می‌کند. این بسیار خواناتر از `Action<string, int>` است.

---

### مثال ۳: پیشرفته (الگوی استاندارد دات نت با `sender` و `EventArgs`)

در فریم‌ورک دات‌نت، یک الگوی استاندارد برای طراحی رویدادها وجود دارد که بسیار قدرتمند و انعطاف‌پذیر است. در این الگو:

1.  **Delegate** همیشه دو پارامتر دارد:
    *   `object sender`: آبجکتی که رویداد را منتشر کرده است.
    *   `EventArgs e`: یک کلاس که داده‌های مربوط به رویداد را در خود جای داده است.

2.  برای ارسال داده‌های سفارشی، ما یک کلاس جدید می‌سازیم که از `System.EventArgs` ارث‌بری می‌کند.

بیایید یک سیستم سلامتی را با این الگو پیاده‌سازی کنیم.

**۱. ساخت کلاس `HealthChangedEventArgs.cs` برای نگهداری داده‌های رویداد:**

```csharp
using System;

// این کلاس اطلاعات مربوط به رویداد تغییر سلامتی را حمل می‌کند
public class HealthChangedEventArgs : EventArgs
{
    public float CurrentHealth { get; }
    public float MaxHealth { get; }
    public float ChangeAmount { get; }

    // سازنده کلاس برای مقداردهی اولیه
    public HealthChangedEventArgs(float currentHealth, float maxHealth, float changeAmount)
    {
        CurrentHealth = currentHealth;
        MaxHealth = maxHealth;
        ChangeAmount = changeAmount;
    }
}
```

**۲. `CharacterHealth.cs` (ناشر رویداد):**

```csharp
using UnityEngine;

// 1. تعریف Delegate طبق الگوی استاندارد دات‌نت
public delegate void HealthChangedHandler(object sender, HealthChangedEventArgs e);

public class CharacterHealth : MonoBehaviour
{
    // 2. تعریف Event با استفاده از delegate سفارشی
    public event HealthChangedHandler OnHealthChanged;

    public float maxHealth = 100f;
    private float currentHealth;

    void Start()
    {
        currentHealth = maxHealth;
    }

    public void TakeDamage(float damage)
    {
        currentHealth -= damage;
        if (currentHealth < 0) currentHealth = 0;

        // 3. ایجاد یک نمونه از EventArgs و فراخوانی رویداد
        // ما 'this' را به عنوان فرستنده (sender) ارسال می‌کنیم
        OnHealthChanged?.Invoke(this, new HealthChangedEventArgs(currentHealth, maxHealth, -damage));
    }
    
    // برای تست
    void Update()
    {
        if (Input.GetMouseButtonDown(1))
        {
            TakeDamage(15);
        }
    }
}
```

**۳. `HealthBar.cs` (مشترک رویداد):**

```csharp
using UnityEngine;
using UnityEngine.UI;

public class HealthBar : MonoBehaviour
{
    public CharacterHealth characterHealth; // رفرنس به اسکریپت ناشر
    public Slider healthSlider;

    private void OnEnable()
    {
        // ثبت‌نام در رویداد
        characterHealth.OnHealthChanged += UpdateHealthBar;
    }

    private void OnDisable()
    {
        // لغو ثبت‌نام
        characterHealth.OnHealthChanged -= UpdateHealthBar;
    }

    // متد کنترل‌کننده رویداد (Event Handler)
    private void UpdateHealthBar(object sender, HealthChangedEventArgs e)
    {
        // ما می‌توانیم فرستنده را بررسی کنیم
        CharacterHealth healthComponent = sender as CharacterHealth;
        if (healthComponent != null)
        {
            Debug.Log($"رویداد سلامتی از طرف {healthComponent.gameObject.name} دریافت شد.");
        }

        // استفاده از داده‌های داخل EventArgs
        Debug.Log($"مقدار آسیب: {e.ChangeAmount}, سلامتی فعلی: {e.CurrentHealth}");
        healthSlider.value = e.CurrentHealth / e.MaxHealth;
    }
}
```

**توضیحات:**

*   **قدرت `sender`:** مشترک رویداد (HealthBar) حالا می‌داند کدام آبجکت (CharacterHealth) رویداد را فرستاده است. این در سناریوهایی که چندین دشمن یا بازیکن در صحنه وجود دارند و یک مدیر مرکزی به رویداد همه آن‌ها گوش می‌دهد، بسیار مفید است.
*   **قدرت `EventArgs`:** تمام داده‌های مرتبط با رویداد (سلامتی فعلی، حداکثر سلامتی، مقدار تغییر) در یک بسته تمیز و مرتب به نام `e` ارسال می‌شوند. اگر در آینده نیاز به ارسال اطلاعات بیشتری (مثلاً نوع آسیب: آتش، یخ و ...) داشته باشید، فقط کافی است یک فیلد جدید به کلاس `HealthChangedEventArgs` اضافه کنید، بدون اینکه نیاز به تغییر امضای `delegate` باشد. این الگو کد شما را بسیار توسعه‌پذیر (Extensible) می‌کند.