import { createTheme } from '@material-ui/core/styles';
import { deepOrange, orange } from '@material-ui/core/colors';

// A custom orange theme for this app
const theme = createTheme({
	palette: {
		primary: deepOrange,
		secondary: orange,
	},
});

export default theme;
