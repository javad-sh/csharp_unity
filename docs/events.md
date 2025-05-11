---
title: رویداد ها
sidebar_position: 2
---

# رویداد ها

## delegate

### نکات مهم

-   دلیگیت می تواند داخل یا خارج کلاس نوشته شود

-   نوع تابع دلیگیت باید با نوع تابع های سابسکرایب کننده یکی باشد.
    یعنی اگر دلیگیت void است همه ی سابسکرایب کننده ها هم باید void باشند.
    اگر دلیگیت int است همه ی سابسکرایب کننده ها هم باید int باشند.

-   به لحاظ تعداد و نوع پارامترها هم تابع های سابسکرایب کننده باید با دلیگیت یکسان باشند. یعنی اگر دلیگیت 2 پارامتر int دارد سابسکرایب کننده ها هم باید دو پارامتر int داشته باشند.
    نکته ای که وجود دارد این است که مقادیری که به رویداد هنگام فرخوانی (اجرا) می دهیم به همه ی تابع های سابسکرایب کنند پاس داده می شود.

-   فراخوانی رویداد به هر دو روش زیر درست است اما استفاده از invoke مدرن تر و ایمن تر است.
    با ؟ چک می کنیم که سابسکرایب کننده ای وجود دارد یا نه و با invoke تابع را اجرا می کنیم.

```
    OnHealthChanged?.Invoke(current, max);
    یا
    if(OnHealthChanged != null) {
        OnHealthChanged(current, max)
    }

```

-   سابسکرایب در OnEnabled و آنسابسکرایب در OnDisabled انجام میشود و حتما باید برای جلوگیری از مموری لیکینگ انسابسکرایب انجام شود.

-   می توان event را استاتیک تعریف کرد اما کار درستی نیست.

:::note
کلمه ی کلیدی استاتیک باعث می شود که یک نسخه ی عمومی و مشترک در برنامه ساخته شود که وابسته به کلاس است و نه شی.
به این معنی که برای دسترسی به آن نیازی به ساخت شی از کلاس نیست و مستقیما در دسترس است.
:::

```
// تعریف delegate دلخواه
public delegate void HealthChanged(int current, int max);

public class Player : MonoBehaviour
{
    // رویداد
    public event HealthChanged OnHealthChanged;

    int current = 100, max = 100;

    void TakeDamage(int dmg)
    {
        current = Mathf.Max(current - dmg, 0);
        // فراخوانی ایمن (۳ علامت سؤال = null-check)
        OnHealthChanged?.Invoke(current, max);
    }
}

```

## EventHandler

### مثال 1

#### نکات مثال :

-   سبک نوشتن ایونت با EventHandler به این شکل است. EventHandler با علامت سوال و بعد نام اویونت

-   سبک نوشتن تابع های sender هم به این شکل است که علامت ؟ می گذاریم تا مطمئن شویم تابعی وجود دارد که به آن سابسکرایب کرده باشد و بعد با invoke آن را اجرا می کنیم و مقادیر لازم را می دهیم

-   مقادیر برای EventHandler همیشه این دو مورد هستند اولی به معنی sender است که به این کلاس اشاره دارد و دومی به قراردادی است و به معنی این است که این توابع مقداری ارسال نمی کنند.

```
public class Door : MonoBehaviour
{
    public event EventHandler? DoorOpened;
    public event EventHandler? DoorClosed;

    public void Open()  => DoorOpened?.Invoke(this, EventArgs.Empty);
    public void Close() => DoorClosed?.Invoke(this, EventArgs.Empty);
}


```

-   نحوه ی سابسکرایب کردن و آنسابسکرایب کردن طبق معمول در دو تابع انجام می شود.

-   در تابع های سابسکرایبر همیشه باید دو مقدار object? \_ و EventArgs \_\_ را بنویسیم(مگر تابع لامبدا باشد)

-   نامگذاری های \_ و \_\_ به این معنی است که ما قرار نیست از این آرگیومنت ها استفاده کنیم پس دلیل به نام گذاری مفصل نیست.

```
public class DoorListener : MonoBehaviour
{
    [SerializeField] private Door door;

    void OnEnable()
    {
        door.DoorOpened += HandleOpen;
        door.DoorClosed += HandleClose;
    }
    void OnDisable()
    {
        door.DoorOpened -= HandleOpen;
        door.DoorClosed -= HandleClose;
    }

    void HandleOpen (object? _, EventArgs __) => Debug.Log("🚪 Door opened!");
    void HandleClose(object? _, EventArgs __) => Debug.Log("🚪 Door closed!");
}


```

### مثال 2

:::caution
نکته ی مهم :

ما می توانیم به روش زیر سابسکرایب کنیم :

```
pauseMgr.Paused += (_, __) => pausePanel.SetActive(true);
```

اما انسابسکرایب به این روش درست نیست و کار نمی کند. زیرا با اینطور نوشتن به رفرنس قبلی اشاره نمی کند و یک تابع جدید می نویسد.

```
pauseMgr.Paused -= (_, __) => pausePanel.SetActive(true);  // ❌ کار نمی‌کند
```

پس بهتر است تابع را در یک متغیر بریزیم.
:::

```
using UnityEngine;
using System;

public class GamePauseManager : MonoBehaviour
{
    public event EventHandler? Paused;
    public event EventHandler? Resumed;

    public void TogglePause()
    {
        if (Time.timeScale == 0)
        {
            Time.timeScale = 1;
            Resumed?.Invoke(this, EventArgs.Empty);
        }
        else
        {
            Time.timeScale = 0;
            Paused?.Invoke(this, EventArgs.Empty);
        }
    }
}

```

```

public class PauseUI : MonoBehaviour
{
    [SerializeField] private GamePauseManager pauseMgr;
    [SerializeField] private GameObject pausePanel;

    onPaused = (_, __) => pausePanel.SetActive(true);
    onPlay = (_, __) => pausePanel.SetActive(false);


    void OnEnable()
    {
        pauseMgr.Paused  += onPaused;
        pauseMgr.Resumed += onPlay;
    }
    void OnDisable()
    {
        pauseMgr.Paused  -= onPaused;
        pauseMgr.Resumed -= onPlay;
    }
}

```

### مثال 3

-   در خط `icon.SetActive(((AudioToggle)sender!).IsMuted)` ما داریم سندر که یک آبجکت هست رو کست (cast) می کنیم. یعنی تبدیل نوع آبجکت به AudioToggle.
    بنابر این ما با این کار می توانیم به مقدار IsMuted دسترسی داشته باشیم. اما در حالت عادی نمی توانستیم بنویسیم `sender.IsMuted`.

-   علامت ! بعد از آن هم به این معناست که من مظمئن هستم که این مقدار نال نیست پس هشدار nullability رو نده.

دستری به میئترد از رفرنس
گت و ست
الگوی سینگلتون

```
using UnityEngine;
using System;

public class AudioToggle : MonoBehaviour
{
    public event EventHandler? MutedChanged;

    public bool IsMuted { get; private set; }

    public void Toggle()
    {
        IsMuted = !IsMuted;
        AudioListener.volume = IsMuted ? 0 : 1;
        MutedChanged?.Invoke(this, EventArgs.Empty);
    }
}
```

```
public class MuteIcon : MonoBehaviour
{
    [SerializeField] private AudioToggle audioToggle;
    [SerializeField] private GameObject icon;

    void OnEnable()  => audioToggle.MutedChanged += Refresh;
    void OnDisable() => audioToggle.MutedChanged -= Refresh;


    void Refresh(object? sender, EventArgs e)
        => icon.SetActive(((AudioToggle)sender!).IsMuted);
}
```

### مثال 4

- تنها نکته ی این مثال nameof هست برای گرفتن نام تابع به صورت string.

:::tip
این خط در کد `public static GlobalClock Instance { get; private set; } = null!;` یک الگوی سینگلتون را پیاده سازی می کند اما استفاده از آن توصیه نمی شود و بهتر است از الگوی کلاسیک استفاده شود.
:::

اگر چند نمونه از GlobalClock در صحنه باشند → همه‌چیز می‌شکند یا ناپایدار می‌شود

اگر صحنه دوباره لود شود → Singleton از بین می‌رود

```
using UnityEngine;
using System;

public class GlobalClock : MonoBehaviour
{
    public static GlobalClock Instance { get; private set; } = null!;
    public event EventHandler? Tick;

    void Awake() => Instance = this;

    void Start() => InvokeRepeating(nameof(RaiseTick), 1f, 1f);

    void RaiseTick() => Tick?.Invoke(this, EventArgs.Empty);
}
```

```
public class SecondsCounter : MonoBehaviour
{
    int seconds;
    void OnEnable()  => GlobalClock.Instance.Tick += OnTick;
    void OnDisable() => GlobalClock.Instance.Tick -= OnTick;

    void OnTick(object? _, EventArgs __) => Debug.Log($"Second #{++seconds}");
}
```
