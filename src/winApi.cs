using System;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

public class Startup
{
	private static int HWND;

	public async Task<object> Invoke(dynamic payload)
	{
		switch ((string)payload.method)
		{
			case "GetWindowThreadProcessId": {
				var pid = (int)payload.pid;
				EnumWindows(new EnumWindowProc(GetHwndEnumWindowsProc), pid);
				return HWND;
			}

			case "ShowWindow": {
				var hWnd = (int)payload.hwnd;
				var nCmdShow = (int)payload.ncmdshow;
				ShowWindow(hWnd, nCmdShow);
				return null;
			}

			default: {
				throw new ArgumentException("Invalid payload: " + payload);
			}
		}
	}

	[DllImport("user32.dll")]
	[return: MarshalAs(UnmanagedType.Bool)]
	static extern bool EnumWindows(EnumWindowProc lpEnumFunc, int lParam);

	public delegate bool EnumWindowProc(int hWnd, uint lParam);

	private static bool GetHwndEnumWindowsProc(int hWnd, uint lParam)
	{
		uint lpdwProcessId;
		GetWindowThreadProcessId(hWnd, out lpdwProcessId);
		if (lpdwProcessId == lParam) {
			HWND = hWnd;
			return false;
		}
		return true;
	}

	[DllImport("user32.dll", SetLastError=true)]
	private static extern uint GetWindowThreadProcessId(int hWnd, out uint lpdwProcessId);

	[DllImport("user32.dll")]
	private static extern bool ShowWindow(int hwnd, int nCmdShow);
}
