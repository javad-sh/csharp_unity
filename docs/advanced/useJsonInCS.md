---
title: کار با JSON
sidebar_position: 2
---

## برای استفاده از json در سی شارپ بهترین روش استفاده از Newtonsoft.Json است

## مقدمه

**Newtonsoft.Json**‎ (یا همان Json.NET) پرکاربردترین کتابخانهٔ ‎‎JSON‎‎ برای ‎‎.NET‎‎ است؛ امکانات بسیار کاملی برای **سریال‌سازی (Serialization)** و **دیسریال‌سازی (Deserialization)**، **کوئری‌نویسی (LINQ to JSON)**، **پیکربندی پیشرفته** و **گسترش‌پذیری** (Converters، ContractResolvers و …) در اختیار می‌گذارد. در این راهنما تقریباً همهٔ نکات مهم کتابخانه را به‌همراه مثال‌های واقعی در قالبی ساختارمند مرور می‌کنیم.

---

## نصب و اولین استفاده

```bash
# در خط فرمان
dotnet add package Newtonsoft.Json
# یا در Unity:
Install-Package Newtonsoft.Json -Version 13.0.3
```

```csharp
using Newtonsoft.Json;

// شیء نمونه
var player = new { Id = 1, Name = "John", Score = 980 };

// سریال‌سازی
string json = JsonConvert.SerializeObject(player, Formatting.Indented);
Console.WriteLine(json);
/*
{
  "Id": 1,
  "Name": "John",
  "Score": 980
}
*/

// دیسریال‌سازی
var restored = JsonConvert.DeserializeObject<Player>(json);
```

---

## جدول کلیدی‌ترین کلاس‌ها و متدها

| نوع/کلاس                      | متدهای مهم                                                                                           | توضیح کوتاه                                 | مثال ساده                                                   |
| ----------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------- | ----------------------------------------------------------- |
| **JsonConvert (static)**      | - `SerializeObject(obj, settings?)`<br/>- `DeserializeObject<T>()`<br/>- `SerializeXmlNode(XmlNode)` | ساده‌ترین راه تبدیل شیء/رشته                | `JsonConvert.SerializeObject(list)`                         |
| **JsonSerializer**            | - `Serialize(TextWriter, obj)`<br/>- `Deserialize<T>(TextReader)`                                    | ‌عملکردِ پایین‌سطحی و قابلِ تنظیم           | استفاده با `JsonTextWriter`                                 |
| **JsonSerializerSettings**    | - `Formatting`<br/>- `NullValueHandling`<br/>- `ContractResolver`<br/>- `Converters`                 | یک‌بار بسازید و در کل پروژه استفاده کنید    | `new JsonSerializerSettings { NullValueHandling = Ignore }` |
| **JObject / JArray / JToken** | - `Parse(string)`<br/>- `SelectToken(path)`<br/>- `ToObject<T>()`                                    | دستکاری ‎‎JSON‎‎ بدون مدل C# (LINQ to JSON) | `JObject.Parse(json)["name"]`                               |
| **JsonTextReader / Writer**   | - جریان‌محور (Forward-only) و بسیار سریع                                                             | برای فایل‌های خیلی بزرگ                     | `using var r = new JsonTextReader(sr)`                      |
| **JsonConverter (abstract)**  | - `WriteJson`<br/>- `ReadJson`<br/>- `CanConvert`                                                    | ساخت کانورتر سفارشی برای انواع پیچیده       | تبدیل ‎`Vector3`‎ یونیتی                                    |
| **ContractResolver**          | - `ResolveContract`<br/>- `CreateProperties`                                                         | کنترل سطحِ فیلد/پراپرتی در سریال‌سازی       | Mask کردن فیلدهای حساس                                      |

## ویژگی‌ها و تنظیمات (Attributes/Settings)

| ویژگی/تنظیم                     | کاربرد                                          | مثال                                 |
| ------------------------------- | ----------------------------------------------- | ------------------------------------ |
| `[JsonProperty("user_name")]`   | تغییر نام کلید                                  | `public string UserName {get; set;}` |
| `[JsonIgnore]`                  | حذف پراپرتی از خروجی                            | ‌ رمزها و توکن‌ها                    |
| `[JsonRequired]`                | خطا اگر مقدار موجود نباشد                       | اعتبارسنجی ورودی API                 |
| `NullValueHandling.Ignore`      | ننوشتن مقادیر null                              | حجم کمتر JSON                        |
| `DefaultValueHandling.Populate` | قرار دادن default هنگام دیسریال                 | اطمینان از مقادیر امن                |
| `ReferenceLoopHandling.Ignore`  | جلوگیری از StackOverflow در گراف‌های شیءِ چرخشی | ساختار درختی گرافیکی                 |
| `TypeNameHandling.Auto`         | نگهداری نوع واقعی شیء                           | دیسریال چندریختی (Polymorphic)       |

---

## کار با آرایه‌ها و لیست‌ها

```csharp
string arrJson = "[1,2,3,4]";
var numbers = JsonConvert.DeserializeObject<List<int>>(arrJson);  // [1,2,3,4]

var playersJson = @"[
  {""id"":1,""name"":""Ava""},
  {""id"":2,""name"":""Ben""}
]";
JArray jArr = JArray.Parse(playersJson);
foreach(var jTok in jArr) Console.WriteLine(jTok["name"]);
```

---

## LINQ to JSON (JPath)

```csharp
var root = JObject.Parse(json);
/* مسیر مشابه XPath */
var expensive = root.SelectTokens("$..items[?(@.price > 100)]");
```

---

## کانورتر سفارشی (نمونهٔ یونیتی)

```csharp
class Vector3Converter : JsonConverter<Vector3>
{
    public override void WriteJson(JsonWriter w, Vector3 v, JsonSerializer s) =>
        w.WriteValue($"{v.x},{v.y},{v.z}");

    public override Vector3 ReadJson(JsonReader r, Type type, Vector3 existing, bool has, JsonSerializer s)
    {
        var parts = ((string)r.Value).Split(',');
        return new Vector3(
            float.Parse(parts[0]), float.Parse(parts[1]), float.Parse(parts[2]));
    }
}
// استفاده
var settings = new JsonSerializerSettings();
settings.Converters.Add(new Vector3Converter());
string vJson = JsonConvert.SerializeObject(new Vector3(1,2,3), settings); // "1,2,3"
```

---

## مدیریت خطا

```csharp
var settings = new JsonSerializerSettings
{
    Error = (sender, args) =>
    {
        Console.WriteLine($"مشکل در «{args.ErrorContext.Path}»: {args.ErrorContext.Error.Message}");
        args.ErrorContext.Handled = true; // ادامهٔ پردازش
    }
};

var result = JsonConvert.DeserializeObject<MyType>(badJson, settings);
```

---

## بهینه‌سازی‌های سرعت و حافظه

1. **Reuse Settings** – یک نمونهٔ `JsonSerializerSettings` بسازید و همه‌جا استفاده کنید.
2. **Forward-only Reader/Writer** – برای فایل‌های عظیم، به‌جای `Parse` از `JsonTextReader` + `JsonSerializer` بهره بگیرید.
3. **BufferSize** را در `StreamWriter` / `StreamReader` افزایش دهید.
4. **Avoid JToken when possible** – هرچه مدل C# صریح‌تر باشد، سریع‌تر است.

---

## مقایسهٔ سریع با ‎`System.Text.Json`‎

| معیار                     | Newtonsoft.Json                | System.Text.Json (Net 8)                                  |
| ------------------------- | ------------------------------ | --------------------------------------------------------- |
| ویژگی‌های پیشرفته         | کامل (TypeNameHandling, JPath) | محدودتر (ـ)                                               |
| سرعت خام                  | کمی کندتر در سناریوهای پایه    | سریع‌تر (Native)                                          |
| پشتیبانی Unity ‎(IL2CPP)‎ | بله (بدون AOT issues)          | ممکن است نیاز به `JsonSourceGen` و تنظیمات AOT داشته باشد |
| اکوسیستم و مستندات        | گسترده، آموزش‌های زیاد         | در حال رشد                                                |
| حجم بسته                  | \~600 KB DLL                   | بخشی از ‎.NET‎ (بدون DLL اضافی)                           |

---

## جمع‌بندی

-   برای **پروژه‌های Unity** که نیاز به پشتیبانی ‎IL2CPP‎، **انعطاف حداکثری** و **LINQ to JSON** دارند، **Newtonsoft.Json** همچنان گزینهٔ شمارهٔ یک است.
-   با استفادهٔ هوشمندانه از **Settings**، **Converters** و **Reader/Writer** می‌توانید هم خوانایی کد و هم عملکرد را بهینه کنید.
-   در پروژه‌های بسیار Performance-critical یا سایز باینری کوچک، گزینه‌های دیگری مثل ‎`System.Text.Json`‎ یا even **MessagePack** را نیز بسنجید.
