/* ==========================================================================
   HeroSceneLayer — picks the renderer.
   WebGL when it is available and the visitor has not asked for less motion;
   otherwise the SVG fallback. Both are decorative and aria-hidden.
   ========================================================================== */

import { lazy, Suspense, useState } from 'react';
import HeroSceneFallback from './hero-scene-fallback';
import { usePrefersReducedMotion } from '../../hooks/useDeviceHints';

const HeroScene = lazy(() => import('./hero-scene'));

function webglAvailable() {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl')),
    );
  } catch {
    return false;
  }
}

export default function HeroSceneLayer() {
  const reduced = usePrefersReducedMotion();
  /* WebGL support is a capability of the device, not something that changes:
     read it lazily on first render rather than in an effect. */
  const [canRender] = useState(() => webglAvailable() && !reduced);

  if (!canRender) {
    return <HeroSceneFallback />;
  }

  return (
    <Suspense fallback={<HeroSceneFallback />}>
      <HeroScene />
    </Suspense>
  );
}
