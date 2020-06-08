const seApp = Application('System Events')
const messagesApp = Application('Messages')
messagesApp.includeStandardAdditions = true;

// Run and get passed in arguments
ObjC.import('stdlib')                               // for exit

var args = $.NSProcessInfo.processInfo.arguments    
var argv = []
var argc = args.count
for (var i = 4; i < argc; i++) {
    // skip 3-word run command at top and this file's name
    argv.push(ObjC.unwrap(args.objectAtIndex(i)))  
}

const number = argv[0]
const message = argv[1]

sendNewMessage(number, message)

function sendNewMessage(number, message) {
    messagesApp.activate()

    // Adjust delay as necessary
    delay(0.2)
    
    seApp.keystroke('n', {using: 'command down'})
    seApp.keystroke(number)
    seApp.keyCode(36) //enter
    seApp.keystroke(message)
    seApp.keyCode(36)

    return getHandleForNumber(number)
}

function getHandleForNumber(number) {
    // Return handle id associated with number
    return messagesApp.buddies.whose({handle:{_contains: number}})[0].id()
}


// Should prevent app from quitting
function quit() {
    return true;
}

seApp.keyUp(59)
$.exit(0)