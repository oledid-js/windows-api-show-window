import * as api from "../src/index";

function promiseToWait() {
	return new Promise(resolve => {
		wait();
		resolve();
	});
}

function wait(numSeconds: number = 3) {
	for (let i = 0; i < numSeconds; ++i) {
		process.stdout.write(".");
		const waitUntil = new Date(new Date().getTime() + 1000);
		while(waitUntil > new Date()){}
	}
	console.log("");
}

console.log("Test started");
console.log("If the tests does nothing, please make sure you are running them in a node.exe process");
console.log("(unlike a node.exe process running inside a cmd.exe process)");
console.log("");

(() => {
	console.log("Maximize window");
	return api.maximizeCurrentProcessWindow()
})().then(promiseToWait)
.then(() => {
	console.log("Restore window");
	return api.restoreCurrentProcessWindow()
}).then(promiseToWait)
.then(() => {
	console.log("Minimize window");
	return api.minimizeCurrentProcessWindow()
}).then(promiseToWait)
.then(() => {
	console.log("Restore window");
	return api.restoreCurrentProcessWindow()
}).then(promiseToWait)
.then(() => {
	console.log("Hide window");
	return api.hideCurrentProcessWindow()
}).then(promiseToWait)
.then(() => {
	console.log("Show window");
	return api.showCurrentProcessWindow()
}).then(promiseToWait)
.then(() => {
	console.log("Test finished");
}).then(promiseToWait)
.catch(err => {
	console.error(err);
});
