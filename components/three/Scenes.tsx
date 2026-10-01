"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export type SceneKind = "hero" | "build" | "ai" | "brand" | "broadcast" | "enterprise" | "cloud" | "marine" | "growth";

const RED = new THREE.Color("#EC3013");
// With reduced motion the canvas renders once, already "settled" (intro finished).
const REDUCED = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
// Phones render 3D at a lower resolution so scrolling stays smooth.
const TOUCH = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
const now = (state: { clock: THREE.Clock }) => state.clock.elapsedTime + (REDUCED ? 20 : 0);

/* Global pointer (-1..1) so objects react even when the cursor isn't over the canvas. */
const pointer = { x: 0, y: 0 };
if (typeof window !== "undefined") {
  window.addEventListener("pointermove", (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });
}

/* Pull the camera back on tall/narrow canvases so nothing gets cropped. */
function FitCamera({ z }: { z: number }) {
  const { camera, size } = useThree();
  useEffect(() => {
    const aspect = size.width / Math.max(1, size.height);
    camera.position.z = z * Math.max(1, Math.pow(1.05 / aspect, 0.9));
    camera.updateProjectionMatrix();
  }, [camera, size, z]);
  return null;
}

/* Studio reflections without downloading an HDR. */
function Env() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pm = new THREE.PMREMGenerator(gl);
    const tex = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = tex;
    return () => { tex.dispose(); pm.dispose(); scene.environment = null; };
  }, [gl, scene]);
  return null;
}

function useMaterials() {
  return useMemo(() => ({
    white: new THREE.MeshPhysicalMaterial({ color: "#f4f4f4", roughness: 0.22, metalness: 0.05, clearcoat: 1, clearcoatRoughness: 0.15 }),
    dark: new THREE.MeshPhysicalMaterial({ color: "#1a1a1a", roughness: 0.35, metalness: 0.4, clearcoat: 0.6 }),
    red: new THREE.MeshPhysicalMaterial({ color: RED, emissive: RED, emissiveIntensity: 0.35, roughness: 0.25, clearcoat: 1 }),
    line: new THREE.LineBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.28 }),
  }), []);
}

const easeOutBack = (t: number) => { const c1 = 1.7, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };

/* Tilt a group toward the cursor, add scroll spin, and a slow idle drift. */
function useRig(ref: React.RefObject<THREE.Group | null>, { tilt = 0.35, spin = 0.15, scroll = 0.0012 } = {}) {
  useFrame((state, dt) => {
    const g = ref.current; if (!g) return;
    const t = now(state);
    const sy = typeof window !== "undefined" ? window.scrollY : 0;
    const ty = pointer.x * tilt + t * spin + sy * scroll;
    const tx = pointer.y * tilt * 0.6;
    g.rotation.y += (ty - g.rotation.y) * Math.min(1, dt * 3);
    g.rotation.x += (tx - g.rotation.x) * Math.min(1, dt * 3);
    g.position.y = Math.sin(t * 0.9) * 0.08;
  });
}

/* ---------- Hero: the FlyHi stair mark in 3D ---------- */
const STAIR: [number, number][] = [[0, 2], [1, 2], [1, 1], [2, 1], [2, 0]];
function StairHero() {
  const m = useMaterials();
  const geo = useMemo(() => new RoundedBoxGeometry(1, 1, 1, 4, 0.12), []);
  const group = useRef<THREE.Group>(null);
  const cubes = useRef<(THREE.Mesh | null)[]>([]);
  useRig(group, { tilt: 0.5, spin: 0.12, scroll: 0.0016 });
  useFrame((state) => {
    const t = now(state);
    cubes.current.forEach((c, i) => {
      if (!c) return;
      const [col, row] = STAIR[i];
      const p = Math.min(1, Math.max(0, (t - 0.3 - i * 0.16) / 0.9));
      const e = easeOutBack(p);
      const baseY = (1 - row) * 1.12;
      c.position.set((col - 1) * 1.12, baseY + (1 - e) * 4 + Math.sin(t * 1.4 + i) * 0.04, 0);
      c.scale.setScalar(Math.max(0.001, e));
      c.rotation.set((1 - e) * 1.5, (1 - e) * 1.2, 0);
      if (i === 4) {
        (c.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 0.35 + Math.sin(t * 2.2) * 0.15;
        c.position.z = Math.sin(t * 1.1) * 0.12;
      }
    });
  });
  return (
    <group ref={group} rotation={[0.35, -0.6, 0]}>
      {STAIR.map((_, i) => (
        <mesh key={i} ref={(el) => { cubes.current[i] = el; }} geometry={geo} material={i === 4 ? m.red : m.white} />
      ))}
      <Sparks />
    </group>
  );
}

/* Small drifting particles around an object. */
function Sparks({ count = 70, radius = 3.2, color = "#ffffff" }) {
  const pts = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = radius * (0.6 + Math.random() * 0.6), th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
      a.set([r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph), r * Math.sin(ph) * Math.sin(th)], i * 3);
    }
    g.setAttribute("position", new THREE.BufferAttribute(a, 3));
    return g;
  }, [count, radius]);
  useFrame((_, dt) => { if (pts.current) pts.current.rotation.y -= dt * 0.05; });
  return (
    <points ref={pts} geometry={geo}>
      <pointsMaterial color={color} size={0.035} sizeAttenuation transparent opacity={0.7} />
    </points>
  );
}

/* ---------- Build: layered browser panels ---------- */
function BuildScene() {
  const m = useMaterials();
  const group = useRef<THREE.Group>(null);
  const panels = useRef<(THREE.Group | null)[]>([]);
  const panel = useMemo(() => new RoundedBoxGeometry(3, 2, 0.08, 4, 0.06), []);
  const bar = useMemo(() => new RoundedBoxGeometry(1, 0.12, 0.04, 2, 0.03), []);
  const dot = useMemo(() => new THREE.SphereGeometry(0.06, 16, 16), []);
  const cursor = useRef<THREE.Mesh>(null);
  useRig(group, { tilt: 0.4, spin: 0.08 });
  useFrame((state) => {
    const t = now(state);
    panels.current.forEach((p, i) => { if (p) p.position.z = -i * 0.55 + Math.sin(t * 1.2 + i) * 0.08; });
    if (cursor.current) cursor.current.position.set(Math.sin(t * 0.9) * 1.1, Math.cos(t * 1.3) * 0.5, 0.4);
  });
  return (
    <group ref={group} rotation={[0.2, -0.5, 0]}>
      {[0, 1, 2].map((i) => (
        <group key={i} ref={(el) => { panels.current[i] = el; }} position={[i * 0.35, i * 0.3, -i * 0.55]}>
          <mesh geometry={panel} material={i === 0 ? m.white : m.dark} />
          {i === 0 && (
            <>
              {[0, 1, 2].map((d) => <mesh key={d} geometry={dot} material={d === 0 ? m.red : m.dark} position={[-1.3 + d * 0.2, 0.8, 0.06]} />)}
              {[0.35, 0.05, -0.25, -0.55].map((y, k) => (
                <mesh key={k} geometry={bar} material={k === 1 ? m.red : m.dark} position={[-0.6 + (k % 2) * 0.2, y, 0.06]} scale={[1.6 - k * 0.25, 1, 1]} />
              ))}
            </>
          )}
        </group>
      ))}
      <mesh ref={cursor} material={m.red}><boxGeometry args={[0.18, 0.18, 0.18]} /></mesh>
    </group>
  );
}

/* ---------- AI: a neural network ---------- */
function AIScene() {
  const m = useMaterials();
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const { nodes, lines } = useMemo(() => {
    const ico = new THREE.IcosahedronGeometry(2, 1);
    const pos = ico.getAttribute("position");
    const uniq: THREE.Vector3[] = [];
    for (let i = 0; i < pos.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(pos, i);
      if (!uniq.some((u) => u.distanceTo(v) < 0.01)) uniq.push(v);
    }
    const seg: number[] = [];
    uniq.forEach((a, i) => uniq.forEach((b, j) => { if (j > i && a.distanceTo(b) < 1.3) seg.push(a.x, a.y, a.z, b.x, b.y, b.z); }));
    uniq.forEach((a, i) => { if (i % 3 === 0) seg.push(0, 0, 0, a.x, a.y, a.z); });
    const lg = new THREE.BufferGeometry();
    lg.setAttribute("position", new THREE.Float32BufferAttribute(seg, 3));
    return { nodes: uniq, lines: lg };
  }, []);
  const sphere = useMemo(() => new THREE.SphereGeometry(0.09, 16, 16), []);
  const pulses = useRef<(THREE.Mesh | null)[]>([]);
  useRig(group, { tilt: 0.45, spin: 0.18 });
  useFrame((state) => {
    const t = now(state);
    if (core.current) core.current.scale.setScalar(1 + Math.sin(t * 2.4) * 0.08);
    pulses.current.forEach((p, i) => {
      if (!p) return;
      const target = nodes[(i * 5) % nodes.length];
      const k = (t * 0.6 + i * 0.37) % 1;
      p.position.copy(target).multiplyScalar(k);
    });
  });
  return (
    <group ref={group}>
      <lineSegments geometry={lines} material={m.line} />
      {nodes.map((n, i) => <mesh key={i} geometry={sphere} material={i % 7 === 0 ? m.red : m.white} position={n} />)}
      <mesh ref={core} material={m.red}><icosahedronGeometry args={[0.45, 2]} /></mesh>
      {Array.from({ length: 8 }, (_, i) => (
        <mesh key={i} ref={(el) => { pulses.current[i] = el; }} geometry={sphere} material={m.red} scale={0.6} />
      ))}
    </group>
  );
}

/* ---------- Brand: glossy forms orbiting a core ---------- */
function BrandScene() {
  const m = useMaterials();
  const group = useRef<THREE.Group>(null);
  const orbit = useRef<THREE.Group>(null);
  const knot = useRef<THREE.Mesh>(null);
  const cube = useMemo(() => new RoundedBoxGeometry(0.7, 0.7, 0.7, 4, 0.1), []);
  useRig(group, { tilt: 0.4, spin: 0.05 });
  useFrame((state, dt) => {
    if (orbit.current) orbit.current.rotation.y += dt * 0.6;
    if (knot.current) { knot.current.rotation.x += dt * 0.3; knot.current.rotation.y += dt * 0.45; }
  });
  return (
    <group ref={group}>
      <mesh ref={knot} material={m.white}><torusKnotGeometry args={[0.78, 0.25, 160, 24]} /></mesh>
      <group ref={orbit} rotation={[0.35, 0, 0.1]}>
        <mesh geometry={cube} material={m.red} position={[1.85, 0, 0]} />
        <mesh material={m.white} position={[-1.85, 0.3, 0]}><sphereGeometry args={[0.38, 32, 32]} /></mesh>
        <mesh material={m.dark} position={[0, -0.2, 1.85]}><coneGeometry args={[0.36, 0.7, 32]} /></mesh>
        <mesh material={m.white} position={[0, 0.2, -1.85]}><torusGeometry args={[0.3, 0.1, 16, 48]} /></mesh>
      </group>
      <Sparks count={50} radius={3} />
    </group>
  );
}

/* ---------- Broadcast: a live signal ---------- */
function BroadcastScene() {
  const m = useMaterials();
  const group = useRef<THREE.Group>(null);
  const rings = useRef<(THREE.Mesh | null)[]>([]);
  const ringMats = useMemo(() => [0, 1, 2, 3].map(() => new THREE.MeshBasicMaterial({ color: RED, transparent: true, side: THREE.DoubleSide })), []);
  const core = useRef<THREE.Mesh>(null);
  useRig(group, { tilt: 0.45, spin: 0.1 });
  useFrame((state) => {
    const t = now(state);
    rings.current.forEach((r, i) => {
      if (!r) return;
      const k = (t * 0.45 + i / 4) % 1;
      r.scale.setScalar(0.6 + k * 1.9);
      ringMats[i].opacity = (1 - k) * 0.85;
    });
    if (core.current) core.current.scale.setScalar(1 + Math.sin(t * 3) * 0.06);
  });
  return (
    <group ref={group} rotation={[0.9, 0, 0]}>
      <mesh ref={core} material={m.red}><sphereGeometry args={[0.55, 48, 48]} /></mesh>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} ref={(el) => { rings.current[i] = el; }} material={ringMats[i]}>
          <ringGeometry args={[0.95, 1, 96]} />
        </mesh>
      ))}
      <mesh material={m.white} position={[0, 0, -0.9]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.07, 0.07, 1.4, 16]} /></mesh>
      <mesh material={m.dark} position={[0, 0, -1.65]}><cylinderGeometry args={[0.7, 0.7, 0.12, 48]} /></mesh>
    </group>
  );
}

/* ---------- Enterprise: a data grid in motion ---------- */
function EnterpriseScene() {
  const m = useMaterials();
  const group = useRef<THREE.Group>(null);
  const geo = useMemo(() => new RoundedBoxGeometry(0.62, 0.62, 0.62, 3, 0.08), []);
  const cells = useRef<(THREE.Mesh | null)[]>([]);
  const N = 4;
  useRig(group, { tilt: 0.35, spin: 0.08 });
  useFrame((state) => {
    const t = now(state);
    cells.current.forEach((c, i) => {
      if (!c) return;
      const x = i % N, z = Math.floor(i / N);
      c.position.y = Math.sin(t * 1.6 - (x + z) * 0.6) * 0.35;
    });
  });
  return (
    <group ref={group} rotation={[0.75, 0.6, 0]}>
      {Array.from({ length: N * N }, (_, i) => {
        const x = i % N, z = Math.floor(i / N);
        return <mesh key={i} ref={(el) => { cells.current[i] = el; }} geometry={geo}
          material={i === 6 ? m.red : (x + z) % 3 === 0 ? m.dark : m.white}
          position={[(x - (N - 1) / 2) * 0.72, 0, (z - (N - 1) / 2) * 0.72]} />;
      })}
    </group>
  );
}

/* ---------- Cloud: an exploded server stack with data flowing through it ---------- */
const LED_ON = new THREE.Color("#EC3013"), LED_OFF = new THREE.Color("#333333");
function CloudScene() {
  const m = useMaterials();
  const group = useRef<THREE.Group>(null);
  const slab = useMemo(() => new RoundedBoxGeometry(2.4, 0.4, 1.5, 4, 0.08), []);
  const led = useMemo(() => new THREE.SphereGeometry(0.05, 12, 12), []);
  const packet = useMemo(() => new RoundedBoxGeometry(0.13, 0.13, 0.13, 2, 0.03), []);
  const ledMats = useMemo(() => [0, 1, 2, 3].map(() => new THREE.MeshBasicMaterial({ color: LED_ON.clone() })), []);
  const slabs = useRef<(THREE.Group | null)[]>([]);
  const packets = useRef<(THREE.Mesh | null)[]>([]);
  const ring = useRef<THREE.Mesh>(null);
  useRig(group, { tilt: 0.4, spin: 0.1 });
  useFrame((state, dt) => {
    const t = now(state);
    const spread = 0.62 + Math.sin(t * 0.8) * 0.1;
    slabs.current.forEach((g, i) => {
      if (!g) return;
      const e = easeOutBack(Math.min(1, Math.max(0, (t - 0.2 - i * 0.15) / 0.8)));
      g.position.y = (i - 1.5) * spread + (1 - e) * 3;
      g.scale.setScalar(Math.max(0.001, e));
    });
    ledMats.forEach((mm, i) => mm.color.copy(Math.sin(t * 5 + i * 1.9) > -0.2 ? LED_ON : LED_OFF));
    packets.current.forEach((p, i) => {
      if (!p) return;
      const k = (t * 0.35 + i / packets.current.length) % 1;
      p.position.set([-0.7, 0, 0.7][i % 3], -2 + k * 4, 0.95);
      p.scale.setScalar(Math.sin(k * Math.PI));
    });
    if (ring.current) ring.current.rotation.z += dt * 0.25;
  });
  return (
    <group ref={group} rotation={[0.3, -0.6, 0]}>
      {[0, 1, 2, 3].map((i) => (
        <group key={i} ref={(el) => { slabs.current[i] = el; }}>
          <mesh geometry={slab} material={i === 3 ? m.red : i % 2 ? m.dark : m.white} />
          {[0, 1, 2].map((d) => <mesh key={d} geometry={led} material={d === 0 ? ledMats[i] : m.dark} position={[0.75 + d * 0.18, 0, 0.76]} />)}
          <mesh material={m.dark} position={[-0.55, 0, 0.76]}><boxGeometry args={[0.9, 0.08, 0.02]} /></mesh>
        </group>
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <mesh key={i} ref={(el) => { packets.current[i] = el; }} geometry={packet} material={i % 3 === 1 ? m.red : m.white} />
      ))}
      <mesh ref={ring} material={m.line} rotation={[Math.PI / 2.2, 0, 0]}><torusGeometry args={[2.3, 0.008, 8, 128]} /></mesh>
      <Sparks count={60} radius={3} />
    </group>
  );
}

/* ---------- Marine: a container ship riding a point-cloud sea ---------- */
function MarineScene() {
  const m = useMaterials();
  const group = useRef<THREE.Group>(null);
  const ship = useRef<THREE.Group>(null);
  const sea = useMemo(() => {
    const g = new THREE.PlaneGeometry(9, 9, 44, 44);
    g.rotateX(-Math.PI / 2);
    return g;
  }, []);
  const base = useMemo(() => Float32Array.from(sea.getAttribute("position").array as Float32Array), [sea]);
  const hull = useMemo(() => new RoundedBoxGeometry(2.6, 0.42, 0.8, 4, 0.1), []);
  const box = useMemo(() => new RoundedBoxGeometry(0.34, 0.26, 0.3, 2, 0.03), []);
  const wave = (x: number, z: number, t: number) => Math.sin(x * 0.9 + t * 1.3) * 0.16 + Math.cos(z * 1.1 + t * 0.9) * 0.12;
  useRig(group, { tilt: 0.25, spin: 0.04, scroll: 0.0006 });
  useFrame((state) => {
    const t = now(state);
    const pos = sea.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = base[i * 3], z = base[i * 3 + 2];
      pos.setY(i, wave(x, z, t));
    }
    pos.needsUpdate = true;
    if (ship.current) {
      const intro = easeOutBack(Math.min(1, Math.max(0, (t - 0.3) / 1.1)));
      ship.current.position.y = wave(0, 0, t) + 0.3 + (1 - intro) * 2.5;
      ship.current.rotation.z = Math.sin(t * 1.1) * 0.05;
      ship.current.rotation.x = Math.cos(t * 0.9) * 0.04;
      ship.current.scale.setScalar(Math.max(0.001, intro) * 1.25);
    }
  });
  return (
    <group rotation={[0.55, 0, 0]} scale={1.15}>
    <group ref={group}>
      <points geometry={sea}>
        <pointsMaterial color="#ffffff" size={0.04} sizeAttenuation transparent opacity={0.6} />
      </points>
      <group ref={ship}>
        <mesh geometry={hull} material={m.dark} />
        <mesh material={m.red} position={[0, -0.16, 0]}><boxGeometry args={[2.5, 0.09, 0.82]} /></mesh>
        {Array.from({ length: 10 }, (_, i) => {
          const col = i % 5, row = Math.floor(i / 5);
          return <mesh key={i} geometry={box} material={(col + row) % 4 === 1 ? m.red : m.white} position={[-0.25 + col * 0.36, 0.34 + row * 0.27, 0]} />;
        })}
        <mesh material={m.white} position={[-0.95, 0.52, 0]}><boxGeometry args={[0.36, 0.64, 0.66]} /></mesh>
        <mesh material={m.dark} position={[-0.95, 0.74, 0]}><boxGeometry args={[0.4, 0.08, 0.8]} /></mesh>
        <mesh material={m.red} position={[-1.12, 0.95, 0]}><cylinderGeometry args={[0.07, 0.08, 0.36, 16]} /></mesh>
      </group>
    </group>
    </group>
  );
}

/* ---------- Growth: bars rising with a trend line ---------- */
const HEIGHTS = [0.8, 1.25, 1.05, 1.85, 2.7];
function GrowthScene() {
  const m = useMaterials();
  const group = useRef<THREE.Group>(null);
  const bar = useMemo(() => new RoundedBoxGeometry(0.5, 1, 0.5, 3, 0.06), []);
  const bars = useRef<(THREE.Mesh | null)[]>([]);
  const dot = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => new THREE.CatmullRomCurve3(HEIGHTS.map((h, i) => new THREE.Vector3((i - 2) * 0.72, -1.2 + h + 0.35, 0))), []);
  const tube = useMemo(() => new THREE.TubeGeometry(curve, 80, 0.025, 8, false), [curve]);
  const tubeMat = useMemo(() => new THREE.MeshBasicMaterial({ color: "#ffffff" }), []);
  useRig(group, { tilt: 0.4, spin: 0.08 });
  useFrame((state) => {
    const t = now(state);
    bars.current.forEach((b, i) => {
      if (!b) return;
      const e = easeOutBack(Math.min(1, Math.max(0, (t - 0.3 - i * 0.14) / 0.9)));
      const h = Math.max(0.001, HEIGHTS[i] * e * (1 + Math.sin(t * 1.4 + i) * 0.04));
      b.scale.y = h;
      b.position.y = -1.2 + h / 2;
    });
    tube.setDrawRange(0, Math.floor(Math.min(1, Math.max(0, (t - 1) / 1.2)) * (tube.index?.count ?? 0)));
    if (dot.current) dot.current.position.copy(curve.getPointAt(((t * 0.18) % 1)));
  });
  return (
    <group ref={group} rotation={[0.25, -0.55, 0]}>
      {HEIGHTS.map((_, i) => (
        <mesh key={i} ref={(el) => { bars.current[i] = el; }} geometry={bar} material={i === 4 ? m.red : i % 2 ? m.dark : m.white} position={[(i - 2) * 0.72, -1.2, 0]} />
      ))}
      <mesh material={m.dark} position={[0, -1.26, 0]}><boxGeometry args={[4.2, 0.08, 1.3]} /></mesh>
      <mesh geometry={tube} material={tubeMat} />
      <mesh ref={dot} material={m.red}><sphereGeometry args={[0.1, 24, 24]} /></mesh>
      <Sparks count={45} radius={3} />
    </group>
  );
}

const CAM: Record<SceneKind, number> = { hero: 8.6, build: 7, ai: 7.4, brand: 9.2, broadcast: 7.6, enterprise: 6.7, cloud: 8.2, marine: 8.8, growth: 7.8 };

const MAP: Record<SceneKind, () => React.JSX.Element> = {
  hero: StairHero, build: BuildScene, ai: AIScene, brand: BrandScene, broadcast: BroadcastScene, enterprise: EnterpriseScene,
  cloud: CloudScene, marine: MarineScene, growth: GrowthScene,
};

export default function Scene({ kind, active }: { kind: SceneKind; active: boolean }) {
  const Obj = MAP[kind];
  return (
    <Canvas
      frameloop={active ? "always" : "demand"}
      dpr={TOUCH ? [1, 1.3] : [1, 1.75]}
      camera={{ position: [0, 0, CAM[kind]], fov: 35 }}
      gl={{ antialias: !TOUCH, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      aria-hidden="true"
    >
      <Env />
      <FitCamera z={CAM[kind]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} />
      <pointLight position={[-4, -2, 3]} intensity={18} color="#EC3013" distance={14} />
      <Obj />
    </Canvas>
  );
}
