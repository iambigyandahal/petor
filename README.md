<p align="center">
  <a href="https://github.com/iambigyandahal/petor"><img src="https://github.com/iambigyandahal/petor/blob/main/logo.png" alt="Petor Logo"></a>
</p>

# petor

petor is a project generator that generates a custom project built beforehand in the current directory.

## Installation

- npm: `npm install -g petor`
- yarn: `yarn global add petor`
  
Note: You may need to add npm or yarn global bin path in your `PATH` environment variable.

## Usage

petor generates a project from the templates directory.

```bash
petor --generate backend
```

By default, project is generated with the name same as the template name. You can generate the project with custom name as,

```bash
petor --generate backend restapi
```

You can check the existing templates as,

```bash
petor --list
```

You can add your own templates to the path indicated by the,

```bash
petor --get-template-dir
```

## Build

- `git clone https://github.com/iambigyandahal/petor.git`
- `cd petor`
- `yarn install` or `npm install`
- `yarn build` or `npm run build`
- Then you can run the program with `node .` or `node ./dist/src/cli.js`
