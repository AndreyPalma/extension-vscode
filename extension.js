// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const odbc = require('odbc');

// Cadena de conexión para ODBC
const connectionConfig = {
    connectionString: 'DSN=TuDSN;UID=db2admin;PWD=yourpassword',
    connectionTimeout: 10,
    loginTimeout: 10
};

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "extension-vscode" is now active!');

	// Register the hello world command
	let helloCommand = vscode.commands.registerCommand('extension-vscode.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Extension VS Code!');
	});

	// Register the DB2 test connection command usando ODBC
	let dbCommand = vscode.commands.registerCommand('extension-vscode.testDB2Connection', async function () {
		try {
			// Crear la conexión
			const connection = await odbc.connect(connectionConfig);
			
			// Si la conexión es exitosa, mostrar mensaje
			vscode.window.showInformationMessage('¡Conexión exitosa a la base de datos usando ODBC!');
			
			// Ejemplo de consulta
			const result = await connection.query('SELECT 1 FROM SYSIBM.SYSDUMMY1');
			console.log('Resultado de la consulta:', result);
			
			// Cerrar la conexión
			await connection.close();
		} catch (err) {
			// Si hay un error, mostrar mensaje de error
			vscode.window.showErrorMessage(`Error de conexión ODBC: ${err.message}`);
			console.error('Error de conexión ODBC:', err);
		}
	});

	// Add both commands to subscriptions
	context.subscriptions.push(helloCommand);
	context.subscriptions.push(dbCommand);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
