---
slug: common-csharp-mistakes
title: اشتباهات رایج مبتدیان در C#
authors: [javad]
tags: [csharp, tips]
---

در این مقاله، رایج‌ترین اشتباهاتی که مبتدیان در برنامه‌نویسی C# مرتکب می‌شوند را بررسی می‌کنیم و راه‌حل آنها را یاد می‌گیریم.

<!-- truncate -->

## 1. فراموش کردن `;` در پایان خط

یکی از اشتباهات اولیه:

```csharp
// ❌ اشتباه
int health = 100

// ✅ درست
int health = 100;
```

**نکته**: همیشه دستورات را با `;` ببندید.

---

## 2. اشتباه در نامگذاری متغیرها

```csharp
// ❌ اشتباه - نام مبهم
int x = 100;
string s = "Ali";

// ✅ درست - نام واضح
int playerHealth = 100;
string playerName = "Ali";
```

**نکته**: نام متغیرها باید معنادار و واضح باشد.

---

## 3. مقایسه با `=` به جای `==`

```csharp
// ❌ اشتباه - این assignment است نه comparison
if (health = 0)
{
    Debug.Log("Dead");
}

// ✅ درست
if (health == 0)
{
    Debug.Log("Dead");
}
```

**نکته**: 
- `=` برای **تخصیص** مقدار
- `==` برای **مقایسه** مقدار

---

## 4. فراموش کردن `new` برای ساخت آبجکت

```csharp
// ❌ اشتباه - NullReferenceException
GameObject player;
player.SetActive(true); // خطا!

// ✅ درست
GameObject player = new GameObject();
player.SetActive(true);
```

**نکته**: قبل از استفاده از آبجکت، حتماً آن را instantiate کنید.

---

## 5. استفاده نادرست از `public` و `private`

```csharp
// ❌ اشتباه - همه چیز public
public class Player
{
    public int health;
    public int score;
    public void TakeDamage() { }
}

// ✅ درست - استفاده مناسب از access modifiers
public class Player
{
    private int health;
    private int score;
    
    public int GetHealth() => health;
    public void TakeDamage(int damage) 
    { 
        health -= damage;
    }
}
```

**نکته**: فقط چیزهایی که نیاز است از بیرون دسترسی داشته باشند را `public` کنید.

---

## 6. نادیده گرفتن `null` بودن

```csharp
// ❌ اشتباه
GameObject enemy = GameObject.Find("Enemy");
enemy.SetActive(false); // ممکن است null باشد

// ✅ درست
GameObject enemy = GameObject.Find("Enemy");
if (enemy != null)
{
    enemy.SetActive(false);
}
```

**نکته**: همیشه قبل از استفاده از reference type ها، null بودن را چک کنید.

---

## 7. نادیده گرفتن عملکرد (Performance)

```csharp
// ❌ اشتباه - پرهزینه در Update
void Update()
{
    GameObject player = GameObject.Find("Player");
    Transform enemy = GameObject.Find("Enemy").transform;
}

// ✅ درست - Cache کردن
GameObject player;
Transform enemy;

void Start()
{
    player = GameObject.Find("Player");
    enemy = GameObject.Find("Enemy").transform;
}

void Update()
{
    // استفاده از cache
}
```

**نکته**: `Find` و عملیات سنگین را در `Update` انجام ندهید.

---

## 8. عدم استفاده از `SerializeField`

```csharp
// ❌ مشکل - نمی‌توانید در Inspector ببینید
public class Player : MonoBehaviour
{
    private int maxHealth = 100;
}

// ✅ درست
public class Player : MonoBehaviour
{
    [SerializeField] private int maxHealth = 100;
}
```

**نکته**: با `[SerializeField]` می‌توانید فیلدهای private را در Inspector ببینید.

---

## نتیجه‌گیری

با آگاهی از این اشتباهات رایج و اجتناب از آنها:

✅ کد تمیزتری می‌نویسید  
✅ باگ کمتری خواهید داشت  
✅ سرعت یادگیری شما بیشتر می‌شود  

برنامه‌نویسی موفقی داشته باشید! 💻
