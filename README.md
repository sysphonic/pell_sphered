
<img src="https://github.com/jaredreich/pell/raw/master/images/logo.png" width="128" alt="Logo">

> **pell** (https://jaredreich.com/pell) is WYSIWYG text editor for web.

```
Copyright (c) Jared Reich
```

> This repository of pell is modified version for sphered.info

[https://sphered.info/](https://sphered.info/)

[![sphered.info](https://sphered.info/images/screen/pell_sphered.png?? "pell")]()

## Examples

```html
<div id="editor" class="pell"></div>
<div>
  HTML output:
  <div id="html-output" style="white-space:pre-wrap;"></div>
</div>
```

```js
import { exec, init } from 'pell'

const editor = init({
  element: document.getElementById('editor'),
  onChange: html => {
    document.getElementById('html-output').textContent = html
  },
  defaultParagraphSeparator: 'p',
  styleWithCSS: true,
  actions: [
    'bold',
    'underline',
    {
      name: 'italic',
      result: () => exec('italic')
    },
    {
      name: 'backColor',
      icon: '<div style="background-color:pink;">A</div>',
      title: 'Highlight Color',
      result: () => exec('backColor', 'pink')
    },
    {
      name: 'image',
      result: () => {
        const url = window.prompt('Enter the image URL')
        if (url) exec('insertImage', url)
      }
    },
    {
      name: 'link',
      result: () => {
        const url = window.prompt('Enter the link URL')
        if (url) exec('createLink', url)
      }
    }
  ],
  classes: {
    actionbar: 'pell-actionbar-custom-name',
    button: 'pell-button-custom-name',
    content: 'pell-content-custom-name',
    selected: 'pell-button-selected-custom-name'
  }
})

// editor.content<HTMLElement>
// To change the editor's content:
editor.content.innerHTML = '<b><u><i>Initial content!</i></u></b>'
```

## License

MIT

