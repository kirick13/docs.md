
# Configuration

Edit your `source/config.yml` file to customize your website. Configuration file is a YAML file with the following structure:

<!-- DOCS.MD: PARAMETERS -->
|- title: string = "docs.md"
|  Title of your website. It is located at the header and in the webpage title.
|- icons: object
|  URLs of icons used in the website.
|- code_highlight_theme: string = "one-dark-pro"
|  Theme of the code highlighter. You can find vailable themes at the [Shiki website](https://shiki.style/).
|- navigation: array
|  List of navigation blocks.

### Icons

<!-- DOCS.MD: PARAMETERS -->
|- favicon: string
|  URL of the favicon.
|- header: string
|  URL of the logo in the header.

### Navigation

Navigation is a element located on the right that contains "navigation blocks" with links.

#### Navigation block

<!-- DOCS.MD: PARAMETERS -->
|- title: string
|  Title of the block.
|- items: array
|  List of items in the block.

#### Navigation item

<!-- DOCS.MD: PARAMETERS -->
|- title: string
|  Title of the item.
|- url: string?
|  URL of the item.
|  If provided, the item will be a link.
|  If not, the item will be a header of the subitems list and will open the subitems list when clicked.
|- items: array?
|  List of subitems.

#### Navigation subitem

Subitems are located under the item in the navigation. List of subitems is visible by default only if there is a subitem with the same URL as the current page.

<!-- DOCS.MD: PARAMETERS -->
|- title: string
|  Title of the subitem.
|- url: string
|  URL of the subitem.

## <!-- DOCS.MD: SAMPLE --> Sample

### Configuration of this website

```yaml
<%= include('../config.yml') -%>
```
