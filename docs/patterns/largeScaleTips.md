---
title: معماری و ساختار پروژه
sidebar_position: 3
---

# ساختار پروژه در یونیتی

در معماری متعارف بازی-های دوبُعدی (و حتی سه‌بعدی) در Unity، به-جای توده‌ای از اسکریپت‌ها که هرکدام هرکاری می‌کنند، بهتر است «لایه‌های مسئولیت» مشخصی داشته باشید. در ادامه رایج‌ترین اسکریپت‌های C#، محل قرارگیری آن‌ها در صحنه‌ها (Scenes)، و این‌که چه زمانی باید پایدار (Persistent) بمانند را مرور می‌کنیم.

---

## 1. اسکریپت‌های سراسری (Persistent Managers)

| نام متعارف                                                                  | وظیفه اصلی                                                    | محل قرارگیری                                                        | پایدار؟ چرا؟                                                                      |
| --------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **GameManager**                                                             | جریان کلی بازی (وضعیت منو، شروع/پایان مرحله، امتیاز کل، پاوز) | یک GameObject به نام `GameManager` در اولین صحنهٔ بازی (مثلاً Boot) | بله – با `DontDestroyOnLoad` زیرا وضعیت کلی باید بین صحنه‌ها حفظ شود.             |
| **AudioManager**                                                            | پخش موسیقی پس‌زمینه و SFX، کنترل ولوم                         | روی یک GameObject `AudioManager` حاوی چند AudioSource               | بله – موسیقی نباید با بارگذاری هر صحنه قطع شود.                                   |
| **InputManager** (در سیستم ورودی جدید Unity می‌تواند یک `PlayerInput` باشد) | ترجمه ورودی خام به رویدادهای منطقی (پرش، تیر زدن)             | روی یک GameObject `InputManager`                                    | معمولاً بله – مگر در بازی‌های چندنفره لوکال که برای هر صحنه ورودی مجزا می‌خواهید. |
| **DataPersistence** یا **SaveSystem**                                       | ذخیره و بارگذاری داده‌ها روی دیسک (JSON, PlayerPrefs)         | به‌صورت ScriptableObject یا MonoBehaviour                           | بله – یا از ScriptableObjectهای مستقل استفاده کنید که ذاتاً صحنه-محور نیستند.     |

> **الگو:** بیشتر این اسکریپت‌ها به-صورت **Singleton** پیاده می‌شوند. مثال ساده:
>
> ```csharp
> public class GameManager : MonoBehaviour
> {
>     public static GameManager Instance { get; private set; }
>     void Awake()
>     {
>         if (Instance != null && Instance != this) { Destroy(gameObject); return; }
>         Instance = this;
>         DontDestroyOnLoad(gameObject);
>     }
>     // …
> }
> ```

---

## 2. اسکریپت‌های مخصوص صحنه (Scene-Specific)

| حوزه                  | وظیفه نمونه                                                        | محل قرارگیری                                           | هنگام بارگذاری صحنه بعدی چه می‌شود؟                                                            |
| --------------------- | ------------------------------------------------------------------ | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| **LevelController**   | مدیریت منطق همان مرحله (اسپاون دشمن، پایان مرحله، امتیاز همان لول) | روی یک GameObject `LevelController` در خود صحنهٔ مرحله | با صحنه نابود می‌شود؛ داده‌های لازم را قبل از خروج به `GameManager` یا سیستم ذخیره منتقل کنید. |
| **Spawner**‌ها        | ایجاد دوره‌ای دشمن/آیتم                                            | هر Spawner در مختصات خودش                              | طبیعی است که پس از بارگذاری صحنه بعدی از بین بروند.                                            |
| **CameraController**  | دنبال کردن بازیکن، افکت لرزش                                       | روی Main Camera یا یک شیء والد                         | مخصوص همان صحنه است (مگر در بازی‌هایی با دوربین ثابت مرکزی).                                   |
| **UI Scene-Specific** | اسکریپت‌هایی برای نوار جان یا تایمر فقط در همان مرحله              | زیر Canvas همان صحنه                                   | معمولاً نابود می‌شوند؛ داده خام مورد نیاز را از GameManager بگیرید.                            |

---

## 3. اسکریپت‌های شیء (Entity Scripts)

| نوع                  | کارکرد                    | قلمرو حیات                       |
| -------------------- | ------------------------- | -------------------------------- |
| **PlayerController** | ورودی ← حرکت/انیمیشن/شلیک | طول عمر بازیکن در صحنه           |
| **EnemyAI**          | منطق مصنوعی دشمن          | طول عمر دشمن                     |
| **Projectile**       | حرکت پرتابه و برخورد      | نابودی پس از برخورد یا زمان معین |

این اسکریپت‌ها اساساً Component-هایی هستند که مستقیماً روی Prefab مربوطه قرار می‌گیرند. در زمان اجرا، Pooling (آبجکت-پول) برای ایجاد/حذف کم‌هزینه‌تر توصیه می‌شود.

---

## 4. Scriptable Objects: دادهٔ بدون صحنه

اگر فقط دادهٔ پایدار نیاز دارید (مثلاً جدول مشخصات سلاح‌ها)، از **ScriptableObject** استفاده کنید:

```csharp
[CreateAssetMenu(menuName = "Data/WeaponConfig")]
public class WeaponConfig : ScriptableObject
{
    public float damage;
    public float fireRate;
    // …
}
```

این فایل‌ها در پروژه ذخیره می‌شوند، در اجرا یک نسخه singleton دارند، و نیازی به `DontDestroyOnLoad` ندارند.

---

## 5. ساختار پوشه‌ها

```
Assets/
 ├─ Scripts/
 │   ├─ Core/          (GameManager, AudioManager)
 │   ├─ Managers/      (InputManager, SaveSystem)
 │   ├─ Gameplay/      (PlayerController, EnemyAI, Projectile)
 │   ├─ UI/            (HUD, MenuNavigations)
 │   └─ Utilities/     (Extensions, Helpers)
 ├─ Prefabs/
 ├─ ScriptableObjects/
 └─ Scenes/
     ├─ Boot.unity     (فقط Managers)
     ├─ MainMenu.unity
     ├─ Level01.unity
     └─ …
```

-   **Boot Scene** (یا Splash): اولین صحنهٔ سبک که فقط Manager-ها را Instantiate می‌کند.
-   بعد از آن `SceneManager.LoadSceneAsync("MainMenu");` و Managers ماندگار هستند.

---

## 6. چرخهٔ عمر خلاصه

1. **BootScene**

    - Instantiate Managers (DontDestroyOnLoad)
    - Load MainMenu

2. **MainMenuScene**

    - منطق منو، انتخاب مرحله
    - روی Start → Load Level01

3. **LevelScene**

    - Instantiate LevelController, Spawners, UI مخصوص
    - بازی می‌شود
    - پایان → نتیجه را به GameManager بده، Load MainMenu یا Level بعدی

---

## 7. نکات کلیدی

-   فقط چیزهایی را persistent کنید که **واقعاً** بین صحنه‌ها لازم‌اند. زیاد بودن Singletonها باعث پیچیدگی و مخزن دادهٔ جهانی کنترل‌نشده می‌شود.
-   برای ارتباط بین صحنه (Level) و مدیرها از رویداد (C# Event)، **UnityEvent** یا سیستم پیام (ScriptableObject Event Channel) استفاده کنید؛ از FindObjectOfType در زمان اجرا پرهیز کنید.
-   اگر چند سیستم باید همزمان تولید شوند (مثلاً Audio و Input)، ترتیب بارگذاری مهم است؛ می‌توانید یک **Bootstrapper** ساده بسازید که همهٔ ManagerPrefabها را در Awake می‌سازد.
-   در تست واحد و جدایی منطق از Unity API تلاش کنید تا کدهای قابل تست بنویسید (مثلاً کلاس‌های معمول C# برای مسیر‌یابی، که از MonoBehaviour ارث نمی‌برند).

---

### مثال زنجیرهٔ رویداد ساده

```csharp
// LevelController.cs
public class LevelController : MonoBehaviour
{
    public void OnPlayerDied()
    {
        GameManager.Instance.LevelFailed();
    }
}

// GameManager.cs
public void LevelFailed()
{
    // امتیاز کم کن، منو شکست را نشان بده
    SceneManager.LoadScene("GameOver");
}
```

---

### چرا بعضی اسکریپت‌ها باید نابود شوند؟

-   حافظه آزاد می‌شود.
-   خطر «انباشت وضعیت» کم می‌شود (مثلاً Spawner قدیمی ناخواسته دوباره فعال نشود).
-   جداسازی واضح مسئولیت؛ هر صحنه فقط منطق خودش را دارد.

---

## جمع‌بندی

1. **Managers Singleton + DontDestroyOnLoad** برای چیزهای جهانی (جریان بازی، صدا، ورودی، ذخیره).
2. **ScriptableObject** برای دادهٔ مشترک بدون منطق صحنه.
3. **Controllerهای صحنه و Entity** فقط در همان Scene زنده هستند.
4. \*\*Boot Scene → MainMenu → Level…\*\*‌ ساده‌ترین فلو برای پروژه‌های کوچک-متوسط.
5. تا می‌توانید ارتباط را رویداد-محور کنید و به جای «کشف آبجکت» مستقیم، Dependency Injection سبک یا Reference در Inspector بدهید.

با این چیدمان، کدتان هم مقیاس‌پذیر می‌شود و هم نگهداری‌اش آسان‌تر.
