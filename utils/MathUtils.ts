namespace Utils {
    /**
     * Math
     */
    export class Bezier {
        
        /**
         * interpolation between points using bezier
         * @param p0 point 1
         * @param p1 point 2
         * @param p2 point 3
         * @param p3 point 4
         * @returns bezier interpolated vector3
         */
        public static GetPoint(p0: BABYLON.Vector3, p1: BABYLON.Vector3, p2: BABYLON.Vector3, p3: BABYLON.Vector3, t: number): BABYLON.Vector3 {

            t = MathUtil.clamp(t, 0, 1);

            let ab: BABYLON.Vector3 = BABYLON.Vector3.Lerp(p0, p1, t);
            let bc: BABYLON.Vector3 = BABYLON.Vector3.Lerp(p1, p2, t);
            let cd: BABYLON.Vector3 = BABYLON.Vector3.Lerp(p2, p3, t);

            let abbc: BABYLON.Vector3 = BABYLON.Vector3.Lerp(ab, bc, t);
            let bccd: BABYLON.Vector3 = BABYLON.Vector3.Lerp(bc, cd, t);

            let abbcbccd: BABYLON.Vector3 = BABYLON.Vector3.Lerp(abbc, bccd, t);

            return abbcbccd;
        }

        /**
         * interpolation between rotation using bezier
         * @param p0 point 1
         * @param p1 point 2
         * @param p2 point 3
         * @param p3 point 4
         * @returns bezier interpolated quaturnion
         */
        public static GetPointRotation(p0: BABYLON.Quaternion, p1: BABYLON.Quaternion, p2: BABYLON.Quaternion, p3: BABYLON.Quaternion, t: number): BABYLON.Quaternion {

            t = MathUtil.clamp(t, 0, 1);

            let ab: BABYLON.Quaternion = BABYLON.Quaternion.Slerp(p0, p1, t);
            let bc: BABYLON.Quaternion = BABYLON.Quaternion.Slerp(p1, p2, t);
            let cd: BABYLON.Quaternion = BABYLON.Quaternion.Slerp(p2, p3, t);

            let abbc: BABYLON.Quaternion = BABYLON.Quaternion.Slerp(ab, bc, t);
            let bccd: BABYLON.Quaternion = BABYLON.Quaternion.Slerp(bc, cd, t);

            let abbcbccd: BABYLON.Quaternion = BABYLON.Quaternion.Slerp(abbc, bccd, t);

            return abbcbccd;
        }
    }

    export class MathUtil {
        /**
         * clamps a value between an minimum and a maximum number
         * @param value number to be clamped
         * @param min minimum
         * @param max maximum
         * @return clamped value
         */
        public static clamp(value, min, max) {
            return Math.min(Math.max(value, min), max);
        };
        /**
         * interpolate between two values
         * @param startValue the start value
         * @param endValue the and value
         * @param gradient place in interpolation
         * @returns interpolation
         */
        public static floatInterpolateFunction(startValue: number, endValue: number, gradient: number): number {
            return startValue + (endValue - startValue) * gradient;
        };
    }
}