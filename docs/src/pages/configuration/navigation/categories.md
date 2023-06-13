
# Nvigation categories

Each category contains links or another categories.

## Properties

<<< PARAMETERS
title: string
Text of link or category.
<<<
url: string?
Link's URL.
<<<
content: array?
Content of category.
<<<

# MARK: Examples

## Example configuration

only `navigation`'s block properties

```json
{
  "content": [
    {
      "title": "Main page",
      "url": "/"
    },
    {
      "title": "Links",
      "content": [
        {
          "title": "About",
          "url": "/about"
        },
        {
          "title": "Contacts",
          "url": "/contacts"
        }
      ]
    }
  ],
}
```
