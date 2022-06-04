# react-use-external-assets

> Append multiple scripts and stylesheets to the document body as functions

[![NPM](https://img.shields.io/npm/v/react-use-external-assets.svg)](https://www.npmjs.com/package/react-use-external-assets) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-use-external-assets
```

## Usage

```tsx
import * as React from 'react'

import { useMyHook } from 'react-use-external-assets'

const Example = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
```

## License

MIT © [wimoMisterX](https://github.com/wimoMisterX)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
