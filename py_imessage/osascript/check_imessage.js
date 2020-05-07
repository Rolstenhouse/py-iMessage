const seApp = Application("System Events");
seApp.includeStandardAdditions = true;
const messagesApp = Application("Messages");
messagesApp.includeStandardAdditions = true;

// Run and get passed in arguments
ObjC.import("stdlib"); // for exit

var args = $.NSProcessInfo.processInfo.arguments; // NSArray
var argv = [];
var argc = args.count;
for (var i = 4; i < argc; i++) {
  argv.push(ObjC.unwrap(args.objectAtIndex(i))); 
}

const number = argv[0];
checkNumber(number);

function checkNumber(number) {
  messagesApp.activate();

  delay(0.2);

  seApp.keystroke("n", { using: "command down" });
  seApp.keystroke(number);
  seApp.keyCode(36); //enter

  delay(2); // Takes a while to realize if it's relevant or not

  // TODO: fix latency here For some reason this is slow as shit
  let base =
    seApp.processes["Messages"].windows[0].splitterGroups[0].scrollAreas[2]
      .textFields[0];
  base.menuButtons[0].actions["AXShowMenu"].perform();
  let menuItem = base.menus[0].menuItems[0];

  try {
    if (menuItem && menuItem.value() == "iMessage") {
      // Check second message item
      let secondMenuItem = base.menus[0].menuItems[1];
      if (
        !secondMenuItem.title() ||
        !secondMenuItem.title().includes("not registered")
      ) {
        seApp.keyCode(53); //escape
        return true;
      }
    }
  } catch (err) {}
  seApp.keyCode(53); //escape
  return false;
}

// Use this function for finding which UI element to act on
function debug_applescript() {
  /**
   * SAMPLE TYPES: buttons | groups | lists | toolbars | uiElements | actions | splitterGroups | textFields | menuButtons
   * 
   * INSTRUCTIONS
   * 1. Use the uiElements type as it's the most broad
   * 2. Index into the location via the method as shown below
   */

  var buttons =
    seApp.processes["Messages"].windows[0].splitterGroups[0].scrollAreas[2]
      .textFields;

  for (let i = 0; i < buttons.length; i++) {
    console.log(JSON.stringify(buttons[i].properties(), null, 4));
  }
}
