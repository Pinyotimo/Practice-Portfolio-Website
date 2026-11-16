/* ==========================================================================
   HeroScene — the WebGL layer under the hero.
   A field of instanced tiles on a 3D floor, lit by the theme's accent, that
   turns toward the pointer. Purely decorative: the DOM hero beside it carries
   every word, and a CSS fallback renders the same composition without WebGL.
   ========================================================================== */

import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, Float } from '@react-three/drei';
import * as THREE from 'three';
import useSceneTheme from '../../lib/useSceneTheme';
import { usePrefersReducedMotion, useDeviceHints } from '../../hooks/useDeviceHints';

/* Module-scope temporaries — never allocate inside useFrame. */
const dummy = new THREE.Object3D();
const color = new THREE.Color();

function hexOr(value, fallback) {
  return value || fallback;
}

/* ------------------------------------------------------------------ */
/* The tile field                                                      */
/* ------------------------------------------------------------------ */

function TileField({ theme, count, reduced, onScreenRef }) {
  const meshRef = useRef(null);
  const groupRef = useRef(null);

  const tiles = useMemo(() => {
    const rng = (n) => {
      const x = Math.sin(n * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };
    const cols = Math.ceil(Math.sqrt(count));
    return Array.from({ length: count }, (_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      return {
        x: (col - cols / 2) * 1.18,
        z: (row - cols / 2) * 1.18,
        height: 0.25 + rng(i + 1) * 1.9,
        phase: rng(i + 7) * Math.PI * 2,
        speed: 0.35 + rng(i + 3) * 0.6,
        tint: rng(i + 11),
      };
    });
  }, [count]);

  const palette = useMemo(
    () => ({
      bg: hexOr(theme.bg, '#f1f0ec'),
      surface: hexOr(theme.surface, '#ffffff'),
      accent: hexOr(theme.accent, '#2954a6'),
      rust: hexOr(theme.rust, '#c1531e'),
      chart3: hexOr(theme.chart3, '#199e70'),
      line: hexOr(theme.line, '#d9d6cd'),
    }),
    [theme],
  );

  /* Write the static per-instance colours once per palette change. */
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    for (let i = 0; i < tiles.length; i += 1) {
      const tile = tiles[i];
      const roll = tile.tint;
      if (roll > 0.9) color.set(palette.accent);
      else if (roll > 0.82) color.set(palette.rust);
      else if (roll > 0.74) color.set(palette.chart3);
      else color.set(palette.surface).lerp(new THREE.Color(palette.line), 0.55 + roll * 0.3);
      mesh.setColorAt(i, color);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [palette, tiles]);

  /* Idle motion: tiles breathe; the field leans toward the pointer.
     The loop stops when the hero scrolls away, so a backgrounded section
     costs nothing — and nothing animates under reduced motion. */
  useFrame(({ clock, pointer }, delta) => {
    const group = groupRef.current;
    const mesh = meshRef.current;
    if (!group || !mesh) return;

    if (reduced || onScreenRef.current === false) {
      for (let i = 0; i < tiles.length; i += 1) {
        const tile = tiles[i];
        dummy.position.set(tile.x, tile.height / 2, tile.z);
        dummy.scale.set(1, tile.height, 1);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
      return;
    }

    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, pointer.x * 0.16, 2.4, delta);
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, -pointer.y * 0.1, 2.4, delta);

    const t = clock.elapsedTime;
    for (let i = 0; i < tiles.length; i += 1) {
      const tile = tiles[i];
      const lift = Math.sin(t * tile.speed + tile.phase) * 0.16;
      dummy.position.set(tile.x, tile.height / 2 + lift, tile.z);
      dummy.scale.set(1, tile.height + lift * 0.6, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={groupRef} rotation={[0.5, 0, 0]} position={[0, -0.6, 0]}>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, tiles.length]}
        count={tiles.length}
        frustumCulled={false}
        castShadow={false}
        receiveShadow={false}
      >
        <boxGeometry args={[0.96, 1, 0.96]} />
        <meshStandardMaterial
          color={palette.surface}
          roughness={0.62}
          metalness={0.08}
          envMapIntensity={0.7}
        />
      </instancedMesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Floating accent solids                                              */
/* ------------------------------------------------------------------ */

function AccentSolids({ theme, reduced, cheap }) {
  const groupRef = useRef(null);
  const palette = useMemo(
    () => ({
      accent: hexOr(theme.accent, '#2954a6'),
      rust: hexOr(theme.rust, '#c1531e'),
      chart3: hexOr(theme.chart3, '#199e70'),
    }),
    [theme],
  );

  useFrame(({ clock }, delta) => {
    const group = groupRef.current;
    if (!group || reduced) return;
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, clock.elapsedTime * 0.05, 1.2, delta);
  });

  if (cheap) return null;

  return (
    <group ref={groupRef}>
      <Float speed={reduced ? 0 : 1.4} rotationIntensity={0.5} floatIntensity={1.1}>
        <mesh position={[-4.6, 1.5, -1.6]}>
          <icosahedronGeometry args={[0.85, 0]} />
          <meshStandardMaterial color={palette.accent} roughness={0.35} metalness={0.25} flatShading />
        </mesh>
      </Float>

      <Float speed={reduced ? 0 : 1.1} rotationIntensity={0.7} floatIntensity={0.9}>
        <mesh position={[4.9, 2.1, -2.4]}>
          <torusGeometry args={[0.7, 0.22, 12, 32]} />
          <meshStandardMaterial color={palette.rust} roughness={0.4} metalness={0.2} />
        </mesh>
      </Float>

      <Float speed={reduced ? 0 : 1.8} rotationIntensity={0.4} floatIntensity={1.3}>
        <mesh position={[2.2, 0.6, 1.4]}>
          <octahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial color={palette.chart3} roughness={0.3} metalness={0.3} flatShading />
        </mesh>
      </Float>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Lights + environment                                                */
/* ------------------------------------------------------------------ */

function SceneLights({ theme }) {
  const key = theme.key;
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 4]} intensity={1.5} color={theme.ink} />
      <directionalLight position={[-6, 3, -4]} intensity={0.6} color={theme.accent} />
      {/* Offline environment: a virtual scene baked to a cubemap, no HDR fetch. */}
      <Environment key={key} resolution={128} frames={1}>
        <Lightformer
          intensity={2}
          position={[0, 6, 0]}
          rotation-x={Math.PI / 2}
          scale={[12, 12, 1]}
          color={theme.surface}
        />
        <Lightformer
          intensity={1.6}
          position={[-6, 2, 2]}
          rotation-y={Math.PI / 2}
          scale={[8, 4, 1]}
          color={theme.accent}
        />
        <Lightformer
          intensity={1}
          position={[6, 3, -2]}
          rotation-y={-Math.PI / 2}
          scale={[8, 4, 1]}
          color={theme.rust}
        />
      </Environment>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Camera rig                                                          */
/* ------------------------------------------------------------------ */

function CameraRig({ reduced, onScreenRef }) {
  /* The camera is Three's object, not React state: it is positioned from the
     stage size in an effect and steered by the pointer inside the frame loop,
     which is the only place a per-frame mutation belongs. */
  const { camera, size } = useThree();
  const home = useRef({ x: 0, y: 6.2, z: 11.5 });

  useEffect(() => {
    const aspect = size.width / size.height;
    // Pull back on narrow viewports so the whole field stays in frame.
    home.current = {
      x: 0,
      y: 6.2,
      z: aspect < 0.9 ? 17 : aspect < 1.4 ? 13.5 : 11.5,
    };
    camera.position.set(home.current.x, home.current.y, home.current.z);
    camera.lookAt(0, -0.5, 0);
    camera.fov = 42;
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height]);

  useFrame(({ pointer }, delta) => {
    if (reduced || onScreenRef.current === false) return;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, home.current.x + pointer.x * 0.6, 1.6, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, home.current.y + pointer.y * 0.4, 1.6, delta);
    camera.lookAt(0, -0.5, 0);
  });

  return null;
}

/* ------------------------------------------------------------------ */
/* The canvas                                                          */
/* ------------------------------------------------------------------ */

export default function HeroScene() {
  const theme = useSceneTheme();
  const reduced = usePrefersReducedMotion();
  const { narrow, coarse } = useDeviceHints();

  const count = narrow ? 90 : 220;
  const cheap = narrow || coarse;

  /* Pause the render loop when the hero is off screen. A WebGL canvas keeps
     compositing even when the section is far below the fold, so the canvas
     itself reports visibility and the loop only runs while it is needed. */
  const onScreenRef = useRef(true);
  useEffect(() => {
    const node = document.querySelector('.hero-scene');
    if (!node || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreenRef.current = entry.isIntersecting;
      },
      { rootMargin: '120px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="hero-scene" aria-hidden="true">
      <Canvas
        className="hero-scene__canvas"
        dpr={[1, cheap ? 1.5 : 2]}
        camera={{ position: [0, 5.4, 12], fov: 42 }}
        gl={{
          antialias: !cheap,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        frameloop="always"
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
        }}
      >
        <Suspense fallback={null}>
          <SceneLights theme={theme} />
          <TileField theme={theme} count={count} reduced={reduced} cheap={cheap} onScreenRef={onScreenRef} />
          <AccentSolids theme={theme} reduced={reduced} cheap={cheap} />
          <CameraRig reduced={reduced} onScreenRef={onScreenRef} />
        </Suspense>
      </Canvas>
      <div className="hero-scene__scrim" aria-hidden="true" />
    </div>
  );
}
