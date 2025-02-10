# Date Counter

This project is a simple date counter application built with React, TypeScript, and Vite. It allows users to input two dates and calculates the number of days between them. The project includes hot module replacement (HMR) for a smooth development experience and follows some ESLint rules for code quality.

## Features

- Calculate the number of days between two dates
- Responsive design
- TypeScript for type safety
- ESLint for code quality

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (>=14.x)
- npm (>=6.x) or yarn (>=1.x)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/henriits/date_counter.git
cd date_counter
```

2. Install the dependencies:

```sh
npm install
# or
yarn install
```

### Running the Application

To start the development server with HMR:

```sh
npm run dev
# or
yarn dev
```

Open your browser and navigate to `http://localhost:3000` to see the application in action.

### Building for Production

To build the application for production:

```sh
npm run build
# or
yarn build
```

The output will be in the `dist` directory.

### Linting

To run ESLint:

```sh
npm run lint
# or
yarn lint
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` with `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## Project Structure

```
date_counter/
├── public/                 # Static assets
├── src/                    # Source files
│   ├── components/         # React components
│   ├── App.tsx             # Main App component
│   ├── main.tsx            # Entry point
│   └── ...                 # Other files
├── .eslintrc.js            # ESLint configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── package.json            # Project metadata and dependencies
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
