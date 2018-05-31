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
		var realPath= dirPath + path.sep + dir;
		var stats = fs.statSync(realPath);
		if (stats.isDirectory()) {
			var files= fs.readdirSync(realPath);
			var params=[dir];
			for (var i = 0; i < files.length; i++) {
				var fileContents = fs.readFileSync(dirPath + path.sep + dir + path.sep + files[i]);
				params.push(fileContents);
			};
			gt.addTextdomain.apply(gt,params);
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
module.exports.trp = function(text, context) {
	var translation = gt.pgettext(context, text);
	if (arguments.length > 2) {
		var args = Array.prototype.slice.call(arguments);
		args[0] = translation;
		args.splice(1, 1);
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
module.exports.trnp = function(singular, plural, n, context) {
	var translation = gt.npgettext(context, singular, plural, n);
	if (arguments.length > 4) {
		var args = Array.prototype.slice.call(arguments);
		args[0] = translation;
		args.splice(1, 3);
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
module.exports.trpd = function(text, domain, context) {
	var translation = gt.dpgettext(domain, context, text);
	if (arguments.length > 3) {
		var args = Array.prototype.slice.call(arguments);
		args[0] = translation;
		args.splice(1, 2);
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
module.exports.trnpd = function(singular, plural, n, domain, context) {
	var translation = gt.dnpgettext(domain, context, singular, plural, n);
	if (arguments.length > 5) {
		var args = Array.prototype.slice.call(arguments);
		args[0] = translation;
		args.splice(1, 4);
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
