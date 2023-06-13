
# docs.md

Docs generator based on Markdown and EJS.

Read our [documentation](https://docs-md.onrender.com/index.html) and create your own [documentation website](https://docs-md.onrender.com/getting-started.html) in seconds.

## Features

### Easy to write

Create `.md` files and they will be compiled to web pages.

<table>
  <tr>
    <td align=center width=45%>
      <img alt="Design / Mobile" src="https://user-images.githubusercontent.com/2053378/169659833-a1326811-671d-4a08-a3af-4ac412b90bb5.jpg">
    </td>
    <td align=center>
      <img alt="Design / Mobile / Menu" src="https://user-images.githubusercontent.com/2053378/169659836-13143815-21f6-47b5-90c4-5706331290ab.jpg">
    </td>
  </tr>
</table>

### Easy to maintain

Just edit files in `source/pages` and compiled web pages will appear inside `build` directory with the same paths (but obviously with `.html` extension).

![](https://user-images.githubusercontent.com/2053378/169660253-86210cb6-82cb-4def-b8b5-53fda2d9ed01.jpg)

### Easy to configure

Edit your `source/config.json` to change default block names or colors.

### Flexibility using [EJS](https://ejs.co)

You can use includes to not to write the same text twice. Or use any other [EJS features](https://ejs.co)!

<img alt="EJS / Include" src="https://user-images.githubusercontent.com/2053378/169659681-70aee81c-d750-493b-b22f-1b064c1c75b7.jpg">

### Fast and lightweight

Are you tired of simple websites built with React, Webpack, much npm packages and tons of other JavaScript? **Forget about it.**

`docs.md` will build your website with that [CSS file](https://docs-md.onrender.com/css/style.css) and that [JS file](https://docs-md.onrender.com/js/main.js). **That's all.**

### Beautiful, responsive design

Your docs will look beautiful on all devices.

<table>
  <tbody>
    <tr>
      <td colspan=2>
        <img width="100%" alt="Design / Desktop" src="https://user-images.githubusercontent.com/2053378/169659261-2ce172a8-d34c-4fb7-b71d-91281a9bc585.png">
      </td>
    </tr>
    <tr></tr>
    <tr>
      <td align=center>
        <img alt="Design / Mobile" src="https://user-images.githubusercontent.com/2053378/169659084-be1c0e06-501f-406c-ae28-746406d7269c.jpg">
      </td>
      <td align=center>
        <img alt="Design / Mobile / Menu" src="https://user-images.githubusercontent.com/2053378/169659070-cb19801e-01ba-437f-8945-1e76e1b8f3ce.jpg">
      </td>
    </tr>
  </tbody>
</table>

# Roadmap

- Create a builder to replace Gulp
  - Ditch as many dependencies as possible to reduce image size
- Research if Node.js can be replaced with Bun
- Compile own CSS/JS files during Docker image build
- Support for custom CSS files
