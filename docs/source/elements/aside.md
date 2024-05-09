
# Aside

You can use `<aside>` elements to create blocks with highlighted information.

## Types

### Info

<aside info>
    Block with some important information or note.
</aside>

```html
<aside info>
    Block with some important information or note.
</aside>
```

By default, info block doesn't have a title. You can set it using `--aside-info` CSS variable.

### Warning

<aside warning>
    Uh-oh, be careful, this is a warning!
</aside>

```html
<aside warning>
    Uh-oh, be careful, this is a warning!
</aside>
```

By default, warning block displays a title `WARNING`. You can customize it by setting `--aside-warning` CSS variable.

## Using markdown inside

To use markdown inside `<aside>` elements you should put **two newlines** around content:

<aside info>

Block with **bold text** inside.

</aside>

```html
<aside info>

Block with **bold text** inside.

</aside>
```
