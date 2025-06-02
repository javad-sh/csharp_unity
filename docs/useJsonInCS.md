---
title: استفاده از json در سی شارپ
sidebar_position: 21
---

روش های زیادی وجود دارد اما دو روش اصلی وجود دارد :
اگر بخوای فقط دوتا یاد بگیری که ۹۰٪ کارها رو باهاشون انجام بدی، این دو تا رو پیشنهاد می‌کنم:

System.Text.Json (اگه از .NET 5 به بالا استفاده می‌کنی)

Newtonsoft.Json (اگه JSONهای پیچیده داری یا با Unity کار می‌کنی)

روش اول :
در اینجا روش اول یعنی **استفاده از `System.Text.Json` همراه با کلاس POCO** را به‌صورت کامل و با چند مثال توضیح می‌دهم. این روش، رسمی‌ترین و بهینه‌ترین روش پیشنهادی توسط مایکروسافت در نسخه‌های جدید .NET است.

---

## ✅ معرفی `System.Text.Json`

-   این کتابخانه از .NET Core 3.0 به بعد معرفی شده.
-   نیازی به نصب پکیج ندارد (در .NET 5/6/7/8 به‌صورت داخلی وجود دارد).
-   سریع، کم‌حجم و مدرن است.
-   مناسب برای **ساختارهای JSON مشخص** و **تعریف‌شده با کلاس** (POCO).

---

## 📦 فضای نام مورد نیاز:

```csharp
using System.Text.Json;
```

---

## 📌 مراحل استفاده:

### 1. تعریف کلاس مطابق ساختار JSON (POCO)

فرض کنیم JSON این است:

```json
{
    "id": 1,
    "name": "John Doe",
    "isActive": true
}
```

کلاس معادل:

```csharp
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsActive { get; set; }
}
```

---

### 2. دریافت JSON از API یا منبع دیگر

مثلاً:

```csharp
string json = "{\"id\":1,\"name\":\"John Doe\",\"isActive\":true}";
```

---

### 3. تبدیل (Deserialization) JSON به آبجکت C\#

```csharp
User user = JsonSerializer.Deserialize<User>(json);
Console.WriteLine(user.Name);  // خروجی: John Doe
```

---

### 4. تبدیل (Serialization) آبجکت به JSON

```csharp
User newUser = new User { Id = 2, Name = "Sara", IsActive = false };
string jsonOut = JsonSerializer.Serialize(newUser);
Console.WriteLine(jsonOut);
// خروجی: {"Id":2,"Name":"Sara","IsActive":false}
```

---

## 🧪 مثال کامل: خواندن JSON از فایل

```csharp
using System;
using System.IO;
using System.Text.Json;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsActive { get; set; }
}

class Program
{
    static void Main()
    {
        string jsonPath = "user.json";
        string json = File.ReadAllText(jsonPath);

        User user = JsonSerializer.Deserialize<User>(json);
        Console.WriteLine($"نام: {user.Name} - فعال است؟ {user.IsActive}");
    }
}
```

---

## 🧰 پیکربندی JsonSerializerOptions

```csharp
var options = new JsonSerializerOptions
{
    PropertyNameCaseInsensitive = true,
    WriteIndented = true // برای زیباسازی خروجی JSON
};

User user = JsonSerializer.Deserialize<User>(json, options);
```

---

## 📚 ویژگی‌ها و محدودیت‌ها:

| ویژگی                                | وضعیت                                              |
| ------------------------------------ | -------------------------------------------------- |
| پشتیبانی از camelCase ↔ PascalCase   | ✅ دارد (با `JsonPropertyName`)                    |
| پشتیبانی از `DateTime` و `enum`      | ✅ دارد                                            |
| پشتیبانی از Property نامنطبق با JSON | ✅ دارد با `[JsonPropertyName("json_field_name")]` |
| پشتیبانی از کلاس‌های تو در تو        | ✅ دارد                                            |
| پشتیبانی از داینامیک                 | ❌ ندارد (ضعیف)                                    |
| خواندن/نوشتن دستی                    | ✅ با `JsonDocument`                               |

---

## 📌 مثال: استفاده از `[JsonPropertyName]`

```csharp
using System.Text.Json.Serialization;

public class User
{
    [JsonPropertyName("user_id")]
    public int Id { get; set; }

    [JsonPropertyName("user_name")]
    public string Name { get; set; }

    public bool IsActive { get; set; }
}
```

برای JSON:

```json
{
    "user_id": 42,
    "user_name": "Ali",
    "isActive": true
}
```

---

حتماً، در اینجا روش دوم یعنی استفاده از **`Newtonsoft.Json` (یا Json.NET)** با کلاس POCO را دقیقاً مانند روش اول، کامل و با چند مثال توضیح می‌دهم.

---

## ✅ معرفی `Newtonsoft.Json`

-   قدیمی‌ترین و پرکاربردترین کتابخانه‌ی JSON در C#
-   پشتیبانی از JSONهای پیچیده، نامنظم، تو در تو، داینامیک، و حتی مقادیر null
-   بسیار پایدار، مناسب برای پروژه‌های بزرگ، حتی Unity (نسبت به System.Text.Json سازگاری بهتری دارد)

---

## 📦 نصب (اگر پروژه‌ات .NET Core یا ASP.NET است):

از طریق NuGet:

```bash
Install-Package Newtonsoft.Json
```

---

## 📌 مراحل استفاده:

### 1. تعریف کلاس مطابق JSON (POCO)

فرض کنیم JSON این باشد:

```json
{
    "id": 1,
    "name": "John Doe",
    "isActive": true
}
```

کلاس معادل:

```csharp
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsActive { get; set; }
}
```

---

### 2. تبدیل JSON به آبجکت (Deserialization)

```csharp
using Newtonsoft.Json;

string json = "{\"id\":1,\"name\":\"John Doe\",\"isActive\":true}";

User user = JsonConvert.DeserializeObject<User>(json);
Console.WriteLine(user.Name); // خروجی: John Doe
```

---

### 3. تبدیل آبجکت به JSON (Serialization)

```csharp
User newUser = new User { Id = 2, Name = "Sara", IsActive = false };

string jsonOut = JsonConvert.SerializeObject(newUser);
Console.WriteLine(jsonOut); // خروجی: {"Id":2,"Name":"Sara","IsActive":false}
```

---

## 🧪 مثال کامل از فایل یا API:

```csharp
using System.IO;
using Newtonsoft.Json;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsActive { get; set; }
}

class Program
{
    static void Main()
    {
        string json = File.ReadAllText("user.json");

        User user = JsonConvert.DeserializeObject<User>(json);
        Console.WriteLine($"نام: {user.Name} - فعال است؟ {user.IsActive}");
    }
}
```

---

## 🧰 پیکربندی JsonConvert با Formatting و Settings

```csharp
string formattedJson = JsonConvert.SerializeObject(user, Formatting.Indented);
```

یا:

```csharp
var settings = new JsonSerializerSettings
{
    NullValueHandling = NullValueHandling.Ignore,
    Formatting = Formatting.Indented
};

string json = JsonConvert.SerializeObject(user, settings);
```

---

## 📌 استفاده از `[JsonProperty]`

برای زمانی که نام فیلدهای JSON با نام‌های کلاس فرق دارد:

```csharp
using Newtonsoft.Json;

public class User
{
    [JsonProperty("user_id")]
    public int Id { get; set; }

    [JsonProperty("user_name")]
    public string Name { get; set; }

    public bool IsActive { get; set; }
}
```

JSON:

```json
{
    "user_id": 10,
    "user_name": "Ali",
    "isActive": true
}
```

---

## ✅ مزایا نسبت به System.Text.Json

| ویژگی                                   | توضیح                       |
| --------------------------------------- | --------------------------- |
| پشتیبانی کامل از JSON تو در تو          | ✅ راحت و قابل اطمینان      |
| پشتیبانی از `dynamic` و `JObject`       | ✅ بسیار قوی                |
| کار با ساختارهای غیرثابت و پویا         | ✅ ایده‌آل                  |
| کنترل کامل با Attributeهای مختلف        | ✅ دارد                     |
| پشتیبانی از نسخه‌های قدیمی .NET و Unity | ✅ بهتر از System.Text.Json |

---

## ❌ معایب نسبت به System.Text.Json

| ضعف                       | توضیح                                             |
| ------------------------- | ------------------------------------------------- |
| سرعت پایین‌تر در حجم بالا | ❌ در مقایسه با System.Text.Json کندتر است        |
| نیاز به نصب دستی پکیج     | ❌ باید از NuGet نصب شود                          |
| وزن بیشتر در فایل نهایی   | ❌ مخصوصاً برای موبایل یا Unity ممکن است مهم باشد |

---

اگر بخوای JSON تو در تو، آرایه‌ای، یا داینامیک داشته باشی هم می‌تونم با همین روش مثال بزنم. فقط بگو چه ساختاری داری.

## برای json های داینامیک

سؤال بسیار خوبی پرسیدی.

### ❓ مشکل:

وقتی از **کلاس (POCO)** استفاده می‌کنی، فقط به **فیلدهایی که در کلاس تعریف شده‌اند** دسترسی داری. اگر JSON کلیدهای جدیدی (Properties) داشته باشه که در کلاس وجود ندارند، اون فیلدها **دریافت نمی‌شن** و **قابل استفاده نیستند**.

---

## ✅ راه‌حل‌ها برای مدیریت **کلیدهای غیرمنتظره / پویا** در کنار کلاس:

### ✳️ 1. استفاده از `Dictionary<string, object>` برای فیلدهای اضافی

```csharp
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }

    [JsonExtensionData]
    public Dictionary<string, JsonElement> ExtraFields { get; set; }
}
```

### 📌 کاربرد:

```json
{
    "id": 1,
    "name": "Ali",
    "age": 30,
    "city": "Tehran"
}
```

کد:

```csharp
var user = JsonSerializer.Deserialize<User>(json);
Console.WriteLine(user.ExtraFields["age"]);   // خروجی: 30
Console.WriteLine(user.ExtraFields["city"]);  // خروجی: "Tehran"
```

---

### ✳️ 2. استفاده از `JObject` برای JSON داینامیک (در Newtonsoft)

```csharp
JObject obj = JObject.Parse(json);
Console.WriteLine(obj["name"]);      // فیلدهای کلاس
Console.WriteLine(obj["somethingNew"]); // فیلدی که کلاس نداشت ولی JSON داشت
```

مزیت این روش اینه که لازم نیست هیچ کلاسی تعریف کنی.

---

### ✳️ 3. ترکیب کلاس + JObject

اگر فیلدهای اصلی رو با کلاس بخوای بخونی، و باقی رو هم با JObject، می‌تونی به‌صورت ترکیبی استفاده کنی:

```csharp
var fullJson = JObject.Parse(json);

// مرحله اول: فیلدهای ثابت
var user = fullJson.ToObject<User>();

// مرحله دوم: فیلدهای اضافی
foreach (var prop in fullJson.Properties())
{
    if (!typeof(User).GetProperties().Any(p => p.Name.Equals(prop.Name, StringComparison.OrdinalIgnoreCase)))
    {
        Console.WriteLine($"فیلد اضافه: {prop.Name} = {prop.Value}");
    }
}
```

---

## 🔚 نتیجه‌گیری:

| روش                     | مزیت                        | مناسب برای              |
| ----------------------- | --------------------------- | ----------------------- |
| `[JsonExtensionData]`   | ساده، درون کلاس             | System.Text.Json        |
| `JObject`               | کنترل کامل، JSON پویا       | Newtonsoft.Json         |
| ترکیبی (POCO + JObject) | همزمان فیلدهای ثابت و متغیر | پروژه‌های واقعی و منعطف |

---

اگه خواستی، با یک JSON خاص برات هر سه روش رو با مثال واقعی بزنم. فقط JSON رو بفرست.
