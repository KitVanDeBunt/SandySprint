var Describer = (function () {
    function Describer() {
    }
    Describer.getName = function (inputClass) {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec(inputClass.constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
    };
    return Describer;
}());
//# sourceMappingURL=util.describer.js.map