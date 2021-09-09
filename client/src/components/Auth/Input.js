import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

//Input Field Creation for cleaner codes and dynamic input fields

const Input = ({
	half,
	id,
	name,
	handleChange,
	label,
	autoFocus,
	type,
	handleShowPassword,
}) => {
	return (
		<Grid item xs={12} sm={half ? 6 : 12}>
			<TextField
				id={id}
				margin='normal'
				name={name}
				onChange={handleChange}
				variant='outlined'
				required
				fullWidth
				label={label}
				autoFocus={autoFocus}
				type={type}
				InputProps={
					(name === 'password' || name === 'confirmPassword')
						? {
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton onClick={handleShowPassword}>
											{type === 'password' ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								),
						  }
						: null
				}
			/>
		</Grid>
	);
};

export default Input;
