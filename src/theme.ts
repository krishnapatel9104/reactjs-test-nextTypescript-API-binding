import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  // components: {
  //     MuiTypography: {
  //         variants: [
  //             {
  //                 props: { variant: "titleHeading" },
  //                 style: {
  //                     fontFamily: "Jost",
  //                     fontStyle: "normal",
  //                     fontWeight: "700",
  //                     fontSize: "39px",
  //                     lineHeight: "56px",
  //                     color: "#212121",
  //                     textAlign: "center",
  //                 },
  //             },
  //         ],
  //     },
  // },
  typography: {
    h1: {  //titleHeading
      fontFamily: 'Jost'
    },
    h2: {  //headerNavbarLink
      fontFamily: 'Josefin Sans'
    },
    h3: { //headerNavbarSubLink
      fontFamily: 'Inter'
    },
    h4: {  //desc
      fontFamily: 'Lato'
    }
  },
  palette: {
    background: {  //backgroundColor
      default: '#F5F5F5'
    },
    primary: {
      main: '#212121',
      dark: '#8E8E93', //navbarSubLink
      light: '#1B2437' //navbarLink
    },
    secondary: {
      main: '#424242',
      dark: '#FF705C', //currentPrice
      light: '#9E9E9E',//originalPrice
      contrastText: '#616161' //footerSubLink
    },
    // navbarSubLink: {  //navbarSubLink
    //   color: '#8E8E93'
    // },
    // navbarLink: {
    //   color: '#1B2437'
    // },
    // currentPrice: {
    //   color: '#FF705C'
    // },
    // originalPrice: {
    //   color: '#9E9E9E'
    // },
    // footerSubLink: {
    //   color: '#616161'
    // }
  }
});
export default theme;
