'use strict';

const config = require('./config.json');
const Readable = require('stream').Readable;

function generateFont(family, font) {

	const local = [];
	let woff = null;
	let woff2 = null;
	let truetype = null;

	font.formats.forEach((format) => {
		switch (format.type) {
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

	const sources = local;
	if (woff2 !== null) {
		sources.push(woff2);
	}
	if (woff !== null) {
		sources.push(woff);
	}
	if (truetype !== null) {
		sources.push(truetype);
	}

	let src = '';
	let comma = '';
	sources.forEach(function(source) {
		if (source.type === 'local') {
			src += `${comma}local('${source.url}')`;
		} else {
			src += `${comma}url(${source.url}) format('${source.type}')`;
		}
		comma = ', ';
	});

	const value = `@font-face {
	font-family: '${family}';
	font-style: ${font.style};
	font-weight: ${font.weight};
	src: ${src};
}`;
	return value;

}

module.exports = function() {
	var s = new Readable();
	for (const family in config) {
		config[family].forEach((font) => {
			s.push(generateFont(family, font));
			s.push('\n');
		});
	}
	s.push(null);
	return s;
};
