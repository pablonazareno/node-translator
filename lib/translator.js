"use strict";
var logger = require('winston');
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
	level: 'debug',
	colorize: true,
	timestamp: true
});

var fs = require('fs');
var path = require('path');

var Gettext = require("node-gettext");
var gt = new Gettext();

function scanDirectory(dirPath) {
	var dirs = fs.readdirSync(dirPath);
	dirs.forEach(function(dir) {
		var stats = fs.statSync(dirPath + path.sep + dir);
		if (stats.isDirectory()) {
			var fileContents = fs.readFileSync(dirPath + path.sep + dir + path.sep + 'keys.po');
			gt.addTextdomain(dir, fileContents);
		}
	});
}

module.exports.tr = function(text, values) {
	return gt.gettext(text);
};
module.exports.trn = function(singular, plural, n, values) {
	return gt.ngettext(singular, plural, n);
};
module.exports.trd = function(text, domain, values) {
	return gt.dgettext(domain, text);
};
module.exports.trnd = function(singular, plural, n, domain, values) {
	return gt.dngettext(domain, singular, plural, n);
};

module.exports.textDomain = function(domain) {
	return gt.textdomain(domain);
};

module.exports.init = function(path, defaultDomain) {
	scanDirectory(path);
	gt.textdomain(defaultDomain);
};