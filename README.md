# tomymehdi-SDK

An npm package for training purposes using TypeScript to build for both the ECMAScript Module format (i.e. ESM or ES Module) and CommonJS Module format (CJS). It can be used in Node.js and browser applications.

## Publishing

1. Create an account with [npm](https://www.npmjs.com/signup) if you don't have one already. Also be sure to enable [two-factor authentication](https://docs.npmjs.com/configuring-two-factor-authentication)
1. Sign in to your npm account in your terminal with `npm login`
1. Run `npm publish --access=public` to publish your package

## Testing

Run `npm test` in your terminal from the root folder of the project.

After the first run if new external api recording are needed delete `tests/fixtures` folder.

## Locally testing package
### Approach 1
`npm install -g .`

`node`

```
const myLib = require('@tomymehdi-itba/sdk')
await myLib.books()
await myLib.book('5cf5805fb53e011a64671582')
await myLib.bookChapters('5cf5805fb53e011a64671582')
await myLib.booksWithChapters()
```

### Approach 2
`npm pack`

take that .tgz file into another folder and run:
`npm init -y`
`npm install tomymehdi-itba-sdk-0.0.1-development.tgz --save`

Create a simple file with
```
const myLib = require('@tomymehdi-itba/sdk')

async function myLibTesting() {
  console.log(await myLib.books())
  console.log(await myLib.book('5cf5805fb53e011a64671582'))
  console.log(await myLib.bookChapters('5cf5805fb53e011a64671582'))
  console.log(await myLib.booksWithChapters())
}

myLibTesting()
```

### Approach 3
`npm pack`
`npm link`
`npm link tomymehdi-itba-sdk-0.0.1-development.tgz`

### Approach 4
Using `local-package-publisher`

`npm install -g local-package-publisher`
`local-package-publisher -p`
`npm link tomymehdi-itba-sdk`

To unpublish: `local-package-publisher -u`

### Approach 5
Using local NPM Registry
CNPM, Sinopia, Verdaccio, local-npm, ...

## Contributing
Fork and create pull request.