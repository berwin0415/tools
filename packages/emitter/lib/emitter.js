'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
var Emitter = /** @class */ (function () {
    function Emitter(events) {
        this.Events = events;
    }
    Emitter.prototype.on = function (eventName, fn) {
        this.Events[eventName]
            ? this.Events[eventName].push(fn)
            : (this.Events[eventName] = [fn]);
    };
    Emitter.prototype.emit = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (Array.isArray(this.Events[eventName])) {
            this.Events[eventName].forEach(function (element) {
                element && element.apply(void 0, args);
            });
        }
    };
    Emitter.prototype.off = function (eventName, fn) {
        if (Array.isArray(this.Events[eventName])) {
            for (var i = 0; i < this.Events[eventName].length; i++) {
                var element = this.Events[eventName][i];
                if (element && (element === fn || element.fn === fn)) {
                    this.Events[eventName][i] = null;
                }
            }
        }
    };
    Emitter.prototype.once = function (eventName, fn) {
        var that = this;
        function once() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            that.off(eventName, once);
            fn.apply(that, args);
        }
        once.fn = fn;
        this.on(eventName, once);
    };
    return Emitter;
}());
exports.default = (function () {
    var instance = null;
    var Events = {};
    if (instance instanceof Emitter) {
        return instance;
    }
    else {
        instance = new Emitter(Events);
        return instance;
    }
})();
