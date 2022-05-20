
# Code examples

`docs.md` can show your code examples on the right side of the page. Examples section starts with `MARK: Examples` top-level header.

You can see result on the right.

````markdown
# MARK: Examples

## Request

POST /user/:id

```bash
curl -X POST "https://example.com/api/v1/user/1"
```

## Response

default response

```json
{
    "id": 1,
    "name": "John Doe"
}
```

extended response

```json
{
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://example.com/avatar.png"
}
```
````

## Requests syntax

Put a paragraph after `Request` header containing an API endpoint or any other information. It will become a title of request code snippet. If a title starts from one of HTTP methods, it will be highlighted.

### Different request languages

<aside warning>
    That feature is not implemented yet.
</aside>

Put multiple code snippets one after another inside `Request` section. You will see only one code snippet at the time, but there will be a selector to choose the language.

## Response syntax

You can put miltiple `Response` sections and name them whatever you want. That title will be a title of code snippet.

Code snippets come alone or with a paragraph before. If there is a paragraph before, it will become a subtitle of response code snippet.

# MARK: Examples

## Request

POST /user/:id

```bash
curl -X POST "https://example.com/api/v1/user/1"
```

## Response

default response

```json
{
    "id": 1,
    "name": "John Doe"
}
```

extended response

```json
{
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://example.com/very-very-long-string/avatar.png"
}
```
