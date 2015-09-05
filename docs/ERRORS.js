if (!user.name) errors['mandatoryName'] = true;
	
	if (!user.email) errors['mandatoryEmail'] = true;
	else if (!validateEmail(user.email)) errors['invalidEmail'] = true;

	if (user.confirmEmail != user.email) errors['invalidConfirmation'] = true;

	if (!user.password) errors['mandatoryPassword'] = true;
	else if (user.password.length < 6) errors["tooShortPassword"] = 1;