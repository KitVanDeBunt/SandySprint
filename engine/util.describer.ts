
/**
 * static util class
 */
class Describer {
    /**
     * returns the type name of a component in a string
     * @param inputClass class of with you whant the type name
     * @returns type name in string
     */
    static getName(inputClass) :string{ 
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec((<any> inputClass).constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
    }
}