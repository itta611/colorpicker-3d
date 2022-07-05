import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Box } from '@chakra-ui/react';
import { useState, useRef, createRef, useEffect } from 'react';

function ColorCubes() {
  const refContainer = useRef();

  useEffect(() => {
    const { current: container } = refContainer;
    const scW = container.clientWidth;
    const scH = container.clientHeight;
    const target = new THREE.Vector3(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(scW, scH);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(-scW / 2, scW / 2, scH / 2, -scH / 2, 1, 1000);
    camera.position.copy(new THREE.Vector3(-0.5, 1.2, 0));
    camera.lookAt(target);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target = target;

    let cubes = [];
    for (let x = 0; x < 6; x++) {
      cubes.push([]);
      for (let y = 0; y < 6; y++) {
        cubes[x].push([]);
        for (let z = 0; z < 6; z++) {
          const cube = new THREE.Mesh(
            new THREE.BoxGeometry(10, 10, 10),
            new THREE.MeshBasicMaterial({
              color: (0xff / 5) * x * 0x10000 + (0xff / 5) * y * 0x100 + (0xff / 5) * z,
            })
          );
          console.log((0xff / 6) * x);
          cube.position.x = x * 15 - 30;
          cube.position.y = y * 15 - 30;
          cube.position.z = z * 15 - 30;
          cubes[x][y].push(cube);
          scene.add(cube);
        }
      }
    }

    let req = null;

    const animate = () => {
      req = requestAnimationFrame(animate);
      renderer.render(scene, camera);
      controls.update();
    };
    animate();
    return () => cancelAnimationFrame(req);
  }, []);
  return <Box h="xs" ref={refContainer} />;
}

export default ColorCubes;
