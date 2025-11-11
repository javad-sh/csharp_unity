---
title: Action و Action\<T\>
sidebar_position: 3
---

## Action، Action\<T\> و Events در سی شارپ و یونیتی: راهنمای کامل با مثال

در دنیای برنامه‌نویسی با سی شارپ و به خصوص در موتور بازی‌سازی یونیتی، مفاهیم `Action`، `Action<T>` و `Events` به عنوان ابزارهای قدرتمند برای پیاده‌سازی سیستم‌های رویداد-محور و ارتباط بین کامپوننت‌های مختلف به کار می‌روند. این ساختارها به شما اجازه می‌دهند تا کدی تمیزتر، انعطاف‌پذیرتر و با وابستگی کمتر (Loosely Coupled) بنویسید.

### درک مفاهیم پایه

پیش از پرداختن به مثال‌ها، بیایید با تعاریف اصلی این مفاهیم آشنا شویم:

-   **Delegate (نماینده):** در سی شارپ، یک `delegate` متغیری است که به یک یا چند متد اشاره می‌کند. به عبارت دیگر، یک نماینده می‌تواند متدهایی با امضای (Signature) یکسان را در خود نگه دارد و آن‌ها را فراخوانی کند. `Action` و `Func` دو نوع `delegate` از پیش تعریف شده در سی شارپ هستند.

-   **Action:** یک `delegate` است که به متدهایی اشاره می‌کند که هیچ مقداری را برنمی‌گردانند (`void`). این `delegate` می‌تواند از صفر تا ۱۶ پارامتر ورودی داشته باشد.

-   **Action\<T\>:** این نیز یک `delegate` از نوع `Action` است، اما به صورت ژنریک (Generic) پیاده‌سازی شده است. این به آن معناست که شما می‌توانید نوع پارامترهایی که متدهای مورد نظر دریافت می‌کنند را مشخص کنید. برای مثال، `Action<int>` به متدهایی اشاره می‌کند که یک پارامتر از نوع `int` دریافت می‌کنند و `void` هستند.

-   **Event (رویداد):** یک `event` در واقع یک `delegate` کپسوله شده است که یک لایه امنیتی به آن اضافه می‌کند. مهم‌ترین ویژگی `event` این است که تنها کلاسی که آن را تعریف کرده است، می‌تواند آن را فراخوانی (Invoke) کند. کلاس‌های دیگر فقط می‌توانند در آن رویداد ثبت‌نام (Subscribe) یا لغو ثبت‌نام (Unsubscribe) کنند. این ویژگی از فراخوانی‌های ناخواسته و بروز خطا جلوگیری می‌کند.

**چرا از این ساختارها در یونیتی استفاده می‌کنیم؟**

-   **کاهش وابستگی:** کامپوننت‌ها نیازی به شناخت مستقیم یکدیگر ندارند. یک کامپوننت فقط یک رویداد را منتشر می‌کند و کامپوننت‌های دیگر که به آن علاقه‌مند هستند، به آن گوش می‌دهند.
-   **خوانایی و نگهداری بهتر کد:** منطق بازی به بخش‌های کوچک‌تر و مدیریت‌پذیرتر تقسیم می‌شود.
-   **انعطاف‌پذیری:** به راحتی می‌توانید در آینده کامپوننت‌های جدیدی اضافه کنید که به رویدادهای موجود واکنش نشان دهند، بدون اینکه نیاز به تغییر در کدهای قبلی باشد.

---

### مثال ۱: ساده (استفاده از `Action` برای ورودی بازیکن)

در این مثال ساده، ما یک `Action` برای رویداد "پرش" بازیکن تعریف می‌کنیم. هر زمان که بازیکن کلید Space را فشار دهد، این `Action` فراخوانی می‌شود و هر اسکریپتی که به آن گوش داده باشد، متد مربوط به پرش را اجرا خواهد کرد.

**اسکریپت `PlayerInput.cs` (ناشر رویداد):**

```csharp
using System;
using UnityEngine;

public class PlayerInput : MonoBehaviour
{
    // تعریف یک Action استاتیک برای رویداد پرش
    // استاتیک بودن به ما اجازه می‌دهد تا از هر کجای کد به آن دسترسی داشته باشیم
    public static event Action OnPlayerJump;

    void Update()
    {
        // بررسی فشرده شدن کلید Space
        if (Input.GetKeyDown(KeyCode.Space))
        {
            // فراخوانی Action
            // علامت سوال (?) قبل از Invoke بررسی می‌کند که آیا متدی به این Action اضافه شده است یا خیر
            OnPlayerJump?.Invoke();
        }
    }
}
```

**اسکریپت `PlayerMovement.cs` (مشترک رویداد):**

```csharp
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    private Rigidbody rb;

    void Start()
    {
        rb = GetComponent<Rigidbody>();
    }

    // این متد زمانی که کامپوننت فعال می‌شود، فراخوانی می‌شود
    private void OnEnable()
    {
        // ثبت‌نام (Subscribe) متد Jump در رویداد OnPlayerJump
        PlayerInput.OnPlayerJump += Jump;
    }

    // این متد زمانی که کامپوننت غیرفعال می‌شود، فراخوانی می‌شود
    private void OnDisable()
    {
        // لغو ثبت‌نام (Unsubscribe) برای جلوگیری از خطاهای احتمالی
        PlayerInput.OnPlayerJump -= Jump;
    }

    // متدی که هنگام وقوع رویداد پرش، اجرا می‌شود
    private void Jump()
    {
        Debug.Log("بازیکن پرید!");
        rb.AddForce(Vector3.up * 5f, ForceMode.Impulse);
    }
}
```

**توضیحات:**

1.  در `PlayerInput`، یک `Action` به نام `OnPlayerJump` تعریف کرده‌ایم.
2.  در `Update`، با فشردن کلید Space، این `Action` فراخوانی (`Invoke`) می‌شود.
3.  در `PlayerMovement`، در متد `OnEnable`، متد `Jump` را به `OnPlayerJump` اضافه می‌کنیم.
4.  در `OnDisable`، برای جلوگیری از نشت حافظه و خطا، متد `Jump` را از `Action` حذف می‌کنیم. این کار بسیار مهم است، به خصوص زمانی که آبجکت‌ها در طول بازی از بین می‌روند.

---

### مثال ۲: متوسط (استفاده از `Action<T>` برای سیستم سلامتی)

در این مثال، از `Action<int>` برای ارسال مقدار آسیب وارد شده به بازیکن استفاده می‌کنیم. همچنین یک `Action` دیگر برای رویداد مرگ بازیکن خواهیم داشت.

**اسکریپت `PlayerHealth.cs` (ناشر رویداد):**

```csharp
using System;
using UnityEngine;

public class PlayerHealth : MonoBehaviour
{
    // Action برای زمانی که سلامتی بازیکن تغییر می‌کند (مقدار جدید سلامتی را ارسال می‌کند)
    public static event Action<int> OnHealthChanged;
    // Action برای زمانی که بازیکن می‌میرد
    public static event Action OnPlayerDied;

    public int maxHealth = 100;
    private int currentHealth;

    void Start()
    {
        currentHealth = maxHealth;
    }

    // متدی برای آسیب زدن به بازیکن
    public void TakeDamage(int damageAmount)
    {
        // کاهش سلامتی
        currentHealth -= damageAmount;
        if (currentHealth < 0)
        {
            currentHealth = 0;
        }

        // فراخوانی رویداد تغییر سلامتی و ارسال مقدار جدید
        OnHealthChanged?.Invoke(currentHealth);

        // بررسی وضعیت مرگ
        if (currentHealth <= 0)
        {
            OnPlayerDied?.Invoke();
            // غیرفعال کردن بازیکن پس از مرگ
            gameObject.SetActive(false);
        }
    }

    // برای تست، یک متد برای آسیب دیدن با کلیک موس اضافه می‌کنیم
    private void Update()
    {
        if(Input.GetMouseButtonDown(0))
        {
            TakeDamage(10);
        }
    }
}
```

**اسکریپت `UIManager.cs` (مشترک رویداد):**

```csharp
using UnityEngine;
using UnityEngine.UI; // برای کار با کامپوننت‌های UI

public class UIManager : MonoBehaviour
{
    public Text healthText;
    public GameObject gameOverPanel;

    private void OnEnable()
    {
        // ثبت‌نام در رویدادهای کلاس PlayerHealth
        PlayerHealth.OnHealthChanged += UpdateHealthUI;
        PlayerHealth.OnPlayerDied += ShowGameOverPanel;
    }

    private void OnDisable()
    {
        // لغو ثبت‌نام
        PlayerHealth.OnHealthChanged -= UpdateHealthUI;
        PlayerHealth.OnPlayerDied -= ShowGameOverPanel;
    }

    // این متد مقدار جدید سلامتی را دریافت و در UI نمایش می‌دهد
    private void UpdateHealthUI(int newHealth)
    {
        if (healthText != null)
        {
            healthText.text = "Health: " + newHealth;
        }
    }

    // این متد پنل "بازی تمام شد" را فعال می‌کند
    private void ShowGameOverPanel()
    {
        if (gameOverPanel != null)
        {
            gameOverPanel.SetActive(true);
        }
    }
}
```

**توضیحات:**

1.  در `PlayerHealth`، دو رویداد داریم: `OnHealthChanged` که مقدار سلامتی را به عنوان پارامتر ارسال می‌کند و `OnPlayerDied`.
2.  متد `TakeDamage` پس از محاسبه سلامتی جدید، این رویدادها را در صورت لزوم فراخوانی می‌کند.
3.  `UIManager` به هر دو رویداد گوش می‌دهد. `UpdateHealthUI` متن سلامتی را به‌روز می‌کند و `ShowGameOverPanel` پنل مربوط به پایان بازی را نمایش می‌دهد.
4.  این ساختار باعث می‌شود `PlayerHealth` هیچ اطلاعی از وجود `UIManager` نداشته باشد و فقط وظیفه مدیریت سلامتی و اعلام وضعیت خود را بر عهده بگیرد.

---

### مثال ۳: پیشرفته (سیستم رویداد مرکزی با استفاده از ScriptableObject)

در پروژه‌های بزرگ، داشتن Actionهای استاتیک متعدد می‌تواند مدیریت کد را دشوار کند. یک راه حل پیشرفته، ایجاد یک سیستم رویداد مرکزی با استفاده از `ScriptableObject` ها است. این روش به طراحان بازی نیز اجازه می‌دهد تا رویدادها را در ویرایشگر یونیتی مدیریت کنند.

**۱. ساخت `GameEvent.cs` (یک ScriptableObject برای رویدادها):**

```csharp
using System;
using System.Collections.Generic;
using UnityEngine;

// این اتریبیوت به ما اجازه می‌دهد تا از این کلاس در منوی Create یونیتی فایل بسازیم
[CreateAssetMenu(fileName = "New Game Event", menuName = "Game Event")]
public class GameEvent : ScriptableObject
{
    // لیستی از تمام شنوندگان این رویداد
    private List<Action> listeners = new List<Action>();

    // متدی برای فراخوانی رویداد
    public void Raise()
    {
        // از آخر به اول حلقه می‌زنیم تا در صورت حذف یک شنونده در حین اجرا، به مشکل برنخوریم
        for (int i = listeners.Count - 1; i >= 0; i--)
        {
            listeners[i].Invoke();
        }
    }

    // متدی برای ثبت‌نام شنونده
    public void RegisterListener(Action listener)
    {
        if (!listeners.Contains(listener))
            listeners.Add(listener);
    }

    // متدی برای لغو ثبت‌نام شنونده
    public void UnregisterListener(Action listener)
    {
        if (listeners.Contains(listener))
            listeners.Remove(listener);
    }
}
```

**۲. ساخت `GameEventListener.cs` (کامپوننتی برای گوش دادن به رویدادها):**

```csharp
using UnityEngine;
using UnityEngine.Events; // برای استفاده از UnityEvent

public class GameEventListener : MonoBehaviour
{
    // رویدادی که این شنونده به آن گوش می‌دهد
    public GameEvent gameEvent;

    // پاسخ‌هایی که در ویرایشگر یونیتی می‌توان تنظیم کرد
    public UnityEvent response;

    private void OnEnable()
    {
        // ثبت‌نام در رویداد
        gameEvent.RegisterListener(OnEventRaised);
    }

    private void OnDisable()
    {
        // لغو ثبت‌نام
        gameEvent.UnregisterListener(OnEventRaised);
    }

    // متدی که هنگام فراخوانی رویداد، اجرا می‌شود
    public void OnEventRaised()
    {
        response.Invoke();
    }
}
```

**۳. نحوه استفاده:**

-   **ایجاد رویداد:** در پنجره Project یونیتی، راست کلیک کرده و از منوی `Create > Game Event` یک رویداد جدید بسازید و نام آن را مثلا `OnPlayerDeathEvent` بگذارید.
-   **انتشار رویداد:** در هر اسکریپتی که می‌خواهید رویداد را منتشر کند (مثلا `PlayerHealth.cs`)، یک متغیر عمومی از نوع `GameEvent` تعریف کنید و `OnPlayerDeathEvent` را در Inspector به آن اختصاص دهید. سپس در لحظه مناسب، متد `Raise()` را فراخوانی کنید.

**اسکریپت `PlayerHealthAdvanced.cs` (ناشر رویداد):**

```csharp
using UnityEngine;

public class PlayerHealthAdvanced : MonoBehaviour
{
    // رویداد مرگ بازیکن که در Inspector تنظیم می‌شود
    public GameEvent onPlayerDiedEvent;

    public void KillPlayer()
    {
        Debug.Log("رویداد مرگ بازیکن منتشر شد.");
        // فراخوانی رویداد
        onPlayerDiedEvent.Raise();
        // غیرفعال کردن آبجکت
        gameObject.SetActive(false);
    }

    // برای تست
    private void Update()
    {
        if(Input.GetKeyDown(KeyCode.K))
        {
            KillPlayer();
        }
    }
}
```

-   **گوش دادن به رویداد:** به هر آبجکتی که می‌خواهید به این رویداد واکنش نشان دهد (مثلا `GameManager` یا `SoundManager`)، کامپوننت `GameEventListener` را اضافه کنید. سپس `OnPlayerDeathEvent` را به فیلد `Game Event` آن اختصاص دهید. حالا در بخش `Response` می‌توانید هر متد عمومی از هر کامپوننتی را که می‌خواهید هنگام وقوع این رویداد اجرا شود، بکشید و رها کنید (Drag & Drop).

**توضیحات:**

این روش به شما یک معماری کاملاً ماژولار و جدا از هم می‌دهد. `ScriptableObject`ها به عنوان "کانال‌های رویداد" عمل می‌کنند. ناشران و مشترکان هیچ اطلاعی از یکدیگر ندارند و فقط "کانال" مشترک را می‌شناسند. این الگو برای پروژه‌های بزرگ بسیار کارآمد است و به راحتی قابل گسترش است.
