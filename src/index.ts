import * as path from "path";
import * as edge from "edge";

const winApi = edge.func(path.join(__dirname, "winApi.cs"));

export enum ShowWindowArgs {
	/**
	 * Hides the window and activates another window.
	 * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
	 */
	SW_HIDE = 0,

	/**
	 * Activates and displays a window. If the window is minimized or maximized, the system restores it to its original size and position.
	 * An application should specify this flag when displaying the window for the first time.
	 * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
	 */
	SW_SHOWNORMAL = 1,

	/**
	 * Activates the window and displays it as a minimized window.
	 * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
	 */
	SW_SHOWMINIMIZED = 2,

	/**
	 * Activates the window and displays it as a maximized window.
	 * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
	 */
	SW_SHOWMAXIMIZED = 3,

	/**
	 * Maximizes the specified window.
	 * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
	 */
	SW_MAXIMIZE = 3,

	/**
	 * Displays a window in its most recent size and position.
	 * This value is similar to SW_SHOWNORMAL, except that the window is not activated.
	 * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
	 */
	SW_SHOWNOACTIVATE = 4,

	/**
	 * Activates the window and displays it in its current size and position.
	 * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
	 */
	SW_SHOW = 5,

	/**
	 * Minimizes the specified window and activates the next top-level window in the Z order.
	 * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
	 */
	SW_MINIMIZE = 6,

	/**
	 * Displays the window as a minimized window. This value is similar to SW_SHOWMINIMIZED, except the window is not activated.
	 * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
	 */
	SW_SHOWMINNOACTIVE = 7,

	/**
	 * Displays the window in its current size and position. This value is similar to SW_SHOW, except that the window is not activated.
	 * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
	 */
	SW_SHOWNA = 8,

	/**
	 * Activates and displays the window. If the window is minimized or maximized, the system restores it to its original size and position.
	 * An application should specify this flag when restoring a minimized window.
	 * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
	 */
	SW_RESTORE = 9,

	/**
	 * Sets the show state based on the SW_ value specified in the STARTUPINFO structure passed to the CreateProcess function by the program that started the application.
	 * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
	 */
	SW_SHOWDEFAULT = 10,

	/**
	 * Minimizes a window, even if the thread that owns the window is not responding.
	 * This flag should only be used when minimizing windows from a different thread.
	 * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
	 */
	SW_FORCEMINIMIZE = 11
}


export function hideCurrentProcessWindow(): Promise<any> {
	return winApiGetHwndFromPid()
		.then(hWnd => {
			return winApiShowWindow(hWnd, ShowWindowArgs.SW_HIDE);
		});
}


export function showCurrentProcessWindow(): Promise<any> {
	return winApiGetHwndFromPid()
		.then(hWnd => {
			return winApiShowWindow(hWnd, ShowWindowArgs.SW_SHOW);
		})
}


export function minimizeCurrentProcessWindow(): Promise<any> {
	return winApiGetHwndFromPid()
		.then(hWnd => {
			return winApiShowWindow(hWnd, ShowWindowArgs.SW_MINIMIZE);
		})
}


export function maximizeCurrentProcessWindow(): Promise<any> {
	return winApiGetHwndFromPid()
		.then(hWnd => {
			return winApiShowWindow(hWnd, ShowWindowArgs.SW_MAXIMIZE);
		})
}


export function restoreCurrentProcessWindow(): Promise<any> {
	return winApiGetHwndFromPid()
		.then(hWnd => {
			return winApiShowWindow(hWnd, ShowWindowArgs.SW_RESTORE);
		})
}


/**
 * Tries to get hWnd from pid via EnumWindows and GetWindowThreadProcessId
 */
export function winApiGetHwndFromPid(pid: number = process.pid): Promise<number> {
	return new Promise((resolve, reject) => {
		let hWnd = undefined;
		winApi({
			method: "GetWindowThreadProcessId",
			pid: pid
		}, (error, result) => {
			if (error) {
				reject(error);
				return;
			}
			hWnd = result;
		});
		resolve(hWnd);
	});
}


/**
 * Calls ShowWindow
 * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
 */
export function winApiShowWindow(hWnd: number, nCmdShow: ShowWindowArgs): Promise<any> {
	return new Promise((resolve, reject) => {
		winApi({
			method: "ShowWindow",
			hwnd: hWnd,
			ncmdshow: nCmdShow
		}, error => {
			if (error) {
				reject(error);
				return;
			}
			resolve();
		});
	});
}
