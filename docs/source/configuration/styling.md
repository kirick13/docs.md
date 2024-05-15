
# Styling

To edit the default styles, create a `.css` file anywhere in your `source` directory — because all `.css` files will be bundled into one — and set **CSS custom properties** to override the default styles.

We recommend you to set the properties on the `:root` selector to avoid duplication of the same values.

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
| `--transition-duration` | Duration of the transitions. |
| `--otp-title` | Title for "On This Page" block. |

## Custom elements properties

### [Aside](../elements/aside.html)

| CSS custom property | Description |
| --- | --- |
| `--aside-info-title` | Title of the info block. |
| `--aside-warning-title` | Title of the warning block. |

### [Parameters](../elements/parameters.html)

| CSS custom property | Description |
| --- | --- |
| `--parameters-required-title` | Title of the "Required" label. By default, it is `REQUIRED`. |
| `--parameters-required-rgb` | Color of the "Required" label. |
| `--parameters-optional-title` | Title of the "Optional" label. By default, it is `OPTIONAL`. |
| `--parameters-optional-rgb` | Color of the "Optional" label. |
| `--parameters-experimental-title` | Title of the "Experimental" label. By default, it is `EXPERIMENTAL`. |
| `--parameters-experimental-rgb` | Color of the "Experimental" label. |
