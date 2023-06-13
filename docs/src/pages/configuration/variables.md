
# Variables

That paramaters are located inside `vars` property. By changing them you will customize texts and titles on your website.

## Property `aside`

<<< PARAMETERS
info: string? = null
Title of [`<aside info>`](/elements/aside.html) element. If `null`, that block will have no title.
<<<
warning: string? = "WARNING"
Title of [`<aside warning>`](/elements/aside.html) element. If `null`, that block will have no title.
<<<

## Property `parameters`

<<< PARAMETERS
required: string = "required"
Text on `required` [parameter](/elements/parameters.html) badge.
<<<
deprecated: string = "deprecated"
Text on `deprecated` [parameter](/elements/parameters.html) badge.
<<<
experimental: string = "experimental"
Text on `experimental` [parameter](/elements/parameters.html) badge.
<<<

## Property `code_example`

<<< PARAMETERS
title_request: string = "Request"
Default title of `Request` [code example](/elements/code-examples.html) code example.
<<<

# MARK: Examples

## Default configuration

only `vars` properties

```json
{
  "aside": {
    "info": null,
    "warning": "WARNING"
  },
  "parameters": {
    "required": "required",
    "deprecated": "deprecated",
    "experimental": "experimental"
  },
  "code_example": {
    "title_request": "Request"
  }
}
```
