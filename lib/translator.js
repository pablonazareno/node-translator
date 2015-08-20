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
var util = require('util')
var Gettext = require("node-gettext");
var gt = new Gettext();

function scanDirectory(dirPath) {
	var dirs = fs.readdirSync(dirPath);
	dirs.forEach(function(dir) {
		var stats = fs.statSync(dirPath + path.sep + dir);
		if (stats.isDirectory()) {
			var fileContents = fs.readFileSync(dirPath + path.sep + dir + path.sep + 'Messages.po');
			gt.addTextdomain(dir, fileContents);
		}
	});
}

module.exports.tr = function(text) {
	var translation = gt.gettext(text);
	if (arguments.length > 1) {
		var args = Array.prototype.slice.call(arguments);
		args[0] = translation;
		return util.format.apply(undefined, args);
	} else {
		return translation;
	}
};
module.exports.trn = function(singular, plural, n) {
	var translation = gt.ngettext(singular, plural, n);
	if (arguments.length > 3) {
		var args = Array.prototype.slice.call(arguments);
		args[0] = translation;
		args.splice(1, 2);
		return util.format.apply(undefined, args);
	} else {
		return translation;
	}
};
module.exports.trd = function(text, domain) {
	var translation = gt.dgettext(domain, text);
	if (arguments.length > 2) {
		var args = Array.prototype.slice.call(arguments);
		args[0] = translation;
		args.splice(1, 1);
		return util.format.apply(undefined, args);
	} else {
		return translation;
	}
};
module.exports.trnd = function(singular, plural, n, domain) {
	var translation = gt.dngettext(domain, singular, plural, n);
	if (arguments.length > 4) {
		var args = Array.prototype.slice.call(arguments);
		args[0] = translation;
		args.splice(1, 3);
		return util.format.apply(undefined, args);
	} else {
		return translation;
	}
};

module.exports.textDomain = function(domain) {
	return gt.textdomain(domain);
};

module.exports.init = function(path, defaultDomain) {
	scanDirectory(path);
	gt.textdomain(defaultDomain);
};
