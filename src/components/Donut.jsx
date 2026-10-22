import { useEffect, useRef } from 'react';
import { reducedMotion } from '../lib/scroll';

// Spinning glass torus behind the hero name (technique from shkw-dev.com).
// three.js is imported lazily so it never blocks first paint.
const Donut = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import('three');
      const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js');
      const canvas = canvasRef.current;
      if (disposed || !canvas) return;

      const mobile = window.innerWidth < 768;
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !mobile });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1 : 1.5));

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environmentIntensity = 0.35;

      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 1000);
      camera.position.set(mobile ? 0 : -14, 0, mobile ? 110 : 85);

      const geometry = new THREE.TorusGeometry(10, 5, mobile ? 16 : 24, mobile ? 80 : 130);
      const material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 1,
        metalness: 0,
        roughness: 0,
        ior: 2,
        thickness: 5,
        specularIntensity: 1,
        clearcoat: 1,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.y = 0.6;
      scene.add(mesh);

      const key = new THREE.DirectionalLight(0xffffff, 4);
      key.position.set(0, 2, 3);
      const rim = new THREE.PointLight(0x2b4bff, 900, 0, 1.6);
      rim.position.set(-30, -10, 20);
      scene.add(key, rim, new THREE.AmbientLight(0xffffff, 1.5));

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = canvas.parentElement;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      window.addEventListener('resize', resize);

      const clock = new THREE.Clock();
      let raf = 0;
      let visible = true;
      const frame = () => {
        const dt = Math.min(clock.getDelta(), 0.05);
        mesh.rotation.x += 1.0 * dt * 0.5;
        mesh.rotation.z += 1.8 * dt * 0.5;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(frame);
      };
      const start = () => {
        if (raf || !visible || document.hidden) return;
        clock.getDelta();
        raf = requestAnimationFrame(frame);
      };
      const stop = () => {
        cancelAnimationFrame(raf);
        raf = 0;
      };

      if (reducedMotion()) renderer.render(scene, camera);
      else start();

      // Pause when the hero is offscreen or the tab is hidden.
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !reducedMotion()) start();
        else stop();
      });
      io.observe(canvas);
      const onVis = () => (document.hidden ? stop() : !reducedMotion() && start());
      document.addEventListener('visibilitychange', onVis);

      cleanup = () => {
        stop();
        io.disconnect();
        window.removeEventListener('resize', resize);
        document.removeEventListener('visibilitychange', onVis);
        geometry.dispose();
        material.dispose();
        pmrem.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
};

export default Donut;
