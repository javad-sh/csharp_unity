---
title: Bounds
sidebar_position: 5
---

# Bounds

# vector3

کلاس Bounds در یونیتی برای نمایش یک کادر محدودکنندهٔ سه‌بعدی (axis-aligned bounding box یا AABB) به کار می‌رود. این کادر معمولا برای محاسبات برخورد (collision detection)، برش (clipping)، و بررسی موقعیت اجسام در فضای سه‌بعدی استفاده می‌شود.

## فیلدها (Fields)

| نام       | نوع       | توضیح                          |
| --------- | --------- | ------------------------------ |
| `center`  | `Vector3` | مرکز جعبه                      |
| `size`    | `Vector3` | ابعاد کامل جعبه (نه نصف ابعاد) |
| `extents` | `Vector3` | نصف اندازهٔ جعبه (`size / 2`)  |

## متدها و ویژگی‌ها (Properties & Methods)

| ویژگی     | نوع       | توضیح                             |
| --------- | --------- | --------------------------------- |
| `center`  | `Vector3` | مرکز جعبه                         |
| `size`    | `Vector3` | طول و عرض و ارتفاع کامل جعبه      |
| `extents` | `Vector3` | نصف اندازه در هر محور             |
| `min`     | `Vector3` | نقطهٔ پایین چپ-پایین-عقب (corner) |
| `max`     | `Vector3` | نقطهٔ بالا راست-بالا-جلو (corner) |

## جدول متدها

| متد                                   | نوع بازگشتی | توضیح                                         |
| ------------------------------------- | ----------- | --------------------------------------------- |
| `Contains(Vector3 point)`             | `bool`      | بررسی می‌کند که آیا نقطه داخل جعبه هست یا نه  |
| `Encapsulate(Vector3 point)`          | `void`      | جعبه را طوری گسترش می‌دهد که نقطه را شامل شود |
| `Encapsulate(Bounds bounds)`          | `void`      | گسترش جعبه برای شامل شدن جعبهٔ دیگر           |
| `Expand(float amount)`                | `void`      | گسترش جعبه به مقدار مشخص در همه محور‌ها       |
| `Expand(Vector3 amount)`              | `void`      | گسترش غیر یکنواخت بر اساس بردار               |
| `Intersects(Bounds bounds)`           | `bool`      | آیا با جعبهٔ دیگر برخورد دارد؟                |
| `SetMinMax(Vector3 min, Vector3 max)` | `void`      | تعیین جعبه با استفاده از نقاط min و max       |
| `SqrDistance(Vector3 point)`          | `float`     | فاصلهٔ مربع‌شده تا نزدیک‌ترین نقطه از جعبه    |
| `ClosestPoint(Vector3 point)`         | `Vector3`   | نزدیک‌ترین نقطه روی سطح جعبه به نقطهٔ ورودی   |

## مثال ها

مثال 1: ساخت یک جعبه و مشاهده اندازه

```
Bounds b = new Bounds(Vector3.zero, new Vector3(4, 4, 4));
Debug.Log($"Center: {b.center}, Size: {b.size}, Extents: {b.extents}");

// خروجی
Center: (0.0, 0.0, 0.0), Size: (4.0, 4.0, 4.0), Extents: (2.0, 2.0, 2.0)

```

مثال 2: بررسی اینکه نقطه‌ای داخل جعبه هست یا نه

```
Bounds b = new Bounds(Vector3.zero, new Vector3(2, 2, 2));
bool inside = b.Contains(new Vector3(0.5f, 0, 0));
Debug.Log(inside); // true

```

مثال 3: گسترش جعبه برای دربر گرفتن نقطه

```
Bounds b = new Bounds(Vector3.zero, new Vector3(2, 2, 2));
b.Encapsulate(new Vector3(3, 0, 0));
Debug.Log($"New size: {b.size}, New center: {b.center}");

// خروجی
New size: (6.0, 2.0, 2.0), New center: (1.0, 0.0, 0.0)

```

مثال 4: برخورد دو جعبه

```
Bounds b1 = new Bounds(Vector3.zero, Vector3.one * 2);
Bounds b2 = new Bounds(new Vector3(0.5f, 0, 0), Vector3.one);
bool intersecting = b1.Intersects(b2);
Debug.Log(intersecting); // true

```

مثال 5: نزدیک‌ترین نقطه روی سطح جعبه

```
Bounds b = new Bounds(Vector3.zero, Vector3.one * 2);
Vector3 closest = b.ClosestPoint(new Vector3(3, 0, 0));
Debug.Log(closest); // ➜ (1.0, 0.0, 0.0)

```

# vector2

ساخت جعبه دوبعدی:

```
// یک جعبه به مرکز (0, 0, 0) و اندازه (2, 2, 0)
Bounds b = new Bounds(new Vector3(0, 0, 0), new Vector3(2, 2, 0));

```

یا برای راحتی :

```
Vector2 center2D = new Vector2(0, 0);
Vector2 size2D = new Vector2(2, 2);
Bounds b = new Bounds((Vector3)center2D, (Vector3)size2D); // z = 0

```

## جدول متدها در فضای 2D

| متد                           | خروجی     | توضیح                                                           |
| ----------------------------- | --------- | --------------------------------------------------------------- |
| `Contains(Vector3 point)`     | `bool`    | بررسی داخل بودن نقطه (در X و Y بررسی کن، Z نادیده گرفته می‌شود) |
| `Encapsulate(Vector3 point)`  | `void`    | گسترش جعبه در X و Y (Z اگر 0 باشد تأثیر ندارد)                  |
| `Intersects(Bounds bounds)`   | `bool`    | بررسی برخورد با جعبه 2D دیگر                                    |
| `ClosestPoint(Vector3 point)` | `Vector3` | نزدیک‌ترین نقطه روی سطح جعبه دوبعدی                             |

## مثال ها

مثال 1: بررسی نقطه داخل جعبه 2D

```
Bounds box = new Bounds(Vector3.zero, new Vector3(4, 4, 0));
bool isInside = box.Contains(new Vector3(1, 1, 0));
Debug.Log(isInside); // true

```

مثال 2: گسترش جعبه 2D برای در بر گرفتن نقطه

```
Bounds box = new Bounds(Vector3.zero, new Vector3(2, 2, 0));
box.Encapsulate(new Vector3(2, 2, 0)); // گوشه بالای سمت راست
Debug.Log($"New center: {box.center}, New size: {box.size}");

// خروجی
New center: (1.0, 1.0, 0.0), New size: (3.0, 3.0, 0.0)

```

مثال 3: برخورد دو جعبه 2D

```
Bounds b1 = new Bounds(new Vector3(0, 0, 0), new Vector3(2, 2, 0));
Bounds b2 = new Bounds(new Vector3(1, 0, 0), new Vector3(2, 2, 0));
bool overlapping = b1.Intersects(b2);
Debug.Log(overlapping); // true

```

مثال 4: نزدیک‌ترین نقطه

```
Bounds box = new Bounds(Vector3.zero, new Vector3(2, 2, 0));
Vector3 near = box.ClosestPoint(new Vector3(3, 3, 0));
Debug.Log(near); // ➜ (1, 1, 0)

```

مثال 5 :

```
void Start()
{
    BoxCollider2D col = GetComponent<BoxCollider2D>();
    Bounds b = col.bounds;
    Vector3 point = Camera.main.ScreenToWorldPoint(Input.mousePosition);
    point.z = 0; // اجباری برای 2D

    if (b.Contains(point))
        Debug.Log("Mouse is inside the object!");
}

```

## نکات مهم در فضای 2D

| نکته                                               | توضیح                                                                                        |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| محور Z را 0 بگیر                                   | در اکثر 2Dها محور Z بی‌معنی است؛ همیشه مقدار 0 بگیر                                          |
| از `Vector2` استفاده کن ولی به `Vector3` تبدیلش کن | چون `Bounds` با `Vector3` کار می‌کنه، می‌تونی `Vector2` را با `(Vector3)myVector2` تبدیل کنی |
| برای 2D فیزیک، BoxCollider2D و Bounds جدا هستند    | در فیزیک دوبعدی از `BoxCollider2D.bounds` برای گرفتن ابعاد استفاده کن                        |
