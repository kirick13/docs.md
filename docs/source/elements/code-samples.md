
# Code samples

You can define code blocks in your Markdown files like this:

````markdown
```js
console.log('Hello, world!');
```
````

But `docs.md` allows you to define special "Code Samples" that will be located on the right side of the article — of course, if client's screen is wide enough. To define a code sample:

- add a **level 2** header that starts with special comment `<!-- DOCS.MD: SAMPLE -->`;
- add a **level 3** header — it will be a title of the code sample;
- add a code block below it.

````markdown
# My article

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## <!-- DOCS.MD: SAMPLE --> Sample

### First code sample

```js
console.log('Hello, world!');
```
````

You can see result on the right. Or below, if your screen is too narrow.

## <!-- DOCS.MD: SAMPLE --> Sample

### First code sample

```js
console.log('Hello, world!');
```

## Multiple code blocks

Of course, you can define multiple code samples:

````markdown
# My article

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## <!-- DOCS.MD: SAMPLE --> Sample

### Multiple samples: block #1

```js
console.log('Hello, world!');
```

### Multiple samples: block #2

```swift
print("Hello, world!")
```
````

## <!-- DOCS.MD: SAMPLE --> Sample

### Multiple samples: block #1

```js
console.log('Hello, world!');
```

### Multiple samples: block #2

```swift
print("Hello, world!")
```

## Code sample with multiple languages

To add code sample with multiple languages, just add more than one block under the **level 3** header. `docs.md` will automatically add a dropdown to select the language.

<aside info>
🙂‍↔️ It does not work if there are two code blocks with the same language.
</aside>

<aside info>
👀 It is not possible to add more than 10 languages in one code sample.
</aside>

````markdown
# My article

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## <!-- DOCS.MD: SAMPLE --> Sample

### Multiple languages

```js
console.log('Hello, world!');
```

```swift
print("Hello, world!")
```

```rust
println!("Hello, world!");
```
````

## <!-- DOCS.MD: SAMPLE --> Sample

### Multiple languages

```js
console.log('Hello, world!');
```

```swift
print("Hello, world!")
```

```rust
println!("Hello, world!");
```

## Multiple sections on the page

As you can see on this page, `docs.md` knows to which header the code sample belongs. It is very simple — since every "Code Sample" starts with a **level 2** header, it belongs to previous **level 2** header.
