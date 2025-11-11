---
title: نام‌گذاری در C#
sidebar_position: 1
---

# اصول کلی نام‌گذاری در سی‌شارپ

1. PascalCase
   برای: Class، Method، Property، Enum، File names

```
public class GameManager { }
public void StartGame() { }
public string PlayerName { get; set; }

```

2. camelCase
   برای: local variables، parameters، private fields (گاهی با پیشوند \_)

```
int playerScore;
string gameMode;
private int _levelCount;

```
