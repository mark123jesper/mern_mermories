import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import useStyles from './styles';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
	const classes = useStyles();

	return (
		<BrowserRouter>
			<Container className={classes.container} maxWidth={false}>
				<Navbar />
				<Switch>
					<Route exact path="/" component={Home} /> 
					<Route exact path="/auth" component={Auth} /> 
				</Switch>
			</Container>
		</BrowserRouter>
	);
};

export default App;
