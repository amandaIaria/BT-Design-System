# Beautiful Tragedy Design System

This will be fleshed out more as it's built. It'll be small at first, since I don't need that much for my portfolio.

## Why

I wanted to extend the things I've learned while creating a DS for work. This time for my brand and sites.

## Things needed

### V1

These are what is needed for my portfolio

- Typography
  - headings
  - body
- Logos
- Icons
- MDC Ripple - only import
- layout
  - grid
  - flex
    - I'm not sure which one I really want to use
  - containers
- links
- social
- API output
- Forms
  - Inputs
  - Buttons
- Move the full page `<divs>` js to here
- Full page navigation
- Full Page sections
- Helpers
  - This is mostly automatically created from variables, maps, and mixins

### V2

Other pieces for other BT projects

- header
- footer
- lists
- Other Form elements
- Image styles
- cards
- accordion
- other navigation
- Templates

### Components

#### Atoms

Basics

Forms

- Inputs - Native
- Buttons
- Labels

Grid

Containers

Typography

- Body
- headings
- links
- lists

Icons - Font Awesome

Images

#### Molecules

Forms

- Label + Inputs

Navigation

#### Organisms

Full Page Sections

Footers

Headers

Accordion

Cards

#### Utility

Color

Spacing

### What I wont place in here

- No JS tests
- Stock images/project images

### How/ Methodology

Atomic Design. I'm a big supporter of the Methodology.

Atoms/Molecules/Organisms/Templates

BEM naming convention. Classes can get a ... bit long but I like the thought process behind it.

### Name Space

.bt - for beautiful tragedy
l- layout

- grids/containers/responsive

u- utility/helper

- Helper classes

c- component

- sections

### Tips

- When importing node_modules remember to add ~ to the beginning of the package. For example, ~packagename/

## Helpful NPM scripts

npm run ...

- build
        +  Regular production build
        +   "rm -rf ./production/ && webpack --mode production --config ./.configs/webpack/webpack.production.config.js",
- build-check
        +  Bulds and checks the typescript
        +  "rm -rf ./production/ && npm run check-types && webpack --mode production --config ./.configs/webpack/webpack.production.config.js",
- dev
        +  Your watch while you make
        +  "webpack-dev-server --mode development --config ./.configs/webpack/webpack.dev.config.js",
- test-watch  
        +  Watch while you make your tests
        +  possible needs some work
        +  "webpack --mode development -w --progress --colors --config ./.configs/webpack/webpack.test.config.js",
- test-build
        +  builds your tests and prefoms
        +  "npm run delete-tests && webpack  --mode production --progress --colors --config ./.configs/webpack/webpack.test.config.js",
- lint-style
        +  Check your styles
        +  should be in the watch command too.
        +  "sass-lint -c .sass-lint.yml 'src/**/*.scss' -v -q",
- test-and-lint
        +  Builds tests and lints your styles
        +  "npm run lint-style && npm run test-build",
- test-type-and-lint
        + . Need to make command
- delete-tests
        +  Deletes tests
        + "rm -rf ./tests/compiled/",
- check-types
      +  check typescripts
      +  "tsc",
