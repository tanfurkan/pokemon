import React from 'react';
import capitalizeFirstLetter from '../Utils/capitalizeFirstLetter';

test('check capitalizeFirstLetter', () => {

	const testString = 'capitalizeFirstLetter';
	const expectedString = 'CapitalizeFirstLetter';
	const returnValue = capitalizeFirstLetter(testString);

	expect(expectedString).toEqual(returnValue);
});

test('check capitalizeFirstLetter false', () => {

	const testString = 'capitalizeFirstLetter';
	const wrongReturnValue = 'capitalizeFirstLetter';
	const returnValue = capitalizeFirstLetter(testString);

	expect(wrongReturnValue).not.toEqual(returnValue);
});