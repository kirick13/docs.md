
# General

Edit your `source/config.json` file to customize your resulting website. That config will be recursively merged with default config file located at `package/config.json`.

## Main parameters

That parameters are located right at the root of config file.

<<< PARAMETERS
title: string = "docs.md"
Title of your website. That title will be located at the top bar and in the webpage title.
<<<
vars: object
Text [variables](/configuration/variables.html) to customize texts and titles on your website.
<<<
style: object
[Colors](/configuration/stylization.html) of you website.
<<<
navigation: array
Configuration of [navigation bar](/elements/navigation/blocks.html).
<<<

# MARK: Examples

## Default configuration

```json
{
  "title": "docs.md",
  "vars": { ... },
  "style": { ... },
  "navigation": []
}
```
