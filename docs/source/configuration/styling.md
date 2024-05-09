
# Styling

To edit the default styles, you need to create a `.css` file anywhere in your `source` directory — because all `.css` files will be bundled into one — and set **CSS custom properties** to override the default styles.

We advise you to set the properties for the `:root` selector to avoid duplication of the same values.

## Colors

All colors are set by specifying just three RGB values (like `13 10 94`). There are **no `rgb()` or another functions** around values.

| CSS custom property | Description |
| --- | --- |
| `--rgb-bg` | Background color of the website. |
| `--rgb-block-bg` | Background color of the blocks (for example, code blocks). |
| `--rgb-border` | Border color. |
| `--rgb-font-title` | Font color of the titles. |
| `--rgb-font` | Main font color. |
| `--rgb-accent` | Accent color used for links, active navigation items, etc. |

## Other properties

| CSS custom property | Description |
| --- | --- |
| `--radius` | Border radius of the elements. |
| `--transition-diration` | Duration of the transitions. |
