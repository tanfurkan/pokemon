export const getRandomRGBString = () : string => {
	const randomRColor = Math.floor(Math.random() * 255);
	const randomGColor = Math.floor(Math.random() * 255);
	const randomBColor = Math.floor(Math.random() * 255);

	return `rgb(${randomRColor},${randomGColor},${randomBColor}`;
};