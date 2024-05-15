
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

Navigation is a element located on the right that contains "navigation blocks" with links. To know more about navigation, read the [Navigation](./navigation.md) page.

## <!-- DOCS.MD: SAMPLE --> Sample

### Configuration of this website

```yaml
<%= include('../config.yml') -%>
```
