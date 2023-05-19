const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { uploadHandler } = require('./src/js/huita.js');

const ipc = ipcMain;

const createWindow = () => {
	const contentSecurityPolicy = `
    default-src 'self';
    script-src 'self';
    style-src 'self' https://fonts.googleapis.com;
    img-src 'self' data:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self';
    base-uri 'self';
	`;
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		minWidth: 760,
		minHeight: 420,
		frame: false,
		nodeIntegration: true,
		enableRemoteModule: true,
		contextIsolation: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			devTools: true,
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	mainWindow.loadFile('./src/index.html');

	ipc.on('minimizeApp', () => {
		console.log('Clicked on minimize button');
		mainWindow.minimize();
	});

	ipc.on('maximizeApp', () => {
		if (mainWindow.isMaximized()) {
			console.log('Clicked on restore');
			mainWindow.restore();
		} else {
			mainWindow.maximize();
			console.log('Clicked on maximize');
		}
	});

	ipc.on('closeApp', () => {
		console.log('Clicked on close button');
		mainWindow.close();
	});
};

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});


ipc.on('uploadFile', uploadHandler);
// тут написать функцию для заполнения информации о файле
// потом сделать экспорт этой функции перейти в хуиту
//  а лучше сделать отдельный файл для функций заполеняющих