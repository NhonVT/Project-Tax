function mainModule() {
    mainModule.prototype.fsEventsMain = function fsEventsMain() {
       console.log('a');
    }
}

var mainModuleFunction = new mainModule();

export { mainModuleFunction };