var Engine = require( 'velocity' ).Engine;
var path = require("path");
var fs = require("fs");
var _ = fis.util;

module.exports = function (content, file, settings) {

	var mockPath = file.realpath + ".js";
	var mock = getMockContent(mockPath, file);

	var root = fis.project.getProjectPath();
	if(settings.root) {
		if(path.isAbsolute(settings.root)) {
			root = settings.root;
		}
		else {
			root = path.join(root, settings.root);
		}
	}

	if(settings.commonMock) {
		var commonMockPath;
		if(path.isAbsolute(settings.commonMock)) {
			commonMockPath = settings.commonMock;
		}
		else {
			commonMockPath = path.join(root, settings.commonMock);
		}

		var commonMock = getMockContent(commonMockPath, file);
		mock = _.merge(commonMock, mock);
	}

	var engine = new Engine( {
	    template: content,
	    cache: false
	} );

	return engine.render(mock);
}

function getMockContent(path, file) {
	var mock = {};

	if(fs.existsSync(path)) {
		mock = require(path);
		delete require.cache[path];

		file.cache.addDeps(path);
	}

	return mock;
}
