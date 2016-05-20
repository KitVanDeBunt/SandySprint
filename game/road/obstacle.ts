/**
 * RoadObstacle
 */
class RoadObstacle{
    meshCollider : BABYLON.Mesh;
    meshType: CollisionMeshType;
}

enum CollisionMeshType{
    pillar,
    scarab
}