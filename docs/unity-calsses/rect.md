---
title: Rect
sidebar_position: 7
---

# Rect

کلاس `Rect` در یونیتی برای نمایش یک مستطیل استفاده می‌شود و معمولاً در سیستم UI و یا برای بررسی برخورد (Collision) در 2D کاربرد دارد. این کلاس در فضای‌نام `UnityEngine` تعریف شده است و چهار مقدار اصلی دارد:

---

### 📦 ساختار کلی کلاس `Rect`

```csharp
public struct Rect
{
    public float x;
    public float y;
    public float width;
    public float height;
    
    public Rect(float x, float y, float width, float height);
    public Rect(Vector2 position, Vector2 size);
}
```

---

## 📋 جدول ویژگی‌ها (Properties)

| ویژگی      | نوع       | توضیح                        | مثال            | خروجی       |
| ---------- | --------- | ---------------------------- | --------------- | ----------- |
| `x`        | `float`   | مختصات افقی نقطه شروع        | `rect.x`        | `0`         |
| `y`        | `float`   | مختصات عمودی نقطه شروع       | `rect.y`        | `0`         |
| `width`    | `float`   | عرض مستطیل                   | `rect.width`    | `100`       |
| `height`   | `float`   | ارتفاع مستطیل                | `rect.height`   | `50`        |
| `position` | `Vector2` | مختصات `(x, y)` به صورت یکجا | `rect.position` | `(0, 0)`    |
| `size`     | `Vector2` | اندازه (عرض، ارتفاع)         | `rect.size`     | `(100, 50)` |
| `xMin`     | `float`   | کوچک‌ترین مقدار افقی (x)     | `rect.xMin`     | `0`         |
| `xMax`     | `float`   | بزرگ‌ترین مقدار افقی         | `rect.xMax`     | `100`       |
| `yMin`     | `float`   | کوچک‌ترین مقدار عمودی        | `rect.yMin`     | `0`         |
| `yMax`     | `float`   | بزرگ‌ترین مقدار عمودی        | `rect.yMax`     | `50`        |
| `center`   | `Vector2` | مرکز مستطیل                  | `rect.center`   | `(50, 25)`  |
| `min`      | `Vector2` | `(xMin, yMin)`               | `rect.min`      | `(0, 0)`    |
| `max`      | `Vector2` | `(xMax, yMax)`               | `rect.max`      | `(100, 50)` |

---

## 🛠️ جدول متدها (Methods)

| متد                                                | توضیح                                | مثال                                 | خروجی                                                | توضیح بیشتر                      |
| -------------------------------------------------- | ------------------------------------ | ------------------------------------ | ---------------------------------------------------- | -------------------------------- |
| `Contains(Vector2)`                                | بررسی اینکه آیا نقطه داخل مستطیل هست | `rect.Contains(new Vector2(10, 10))` | `true`                                               | اگر نقطه داخل محدوده مستطیل باشد |
| `Overlaps(Rect)`                                   | بررسی برخورد دو مستطیل               | `rect1.Overlaps(rect2)`              | `true/false`                                         | در صورت اشتراک                   |
| `Set(float x, float y, float width, float height)` | تنظیم مجدد مستطیل                    | `rect.Set(0, 0, 200, 200)`           | -                                                    | تغییر مقادیر                     |
| `ToString()`                                       | تبدیل به رشته                        | `rect.ToString()`                    | `"Rect(x:0.00, y:0.00, width:100.00, height:50.00)"` | مناسب برای دیباگ                 |

---

## 🧪 مثال کامل به همراه خروجی

```csharp
using UnityEngine;

public class RectExample : MonoBehaviour
{
    void Start()
    {
        Rect rect = new Rect(0, 0, 100, 50);

        Debug.Log("x: " + rect.x);                         // ➜ 0
        Debug.Log("y: " + rect.y);                         // ➜ 0
        Debug.Log("width: " + rect.width);                 // ➜ 100
        Debug.Log("height: " + rect.height);               // ➜ 50
        Debug.Log("center: " + rect.center);               // ➜ (50.0, 25.0)
        Debug.Log("Contains (10,10): " + rect.Contains(new Vector2(10, 10))); // ➜ true

        Rect another = new Rect(50, 20, 100, 100);
        Debug.Log("Overlaps: " + rect.Overlaps(another));  // ➜ true
    }
}
```

---

## 📌 نکات مهم

* در یونیتی UI، کلاس `RectTransform` بر پایه `Rect` ساخته شده و ویژگی‌های بیشتری دارد.
* در سیستم 2D، `Rect` می‌تواند برای تعریف محدوده‌ها (مثل محدوده دوربین یا برخوردها) بسیار مفید باشد.
* تفاوت `position` و `center` این است که `position` نقطه‌ی شروع مستطیل (گوشه پایین چپ) است، ولی `center` مرکز هندسی آن.

---

## تفاوت Rect و Bounds
تفاوت بین `Rect` و `Bounds` در یونیتی بسیار مهم است و بستگی به کاربرد دارد. در اینجا یک مقایسه‌ی دقیق و کامل بین این دو کلاس ارائه می‌دهم:

---

## 📦 جدول مقایسه `Rect` و `Bounds`

| ویژگی                  | `Rect`                                      | `Bounds`                                |
| ---------------------- | ------------------------------------------- | --------------------------------------- |
| 📍فضای‌نام (Namespace) | `UnityEngine`                               | `UnityEngine`                           |
| 📏 ابعاد               | 2D (دوبعدی)                                 | 3D (سه‌بعدی)                            |
| 🎯 مرکز                | محاسبه‌شده از `(x + width/2, y + height/2)` | به‌صورت مستقیم در `center` ذخیره می‌شود |
| 🔰 اندازه              | `width`, `height`                           | `size` (Vector3)                        |
| 📌 مختصات شروع         | از گوشه پایین چپ (`x`, `y`)                 | بر اساس مرکز (`center`)                 |
| 📐 شکل هندسی           | مستطیل دو‌بعدی                              | جعبه‌ (Box) سه‌بعدی                     |
| 🧪 بررسی نقطه          | `Contains(Vector2)`                         | `Contains(Vector3)`                     |
| 📦 برخورد با دیگری     | `Overlaps(Rect)`                            | `Intersects(Bounds)`                    |
| 🎮 کاربردها            | UI، ترسیم GUI، مناطق قابل کلیک، 2D Physics  | برخورد سه‌بعدی، Mesh bounds، فیزیک 3D   |
| 🧱 مرزهای محاسبه شده   | `xMin`, `xMax`, `yMin`, `yMax`              | `min`, `max` به صورت Vector3            |
| 🔄 تغییر مقیاس         | دستی یا با تغییر `width`, `height`          | با تغییر `extents` یا `size`            |
| 📋 نوع داده            | `struct`                                    | `struct`                                |

---

## ✅ مثال مقایسه

### 🎨 `Rect` - برای UI یا 2D

```csharp
Rect rect = new Rect(0, 0, 100, 50);
Vector2 point = new Vector2(10, 10);

bool isInside = rect.Contains(point);  // ➜ true
```

### 📦 `Bounds` - برای اشیای 3D

```csharp
Bounds bounds = new Bounds(new Vector3(0, 0, 0), new Vector3(10, 10, 10));
Vector3 point = new Vector3(1, 1, 1);

bool isInside = bounds.Contains(point);  // ➜ true
```

---

## 📌 نکته کلیدی

\| اگر با **اشیای دوبعدی یا UI** کار می‌کنی → `Rect` |
\| اگر با **اشیای سه‌بعدی یا برخوردها** در دنیای 3D کار می‌کنی → `Bounds` |

---
