"use strict";
var path = require("path");
var edge = require("edge");
var winApi = edge.func(path.join(__dirname, "winApi.cs"));
var ShowWindowArgs;
(function (ShowWindowArgs) {
    /**
     * Hides the window and activates another window.
     * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
     */
    ShowWindowArgs[ShowWindowArgs["SW_HIDE"] = 0] = "SW_HIDE";
    /**
     * Activates and displays a window. If the window is minimized or maximized, the system restores it to its original size and position.
     * An application should specify this flag when displaying the window for the first time.
     * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
     */
    ShowWindowArgs[ShowWindowArgs["SW_SHOWNORMAL"] = 1] = "SW_SHOWNORMAL";
    /**
     * Activates the window and displays it as a minimized window.
     * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
     */
    ShowWindowArgs[ShowWindowArgs["SW_SHOWMINIMIZED"] = 2] = "SW_SHOWMINIMIZED";
    /**
     * Activates the window and displays it as a maximized window.
     * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
     */
    ShowWindowArgs[ShowWindowArgs["SW_SHOWMAXIMIZED"] = 3] = "SW_SHOWMAXIMIZED";
    /**
     * Maximizes the specified window.
     * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
     */
    ShowWindowArgs[ShowWindowArgs["SW_MAXIMIZE"] = 3] = "SW_MAXIMIZE";
    /**
     * Displays a window in its most recent size and position.
     * This value is similar to SW_SHOWNORMAL, except that the window is not activated.
     * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
     */
    ShowWindowArgs[ShowWindowArgs["SW_SHOWNOACTIVATE"] = 4] = "SW_SHOWNOACTIVATE";
    /**
     * Activates the window and displays it in its current size and position.
     * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
     */
    ShowWindowArgs[ShowWindowArgs["SW_SHOW"] = 5] = "SW_SHOW";
    /**
     * Minimizes the specified window and activates the next top-level window in the Z order.
     * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
     */
    ShowWindowArgs[ShowWindowArgs["SW_MINIMIZE"] = 6] = "SW_MINIMIZE";
    /**
     * Displays the window as a minimized window. This value is similar to SW_SHOWMINIMIZED, except the window is not activated.
     * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
     */
    ShowWindowArgs[ShowWindowArgs["SW_SHOWMINNOACTIVE"] = 7] = "SW_SHOWMINNOACTIVE";
    /**
     * Displays the window in its current size and position. This value is similar to SW_SHOW, except that the window is not activated.
     * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
     */
    ShowWindowArgs[ShowWindowArgs["SW_SHOWNA"] = 8] = "SW_SHOWNA";
    /**
     * Activates and displays the window. If the window is minimized or maximized, the system restores it to its original size and position.
     * An application should specify this flag when restoring a minimized window.
     * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
     */
    ShowWindowArgs[ShowWindowArgs["SW_RESTORE"] = 9] = "SW_RESTORE";
    /**
     * Sets the show state based on the SW_ value specified in the STARTUPINFO structure passed to the CreateProcess function by the program that started the application.
     * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
     */
    ShowWindowArgs[ShowWindowArgs["SW_SHOWDEFAULT"] = 10] = "SW_SHOWDEFAULT";
    /**
     * Minimizes a window, even if the thread that owns the window is not responding.
     * This flag should only be used when minimizing windows from a different thread.
     * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
     */
    ShowWindowArgs[ShowWindowArgs["SW_FORCEMINIMIZE"] = 11] = "SW_FORCEMINIMIZE";
})(ShowWindowArgs = exports.ShowWindowArgs || (exports.ShowWindowArgs = {}));
function hideCurrentProcessWindow() {
    return winApiGetHwndFromPid()
        .then(function (hWnd) {
        return winApiShowWindow(hWnd, ShowWindowArgs.SW_HIDE);
    });
}
exports.hideCurrentProcessWindow = hideCurrentProcessWindow;
function showCurrentProcessWindow() {
    return winApiGetHwndFromPid()
        .then(function (hWnd) {
        return winApiShowWindow(hWnd, ShowWindowArgs.SW_SHOW);
    });
}
exports.showCurrentProcessWindow = showCurrentProcessWindow;
function minimizeCurrentProcessWindow() {
    return winApiGetHwndFromPid()
        .then(function (hWnd) {
        return winApiShowWindow(hWnd, ShowWindowArgs.SW_MINIMIZE);
    });
}
exports.minimizeCurrentProcessWindow = minimizeCurrentProcessWindow;
function maximizeCurrentProcessWindow() {
    return winApiGetHwndFromPid()
        .then(function (hWnd) {
        return winApiShowWindow(hWnd, ShowWindowArgs.SW_MAXIMIZE);
    });
}
exports.maximizeCurrentProcessWindow = maximizeCurrentProcessWindow;
function restoreCurrentProcessWindow() {
    return winApiGetHwndFromPid()
        .then(function (hWnd) {
        return winApiShowWindow(hWnd, ShowWindowArgs.SW_RESTORE);
    });
}
exports.restoreCurrentProcessWindow = restoreCurrentProcessWindow;
/**
 * Tries to get hWnd from pid via EnumWindows and GetWindowThreadProcessId
 */
function winApiGetHwndFromPid(pid) {
    if (pid === void 0) { pid = process.pid; }
    return new Promise(function (resolve, reject) {
        var hWnd = undefined;
        winApi({
            method: "GetWindowThreadProcessId",
            pid: pid
        }, function (error, result) {
            if (error) {
                reject(error);
                return;
            }
            hWnd = result;
        });
        resolve(hWnd);
    });
}
exports.winApiGetHwndFromPid = winApiGetHwndFromPid;
/**
 * Calls ShowWindow
 * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
 */
function winApiShowWindow(hWnd, nCmdShow) {
    return new Promise(function (resolve, reject) {
        winApi({
            method: "ShowWindow",
            hwnd: hWnd,
            ncmdshow: nCmdShow
        }, function (error) {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
}
exports.winApiShowWindow = winApiShowWindow;
//# sourceMappingURL=index.js.map