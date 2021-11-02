'use strict';

var fs = require('fs');
var path = require('path');
var util = require('util')
var Parser = require('gettext-parser');
var Gettext = require('node-gettext');
var gt = new Gettext();

function scanDirectory(basePath) {
	var directory = fs.readdirSync(basePath);
	directory.forEach(function (lang) {
		var realPath = basePath + path.sep + lang;
		var stats = fs.statSync(realPath);
		if (stats.isDirectory()) {
			var files = fs.readdirSync(realPath);
			for (var i = 0; i < files.length; i++) {
				var Domain = files[i].substring(0, files[i].length - 3);
				var fileContents = fs.readFileSync(realPath + path.sep + files[i]);
				var parsedTranslations = Parser.po.parse(fileContents);
				gt.addTranslations(lang, Domain, parsedTranslations);
			}
		}
	});
}

module.exports.tr = function (text) {
	var translation = gt.gettext(text);
	if (arguments.length > 1) {
		var args = Array.prototype.slice.call(arguments);
		args[0] = translation;
		return util.format.apply(undefined, args);
	} else {
		return translation;
	}
}

module.exports.trn = function (singular, plural, n) {
	var translation = gt.ngettext(singular, plural, n);
	if (arguments.length > 3) {
		var args = Array.prototype.slice.call(arguments);
		args[0] = translation;
		args.splice(1, 2);
		return util.format.apply(undefined, args);
	} else {
		return translation;
	}
}

module.exports.trd = function (text, domain) {
	var translation = gt.dgettext(domain, text);
	if (arguments.length > 2) {
		var args = Array.prototype.slice.call(arguments);
		args[0] = translation;
		args.splice(1, 1);
		return util.format.apply(undefined, args);
	} else {
		return translation;
	}
}

module.exports.trnd = function (singular, plural, n, domain) {
	var translation = gt.dngettext(domain, singular, plural, n);
	if (arguments.length > 4) {
		var args = Array.prototype.slice.call(arguments);
		args[0] = translation;
		args.splice(1, 3);
		return util.format.apply(undefined, args);
	} else {
		return translation;
	}
}

module.exports.textDomain = function (domain) {
	return gt.textdomain(domain);
}

module.exports.init = function (path, domain, defaultLang) {
	scanDirectory(path);
	gt.textdomain(domain);
	gt.setLocale(defaultLang);
}
