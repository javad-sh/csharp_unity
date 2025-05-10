---
title: Interface
sidebar_position: 2
---

# Interface (اینترفیس)

در سی‌شارپ، اینترفیس (interface) یک نوع قرارداد یا الگو است که مشخص می‌کند کلاس‌هایی که آن را پیاده‌سازی می‌کنند باید چه متدها و ویژگی‌هایی داشته باشند، بدون اینکه پیاده‌سازی آن‌ها را مشخص کند.

اینترفیس مثل قولی هست که یه کلاس می‌ده:
"اگه من این اینترفیس رو پیاده‌سازی کنم، قول می‌دم که تمام متدها و ویژگی‌هایی که توی این اینترفیس تعریف شدن رو داشته باشم."

```
public interface IDamageable
{
    void TakeDamage(int amount);
}

public class Enemy : IDamageable
{
    public void TakeDamage(int amount)
    {
        // کدی برای کم کردن جان دشمن
        Debug.Log("Enemy took " + amount + " damage.");
    }
}

// مثال دیگه

public interface IHealth
{
    int Health { get; set; }
    event Action OnDeath;
    void TakeDamage(int damage);
}

```

:::tip
موارد داخل اینترفیس بدنه یا مقدار ندارند.
:::

:::note
 اگر خودم حواسم باشه، چرا interface لازم دارم؟
جواب: چون حافظه انسان قابل اعتماد نیست ولی کامپایلر همیشه چک می‌کنه!
:::


## ویژگی‌های کلیدی interface در C#:

| ویژگی                                                     | توضیح                                                             |
| --------------------------------------------------------- | ----------------------------------------------------------------- |
| فقط شامل **امضای متد** است                                | هیچ پیاده‌سازی (body) ندارد                                       |
| می‌تواند شامل **property**، **event**، و **indexer** باشد | ولی نه فیلد                                                       |
| کلاس می‌تواند چندین interface را پیاده‌سازی کند           | برخلاف ارث‌بری از کلاس که فقط یکی است                             |
| قابل استفاده برای **polymorphism** است                    | یعنی می‌توان از طریق اینترفیس به چند کلاس مختلف دسترسی یکسان داشت |


## مثال های استفاده :

```
// اینجا other یک آبجکت هست و با استفاده از متد TryGetComponent ما بررسی می کنیم که آیا این آبجکت کلاسی داره که از اینترفیس IDamageable پیروی کنه. اگر داشت true بر می گردونه و مقدار رو داخل dmg میریزه.

if (other.TryGetComponent<IDamageable>(out var dmg))
{
    dmg.TakeDamage(10);
}

```

```
// بررسی کن که آیا متغیر enemy شیئی هست که از interface IHealable پیروی می‌کنه یا نه.

// اگر بله:

// اون رو تبدیل کن (cast) به IHealable و بریز داخل متغیر healable

// سپس متد Heal(20) رو روی اون صدا بزن

if (enemy is IHealable healable)
    healable.Heal(20);

// در واقع معادل کد پایینه اما مختصرتر و امن تر

if (enemy is IHealable)
{
    IHealable healable = (IHealable)enemy;
    healable.Heal(20);
}

```

مثال :

```
public class Enemy : MonoBehaviour, IDamageable
{
    public void TakeDamage(int a) => Debug.Log("Enemy hit: " + a);
}

public class Player : MonoBehaviour, IDamageable
{
    public void TakeDamage(int a) => Debug.Log("Player hit: " + a);
}

public class DestructibleWall : MonoBehaviour, IDamageable
{
    public void TakeDamage(int a) => Debug.Log("Wall hit: " + a);
}

void OnCollisionEnter(Collision collision)
{
    if (collision.gameObject.TryGetComponent<IDamageable>(out var target))
    {
        target.TakeDamage(10);
    }
}


```

## تفاوت GetComponent و TryGetComponent

| `GetComponent<T>()`          | `TryGetComponent<T>(out T)`             |
| ---------------------------- | --------------------------------------- |
| همیشه می‌گرده دنبال کامپوننت | فقط سعی می‌کنه و true/false برمی‌گردونه |
| اگه پیدا نکنه `null` می‌ده   | اگه پیدا نکنه false می‌ده               |
| باید خودت null رو چک کنی     | خودش نتیجه‌ی موفق بودن رو بهت می‌ده     |
| نسبتاً کندتره در زمان اجرا   | بهینه‌تر هست                            |
