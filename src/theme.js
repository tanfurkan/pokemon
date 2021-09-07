import { createTheme } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';

// A custom orange theme for this app
const theme = createTheme({
	palette: {
		primary: deepOrange,
		secondary: {
			main: '#ef5350',
		},
	},
});

export default theme;
