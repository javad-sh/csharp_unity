---
title: Plane (صفحه)
sidebar_position: 6
---

# Plane

کلاس Plane در یونیتی (از فضای‌نام UnityEngine) نمایانگر یک صفحه بی‌نهایت در فضا است که به‌طور معمول برای محاسبات هندسی، برش‌زدن با خط، تست برخورد اشیاء با سطح و بسیاری موارد دیگر استفاده می‌شود.

## فیلدها و ویژگی‌های مهم

| ویژگی      | نوع داده  | توضیح                              | مثال             | خروجی             |
| ---------- | --------- | ---------------------------------- | ---------------- | ----------------- |
| `normal`   | `Vector3` | نرمال صفحه (برداری عمود بر سطح)    | `plane.normal`   | `(0.0, 1.0, 0.0)` |
| `distance` | `float`   | فاصله از مبدا تا صفحه در جهت نرمال | `plane.distance` | `-5.0`            |

## سازنده‌ها (Constructors)

| امضا                                       | توضیح                                        |
| ------------------------------------------ | -------------------------------------------- |
| `Plane(Vector3 inNormal, Vector3 inPoint)` | صفحه‌ای با نرمال مشخص و نقطه‌ای روی آن       |
| `Plane(Vector3 a, Vector3 b, Vector3 c)`   | صفحه‌ای که از سه نقطه عبور می‌کند            |
| `Plane(Vector3 inNormal, float d)`         | نرمال و فاصله از مبدأ را مستقیم تنظیم می‌کند |

## متدهای مهم

| متد                                 | توضیح                                                           | مثال                                         | خروجی                 |
| ----------------------------------- | --------------------------------------------------------------- | -------------------------------------------- | --------------------- |
| `GetDistanceToPoint(Vector3 point)` | فاصله یک نقطه تا صفحه (مقدار signed)                            | `p.GetDistanceToPoint(new Vector3(0, 7, 0))` | `2.0`                 |
| `GetSide(Vector3 point)`            | آیا نقطه در سمت نرمال است یا خیر؟                               | `p.GetSide(new Vector3(0, 7, 0))`            | `true`                |
| `SameSide(Vector3 p1, Vector3 p2)`  | دو نقطه در یک سمت صفحه‌اند؟                                     | `p.SameSide(p1, p2)`                         | `true/false`          |
| `Raycast(Ray ray, out float enter)` | آیا پرتو با صفحه برخورد می‌کند؟ مقدار t در `enter` ذخیره می‌شود | `if (p.Raycast(ray, out float d))`           | `true`, `enter = 5.0` |

```
void Start()
{
    Plane plane = new Plane(Vector3.up, new Vector3(0, 1, 0));
    Ray ray = new Ray(new Vector3(0, 10, 0), Vector3.down);

    if (plane.Raycast(ray, out float distance))
    {
        Vector3 hitPoint = ray.GetPoint(distance);
        Debug.Log("Hit at: " + hitPoint); // ➜ Hit at: (0.0, 1.0, 0.0)
    }
}

```
