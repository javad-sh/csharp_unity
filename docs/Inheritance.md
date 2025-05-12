---
title: ارث بری
sidebar_position: 2
---

# ارث بری یا Inheritance

ارث‌بری (Inheritance) یکی از مفاهیم پایه‌ای برنامه‌نویسی شی‌گرا (OOP) در #C است که به شما اجازه می‌دهد کلاس جدیدی بسازید که ویژگی‌ها (fields) و رفتارها (methods) کلاس دیگری را به ارث ببرد. این کار باعث کاهش تکرار کد، افزایش خوانایی و قابلیت توسعه‌پذیری می‌شود.

وقتی یک کلاس از کلاس دیگر ارث می‌برد، تمام اعضای public و protected آن کلاس پایه (base class) را به دست می‌آورد.

:::caution
اعضای private ارث بری نمی شوند. فقط public و protected ارث داده می شوند.
:::

```
class Animal
{
    public void Eat()
    {
        Console.WriteLine("Animal is eating.");
    }
}

// کلاس فرزند که از Animal ارث می‌برد
class Dog : Animal
{
    public void Bark()
    {
        Console.WriteLine("Dog is barking.");
    }
}
```

```
Dog dog = new Dog();
dog.Eat();   // از کلاس پایه به ارث رسیده
dog.Bark();  // از کلاس خودش
```

```
class Person
{
    public string Name;
    public void Introduce()
    {
        Console.WriteLine($"Hi, I'm {Name}");
    }
}

class Student : Person
{
    public string School;
    public void ShowSchool()
    {
        Console.WriteLine($"I study at {School}");
    }
}

// استفاده
Student s = new Student();
s.Name = "Ali";
s.School = "Sharif University";
s.Introduce();
s.ShowSchool();
```

اگر بخوایم یک متد را بازی نویسی کنیم :

```
class Animal
{
    public virtual void Speak()
    {
        Console.WriteLine("Animal speaks.");
    }
}

class Cat : Animal
{
    public override void Speak()
    {
        Console.WriteLine("Cat meows.");
    }
}
```

اگر نخوایم اجازه ی ارث بری بدیم :

```
public sealed class Dog { }  // دیگر هیچ کلاسی نمی‌تواند از Dog ارث ببرد
```

## اگر virtual و override را ننویسیم چه می شود ؟

خطا دریافت نمی کنیم اما متد بازنویسی نمی شود و همان قبلی باقی می ماند.

```
class Animal
{
    public void Speak()
    {
        Console.WriteLine("Animal sound");
    }
}

class Dog : Animal
{
    public void Speak()
    {
        Console.WriteLine("Bark");
    }
}
```

```
Animal a = new Dog();
a.Speak();  // چه چیزی چاپ می‌شود؟

// خروجی این کد "Animal sound" است.

```

اگر override را ننویسیم کامپایلر هشدار می دهد و می گوید باید نوشته شود.

می شود از روش زیر هم برای رفع ارور استفاده کرد اما این بازنویسی نیست. بلکه نادید گرفتن قبلی و نوشتن یک متد جدید به آن نام است.

```
public new void Speak()
```

## اگر همه ی متد ها در اصل غیرقابل بازنویسی هستند پس چرا از sealed استفاده می کنیم ؟

sealed موقعی استفاده می شود که متد قبلا virtual شده باشد.

:::tip
از sealed می توان برای کلاس ها هم استفاده کرد تا کلاسی نتواند از آن کلاس ارث بری کند.
:::


```
class Animal
{
    public virtual void Speak()
    {
        Console.WriteLine("Animal sound");
    }
}

class Dog : Animal
{
    public sealed override void Speak() // ✅ بازنویسی شده ولی دیگر قابل override نیست
    {
        Console.WriteLine("Bark");
    }
}

class Bulldog : Dog
{
    // این کد خطا می‌دهد 👇
    // public override void Speak() { Console.WriteLine("Grrrr"); }
}
```
