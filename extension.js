const vscode = require('vscode');
const editor = vscode.window.activeTextEditor;
const rp = require('request-promise')

async function CreateGist () {
    const text = editor.document.getText(editor.selection)

    // User Input to name Gist file
    const gistName = await vscode.window.showInputBox({
        placeHolder: 'Name Your GistTest'
    })

    const options = {
        method: 'POST',
        uri: 'https://api.github.com/gists',
        headers: {
            'User-Agent': 'Request-Promise'
        },
        body: {
            'description': 'the description for this gist',
            'public': true,
            'files': {}
        },
        json: true   
    }

    options.body.files[gistName] = {content: text}

    rp(options).then(r => {
        const parsedUrl = vscode.Uri.parse(r.html_url)
        vscode.commands.executeCommand('vscode.open', parsedUrl)
    })
}

function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.createGist', function () {
        CreateGist()
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;