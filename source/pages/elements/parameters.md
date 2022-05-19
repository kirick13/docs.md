
# Parameters

`docs.md` was created to build an API documentation in the first place. Because of this, we have Parameters extension to Markdown.

## How it looks

```
<<< PARAMETERS
user_id: number [REQUIRED]
ID of the user.
<<<
user_name: string [DEPRECATED]
Display name of the user.
Note: it can contain UTF-16 characters.
<<<
type: string? = "short" [EXPERIMENTAL]
How much information you want to get:
`short` - only user's ID and display name;
`full` - complete information about the user.
<<<
```

Will result to this:

<<< PARAMETERS
user_id: number [REQUIRED]
ID of the user.
<<<
user_name: string
Display name of the user.
Note: it can contain UTF-16 characters.
<<<
type: string? = "short" [EXPERIMENTAL]
How much information you want to get:
`short` - only user's ID and display name;
`full` - complete information about the user.
<<<

## Syntax

Parameters are divided by `<<<`.

Each parameter block must start from a line with parameter definition:

- **name** is located before first `:`;
- **marks** are enclosed with `[]` and can be one of the following:
  - `REQUIRED`;
  - `DEPRECATED`;
  - `EXPERIMENTAL`;
- **type** is located between name and marks.

All next lines until `<<<` are considered as a description of the parameter.

If the last line starts from `Note: `, it will be considered as a footnote and will be written in smaller font.
