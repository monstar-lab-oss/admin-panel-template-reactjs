# Themes

The theme allows you to specify the color of general components, darkness of surfaces, whether the base color of the site should be dark or light etc.

The base theme applies a general tone to the application and allows customization to all design aspects.

Lets have a look at the basic theme object to understand how a theme is assembled. Changes to the theme configuration variables in the object below is the most effective way to match the theme to your needs.

```json
{
  "breakpoints": Object,
  "direction": String,
  "mixins": Object,
  "overrides": Object,
  "palette": Object,
  "props": Object,
  "shadows": Array,
  "typography": Object,
  "spacing": Function,
  "shape": Object,
  "transitions": Object,
  "zIndex": Object
}
```

## How to change color scheme

In order to set or customize a theme, the `ThemeProvider` component needs to be used. This is however optional as Material-UI components comes with a default theme.

As the `ThemeProvider` passes down state using the context feature in React, we can set the base theme in the project by wrapping the `ThemeProvider` outside of the encapsulated `App` component inside of our `index.tsx` file.

The `ThemeProvider` sets the theme based on our desired `theme` object by passing it into the `theme` prop of the component.

Lets have a look at how to set a theme for our general application.

```jsx
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "styles/theme";

ReactDOM.render(
  <React.StrictMode>
    // Themprovider wrapped outside of App component
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

## Accesing theme in a component

If you wish to style material UI components from the theme, you can do so by using the `useTheme` hook. This hook gives you access to the application's theme and allows you to use the theme variables inside your components.

```jsx
import { useTheme } from "@material-ui/core/styles";

function componentUsingTheme() {
  const theme = useTheme();
  return <span>{`spacing ${theme.spacing}`}</span>;
}
```

## How to change color palette

The `Palette` object is one of the important variables to configure, as it enables you to modify the color of components to suit your needs. In the example below, blue and green are set as primary and secondary colors. Blue in this case will be the color displayed most frequently across the screens, whereas the color green will provide more ways to accent and distingush the product.

```jsx
import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue
    },
    secondary: {
      main: green
    },
  },
});
```

## How to change spacings

Spacing is set and configured to create a consistent spacing between the different elements.

Material UI uses a recommended 8px scaling factor by default.

```jsx
const theme = createMuiTheme();

theme.spacing(2); // = 8 * 2
```

Custom spacing can also be used and set accordingly:

```jsx
const theme = createMuiTheme({
  spacing: 4,
});

theme.spacing(2); // = 4 * 2
```

## How to have multiple themes

Mutiple themes can be generated by creating a new instance of `createMuiTheme({})` .

```jsx
export const baseTheme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

export const innerTheme = createMuiTheme({
  palette: {
    primary: {
      main: yellow[500],
    },
    secondary: {
      main: black[500],
    },
  },
});
```

## Light theme vs Dark theme

Material-UI comes with two types of palettes e.g. Light and Dark. The default palette type is Light, but the theme can be made dark by setting `type: "dark"`. While it's only a single property value change, internally it modifies several palette values.

```jsx
const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});
```

## Themes based on user role

Themes can be rendered based on different user roles. In the example below, we use the `Permission` component and provide a theme only to users that have the role to create (for instance an admin).

```jsx
import { Permission, PermissionEnum } from "features/permissions/permissions";
import theme from "styles/theme";

<Permission requiredPermissions={[PermissionEnum.USERS_CREATE]}>
  <ThemeProvider theme={theme}>{/* your code here*/}</ThemeProvider>
</Permission>;
```