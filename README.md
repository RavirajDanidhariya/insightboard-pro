# Start from scratch

- Add a html page and render
- add JS to add a header in it and add some text(innerHTML) for that header
- append header into the html with appendChild method


- Most expensive thing is to put something into Dom tree or removing it

## feat_0.4 Inginte the App

- npm init
- npm install -D vite (dev dependency)
- caret(^) vs tilde(~)
    - caret allows minor and patch version upgrade automatically
    - tilde allows patch version upgrade automatically
    - no sign - it will lock the given versio

- package.json 
    - dependency list with appox version
- package-lock.json 
    - locks the exact version of each dependencies
    - integrity - hash - exact version in all stage versions

- browsersList

- install vite, react and react-dom
- npx vite, npx vite build
- npx vite --port 3000
- npm install  @vitejs/plugin-react - transforms JSX -> React.createElement ->Javascript:
    - without this plugin, we need to write React.createElement and we can not use jsx. It assum it as a normal js file and throws syntax error

- Moved index.jsx in the /src
- moved jsx code into app in a new file

- npm install -D tailwindcss@3 postcss autoprefixer
- npx tailwindcss init -p

- npm install -D @types/node
- npx shadcn@latest init
    ✔ Preflight checks.
    ✔ Verifying framework. Found Vite.
    ✔ Validating Tailwind CSS.
    ✔ Validating import alias.
    √ Which color would you like to use as the base color? » Slate
    ✔ Writing components.json.
    ✔ Checking registry.
    ✔ Updating tailwind.config.js
    ✔ Updating CSS variables in src\index.css
    ✔ Installing dependencies.
    ✔ Created 1 file:
      - src\utils.ts

- npx shadcn@latest add button


- npm i @tanstack/react-virtual - render 50k data with virtualization 
- npm install @tanstack/react-table - adding tanstack table - headless ui