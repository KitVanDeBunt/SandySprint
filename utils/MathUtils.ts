namespace Utils {
    /**
     * Math
     */
    export class Bezier {
        public static GetPoint(p0: BABYLON.Vector3, p1: BABYLON.Vector3, p2: BABYLON.Vector3, p3: BABYLON.Vector3, t: number): BABYLON.Vector3 {

            t = MathUtil.caller(t,0,1);

            let ab:BABYLON.Vector3 = BABYLON.Vector3.Lerp(p0, p1, t);
            let bc:BABYLON.Vector3  = BABYLON.Vector3.Lerp(p1, p2, t);
            let cd:BABYLON.Vector3  = BABYLON.Vector3.Lerp(p2, p3, t);

            let abbc:BABYLON.Vector3  = BABYLON.Vector3.Lerp(ab, bc, t);
            let bccd:BABYLON.Vector3  = BABYLON.Vector3.Lerp(bc, cd, t);

            let abbcbccd:BABYLON.Vector3 = BABYLON.Vector3.Lerp(abbc, bccd, t);

            return abbcbccd;
        }
        
        public static GetPointRotation(p0: BABYLON.Quaternion, p1: BABYLON.Quaternion, p2: BABYLON.Quaternion, p3: BABYLON.Quaternion, t: number): BABYLON.Quaternion {

            t = MathUtil.caller(t,0,1);

            let ab:BABYLON.Quaternion = BABYLON.Quaternion.Slerp(p0, p1, t);
            let bc:BABYLON.Quaternion  = BABYLON.Quaternion.Slerp(p1, p2, t);
            let cd:BABYLON.Quaternion  = BABYLON.Quaternion.Slerp(p2, p3, t);

            let abbc:BABYLON.Quaternion  = BABYLON.Quaternion.Slerp(ab, bc, t);
            let bccd:BABYLON.Quaternion  = BABYLON.Quaternion.Slerp(bc, cd, t);

            let abbcbccd:BABYLON.Quaternion = BABYLON.Quaternion.Slerp(abbc, bccd, t);

            return abbcbccd;
        }
    }

    export class MathUtil {
        public static Clamp(value, min, max) {
            return Math.min(Math.max(value, min), max);
        };
    }
}