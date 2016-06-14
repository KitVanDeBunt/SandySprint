/**
 * static util class
 */
var Describer = (function () {
    function Describer() {
    }
    /**
     * returns the type name of a component in a string
     * @param inputClass class of with you whant the type name
     * @returns type name in string
     */
    Describer.getName = function (inputClass) {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec(inputClass.constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
    };
    return Describer;
}());
//# sourceMappingURL=util.describer.js.map