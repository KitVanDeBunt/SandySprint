var Utils;
(function (Utils) {
    /**
     * Math
     */
    var Bezier = (function () {
        function Bezier() {
        }
        /**
         * interpolation between points using bezier
         * @param p0 point 1
         * @param p1 point 2
         * @param p2 point 3
         * @param p3 point 4
         * @returns bezier interpolated vector3
         */
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
        /**
         * interpolation between rotation using bezier
         * @param p0 point 1
         * @param p1 point 2
         * @param p2 point 3
         * @param p3 point 4
         * @returns bezier interpolated quaturnion
         */
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
        /**
         * clamps a value between an minimum and a maximum number
         * @param value number to be clamped
         * @param min minimum
         * @param max maximum
         * @return clamped value
         */
        MathUtil.clamp = function (value, min, max) {
            return Math.min(Math.max(value, min), max);
        };
        ;
        /**
         * interpolate between two values
         * @param startValue the start value
         * @param endValue the and value
         * @param gradient place in interpolation
         * @returns interpolation
         */
        MathUtil.floatInterpolateFunction = function (startValue, endValue, gradient) {
            return startValue + (endValue - startValue) * gradient;
        };
        ;
        return MathUtil;
    }());
    Utils.MathUtil = MathUtil;
})(Utils || (Utils = {}));
//# sourceMappingURL=mathUtils.js.map