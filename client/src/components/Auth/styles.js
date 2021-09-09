import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: theme.spacing(2),
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
	},
	submit: {
		marginTop: theme.spacing(2),
	},
	googleButton: {
		marginTop: theme.spacing(2),
	},
}));
