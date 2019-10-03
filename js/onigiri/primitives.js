bento.define('onigiri/primitives', [
    'bento/utils',
    'onigiri/onigiri'
], function (
    Utils,
    Onigiri
) {
    'use strict';
    // for now only basic primitives
    var primitiveEnum = {
        'circle': THREE.CircleBufferGeometry,
        'cube': THREE.BoxBufferGeometry,
        'cone': THREE.ConeBufferGeometry,
        'cylinder': THREE.CylinderBufferGeometry,
        'plane': THREE.PlaneBufferGeometry,
        'sphere': THREE.SphereBufferGeometry,
        'torus': THREE.TorusBufferGeometry,
    };

    /* @snippet Primitive: Circle - Onigiri
Onigiri.Primitive({
    shape: 'circle',
    position: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Euler(0, 0, 0),
    scale: new THREE.Vector3(1, 1, 1),
    // material : undefined,
    parameters: [
        ${1:1}, // radius
        ${2:1}, // segments
        //0, // optional: thetaStart - Start angle for first segment, default = 0 (three o'clock position).
        //2*Pi, // optional: thetaLength - The central angle, often called theta, of the circular sector. The default is 2*Pi, which makes for a complete circle.
    ],
    
    // disposeGeometry : true,
    // disposeMaterial : true
});
         * @snippet Primitive: Cube - Onigiri
Onigiri.Primitive({
    shape: 'cube',
    position: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Euler(0, 0, 0),
    scale: new THREE.Vector3(1, 1, 1),
    parameters: [
        ${1:1}, // width
        ${2:1}, // height
        ${3:1}, // depth
        //1, // optional: widthSegments
        //1, // optional: heightSegments
        //1, // optional: depthSegments
    ],
    // material : undefined,
    // disposeGeometry : true,
    // disposeMaterial : true
});
         * @snippet Primitive: Cone - Onigiri
Onigiri.Primitive({
    shape: 'cone',
    position: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Euler(0, 0, 0),
    scale: new THREE.Vector3(1, 1, 1),
    parameters: [
        ${1:1}, // radius
        ${2:1}, // height
        ${3:8} // radialSegments
        //true, // optional: openEnded - A Boolean indicating whether the base of the cone is open or capped. Default is false, meaning capped.
        //0, // optional: thetaStart - Start angle for first segment, default = 0 (three o'clock position).
        //2 * Math.PI, // optional: thetaLength - The central angle, often called theta, of the circular sector. The default is 2*Pi, which makes for a complete cone.
    ],
    // material : undefined,
    // disposeGeometry : true,
    // disposeMaterial : true
});
        * @snippet Primitive: Sphere - Onigiri
Onigiri.Primitive({
    shape: 'sphere',
    position: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Euler(0, 0, 0),
    scale: new THREE.Vector3(1, 1, 1),
    parameters: [
        ${1:1}, // radius
        ${2:8}, // widthSegments
        ${3:8} // heightSegments
        //0, // optional: phiStart - horizontal starting angle. Default is 0.
        //2*Math.PI, // optional: phiLength - horizontal sweep angle size. Default is Math.PI * 2.
        //0, // optional: thetaStart - vertical starting angle. Default is 0.
        //2*Math.PI, // optional: thetaLength - specify vertical sweep angle size. Default is Math.PI.
    ],
    // material : undefined,
    // disposeGeometry : true,
    // disposeMaterial : true
});
    * @snippet Primitive: Cylinder - Onigiri
Onigiri.Primitive({
    shape: 'cylinder',
    position: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Euler(0, 0, 0),
    scale: new THREE.Vector3(1, 1, 1),
    parameters: [
        ${1:1}, // radiusTop
        ${2:1}, // radiusBottom
        ${3:1} // height
        //8, // optional: radialSegments - Number of segmented faces around the circumference of the cylinder. Default is 8
        //1, // optional: heightSegments - Number of rows of faces along the height of the cylinder. Default is 1.
        //true, // optional: openEnded - A Boolean indicating whether the ends of the cylinder are open or capped. Default is false, meaning capped.
        //0, // optional: thetaStart - Start angle for first segment, default = 0 (three o'clock position).
        //2 * Math.PI, // optional: thetaLength - The central angle, often called theta, of the circular sector. The default is 2*Pi, which makes for a complete cone.
    ],
    // material : undefined,
    // disposeGeometry : true,
    // disposeMaterial : true,
});
         * @snippet Primitive: Torus - Onigiri
Onigiri.Primitive({
    shape: 'torus',
    position: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Euler(0, 0, 0),
    scale: new THREE.Vector3(1, 1, 1),
    parameters: [
        ${1:1}, // radius - Radius of the torus, from the center of the torus to the center of the tube. Default is 1.
        ${2:0.4}, // tube - Radius of the tube. Default is 0.4.
        ${3:8}, // radialSegments
        ${4:6} // tubularSegments
        //true, // optional: arc - Central angle. Default is Math.PI * 2.
    ],
    // material : undefined,
    // disposeGeometry : true,
    // disposeMaterial : true
});
         * @snippet Primitive: Plane - Onigiri
Onigiri.Primitive({
    shape: 'plane',
    position: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Euler(0, 0, 0),
    scale: new THREE.Vector3(1, 1, 1),
    parameters: [
        ${1:1}, // width
        ${2:1} // height
        //1, // optional: widthSegments
        //1, // optional: heightSegments
    ],
    // material : undefined,
    // disposeGeometry : true,
    // disposeMaterial : true,
    // castShadow: true,
    // receiveShadow: true
});
     */
    Onigiri.Primitive = function (settings) {
        var geometry = new primitiveEnum[settings.shape](
            settings.parameters[0],
            settings.parameters[1],
            settings.parameters[2],
            settings.parameters[3],
            settings.parameters[4],
            settings.parameters[5],
            settings.parameters[6]
        );
        geometry.computeVertexNormals();
        var material = settings.material || new THREE.MeshBasicMaterial({
            color: 0xFF00FF,
        });

        //create mesh
        var mesh = new THREE.Mesh(geometry, material);

        // make mesh component;
        var meshEntity = new Onigiri.Mesh({
            name: settings.name || 'onigiriPrimitive',
            family: settings.family,
            mesh: mesh,
            position: settings.position,
            euler: settings.euler,
            scale: settings.scale,
            disposeGeometry: Utils.getDefault(settings.disposeGeometry, true),
            disposeMaterial: Utils.getDefault(settings.disposeMaterial, true),
            castShadow: Utils.getDefault(settings.castShadow, false),
            receiveShadow: Utils.getDefault(settings.receiveShadow, false),
            components: settings.components
        });
        return meshEntity;
    };
    console.log("Onigiri: added Onigiri.Primitive");
});