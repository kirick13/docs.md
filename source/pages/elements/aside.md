
# Aside

You can use `<aside>` elements to create blocks with highlighted information.

## Types

### Info

<aside info>
    That block contains some important information or note.
</aside>

You can create that block using plain HTML code inside your Markdown:

```xml
<aside info>
    That block contains some important information or note.
</aside>
```

By default, infos doesn't contain a title. You can customize that title using the `vars.aside.info` [configuration variable](/configuration/variables.html).

### Warning

<aside warning>
    That block contains a warning.
</aside>

You can create that block using plain HTML code inside your Markdown:

```xml
<aside warning>
    That block contains a warning.
</aside>
```

By default, warnings contain a title. You can customize that title using the `vars.aside.warning` [configuration variable](/configuration/variables.html).

## Using markdown inside

To use markdown inside `<aside>` elements you should put **two newlines** around content:

<aside info>

That block contains **bold text**.

</aside>

```xml
<aside info>

That block contains **bold text**.

</aside>
```
