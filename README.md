This is an example project as part of a job application.

Some features include:
- A filter-as-you-type system, advanced filters such as radius and time posted, and pagination.
- 50 tests across 10 test suites/files using Jest and React Testing Library
- 7 individual and reusable component, build independently in [storybook](https://storybook.js.org/) (run `npm run storybook`)
- Sass as the css pre-processer and not external UI frameworks
- Custom debounce hook

## Getting Started

### Versions
Node `v10.16.3`

npm `v6.12.0`

### Install dependencies
`npm install`

### Setting up API key
Copy the contents of `.env.local.example` to `.env.local` in the root directory, then copy your ZipRecruter API key to it.

## Available Scripts

### `npm start`
Starts the npm development server

### `npm run build`
Builds an optimized version of the app

### `npm test`
Run tests using Jest

### `npm run storybook`
Run storybook to view individual components