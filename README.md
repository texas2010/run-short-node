# Welcome to run-short-node 👋

![Version](https://img.shields.io/badge/version-0.0.3-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> Use shell to run complex logic in the JavaScript for apple shortcuts

## 🚀 Setup & Installation

## First-time setup

```sh
npm install
npm run build:docker    # Build Docker image (needed once)
```

### Updating dependencies

Whenever you change `package.json`, rebuild:

```sh
npm run build:docker
```

## 🧪 Testing

Run tests inside the Docker container:

```sh
npm run test  # watch mode (temp container)
```

## 💻 Usage

Quick start:

```sh
run-short-node fooFunction '{"a":1,"b":2}'
# {"result":3}
```

## 📦 Deployment

### First-time deployment

```sh
npm run build
npm link             # Install CLI globally (needed once)
```

#### Why `npm link`?

- Creates a global symlink for `run-short-node` in your `$PATH`.
- Makes the CLI available everywhere.
- Only required once; rebuilding updates the same symlink.

### Subsequent deployments

```sh
npm run build        # Rebuild after code changes
```

## Author

👤 **texas2010**

- Github: [@texas2010](https://github.com/texas2010)

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2025 [texas2010](https://github.com/texas2010)

This project is [MIT](LICENSE) licensed.

This is an open-source project by texas2010.
If you use or modify this project, you must include attribution clearly in your documentation, UI, or package metadata.

Do not claim authorship or remove credit.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
