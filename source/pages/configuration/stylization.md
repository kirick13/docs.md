
# Stylization

That paramaters are located inside `styles` property. Change them to customize look of your website.

## Root parameters

<<< PARAMETERS
highlight_theme: string = "atom-one-light"
Name of [hightlight.js theme](https://highlightjs.org/static/demo/) to highlight you [code examples](/elements/code-examples.html).
<<<

## Property `colors.parameters`

That property is an object with three fields: `required`, `deprecated` and `experimental`, each describes colors of [parameter](/elements/parameters.html) badge.

# MARK: Examples

## Default configuration

only `style` properties

```json
{
  "highlight_theme": "atom-one-light",
  "colors": {
    "parameters": {
      "required": {
        "border": "#c04b38",
        "background": "#6d342d",
        "font": "#fff"
      },
      "deprecated": {
        "border": "#f6bb43",
        "background": "#9e7b35",
        "font": "#fff"
      },
      "experimental": {
        "border": "#37bc9d",
        "background": "#265c53",
        "font": "#fff"
      }
    }
  }
}
```
