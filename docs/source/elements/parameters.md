
# Parameters

`docs.md` was created to build an API documentation websites in the first place so it has Parameters extension built in.

## How it works

```html
<!-- DOCS.MD: PARAMETERS -->
|- user_id: number [REQUIRED]
|  ID of the user.
|- user_name: string [DEPRECATED]
|  Display name of the user.
|  <small>Can contain UTF-16 characters.</small>
|- type: string? = "short" [EXPERIMENTAL]
|  How much information you want to get:
|  `short` — only user's ID and display name;
|  `full` — complete information about the user.
```

Compiles to this:

<!-- DOCS.MD: PARAMETERS -->
|- user_id: number [REQUIRED]
|  ID of the user.
|- user_name: string [DEPRECATED]
|  Display name of the user.
|  <small>Can contain UTF-16 characters.</small>
|- type: string? = "short" [EXPERIMENTAL]
|  How much information you want to get:
|  `short` — only user's ID and display name;
|  `full` — complete information about the user.

## Syntax

Parameters block starts with `<!-- DOCS.MD: PARAMETERS -->` comment.

Each parameter block starts with `|- ` (ends with 1 space) and contains parameter definition:

- **parameter name** is located before the first `:`;
- **marks** are enclosed in square brackets `[]` and can be:
  - `REQUIRED`;
  - `DEPRECATED`;
  - `EXPERIMENTAL`;
- **parameter type** is located between name and marks.

All the following lines will be considered as a description of the parameter. That lines must be indented with `|` and 2 spaces after it to maintain the visual formatting.
