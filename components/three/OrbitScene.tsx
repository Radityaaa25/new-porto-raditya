"use client";

import { useEffect, useRef } from "react";
import { Camera, Color, Mesh, Program, Renderer, Torus, Transform, Vec3 } from "ogl";

const vertex = `
attribute vec3 position;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragment = `
precision highp float;
uniform vec3 uColor;
uniform float uOpacity;
void main() {
  gl_FragColor = vec4(uColor, uOpacity);
}
`;

export default function OrbitScene() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const cores = navigator.hardwareConcurrency ?? 8;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
    if (cores <= 4 || memory <= 4) return;

    const renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(devicePixelRatio, 2) });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    host.appendChild(gl.canvas);

    const camera = new Camera(gl, { fov: 38, near: 0.1, far: 20 });
    camera.position.set(0, 0, 3.4);

    const scene = new Transform();
    const geometry = new Torus(gl, { radius: 0.92, tube: 0.16, radialSegments: 18, tubularSegments: 96 });
    const program = new Program(gl, {
      vertex,
      fragment,
      transparent: true,
      depthTest: true,
      uniforms: {
        uColor: { value: new Vec3(0.752, 0.996, 0.015) },
        uOpacity: { value: 0.5 },
      },
    });
    const mesh = new Mesh(gl, { geometry, program, mode: gl.LINES });
    const index = geometry.attributes.index?.data as Uint16Array | undefined;
    if (index) {
      const lines: number[] = [];
      for (let i = 0; i < index.length; i += 3) {
        lines.push(index[i], index[i + 1], index[i + 1], index[i + 2], index[i + 2], index[i]);
      }
      geometry.setIndex({ data: new Uint16Array(lines), size: 1 });
    }
    scene.addChild(mesh);

    const ring = new Mesh(gl, {
      geometry: new Torus(gl, { radius: 1.42, tube: 0.0025, radialSegments: 6, tubularSegments: 120 }),
      program,
      mode: gl.LINES,
    });
    const ringIndex = ring.geometry.attributes.index?.data as Uint16Array | undefined;
    if (ringIndex) {
      const lines: number[] = [];
      for (let i = 0; i < ringIndex.length; i += 3) {
        lines.push(ringIndex[i], ringIndex[i + 1]);
      }
      ring.geometry.setIndex({ data: new Uint16Array(lines), size: 1 });
    }
    ring.rotation.x = Math.PI / 2.6;
    scene.addChild(ring);

    const pointer = { x: 0, y: 0 };
    const onPointer = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      renderer.setSize(Math.max(1, bounds.width), Math.max(1, bounds.height));
      camera.perspective({ aspect: bounds.width / Math.max(1, bounds.height) });
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host);

    let frame = 0;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(host);

    const clock = { value: 0 };
    const render = () => {
      frame = requestAnimationFrame(render);
      if (!visible) return;
      clock.value += 0.006;
      const scroll = window.scrollY / Math.max(1, window.innerHeight);
      mesh.rotation.x += (pointer.y * 0.45 - mesh.rotation.x) * 0.04;
      mesh.rotation.y += (pointer.x * 0.6 + clock.value * 0.18 - mesh.rotation.y) * 0.04;
      mesh.position.y = Math.sin(clock.value) * 0.04;
      ring.rotation.z = clock.value * 0.16 + scroll * 0.4;
      renderer.render({ scene, camera });
    };
    render();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      renderer.gl.getExtension("WEBGL_lose_context")?.loseContext();
      gl.canvas.remove();
    };
  }, []);

  return <div ref={hostRef} className="absolute inset-0 h-full w-full [&_canvas]:h-full [&_canvas]:w-full" />;
}
