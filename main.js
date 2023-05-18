// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
// ипорт ipc async считывает параметры, которые передаются через средство визуализации ipc
const ipc = ipcMain;

// для интеграции python
const { spawn } = require('child_process');
// const { PythonShell } = require('python-shell');

const createWindow = () => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		// в пикселях
		minWidth: 760,
		minHeight: 420,
		// icon: __dirname + "/../.jpg"
		//  скрыть стандартный тайтл бар
		frame: false,
		// autoHideMenuBar: true,
		// show: false,
		// инструменты
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			devTools: true,
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	// and load the index.html of the app.
	mainWindow.loadFile('./src/index.html');


	// Open the DevTools.
	// mainWindow.webContents.openDevTools()

	// minimize app
	ipc.on('minimizeApp', () => {
		console.log('cliked on minimize button');
		mainWindow.minimize();
	});

	// MAXIMAZE RESTORE APP
	ipc.on('maximizeApp', () => {
		if (mainWindow.isMaximized()) {
			console.log('cliked on restore');
			mainWindow.restore();
		} else {
			mainWindow.maximize();
			console.log('clicked on maximize');
		}
	});

	// close app
	ipc.on('closeApp', () => {
		console.log('clicked on close button');
		mainWindow.close();
	});
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('uploadFile', (event, filePath) => {
	const pythonProcess = spawn('python', ['./src/python_scripts/script.py', filePath,]);

	pythonProcess.stdout.on('data', (data) => {
		const file = data.toString(); // Ваш загруженный файл
		event.sender.send('fileUploaded', file);
	});

	pythonProcess.stderr.on('data', (data) => {
		console.error(data.toString());
	});
});
