# 每周总结可以写在这里

## 1、语言 按照语法分类

- 非形式语言：
  - 中文
  - 英文
- 形式语言（乔姆斯基谱系）
  - 0 型：无限制文法
  - 1 型：上下文相关文法
  - 2 型：上下文无关文法
  - 3 型：正则文法

## 2、产生式（BNF）巴斯科诺尔范式

- 用尖括号括起来的名称表示语法结构名
- 语法结构分成基础结构和需要用其他语法结构定义的符合结构
  - 基础结构称终结符
  - 复合结构称非终结符
- 引号和中间的字符表示终结符
- 可以有括号
- \* 表示重复
- | 表示或
- \+ 至少一次
- 只要是形式化语言，都能用 BNF 描述

## 3、通过 BNF 理解乔姆斯谱系

- 0 型 无限制文法
  - ?::=?
- 1 型：上下文相关文法
  - ?<A\>?::=?<B\>?
- 2 型：上下文无关文法
  - <A\>::=>
- 3 型：正则文法
  - <A\>::=<A\>?

```

整数连加
"+"
<Number>: "0" | "1" ... "9"
<Deciamal>: "0" | (("1" ~ "9") <Number>+)
<Expression>: <Deciamal> ("+" <Deciamal>)+
<Expression>: Deciamal | (<Expression> "+" <Deciamal>)

四则运算
<PrimaryExpression> = <DecimalNumber> |
"(" <LogicalExpression> ")"


<MultiplicativeExpression> = <PrimaryExpression> |
<MultiplicativeExpression> "*" <PrimaryExpression>|
<MultiplicativeExpression> "/" <PrimaryExpression>


<AdditiveExpression> = <MultiplicativeExpression> |
<AdditiveExpression> "+" <MultiplicativeExpression>|
<AdditiveExpression> "-" <MultiplicativeExpression>

逻辑判断
<LogicalExpression> = <AdditiveExpression> |
<LogicalExpression> "||" <AdditiveExpression> |
<LogicalExpression> "&&" <AdditiveExpression>

```

## 4、图灵完备性

- 命令式 -- 图灵机
  - goto
  - if while

- 声明式 -- lambda
  - 递归
  - 分治

## 5、动态、静态

- 动态：
  - 在用户设备/在线服务器上运行
  - 产品实际运行时
  - Runtime
- 静态：
  - 在程序员的设备上
  - 产品开发时
  - Compiletime

## 6、类型系统

- 动态静态
- 强类型、弱类型(凡是会发生隐式类型转换的都是弱类型)
- 复合类型
  - 结构体 (结构体（struct）指的是一种数据结构，是C语言中复合数据类型（aggregate data type）的一类。结构体可以被声明为变量、指针或数组等，用以实现较复杂的数据结构。 结构体同时也是一些元素的集合，这些元素称为结构体的成员（member），且这些成员可以为不同的类型，成员一般用名字访问。)
  - 函数签名 （定义了函数或方法的输入与输出 ）

    签名可包含以下内容：
      - 参数及参数的类型
      - 一个的返回值及其类型
      - 可能会抛出或传回的异常
      - 该方法在面向对象程序中的可用性方面的信息（如public、static 或 prototype）。

- 子类型
  - 逆变/协变
    - 协变 （如果它保持了子类型序关系≦。该序关系是：子类型≦基类型。） 
    - 逆变 （如果它逆转了子类型序关系。）


总结：这是笔记整理