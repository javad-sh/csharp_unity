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
مثال با مقداردهی اولیه :

```
Dictionary<string, int> ages = new Dictionary<string, int>
{
    { "Ali", 25 },
    { "Sara", 30 },
    { "Mehdi", 28 }
};

```

#### ویژگی های کلیدی

| ویژگی              | توضیح                                                                     |
| ------------------ | ------------------------------------------------------------------------- |
| **نوع جنریک**      | می‌تونی هر نوع داده‌ای رو برای کلید و مقدار انتخاب کنی.                   |
| **عدم تکرار کلید** | هر کلید فقط یکبار می‌تونه وجود داشته باشه. مقدارها می‌تونند تکراری باشند. |
| **سرعت بالا**      | دسترسی به مقادیر از طریق کلید با سرعت بالا انجام می‌شه (معمولاً O(1)).    |

:::caution
در صورت دادن کلید تکراری در کد اروری دریافت نمی شود بلکه در زمان کامپایل ارور نمایش داده می شود.
:::

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

### `Stack<T>`

کلاس `Stack<T>` در فضای نام System.Collections.Generic در C#، یک ساختار داده‌ی پشته‌ای (Stack) را پیاده‌سازی می‌کند که بر اساس اصل LIFO (Last In, First Out) کار می‌کند؛ یعنی آخرین عنصری که وارد می‌شود، اولین عنصری است که خارج می‌شود.

#### سازنده‌ها (Constructors)

```
Stack<T>()                          // ایجاد لیست خالی
Stack<T>(int capacity)              // ایجاد لیست با ظرفیت اولیه
Stack<T>(IEnumerable<T> collection) // ایجاد لیست از یک مجموعه دیگر

```

#### متدهای مهم :

| متد / ویژگی        | توضیح                                                                       |
| ------------------ | --------------------------------------------------------------------------- |
| `Push(T item)`     | یک آیتم به بالای پشته اضافه می‌کند.                                         |
| `Pop()`            | آیتم بالای پشته را حذف کرده و بازمی‌گرداند (اگر خالی باشد، استثناء می‌دهد). |
| `Peek()`           | آیتم بالای پشته را فقط برمی‌گرداند (بدون حذف).                              |
| `Contains(T item)` | بررسی وجود یک آیتم در پشته.                                                 |
| `Clear()`          | تمام عناصر پشته را حذف می‌کند.                                              |
| `Count`            | تعداد عناصر در پشته.                                                        |
| `ToArray()`        | پشته را به آرایه تبدیل می‌کند.                                              |
| `TrimExcess()`     | حافظه اضافی را آزاد می‌کند.                                                 |

در یونیتی می تواند برای موارد زیر کاربرد داشته باشد :

-   سیستم Undo/Redo

-   مدیریت حالت‌ها یا State Stack

-   حرکت برگشتی کاراکتر یا دوربین

-   AI Behavior Stack (مثلاً برگشتن به رفتار قبلی)

### `HashSet<T>`

کلاس `HashSet<T>` در C# یکی از مجموعه‌های قدرتمند System.Collections.Generic است که برای ذخیره‌ی مقادیر یکتا (بدون تکرار) استفاده می‌شود. برخلاف `List<T>`، در `HashSet<T>` امکان داشتن آیتم تکراری وجود ندارد.

:::caution
هش ست ایندکس ندارد. یعنی نمی شود بگوییم آیتم 4 را بده. اگر همچین چیزی نیاز است یا باید از لیست استفاده کنیم و یا اگر هش ست داریم باید آن را به یک لیست تبدیل کنیم.
:::

#### سازنده ها :

```
        // 1. سازنده‌ی پیش‌فرض: ایجاد یک مجموعه‌ی خالی
        HashSet<string> set1 = new HashSet<string>();
        set1.Add("apple");
        set1.Add("banana");
        set1.Add("apple"); // عنصر تکراری نادیده گرفته می‌شود
        Console.WriteLine("set1: " + string.Join(", ", set1));
        // خروجی: apple, banana

        // 2. سازنده با IEnumerable<T>: ایجاد مجموعه از یک آرایه (تکراری‌ها حذف می‌شوند)
        string[] fruits = { "apple", "banana", "orange", "banana" };
        HashSet<string> set2 = new HashSet<string>(fruits);
        Console.WriteLine("set2: " + string.Join(", ", set2));
        // خروجی: apple, banana, orange

        // 3. سازنده با IEnumerable<T> و مقایسه‌گر: حذف حساسیت به حروف کوچک و بزرگ
        string[] mixedCaseFruits = { "apple", "APPLE", "Apple" };
        HashSet<string> set3 = new HashSet<string>(mixedCaseFruits, StringComparer.OrdinalIgnoreCase);
        Console.WriteLine("set3 (case-insensitive): " + string.Join(", ", set3));
        // خروجی: apple (فقط یکی باقی می‌ماند چون همه از نظر بزرگ و کوچکی یکسان در نظر گرفته می‌شوند)

        // 4. سازنده فقط با مقایسه‌گر: ایجاد مجموعه خالی ولی با مقایسه‌گر سفارشی
        HashSet<string> set4 = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        set4.Add("Banana");
        set4.Add("banana"); // تکراری محسوب می‌شود و اضافه نمی‌شود
        Console.WriteLine("set4 (case-insensitive): " + string.Join(", ", set4));
        // خروجی: Banana

```

ویژگی‌های اصلی `HashSet<T>` :

-   فقط مقادیر یکتا ذخیره می‌کند (مثل مجموعه‌های ریاضی).

-   جستجوی بسیار سریع دارد (به دلیل استفاده از هش).

-   ترتیب خاصی در ذخیره عناصر ندارد.

#### متدهای مهم :

| متد / ویژگی                           | توضیح                                         |
| ------------------------------------- | --------------------------------------------- |
| `Add(T item)`                         | اضافه کردن عنصر، اگر تکراری نباشد.            |
| `Remove(T item)`                      | حذف یک عنصر.                                  |
| `Contains(T item)`                    | بررسی وجود یک عنصر.                           |
| `Clear()`                             | پاک‌سازی تمام مجموعه.                         |
| `Count`                               | تعداد عناصر موجود.                            |
| `SetEquals(IEnumerable<T>)`           | بررسی اینکه آیا دو مجموعه دقیقاً برابر هستند. |
| `UnionWith(IEnumerable<T>)`           | انجام اجتماع دو مجموعه.                       |
| `IntersectWith(IEnumerable<T>)`       | انجام اشتراک دو مجموعه.                       |
| `ExceptWith(IEnumerable<T>)`          | حذف تمام اعضای یک مجموعه از مجموعه اصلی.      |
| `SymmetricExceptWith(IEnumerable<T>)` | اعضای متفاوت دو مجموعه را نگه می‌دارد.        |

### `SortedList<TKey, TValue>`

مثل دیکشنری `(Dictionary<TKey, TValue>)` هست، ولی همیشه کلیدها را به‌صورت مرتب‌شده (ascending) نگه می‌دارد.

#### سازنده ها :

```
        // سازنده 1: SortedList<TKey, TValue>()
        // ایجاد یک لیست مرتب خالی با مقایسه‌گر پیش‌فرض (بر اساس ترتیب صعودی کلیدها)
        SortedList<int, string> list1 = new SortedList<int, string>();
        list1.Add(2, "دو");
        list1.Add(1, "یک");
        list1.Add(3, "سه");
        // لیست به‌صورت خودکار به ترتیب کلید مرتب می‌شود: 1، 2، 3

        // سازنده 2: SortedList<TKey, TValue>(int capacity)
        // ایجاد لیست مرتب با ظرفیت اولیه مشخص (برای بهینه‌سازی حافظه در لیست‌های بزرگ)
        SortedList<int, string> list2 = new SortedList<int, string>(50);
        list2.Add(1, "مرحله اول");
        // فضای کافی برای 50 آیتم در نظر گرفته شده (در عملکرد تأثیر دارد)

        // سازنده 3: SortedList<TKey, TValue>(IComparer<TKey> comparer)
        // ایجاد لیست خالی با مقایسه‌گر سفارشی (مثلاً مرتب‌سازی نزولی کلیدها)
        IComparer<int> reverseComparer = Comparer<int>.Create((a, b) => b.CompareTo(a));
        SortedList<int, string> list3 = new SortedList<int, string>(reverseComparer);
        list3.Add(10, "ده");
        list3.Add(5, "پنج");
        list3.Add(20, "بیست");
        // ترتیب خروجی: 20، 10، 5

        // سازنده 4: SortedList<TKey, TValue>(IDictionary<TKey, TValue> dictionary)
        // ایجاد لیست مرتب از روی یک دیکشنری معمولی (کلیدها مرتب می‌شوند)
        Dictionary<int, string> sourceDict = new Dictionary<int, string>()
        {
            { 3, "مرحله سوم" },
            { 1, "مرحله اول" },
            { 2, "مرحله دوم" }
        };
        SortedList<int, string> list4 = new SortedList<int, string>(sourceDict);
        // لیست به ترتیب کلید مرتب خواهد بود: 1، 2، 3

        // سازنده 5: SortedList<TKey, TValue>(IDictionary<TKey, TValue> dictionary, IComparer<TKey> comparer)
        // ساخت لیست مرتب از دیکشنری با استفاده از مقایسه‌گر سفارشی (مثلاً به صورت نزولی)
        SortedList<int, string> list5 = new SortedList<int, string>(sourceDict, reverseComparer);
        // خروجی به ترتیب نزولی کلیدها: 3، 2، 1

```

#### متدهای مهم :

| متد / ویژگی            | توضیح                              |
| ---------------------- | ---------------------------------- |
| `Add(key, value)`      | افزودن آیتم                        |
| `Remove(key)`          | حذف آیتم با کلید                   |
| `Clear()`              | پاک‌سازی کامل لیست                 |
| `ContainsKey(key)`     | بررسی وجود کلید                    |
| `ContainsValue(value)` | بررسی وجود مقدار                   |
| `Count`                | تعداد کل آیتم‌ها                   |
| `Keys`                 | لیستی از کلیدهای مرتب‌شده          |
| `Values`               | لیستی از مقادیر (به ترتیب کلیدها)  |
| `this[key]`            | دسترسی یا ویرایش مقدار براساس کلید |

### `SortedDictionary<TKey, TValue>`

بسیار شبیه به SortedList است اما تفاوت این است که بر خلاف SortedList به صورت درختی پیاده سازی می شود و نه آرایه.
این در عمل به این معنی است که آیتم ها با ایندکس قابل دسترسی نیستند.
باقی تفاوت ها در سرعت و بهینه بودن است.

:::note
ساختاری درختی به این معناست که اگر آیتم بخواهد اضافه شود بین دو آیتم قرار میگیرد بدون نیاز به جابجایی آیتم ها موجود. اما در آرایه آیتم ها باید جابجا شوند تا جا برای آیتم جدید باز شود.
:::

#### سازنده ها :

```
        // سازنده 1: SortedDictionary<TKey, TValue>()
        // ایجاد یک دیکشنری مرتب خالی با مقایسه‌گر پیش‌فرض
        SortedDictionary<int, string> dict1 = new SortedDictionary<int, string>();
        dict1.Add(3, "سه");
        dict1.Add(1, "یک");
        dict1.Add(2, "دو");
        // کلیدها به صورت خودکار به ترتیب 1، 2، 3 مرتب می‌شوند

        // سازنده 2: SortedDictionary<TKey, TValue>(IComparer<TKey> comparer)
        // ایجاد دیکشنری مرتب خالی با مقایسه‌گر سفارشی (مثلاً نزولی)
        IComparer<int> reverseComparer = Comparer<int>.Create((a, b) => b.CompareTo(a));
        SortedDictionary<int, string> dict2 = new SortedDictionary<int, string>(reverseComparer);
        dict2.Add(10, "ده");
        dict2.Add(5, "پنج");
        dict2.Add(20, "بیست");
        // ترتیب کلیدها نزولی خواهد بود: 20، 10، 5

        // سازنده 3: SortedDictionary<TKey, TValue>(IDictionary<TKey, TValue> dictionary)
        // ساخت دیکشنری مرتب از یک دیکشنری موجود (به صورت مرتب‌شده براساس کلید)
        Dictionary<int, string> baseDict = new Dictionary<int, string>()
        {
            { 3, "مرحله سوم" },
            { 1, "مرحله اول" },
            { 2, "مرحله دوم" }
        };
        SortedDictionary<int, string> dict3 = new SortedDictionary<int, string>(baseDict);
        // کلیدها مرتب می‌شوند: 1، 2، 3

        // سازنده 4: SortedDictionary<TKey, TValue>(IDictionary<TKey, TValue> dictionary, IComparer<TKey> comparer)
        // ساخت دیکشنری مرتب از یک دیکشنری موجود با مقایسه‌گر سفارشی
        SortedDictionary<int, string> dict4 = new SortedDictionary<int, string>(baseDict, reverseComparer);
        // کلیدها مرتب نزولی می‌شن: 3، 2، 1


```

#### متدهای مهم :

متدهای این کلاس همگی به جز موارد مربوط به ایندکس با قبلی یکسان است.

#### جدول مقایسه :

| ویژگی                         | `SortedList<TKey, TValue>` | `SortedDictionary<TKey, TValue>` |
| ----------------------------- | -------------------------- | -------------------------------- |
| ساختار داخلی                  | آرایه (`array`)            | درخت متوازن (مثل Red-Black Tree) |
| دسترسی با ایندکس (`list[0]`)  | ✅ دارد                    | ❌ ندارد                         |
| سرعت درج/حذف آیتم وسط         | ❌ کند (جابجایی لازم دارد) | ✅ سریع‌تر و یکنواخت             |
| حافظه                         | ✅ حافظه کمتر مصرف می‌کند  | ❌ حافظه بیشتری مصرف می‌کند      |
| مرتب‌سازی خودکار کلیدها       | ✅ بله                     | ✅ بله                           |
| عملکرد در داده‌های بسیار بزرگ | ❌ ممکن است کند شود        | ✅ مناسب‌تر برای حجم زیاد داده   |

### `LinkedList<T>`

برخلاف `List<T>` که از آرایه پشت‌صحنه استفاده می‌کنه، `LinkedList<T>` از گره‌های زنجیره‌ای (nodes) استفاده می‌کنه.

گره های زنجیره ای به این معنی هستند که هر آیتم فقط به آیتم بعد و قبل از خودش اشاره می کنه.
این باعث میشه که برای حذف و اضافه ی یک آیتم، باقی آیتم های جابجا نشن و فقط اشاره گر 2 آیتم بعد و قبل عوض شود. باز هم مثل درختی موارد با ایندکس قابل دسترسی نیستند.
تفاوت بیشتر در موارد مربوط به سرعت و حافظه است.

#### سازنده ها :

```
List<T>()                          // ایجاد لیست خالی
List<T>(int capacity)              // ایجاد لیست با ظرفیت اولیه
List<T>(IEnumerable<T> collection) // ایجاد لیست از یک مجموعه دیگر

```

#### متد های مهم :

| متد / ویژگی              | توضیح                             |
| ------------------------ | --------------------------------- |
| `AddFirst(value)`        | افزودن در ابتدا                   |
| `AddLast(value)`         | افزودن در انتها                   |
| `AddBefore(node, value)` | افزودن قبل از گره خاص             |
| `AddAfter(node, value)`  | افزودن بعد از گره خاص             |
| `Find(value)`            | یافتن اولین گره با مقدار داده شده |
| `FindLast(value)`        | یافتن آخرین گره با مقدار داده شده |
| `Remove(value)`          | حذف مقدار                         |
| `RemoveFirst()`          | حذف اولین گره                     |
| `RemoveLast()`           | حذف آخرین گره                     |
| `First` / `Last`         | دسترسی به گره‌های ابتدا و انتها   |
| `Count`                  | تعداد گره‌ها در لیست              |

#### `مقایسه با List<T>`

| ویژگی            | `List<T>`                  | `LinkedList<T>`            |
| ---------------- | -------------------------- | -------------------------- |
| ساختار داخلی     | آرایه                      | گره‌های پیوندی             |
| افزودن در ابتدا  | ❌ کند (نیاز به جابه‌جایی) | ✅ سریع                    |
| افزودن در وسط    | ❌ کند                     | ✅ با گره سریع انجام می‌شه |
| دسترسی با ایندکس | ✅ دارد                    | ❌ ندارد (باید بگردی)      |
| پیمایش           | ساده                       | کمی پیچیده‌تر              |

### `KeyValuePair<TKey, TValue>`

کلاس `KeyValuePair<TKey, TValue>` یکی از ساده‌ترین و در عین حال پرکاربردترین ساختارهای داده در C# هست که معمولاً همراه با دیکشنری‌ها `(Dictionary<TKey, TValue>, SortedList, SortedDictionary و ...)` استفاده می‌شه.

-   یک ساختار ساده (struct) که شامل یک کلید (Key) و یک مقدار (Value) هست.
-   معمولاً برای پیمایش دیکشنری‌ها یا وقتی می‌خوای جفت‌های کلید-مقدار رو نگه داری استفاده می‌شه.

به زبان ساده و خلاصه فقط یک جفت کی و مقدار که پس از تعریف فقط خواندی هستند و برای تغییر، باید دوباره مقداردهی بشه یا آیتم جدید ساخته بشه.

```
// ساختار کلی
KeyValuePair<TKey, TValue>

// مثال
KeyValuePair<int, string> pair = new KeyValuePair<int, string>(1, "مرحله اول");

```

```
        // ساخت مستقیم یک KeyValuePair
        KeyValuePair<int, string> item = new KeyValuePair<int, string>(1, "سیب");

        // دسترسی به کلید و مقدار
        Console.WriteLine("کلید: " + item.Key);
        Console.WriteLine("مقدار: " + item.Value);

        // استفاده در Dictionary
        Dictionary<int, string> fruits = new Dictionary<int, string>()
        {
            { 1, "سیب" },
            { 2, "موز" },
            { 3, "انار" }
        };

        // پیمایش دیکشنری با KeyValuePair
        foreach (KeyValuePair<int, string> pair in fruits)
        {
            Console.WriteLine($"کلید: {pair.Key}  →  مقدار: {pair.Value}");
        }
```

### `IEnumerable<T>`

این اینترفیس یعنی این شیء یک مجموعه قابل پیمایش هست که می‌تونیم اعضاش رو یکی‌یکی (foreach) بخونیم.

پس هر چی foreach روش کار می‌کنه، یعنی از `IEnumerable<T>` پیروی می‌کنه!

```
IEnumerable<int> numbers = new List<int> { 1, 2, 3, 4 };

foreach (var num in numbers)
{
    Console.WriteLine(num);
}

```

:::caution
نکته ی خیلی مهم :
متغیر می تونه از نوع اینترفیس باشه به شرطی که شی ای بهش داده بشه که کلاس سازنده ی اون شی از اون اینترفیس پیروی کرده باشه.
یا به بیان دیگه :
متغیر می‌تونه از نوع interface باشه، به شرطی که شی‌ای که بهش می‌دی از اون interface پیروی کنه.
:::

#### متدهای مهم :

این اینترفیس خودش فقط یک متد GetEnumerator() داره. که در پس زمینه کار میکنه و وظیفه‌ی تولید یک Enumerator داره که اجازه می‌ده عناصر مجموعه رو یکی‌یکی پیمایش کنیم (برای استفاده در foreach).

اما با استفاده از namespace Linq می شود تعداد زیادی متد را روی آن اجرا کرد.

| متد                                | کاربرد                          |
| ---------------------------------- | ------------------------------- |
| `Where(predicate)`                 | فیلتر کردن داده‌ها              |
| `Select(selector)`                 | تبدیل داده‌ها                   |
| `ToList()`                         | تبدیل به لیست                   |
| `ToArray()`                        | تبدیل به آرایه                  |
| `First()`, `FirstOrDefault()`      | گرفتن اولین عنصر                |
| `Count()`                          | تعداد عناصر                     |
| `Any()`, `All()`                   | بررسی شرط روی اعضا              |
| `OrderBy()`, `OrderByDescending()` | مرتب‌سازی                       |
| `Distinct()`                       | حذف مقادیر تکراری               |
| `Skip(n)`, `Take(n)`               | رد کردن/برداشتن تعدادی از عناصر |

```
using System.Linq;

IEnumerable<int> numbers = new List<int> { 1, 2, 3, 4, 5 };

var evenNumbers = numbers.Where(n => n % 2 == 0);   // فیلتر
var doubled = numbers.Select(n => n * 2);           // تبدیل
int count = numbers.Count();                        // شمارش


```

مثال :

```
public interface IDamageable
{
    void TakeDamage(int amount);
}

public class Enemy : IDamageable
{
    public void TakeDamage(int amount)
    {
        Console.WriteLine("Enemy took " + amount + " damage");
    }
}

IDamageable target = new Enemy();  // 👈 درسته، چون Enemy از IDamageable پیروی کرده
target.TakeDamage(10);

```

### `IEnumerator<T>`

الان بریم سراغ `IEnumerator<T>` که دقیقاً مکمل `IEnumerable<T>` هست. اگه `IEnumerable<T>` مثل یه مجموعه‌ی قابل پیمایش باشه، `IEnumerator<T>` اونیه که عمل پیمایش واقعی رو انجام می‌ده.

بدون `IEnumerator<T>`، `IEnumerable<T>` قابل استفاده نیست.

وقتی یه متد yield return استفاده می‌کنی، کامپایلر پشت صحنه یه کلاس `IEnumerator<T>` می‌سازه.

استفاده از اینترفیس `IEnumerator<T>` تو ساختارهای داده‌ی سفارشی (Custom Data Structures) خیلی کاربرد داره.

#### متدهای مهم :

| عضو               | نوع      | توضیح                                                      |
| ----------------- | -------- | ---------------------------------------------------------- |
| `T Current`       | property | عنصر فعلی مجموعه‌ای که در حال پیمایش آن هستیم              |
| `bool MoveNext()` | متد      | به عنصر بعدی می‌ره؛ اگر رسید، `true`، اگر تموم شد، `false` |
| `void Reset()`    | متد      | پیمایش رو به حالت اول برمی‌گردونه (اغلب استفاده نمی‌شه)    |
| `Dispose()`       | متد      | پاک‌سازی منابع (اتوماتیک در `foreach`)                     |

```
IEnumerable<int> list = new List<int> { 1, 2, 3 };

IEnumerator<int> enumerator = list.GetEnumerator();

while (enumerator.MoveNext())
{
    int value = enumerator.Current;
    Console.WriteLine(value);
}

```
:::note
خیلی در یونیتی استفاده نمیشه. مگر در کروتین ها که خودشون در پس زمینه استفاده می کنند.
:::