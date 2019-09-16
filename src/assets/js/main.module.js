function mainModule() {
    mainModule.prototype.fsEventsMain = function fsEventsMain() {
        fsEvent();
    }
}

var mainModuleFunction = new mainModule();

export { mainModuleFunction };