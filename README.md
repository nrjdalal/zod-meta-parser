# Zod Meta Parser

[![NPM Version](https://img.shields.io/npm/v/zod-meta-parser.svg)](https://npmjs.org/package/zod-meta-parser)
[![NPM Downloads](https://img.shields.io/npm/dw/zod-meta-parser.svg)](https://npmjs.org/package/zod-meta-parser)

## Summary

`zod-meta-parser` is a utility that extracts metadata descriptions from [Zod schemas](https://github.com/colinhacks/zod) into a structured format. This is particularly useful for generating documentation or for other meta-programming purposes.

## Usage

### Basic Example

```typescript
import { z } from "zod"
import { zodMetaParser } from "zod-meta-parser"

const schema = z.object({
  id: z.number(), // no description
  email: z.string().describe(JSON.stringify({ unique: true })),
  image: z
    .string()
    .optional()
    .describe(JSON.stringify({ s3: true })),
  createdAt: z.date().describe("Read-only field"),
}),

console.log(zodMetaParser(schema))
```

#### Expected Output

```json
{
  "email": {
    "_meta": {
      "unique": true
    }
  },
  "image": {
    "_meta": {
      "s3": true
    }
  },
  "createdAt": {
    "_meta": "Read-only field"
  }
}
```

## Installation

You can install the package via npm:

```sh
npm install zod-meta-parser
```

or via bun (recommended):

```sh
bun add zod-meta-parser
```

## Features

- Extracts metadata descriptions from Zod schemas.
- Supports nested objects and various Zod types.
- Provides a structured output format for easy consumption.

## Options

The `zodMetaParser` function currently does not accept any additional options. All metadata extraction is done based on the structure and descriptions provided in the Zod schema.

## Known Issues

- The `zodToJsonSchema` library used internally might not handle all Zod types perfectly, such as `symbol`. Custom handling is added for types not supported natively.
- Ensure all fields you want metadata for are described using the `.describe()` method in Zod.

## Versioning

This package follows semantic versioning. New features and bug fixes will be released as minor or patch updates, while breaking changes will be released as major updates.

<!--
## Changelog

For a detailed list of changes, please refer to the [changelog](https://github.com/nrjdalal/zod-meta-parser/blob/master/changelog.md).
-->

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/nrjdalal/zod-meta-parser).

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/nrjdalal/zod-meta-parser/blob/master/LICENSE) file for details.

## Sponsors

If you enjoy this package, consider sponsoring the project on my [GitHub Sponsors page](https://github.com/sponsors/nrjdalal). Your support is greatly appreciated!

---

Feel free to adjust the links and other details as per your project specifics.
