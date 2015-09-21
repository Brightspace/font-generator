'use strict';

let config = require('./config.json');

function generateFont(family, font) {

	let local = [];
	let woff = null;
	let woff2 = null;
	let truetype = null;

	font.formats.forEach((format) => {
		switch(format.type) {
			case 'local':
				local.push(format);
				break;
			case 'woff':
				woff = format;
				break;
			case 'woff2':
				woff2 = format;
				break;
			case 'truetype':
				truetype = format;
				break;
			default:
				throw new Error(`Unknown font format ${format.type}.`);
		}
	});

	let sources = local;
	if(woff2 !== null) {
		sources.push(woff2);
	}
	if(woff !== null) {
		sources.push(woff);
	}
	if(truetype !== null) {
		sources.push(truetype);
	}

	let src = '';
	let comma = '';
	sources.forEach(function(source) {
		if(source.type === 'local') {
			src += `${comma}local('${source.url}')`;
		} else {
			src += `${comma}url(${source.url}) format('${source.type}')`;
		}
		comma = ', ';
	});

	let value = `@font-face {
	font-family: '${family}';
	font-style: ${font.style};
	font-weight: ${font.weight};
	src: ${src};
}`;
	return value;

}

let buffer = '';
for(let family in config) {
	config[family].forEach((font) => {
		buffer += generateFont(family, font) + '\n';
	});
}

console.log(buffer);
