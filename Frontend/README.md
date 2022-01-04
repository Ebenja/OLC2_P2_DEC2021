
**Fully Coded Components**

Este modelo de predicción se basa en la posibilidad de calcular una línea recta que se acomode en la mayor medida posible a las diferentes muestras que se identifican dentro de la población que se toma para el análisis.
La forma de calcularlo se basa en que la regresión lineal se enfoca en definir los parámetros que se encuentran o caracterizan una función lineal, y = mx + b, de tal forma que los errores cuadráticos en la medición que se realizan, pueden ser eliminado hasta cierto punto. A la línea definida por la función descrita anteriormente, minimizando la distancia de cada médico a la línea, manualmente no es tan complejo, aunque el propósito de las diferentes soluciones que se presentan es realizar un modelo totalmente automatizado.

Los diferentes datos que se manejan en el informe no solo se tratan de esta forma, además en algunos casos no se tienen en cuenta solo 2 dimensiones para extraer alguna información, pero cuando se trata de datos tridimensionales, muchas veces es preferible optar para un Gradiente Descendente, el cual itera para poder seguir el proceso anterior, de tal manera que se encuentre la línea que mejor se ajuste al contorno definido por las muestras seleccionadas, lo que le otorga un mayor dato computacional, se usa frecuentemente en multidimensional casos.

Medida 

**Complex Documentation**

Each element is well presented in a very complex documentation. You can read more about the idea behind this [dashboard here](https://demos.creative-tim.com/argon-dashboard-react/#/documentation/overview?ref=creativetim). You can check the [components here](https://demos.creative-tim.com/argon-dashboard-react/#/documentation/alerts?ref=creativetim) and the [foundation here](https://demos.creative-tim.com/argon-dashboard/#/documentation/colors?ref=creativetim).

**Example Pages**

If you want to get inspiration or just show something directly to your clients, you can jump start your development with our pre-built example pages. You will be able to quickly set up the basic structure for your web project.

## Table of Contents

- [Versions](#versions)
- [Demo](#demo)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [File Structure](#file-structure)
- [Browser Support](#browser-support)
- [Resources](#resources)
- [Reporting Issues](#reporting-issues)
- [Licensing](#licensing)
- [Useful Links](#useful-links)

## Versions

## Quick start

- `npm i argon-dashboard-react`
- [Download from Github](https://github.com/creativetimofficial/argon-dashboard-react/archive/master.zip).
- [Download from Creative Tim](https://www.creative-tim.com/product/argon-dashboard-react?ref=adr-github-readme).
- Install with [Bower](https://bower.io/?ref=creativetim): `bower install argon-dashboard-react`.
- Clone the repo: `git clone https://github.com/creativetimofficial/argon-dashboard-react.git`.

## Documentation

The documentation for the Material Kit is hosted at our [website](https://demos.creative-tim.com/argon-dashboard-react/#/documentation/overview).

## File Structure

Within the download you'll find the following directories and files:

```
Argon Dashboard React
.
├── Documentation
│   └── documentation.html
├── CHANGELOG.md
├── ISSUE_TEMPLATE.md
├── LICENSE
├── README.md
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── assets
    │   ├── css
    │   │   ├── argon-dashboard-react.css
    │   │   ├── argon-dashboard-react.css.map
    │   │   └── argon-dashboard-react.min.css
    │   ├── fonts
    │   │   └── nucleo
    │   ├── img
    │   │   ├── brand
    │   │   ├── icons
    │   │   │   └── common
    │   │   └── theme
    │   ├── scss
    │   │   ├── argon-dashboard-react.scss
    │   │   ├── bootstrap
    │   │   │   ├── mixins
    │   │   │   └── utilities
    │   │   ├── core
    │   │   │   ├── alerts
    │   │   │   ├── avatars
    │   │   │   ├── badges
    │   │   │   ├── buttons
    │   │   │   ├── cards
    │   │   │   ├── charts
    │   │   │   ├── close
    │   │   │   ├── custom-forms
    │   │   │   ├── dropdowns
    │   │   │   ├── footers
    │   │   │   ├── forms
    │   │   │   ├── headers
    │   │   │   ├── icons
    │   │   │   ├── list-groups
    │   │   │   ├── maps
    │   │   │   ├── masks
    │   │   │   ├── mixins
    │   │   │   ├── modals
    │   │   │   ├── navbars
    │   │   │   ├── navs
    │   │   │   ├── paginations
    │   │   │   ├── popovers
    │   │   │   ├── progresses
    │   │   │   ├── separators
    │   │   │   ├── tables
    │   │   │   ├── type
    │   │   │   ├── utilities
    │   │   │   └── vendors
    │   │   ├── custom
    │   │   └── react
    │   └── vendor
    │       ├── @fortawesome
    │       │   └── fontawesome-free
    │       │       ├── LICENSE.txt
    │       │       ├── css
    │       │       ├── js
    │       │       ├── less
    │       │       ├── scss
    │       │       ├── sprites
    │       │       ├── svgs
    │       │       │   ├── brands
    │       │       │   ├── regular
    │       │       │   └── solid
    │       │       └── webfonts
    │       └── nucleo
    │           ├── css
    │           └── fonts
    ├── components
    │   ├── Footers
    │   │   ├── AdminFooter.jsx
    │   │   └── AuthFooter.jsx
    │   ├── Headers
    │   │   ├── Header.jsx
    │   │   └── UserHeader.jsx
    │   ├── Navbars
    │   │   ├── AdminNavbar.jsx
    │   │   └── AuthNavbar.jsx
    │   └── Sidebar
    │       └── Sidebar.jsx
    ├── index.js
    ├── layouts
    │   ├── Admin.jsx
    │   └── Auth.jsx
    ├── routes.js
    ├── variables
    │   └── charts.jsx
    └── views
        ├── Index.jsx
        └── examples
            ├── Icons.jsx
            ├── Login.jsx
            ├── Maps.jsx
            ├── Profile.jsx
            ├── Register.jsx
            └── Tables.jsx
```

## Browser Support

At present, we officially aim to support the last two versions of the following browsers:


## Resources

- Demo: <https://demos.creative-tim.com/argon-dashboard-react/#/admin/index?ref=adr-github-readme>
- Download Page: <https://www.creative-tim.com/product/argon-dashboard-react?ref=adr-github-readme>
- Documentation: <https://demos.creative-tim.com/argon-dashboard-react/#/documentation/overview?ref=adr-github-readme>
- Support: <https://www.creative-tim.com/contact-us?ref=adr-github-readme>
- Issues: [Github Issues Page](https://github.com/creativetimofficial/argon-dashboard-react/issues?ref=creativetim)
- **Kit:**

### Social Media

Twitter: <https://twitter.com/CreativeTim?ref=creativetim>

Facebook: <https://www.facebook.com/CreativeTim?ref=creativetim>

Dribbble: <https://dribbble.com/creativetim?ref=creativetim>

Instagram: <https://www.instagram.com/CreativeTimOfficial?ref=creativetim>
