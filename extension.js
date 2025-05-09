// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const jt400 = require('node-jt400');

// Configuración para la conexión AS400/DB2
const config = {
    host: 'tu_host_as400',
    user: 'tu_usuario',
    password: 'tu_password',
    'translate binary': 'true'
};

// Crear el pool de conexiones
const pool = jt400.pool(config);

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

	// Register the DB2 test connection command usando JT400
	let dbCommand = vscode.commands.registerCommand('extension-vscode.testDB2Connection', async function () {
		try {
			// Intentar una consulta simple para probar la conexión
			const result = await pool.query('SELECT 1 FROM SYSIBM.SYSDUMMY1');
			
			// Si llegamos aquí, la conexión fue exitosa
			vscode.window.showInformationMessage('¡Conexión exitosa a AS400/DB2!');
			console.log('Resultado de la consulta:', result);
			
		} catch (err) {
			// Si hay un error, mostrar mensaje detallado
			vscode.window.showErrorMessage(`Error de conexión a AS400/DB2: ${err.message}`);
			console.error('Error de conexión:', err);
			if (err.cause) {
				console.error('Causa original:', err.cause);
			}
		}
	});

	// Add commands to subscriptions
	context.subscriptions.push(helloCommand);
	context.subscriptions.push(dbCommand);
}

// This method is called when your extension is deactivated
function deactivate() {
    // Cerrar el pool de conexiones al desactivar la extensión
    if (pool) {
        pool.close();
    }
}

module.exports = {
	activate,
	deactivate
}
