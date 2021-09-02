import {Container, CssBaseline, Link, Typography} from "@material-ui/core";


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const App = () => {
  return (
    <div className="App">
      <CssBaseline />
        <Container maxWidth="sm">
          <Typography variant="h4" component="h1" gutterBottom>
            Create React App v4-beta example
          </Typography>
          <Copyright />
        </Container>
    </div>
  );
}

export default App;
