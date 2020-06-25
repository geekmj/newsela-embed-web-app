

* Redux integrated
* Plop for component generation
* Error handling using error boundaries React
* Logging the errors
* Nodejs server added and configured to run concurrently
* Routing integrated
* SASS and CSS loaders configured :art:
* Hot reload configured :sunny:
* Unit test tools configured :microscope:
* Production build optimized :chart_with_upwards_trend:

### Prerequisites

* Node.js v8 or above

You can check your node version using the command:

```CLI
node --version
```

### Installing

Install dependencies and start using [yarn](https://yarnpkg.com):

```CLI
yarn install
yarn start
```

Or via [npm](https://www.npmjs.com/):

```CLI
npm install
npm start
```

### Testing

You can run your tests using:

```CLI
yarn test
```

It´s possible to generate the code coverage of your code. Jest will generate a HTML file with all information from your tests. To do this run the command:

```CLI
yarn test:coverage
```

### Production build

You can generate an optimized distribution bundle. To do this run the command:

```CLI
yarn build
```

It´s possible to check the size and content of your bundled file. To do this run the command:

```CLI
yarn analyze
```

## Generate component

```CLI
npm run generate
```
and follow the further instructions

## Built With

* [React](https://babeljs.io/) - JavaScript library for building user interfaces
* [Babel](https://babeljs.io/) - EcmaScript Transpiler
* [Yarn](https://yarnpkg.com) - Dependency Management
* [Jest](https://jestjs.io/) - JavaScript Testing
* [Enzyme](https://airbnb.io/enzyme/docs/api/) - Component tests for React
* Redux
* Plop
* Nodejs

## Contributing

Suggestions or pull requests are welcome.

For major changes, please open an issue first to discuss what you would like to change.


## License

This project is licensed under the MIT Licensed - see the [LICENSE](LICENSE) file for details
