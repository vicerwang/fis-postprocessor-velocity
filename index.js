var Velocity = require("velocityjs");
var path = require("path");
var fs = require("fs");
var _ = fis.util;

module.exports = function (content, file, settings) {

	var root = fis.project.getProjectPath();
	if(settings.root) {
		if(path.isAbsolute(settings.root)) {
			root = settings.root;
		}
		else {
			root = path.join(root, settings.root);
		}
	}

	var commonMockPath;
	if(settings.commonMock) {
		if(path.isAbsolute(settings.commonMock)) {
			commonMockPath = settings.commonMock;
		}
		else {
			commonMockPath = path.join(root, settings.commonMock);
		}
	}
	else {
		commonMockPath = path.join(root, "mock/common/common.js");
	}
	var commonMock = getMockContent(commonMockPath);

	var mockPath = file.realpath + ".js";
	var mock = getMockContent(mockPath);

	mock = _.merge(commonMock, mock);

	return Velocity.render(content, mock);
}

function getMockContent(path) {
	var mock = {};

	if(fs.existsSync(path)) {
		mock = require(path);
		delete require.cache[path];
	}

	return mock;
}