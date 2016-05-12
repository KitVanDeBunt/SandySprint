var Utils;
(function (Utils) {
    /**
     * Math
     */
    var Bezier = (function () {
        function Bezier() {
        }
        Bezier.GetPoint = function (p0, p1, p2, p3, t) {
            t = MathUtil.clamp(t, 0, 1);
            var ab = BABYLON.Vector3.Lerp(p0, p1, t);
            var bc = BABYLON.Vector3.Lerp(p1, p2, t);
            var cd = BABYLON.Vector3.Lerp(p2, p3, t);
            var abbc = BABYLON.Vector3.Lerp(ab, bc, t);
            var bccd = BABYLON.Vector3.Lerp(bc, cd, t);
            var abbcbccd = BABYLON.Vector3.Lerp(abbc, bccd, t);
            return abbcbccd;
        };
        Bezier.GetPointRotation = function (p0, p1, p2, p3, t) {
            t = MathUtil.clamp(t, 0, 1);
            var ab = BABYLON.Quaternion.Slerp(p0, p1, t);
            var bc = BABYLON.Quaternion.Slerp(p1, p2, t);
            var cd = BABYLON.Quaternion.Slerp(p2, p3, t);
            var abbc = BABYLON.Quaternion.Slerp(ab, bc, t);
            var bccd = BABYLON.Quaternion.Slerp(bc, cd, t);
            var abbcbccd = BABYLON.Quaternion.Slerp(abbc, bccd, t);
            return abbcbccd;
        };
        return Bezier;
    }());
    Utils.Bezier = Bezier;
    var MathUtil = (function () {
        function MathUtil() {
        }
        MathUtil.clamp = function (value, min, max) {
            return Math.min(Math.max(value, min), max);
        };
        ;
        return MathUtil;
    }());
    Utils.MathUtil = MathUtil;
})(Utils || (Utils = {}));
//# sourceMappingURL=MathUtils.js.map