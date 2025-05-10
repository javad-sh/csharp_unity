---
title: system
sidebar_position: 2
---

# system namespace

فضای نام System در سی‌شارپ (C#) یکی از اصلی‌ترین و پایه‌ای‌ترین namespaces در دات‌نت (‎.NET) است. این فضای نام شامل کلاس‌ها، اینترفیس‌ها و ساختارهایی می‌شود که برای برنامه‌نویسی پایه‌ای و عمومی در دات‌نت استفاده می‌شن.

**مهم ترین موارد در این namespace ?**

## Console

مهم ترین کاربرد این کلاس لاگ گرفتن توسط متد WriteLine می باشد اما یونیتی متد های خودش را برای لاگ گرفتن دارد و از این در برنامه نویسی یونیتی استفاده نمی شود.

```csharp title="example.py"
Console.WriteLine("Hello, World!");

```

در یونیتی از این 3 متد در namespace **UnityEngine** استفاده می شود.

| متد                  | توضیح       |
| -------------------- | ----------- |
| `Debug.Log()`        | پیام عادی   |
| `Debug.LogWarning()` | هشدار (زرد) |
| `Debug.LogError()`   | خطا (قرمز)  |

## String

برای کار با رشته های استفاده می شود.

```
using System;

public class StringExamples
{
    public static void Main()
    {
        // ایجاد یک رشته
        string name = "John Doe";

        // طول رشته
        int length = name.Length; // تعداد کاراکترهای رشته: 8

        // تبدیل به حروف بزرگ
        string upper = name.ToUpper(); // "JOHN DOE"

        // تبدیل به حروف کوچک
        string lower = name.ToLower(); // "john doe"

        // بررسی اینکه آیا رشته شامل عبارت خاصی هست؟
        bool hasDoe = name.Contains("Doe"); // true

        // جایگزینی یک بخش از رشته با عبارت دیگر
        string newName = name.Replace("Doe", "Smith"); // "John Smith"

        // استخراج بخشی از رشته
        string firstName = name.Substring(0, 4); // "John"

        // مقایسه دو رشته (حساس به حروف بزرگ/کوچک)
        bool isEqual = name.Equals("john doe"); // false

        // مقایسه بدون حساسیت به بزرگی یا کوچکی حروف
        bool isEqualIgnoreCase = name.Equals("john doe", StringComparison.OrdinalIgnoreCase); // true

        // پیدا کردن اندیس (index) اولین کاراکتر از یک رشته درون رشته‌ی دیگر
        int index = name.IndexOf("Doe"); // 5

        // بررسی اینکه رشته با یک عبارت خاص شروع می‌شود؟
        bool startsWith = name.StartsWith("John"); // true

        // بررسی اینکه رشته با یک عبارت خاص تمام می‌شود؟
        bool endsWith = name.EndsWith("Doe"); // true

        // حذف فضای خالی ابتدا و انتهای رشته
        string withSpaces = "   Hello World   ";
        string trimmed = withSpaces.Trim(); // "Hello World"

        // جدا کردن رشته به آرایه‌ای از زیررشته‌ها
        string csv = "apple,banana,grape";
        string[] fruits = csv.Split(','); // ["apple", "banana", "grape"]

        // الحاق (ترکیب) رشته‌ها
        string full = string.Concat("Hello", " ", "World"); // "Hello World"

        // استفاده از قالب‌بندی رشته
        string formatted = string.Format("Name: {0}, Age: {1}", "Ali", 25); // "Name: Ali, Age: 25"

        // رشته‌های قالب‌دار (Interpolated Strings)
        int age = 30;
        string interpolated = $"My name is {name} and I am {age} years old."; // "My name is John Doe and I am 30 years old."

        // بررسی رشته خالی
        bool isEmpty = string.IsNullOrEmpty(""); // true

        // بررسی رشته خالی یا فقط شامل فاصله‌ها
        bool isWhiteSpace = string.IsNullOrWhiteSpace("   "); // true

        // تکرار یک رشته چند بار
        string repeated = new string('*', 5); // "*****"

        // تبدیل عدد به رشته
        int number = 123;
        string numberStr = number.ToString(); // "123"

        // تبدیل رشته به عدد
        string numText = "456";
        int parsed = int.Parse(numText); // 456

        // تلاش برای تبدیل رشته به عدد (با جلوگیری از خطا)
        bool success = int.TryParse("abc", out int result); // success = false, result = 0

    }
}


```

## Math

برای استفاده از متد های ریاضی استفاده می شود.

```
using System;

public class MathExamples
{
    public static void Main()
    {
        // مقدار قدرمطلق
        int a = -10;
        int absValue = Math.Abs(a); // 10

        // بزرگترین عدد بین دو مقدار
        int max = Math.Max(5, 8); // 8

        // کوچکترین عدد بین دو مقدار
        int min = Math.Min(5, 8); // 5

        // توان (a به توان b)
        double power = Math.Pow(2, 3); // 8.0

        // جذر (ریشه دوم)
        double squareRoot = Math.Sqrt(25); // 5.0

        // عدد پی (π)
        double pi = Math.PI; // 3.1415926535...

        // عدد e (پایه لگاریتم طبیعی)
        double e = Math.E; // 2.7182818...

        // سینوس زاویه (بر حسب رادیان)
        double sinValue = Math.Sin(Math.PI / 2); // 1.0

        // کسینوس زاویه (بر حسب رادیان)
        double cosValue = Math.Cos(0); // 1.0

        // گرد کردن به نزدیک‌ترین عدد صحیح
        double rounded = Math.Round(3.6); // 4

        // گرد کردن به پایین (بزرگترین عدد صحیح کوچک‌تر یا مساوی)
        double floor = Math.Floor(3.7); // 3

        // گرد کردن به بالا (کوچک‌ترین عدد صحیح بزرگ‌تر یا مساوی)
        double ceil = Math.Ceiling(3.2); // 4

        // لگاریتم طبیعی
        double ln = Math.Log(10); // ≈ 2.302

        // لگاریتم در پایه 10
        double log10 = Math.Log10(100); // 2

        // عدد تصادفی بین 0.0 تا 1.0 (با System.Random بهتره ولی برای مثال:)
        double random = new Random().NextDouble(); // مثل 0.547
    }
}
```

## DateTime

برای کار با زمان استفاده می شود.

```
using System;

public class DateTimeExamples
{
    public static void Main()
    {
        // زمان و تاریخ فعلی سیستم
        DateTime now = DateTime.Now; // شامل تاریخ و ساعت فعلی

        // فقط تاریخ امروز
        DateTime today = DateTime.Today; // ساعت صفر (00:00:00)

        // زمان فعلی بدون تاریخ
        TimeSpan currentTime = DateTime.Now.TimeOfDay;

        // ساخت یک تاریخ مشخص (سال، ماه، روز)
        DateTime myBirthday = new DateTime(2000, 5, 9);

        // دسترسی به اجزای تاریخ
        int year = myBirthday.Year;       // 2000
        int month = myBirthday.Month;     // 5
        int day = myBirthday.Day;         // 9
        DayOfWeek weekDay = myBirthday.DayOfWeek; // Tuesday (مثلاً)

        // اضافه کردن زمان
        DateTime nextWeek = now.AddDays(7);         // یک هفته بعد
        DateTime nextYear = now.AddYears(1);        // یک سال بعد
        DateTime afterHours = now.AddHours(5);      // پنج ساعت بعد

        // کم کردن زمان (می‌توان از Add استفاده کرد با عدد منفی)
        DateTime yesterday = now.AddDays(-1);       // دیروز

        // تفاوت بین دو تاریخ
        TimeSpan difference = now - myBirthday;
        double totalDays = difference.TotalDays;    // مثلاً چند روز از تولد گذشته

        // فرمت‌های مختلف برای نمایش تاریخ
        string longDate = now.ToLongDateString();   // مثلاً "Friday, May 9, 2025"
        string shortDate = now.ToShortDateString(); // مثلاً "5/9/2025"
        string longTime = now.ToLongTimeString();   // مثلاً "19:45:30"
        string shortTime = now.ToShortTimeString(); // مثلاً "19:45"

        // فرمت دلخواه با ToString
        string customFormat = now.ToString("yyyy-MM-dd HH:mm:ss"); // "2025-05-09 19:45:30"

        // تبدیل رشته به تاریخ
        string dateText = "2023-01-01";
        DateTime parsedDate = DateTime.Parse(dateText);

        // تلاش برای تبدیل بدون خطا
        bool valid = DateTime.TryParse("2023-15-01", out DateTime result); // false

    }
}

```

## Collections.Generic

System.Collections.Generic در C# شامل مجموعه‌ای از کلاس‌ها و ساختارهای داده‌ای جنریک هست که برای ذخیره‌سازی، مدیریت و دسترسی به مجموعه‌ای از داده‌ها استفاده می‌شن — به شکل نوع‌امن (type-safe) و بهینه‌تر نسبت به مجموعه‌های غیر جنریک.

:::tip
این namespace جایگزینی برای namespace Collections است و بهتر است دیگر از این به جای آن استفاده شود.
:::

خلاصه ی مهم ترین موارد موجود در این فضای نام :

| نوع      | نام                                                       | توضیح                                                                         |
| -------- | --------------------------------------------------------- | ----------------------------------------------------------------------------- |
| کلاس     | `List<T>`                                                 | لیستی از آیتم‌ها به ترتیب اضافه شدن، مانند آرایه ولی با قابلیت افزایش اندازه. |
| کلاس     | `Dictionary<TKey, TValue>`                                | مجموعه‌ای از جفت کلید-مقدار با دسترسی سریع بر اساس کلید.                      |
| کلاس     | `Queue<T>`                                                | صف (FIFO) - اضافه شدن در انتها و برداشت از ابتدا.                             |
| کلاس     | `Stack<T>`                                                | پشته (LIFO) - اضافه شدن و برداشت از انتها.                                    |
| کلاس     | `HashSet<T>`                                              | مجموعه‌ای از آیتم‌های یکتا بدون ترتیب خاص.                                    |
| کلاس     | `SortedList<TKey, TValue>`                                | دیکشنری مرتب بر اساس کلیدها.                                                  |
| کلاس     | `SortedDictionary<TKey, TValue>`                          | مانند `SortedList` ولی پیاده‌سازی متفاوت (براساس درخت).                       |
| کلاس     | `LinkedList<T>`                                           | لیست پیوندی دوطرفه برای سناریوهای خاص.                                        |
| کلاس     | `KeyValuePair<TKey, TValue>`                              | ساختار جفت کلید-مقدار که معمولاً در دیکشنری‌ها استفاده می‌شود.                |
| اینترفیس | `IEnumerable<T>`                                          | اجازه پیمایش یک کالکشن با foreach.                                            |
| اینترفیس | `IEnumerator<T>`                                          | کنترل مستقیم پیمایش با `MoveNext()` و `Current`.                              |
| اینترفیس | `IList<T>`, `IDictionary<TKey, TValue>`, `ICollection<T>` | اینترفیس‌های پایه برای ساخت کالکشن‌های custom.                                |

### کلاس List

کلاس `List<T>` در #C یکی از مهم‌ترین و پرکاربردترین کلاس‌ها در فضای نام System.Collections.Generic است. این کلاس یک لیست داینامیک (پویا) از عناصر با نوع مشخص (generic) را پیاده‌سازی می‌کند که می‌تواند به صورت خودکار بزرگ یا کوچک شود.

#### تعریف اولیه :

```
List<int> numbers = new List<int>();
List<string> names = new List<string>();

```

در اینجا:

`List<int>` یک لیست از اعداد صحیح است.

`List<string>` یک لیست از رشته‌هاست.

#### مزایا

-   اندازه‌ی لیست خودکار افزایش می‌یابد.

-   ترتیب عناصر حفظ می‌شود.

-   پشتیبانی از جستجو، مرتب‌سازی، حذف، پیمایش و فیلتر.

-   سازگار با foreach.

#### سازنده‌ها (Constructors)

```
List<T>()                          // ایجاد لیست خالی
List<T>(int capacity)              // ایجاد لیست با ظرفیت اولیه
List<T>(IEnumerable<T> collection) // ایجاد لیست از یک مجموعه دیگر

```

##### capacity

```
List<int> numbers = new List<int>(100);

```

✅ کاربرد:
این سازنده یک لیست خالی می‌سازد، اما ظرفیت اولیه آن را برابر عدد مشخص‌شده قرار می‌دهد.
یعنی حافظه به اندازه‌ی آن تعداد عنصر از ابتدا رزرو می‌شود.

✅ مزیت:
اگر از ابتدا می‌دانی که قرار است مثلاً ۱۰۰۰ عنصر به لیست اضافه کنی، مقداردهی ظرفیت اولیه باعث می‌شود لیست کمتر نیاز به resize (افزایش حافظه داخلی) پیدا کند.

این موضوع از لحاظ کارایی (performance) و سرعت مفید است، چون عملیات افزایش ظرفیت (و کپی مجدد عناصر) زمان‌بر است.

⚠️ نکته:
این ظرفیت با تعداد آیتم‌ها فرق دارد.

تعداد (Count) صفر است، ولی ظرفیت (Capacity) برابر عدد ورودی است.

:::tip
capacity به معنای حداکثر تعداد اعضای لیست نیست و بیشتر مربوط به مسائل بهینه سازی است.
هر زمان تعداد اعضا بیشتر از capacity شد خودش به صورت اتومات و پنهانی ظرفیت را افزایش می دهد.
:::

##### `List<T>(IEnumerable<T> collection)`

```
int[] array = { 1, 2, 3 };
List<int> numbers = new List<int>(array);

```

✅ کاربرد:
این سازنده یک لیست جدید می‌سازد و به‌صورت خودکار همه‌ی آیتم‌های موجود در کالکشن داده‌شده (مثل آرایه، لیست دیگر، HashSet و ...) را به آن اضافه می‌کند.

✅ مزیت:
خیلی سریع و راحت می‌توان از یک منبع دیگر (مثل آرایه یا خروجی یک فیلتر) یک لیست ساخت.

بسیار پرکاربرد در عملیات‌هایی مثل تبدیل یا کپی داده.

مثال :

```
List<string> names = new List<string> { "Ali", "Sara", "Mehdi", "Sam" };

// ساخت لیست جدید از روی نتایج Where
List<string> namesStartingWithS = new List<string>(
    names.Where(name => name.StartsWith("S"))
);

// خروجی: Sara, Sam
foreach (var n in namesStartingWithS)
    Console.WriteLine(n);

```

###### IEnumerable چیست ؟

`IEnumerable<T> یعنی "این مجموعه قابل پیمایشه".`
به مجموعه های قابل پیمایش IEnumerable میگن. یعنی میشه با foreach پیمایششون کرد.

مثل :
`List<T>`

T[] (آرایه)

`HashSet<T>`

`Queue<T>`

`Stack<T>`

خروجی‌های LINQ مثل .Where() یا .Select()

:::tip
در نتیجه از آرایه ی خود سی شارپ هم میشه در list استفاده کرد.
:::

#### 🔑 متدها و ویژگی‌های کلیدی

##### افزودن و حذف :

| متد                         | توضیح                             |
| --------------------------- | --------------------------------- |
| `Add(T item)`               | افزودن عنصر به انتهای لیست        |
| `AddRange(IEnumerable<T>)`  | افزودن مجموعه‌ای از عناصر         |
| `Insert(int index, T item)` | افزودن در موقعیت مشخص             |
| `Remove(T item)`            | حذف اولین نمونه از مقدار داده‌شده |
| `RemoveAt(int index)`       | حذف عنصر در اندیس مشخص            |
| `Clear()`                   | پاک کردن همه عناصر                |

##### جستجو :

| متد                     | توضیح                      |
| ----------------------- | -------------------------- |
| `Contains(T item)`      | بررسی وجود عنصر            |
| `IndexOf(T item)`       | یافتن اندیس عنصر           |
| `LastIndexOf(T item)`   | یافتن آخرین اندیس از عنصر  |
| `Find(Predicate<T>)`    | یافتن اولین آیتم مطابق شرط |
| `FindAll(Predicate<T>)` | تمام آیتم‌های مطابق شرط    |

##### مرتب‌سازی و تغییر :

| متد                   | توضیح                                     |
| --------------------- | ----------------------------------------- |
| `Sort()`              | مرتب‌سازی پیش‌فرض (نیازمند `IComparable`) |
| `Sort(Comparison<T>)` | مرتب‌سازی با تابع دلخواه                  |
| `Reverse()`           | برعکس کردن لیست                           |
| `ToArray()`           | تبدیل به آرایه                            |
| `TrimExcess()`        | کاهش ظرفیت اضافی                          |

##### ویژگی‌ها (Properties) :

| ویژگی                          | توضیح                                 |
| ------------------------------ | ------------------------------------- |
| `Count`                        | تعداد آیتم‌های موجود                  |
| `Capacity`                     | ظرفیت داخلی لیست (قبل از نیاز به رشد) |
| `Item[int index]` یا `[index]` | دسترسی به آیتم از طریق ایندکس         |

#### پیمایش لیست

```
List<string> colors = new List<string> { "Red", "Green", "Blue" };

foreach (string color in colors)
{
    Console.WriteLine(color);
}


```

### `کلاس Dictionary<TKey, TValue>`

در C#، کلاس `Dictionary<TKey, TValue>` از فضای نام System.Collections.Generic، یک مجموعهٔ عمومی (generic collection) است که برای ذخیره‌سازی داده‌ها به صورت جفت کلید-مقدار (Key-Value Pair) استفاده می‌شود. این کلاس مانند یک فرهنگ‌لغت عمل می‌کند: برای هر "کلید" (Key)، یک "مقدار" (Value) ذخیره می‌شود.

تعریف کلی :

```
Dictionary<TKey, TValue> dict = new Dictionary<TKey, TValue>();
```

TKey نوع کلید است.

TValue نوع مقدار است.

مثال :

```
Dictionary<string, int> ages = new Dictionary<string, int>();
ages.Add("Ali", 25);
ages.Add("Sara", 30);
```

#### ویژگی های کلیدی

| ویژگی              | توضیح                                                                     |
| ------------------ | ------------------------------------------------------------------------- |
| **نوع جنریک**      | می‌تونی هر نوع داده‌ای رو برای کلید و مقدار انتخاب کنی.                   |
| **عدم تکرار کلید** | هر کلید فقط یکبار می‌تونه وجود داشته باشه. مقدارها می‌تونند تکراری باشند. |
| **سرعت بالا**      | دسترسی به مقادیر از طریق کلید با سرعت بالا انجام می‌شه (معمولاً O(1)).    |

#### متد های مهم :

| متد                           | کاربرد                                                       |
| ----------------------------- | ------------------------------------------------------------ |
| `Add(key, value)`             | اضافه کردن یک جفت کلید-مقدار                                 |
| `Remove(key)`                 | حذف یک مقدار با کلید مشخص                                    |
| `ContainsKey(key)`            | بررسی وجود کلید                                              |
| `ContainsValue(value)`        | بررسی وجود مقدار                                             |
| `TryGetValue(key, out value)` | مقدار مرتبط با یک کلید را در صورت وجود برمی‌گرداند، بدون خطا |

### `Queue<T>`

کلاس `Queue<T>` در C# یکی از انواع مجموعه‌های generic در فضای نام System.Collections.Generic است که برای پیاده‌سازی ساختار صف (Queue) استفاده می‌شود. این ساختار داده از اصل FIFO (First In, First Out – اول وارد، اول خارج) پیروی می‌کند؛ یعنی عنصری که اول وارد صف می‌شود، اولین عنصری است که از صف خارج می‌شود.

ساختار کلی

```
Queue<T> myQueue = new Queue<T>();
```

#### سازنده‌ها (Constructors)

```
List<T>()                          // ایجاد لیست خالی
List<T>(int capacity)              // ایجاد لیست با ظرفیت اولیه
List<T>(IEnumerable<T> collection) // ایجاد لیست از یک مجموعه دیگر

```

#### متدهای مهم :

| متد                | توضیح                                                                    |
| ------------------ | ------------------------------------------------------------------------ |
| `Enqueue(T item)`  | یک عنصر به انتهای صف اضافه می‌کند.                                       |
| `Dequeue()`        | عنصر اول صف را حذف کرده و برمی‌گرداند. اگر صف خالی باشد، استثناء می‌دهد. |
| `Peek()`           | فقط عنصر اول صف را **برمی‌گرداند بدون اینکه حذف کند**.                   |
| `Contains(T item)` | بررسی می‌کند که آیا عنصری در صف وجود دارد یا نه.                         |
| `Clear()`          | تمام عناصر صف را حذف می‌کند.                                             |
| `Count`            | تعداد عناصر موجود در صف.                                                 |
| `ToArray()`        | صف را به آرایه تبدیل می‌کند.                                             |
| `TrimExcess()`     | حافظه اضافی استفاده نشده را آزاد می‌کند.                                 |
| `GetEnumerator()`  | امکان پیمایش با foreach را فراهم می‌کند.                                 |

:::tip
این مورد در یونیتی برای استخر آبجکت ها استفاده می شود.
:::