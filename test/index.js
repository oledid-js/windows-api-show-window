"use strict";
var api = require("../src/index");
function promiseToWait() {
    return new Promise(function (resolve) {
        wait();
        resolve();
    });
}
function wait(numSeconds) {
    if (numSeconds === void 0) { numSeconds = 3; }
    for (var i = 0; i < numSeconds; ++i) {
        process.stdout.write(".");
        var waitUntil = new Date(new Date().getTime() + 1000);
        while (waitUntil > new Date()) { }
    }
    console.log("");
}
console.log("Test started");
console.log("If the tests does nothing, please make sure you are running them in a node.exe process");
console.log("(unlike a node.exe process running inside a cmd.exe process)");
console.log("");
(function () {
    console.log("Maximize window");
    return api.maximizeCurrentProcessWindow();
})().then(promiseToWait)
    .then(function () {
    console.log("Restore window");
    return api.restoreCurrentProcessWindow();
}).then(promiseToWait)
    .then(function () {
    console.log("Minimize window");
    return api.minimizeCurrentProcessWindow();
}).then(promiseToWait)
    .then(function () {
    console.log("Restore window");
    return api.restoreCurrentProcessWindow();
}).then(promiseToWait)
    .then(function () {
    console.log("Hide window");
    return api.hideCurrentProcessWindow();
}).then(promiseToWait)
    .then(function () {
    console.log("Show window");
    return api.showCurrentProcessWindow();
}).then(promiseToWait)
    .then(function () {
    console.log("Test finished");
}).catch(function (err) {
    console.error(err);
});
//# sourceMappingURL=index.js.map