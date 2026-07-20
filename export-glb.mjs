import * as THREE from 'three';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import fs from 'fs';

// Polyfill FileReader for Node.js (Blob is native in Node 24, but FileReader isn't)
if (typeof globalThis.FileReader === 'undefined') {
  globalThis.FileReader = class FileReader {
    constructor() { this.result = null; this.onloadend = null; }
    readAsArrayBuffer(blob) {
      blob.arrayBuffer().then(buf => {
        this.result = buf;
        if (this.onloadend) this.onloadend();
      });
    }
    readAsDataURL(blob) {
      blob.arrayBuffer().then(buf => {
        const mime = blob.type || 'application/octet-stream';
        const b64 = Buffer.from(buf).toString('base64');
        this.result = 'data:' + mime + ';base64,' + b64;
        if (this.onloadend) this.onloadend();
      });
    }
  };
}

const scene = new THREE.Scene();
const RW = 20, RD = 16, RH = 4.2;

function M(c) { return new THREE.MeshStandardMaterial({ color: c, roughness: 0.5, metalness: 0.0 }); }
function MG(c) { return new THREE.MeshStandardMaterial({ color: c, roughness: 0.3, metalness: 0.6 }); }
function MB(c) { return new THREE.MeshBasicMaterial({ color: c }); }
function MGlass(c) { return new THREE.MeshStandardMaterial({ color: c, roughness: 0.1, metalness: 0.0, transparent: true, opacity: 0.3 }); }

// Structure
const mFl = M(0xA07848), mFl2 = M(0x886030);
const mWl = M(0xD8D0C4), mCl = M(0xE8E8E8);
const mTr = M(0x5C3218), mTr2 = M(0x3D2010);
const mWd = M(0xB88830), mWd2 = M(0x7A4E20);
const mSt = MG(0x333333), mSt2 = MG(0x888888);
const mPl = M(0xBBBBBB), mPk = M(0x555555), mBk = M(0x1A1A1A), mRb = M(0x222222);
const mSc = M(0x0A1628), mScOn = MB(0x1560A0);
const mPCB = M(0x1A6030), mBrd = M(0xE8E0D0), mIC = M(0x0C0C0C);
const mR = MB(0xFF2222), mBl = MB(0x2266FF), mY = MB(0xDDCC00), mG = MB(0x22BB44), mW = MB(0xDDDDDD), mK = MB(0x111111);
const mNav = M(0x1E3050);
const mLens = MGlass(0x5AA8C8);

function bx(x, y, z, sx, sy, sz, mat) {
  const o = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
  o.position.set(x, y, z); scene.add(o); return o;
}
function cy(x, y, z, r, h, mat, seg) {
  const o = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, seg || 16), mat);
  o.position.set(x, y, z); scene.add(o); return o;
}
function sp(x, y, z, r, mat) {
  const o = new THREE.Mesh(new THREE.SphereGeometry(r, 8, 6), mat);
  o.position.set(x, y, z); scene.add(o); return o;
}

// ===================== ROOM =====================
const floorGeo = new THREE.PlaneGeometry(RW, RD);
floorGeo.rotateX(-Math.PI / 2);
scene.add(new THREE.Mesh(floorGeo, mFl));
for (let i = -RW / 2 + 0.5; i < RW / 2; i += 1.0) bx(i, 0.003, 0, 0.01, 0.005, RD, mFl2);
for (let i = -RD / 2 + 0.7; i < RD / 2; i += 1.4) bx(0, 0.003, i, RW, 0.005, 0.01, mFl2);

const ceilGeo = new THREE.PlaneGeometry(RW, RD);
ceilGeo.rotateX(Math.PI / 2);
const ceilMesh = new THREE.Mesh(ceilGeo, mCl);
ceilMesh.position.y = RH;
scene.add(ceilMesh);

bx(0, RH / 2, -RD / 2, RW, RH, 0.12, mWl);
bx(0, RH / 2, RD / 2, RW, RH, 0.12, mWl);
bx(-RW / 2, RH / 2, 0, 0.12, RH, RD, mWl);
bx(RW / 2, RH / 2, 0, 0.12, RH, RD, mWl);

bx(0, 0.05, -RD / 2 + 0.07, RW, 0.1, 0.08, mTr);
bx(0, 0.05, RD / 2 - 0.07, RW, 0.1, 0.08, mTr);
bx(-RW / 2 + 0.07, 0.05, 0, 0.08, 0.1, RD, mTr);
bx(RW / 2 - 0.07, 0.05, 0, 0.08, 0.1, RD, mTr);
bx(0, RH - 0.06, -RD / 2 + 0.06, RW, 0.12, 0.12, mTr);
bx(0, RH - 0.06, RD / 2 - 0.06, RW, 0.12, 0.12, mTr);
bx(-RW / 2 + 0.06, RH - 0.06, 0, 0.12, 0.12, RD, mTr);
bx(RW / 2 - 0.06, RH - 0.06, 0, 0.12, 0.12, RD, mTr);

for (let x = -RW / 2 + 2; x < RW / 2; x += 4) bx(x, RH - 0.015, 0, 0.05, 0.03, RD, mPl);
for (let z = -RD / 2 + 2; z < RD / 2; z += 4) bx(0, RH - 0.015, z, RW, 0.03, 0.05, mPl);

// ===================== WINDOWS =====================
for (let i = 0; i < 3; i++) {
  const wz = -5 + i * 5;
  bx(RW / 2 - 0.05, 2.1, wz, 0.05, 2.6, 2.8, mTr);
  bx(RW / 2 - 0.01, 2.1, wz, 0.01, 2.3, 2.5, mLens);
  bx(RW / 2 + 0.06, 0.7, wz, 0.18, 0.04, 2.9, mTr2);
}

// ===================== DOOR =====================
bx(0, 1.35, RD / 2 - 0.05, 1.2, 2.5, 0.1, mNav);
cy(0.42, 1.1, RD / 2 - 0.01, 0.013, 0.2, mSt2, 8);

// ===================== CEILING LED PANELS =====================
const lps = [];
for (let x = -6; x <= 6; x += 6) for (let z = -6; z <= 6; z += 6) lps.push([x, z]);
lps.forEach(p => {
  bx(p[0], RH - 0.008, p[1], 1.3, 0.02, 0.65, mPl);
  bx(p[0], RH - 0.025, p[1], 1.1, 0.008, 0.5, MB(0xFFF4D0));
});

// ===================== AC UNITS =====================
bx(-RW / 2 + 0.15, 3.1, 4, 0.25, 0.3, 1.0, mPl);
bx(-RW / 2 + 0.06, 3.0, 4, 0.06, 0.06, 0.8, mPk);
bx(-RW / 2 + 0.15, 3.1, 12, 0.25, 0.3, 1.0, mPl);
bx(-RW / 2 + 0.06, 3.0, 12, 0.06, 0.06, 0.8, mPk);

// ===================== CEILING FANS =====================
for (let i = 0; i < 4; i++) {
  const fx = -5 + (i % 2) * 10, fz = -4 + (i >> 1) * 8;
  cy(fx, RH - 0.1, fz, 0.18, 0.2, mSt2, 12);
  cy(fx, RH - 0.01, fz, 0.015, 0.08, mSt2, 6);
  for (let b = 0; b < 4; b++) {
    const a = b * Math.PI / 2;
    const bl = bx(fx + Math.cos(a) * 0.55, RH - 0.22, fz + Math.sin(a) * 0.55, 0.14, 0.75, 0.012, mWd);
    bl.rotation.y = a;
  }
}

// ===================== FIRE EXTINGUISHER =====================
cy(-RW / 2 + 0.4, 0.45, 3, 0.06, 0.8, MB(0xDD1111));
bx(-RW / 2 + 0.4, 0.88, 3, 0.08, 0.04, 0.04, mSt2);

// ===================== EXIT SIGN =====================
bx(-1, RH - 0.35, RD / 2 - 0.08, 0.45, 0.18, 0.04, MB(0x00BB33));

// ===================== CLOCK =====================
cy(RW / 2 - 0.12, 2.8, -5, 0.18, 0.03, MB(0xE0E0E0));

// ===================== CCTV =====================
[[-RW / 2 + 0.4, -RD / 2 + 0.4], [RW / 2 - 0.4, -RD / 2 + 0.4], [-RW / 2 + 0.4, RD / 2 - 0.4], [RW / 2 - 0.4, RD / 2 - 0.4]].forEach(c => {
  bx(c[0], RH - 0.08, c[1], 0.05, 0.1, 0.05, mPl);
  cy(c[0], RH - 0.18, c[1], 0.025, 0.08, mBk, 6);
});

// ===================== CABLE TRAYS =====================
bx(0, RH - 0.1, -6, RW - 2, 0.04, 0.04, mSt);
bx(0, RH - 0.1, 6, RW - 2, 0.04, 0.04, mSt);
bx(-RW / 2 + 0.12, RH / 2, -6, 0.05, 0.7, 0.05, mSt);
bx(-RW / 2 + 0.12, RH / 2, 6, 0.05, 0.7, 0.05, mSt);

// ===================== SWITCHBOARDS =====================
for (let i = 0; i < 3; i++) {
  const sz = -4 + i * 4;
  bx(-RW / 2 + 0.06, 1.2, sz, 0.03, 0.22, 0.18, M(0xD8CDB8));
  bx(-RW / 2 + 0.04, 1.2, sz, 0.02, 0.04, 0.06, M(0xEDE4D4));
  bx(-RW / 2 + 0.04, 1.12, sz, 0.02, 0.04, 0.06, M(0xEDE4D4));
}

// ===================== STORAGE CABINETS =====================
for (let ci = 0; ci < 3; ci++) {
  const cx = -7 + ci * 2.5;
  bx(cx, 1, -RD / 2 + 0.25, 1.9, 1.9, 0.45, mWd2);
  bx(cx, 1, -RD / 2 + 0.03, 1.7, 1.7, 0.02, MGlass(0x99AABB));
  bx(cx, 1.92, -RD / 2 + 0.03, 1.95, 0.03, 0.03, mSt2);
  bx(cx, 0.08, -RD / 2 + 0.03, 1.95, 0.03, 0.03, mSt2);
  bx(cx - 0.97, 1, -RD / 2 + 0.03, 0.03, 1.8, 0.03, mSt2);
  bx(cx + 0.97, 1, -RD / 2 + 0.03, 0.03, 1.8, 0.03, mSt2);
  cy(cx + 0.85, 1, -RD / 2 + 0.02, 0.007, 0.1, mSt2, 6);
  for (let sh = 0; sh < 3; sh++) bx(cx, 0.4 + sh * 0.6, -RD / 2 + 0.25, 1.7, 0.02, 0.4, mWd2);
  for (let bi = 0; bi < 3; bi++) bx(cx - 0.5 + bi * 0.45, 0.43, -RD / 2 + 0.25, 0.3, 0.008, 0.15, mBrd);
  for (let bi = 0; bi < 3; bi++) bx(cx - 0.4 + bi * 0.4, 1.0, -RD / 2 + 0.25, 0.1, 0.015, 0.06, MB(0xBB7722));
  for (let bi = 0; bi < 3; bi++) cy(cx - 0.4 + bi * 0.3, 1.6, -RD / 2 + 0.25, 0.008, 0.07, [mR, mBl, mY][bi], 5);
}

// ===================== WHITEBOARD =====================
bx(RW / 4, 1.9, RD / 2 - 0.08, 3.4, 1.4, 0.04, MB(0xF0F0E8));
bx(RW / 4, 1.9, RD / 2 - 0.08, 3.5, 1.5, 0.02, mSt2);
bx(RW / 4, 1.15, RD / 2 - 0.06, 0.04, 0.03, 0.9, mSt2);

// ===================== POSTERS =====================
const pTitles = [MB(0xCC3333), MB(0x2277CC), MB(0x22AA55), MB(0xDD8800), MB(0x8844CC), MB(0xCC4488), MB(0x22AACC), MB(0xCC6622), MB(0x5544CC), MB(0xAA44CC)];
for (let i = 0; i < 10; i++) {
  const pz = -7 + i * 1.35;
  if (pz > RD / 2 - 1) break;
  bx(-RW / 2 + 0.06, 2.2, pz, 0.04, 0.65, 0.85, mWl);
  bx(-RW / 2 + 0.08, 2.2, pz, 0.02, 0.55, 0.7, pTitles[i]);
  bx(-RW / 2 + 0.095, 2.45, pz, 0.01, 0.12, 0.5, MB(0xF0F0E0));
  bx(-RW / 2 + 0.095, 2.1, pz, 0.01, 0.08, 0.4, MB(0xE0E0D0));
}

// ===================== 8 WORKSTATIONS =====================
const wsP = [];
for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) wsP.push([-6 + c * 4, -3 + r * 6]);
const wireM = [mR, mBl, mY, mG, mR, mBl, mG, mY];

wsP.forEach((wp) => {
  const tx = wp[0], tz = wp[1];
  const tW2 = 3.2, tD2 = 1.3, tH2 = 0.76;

  bx(tx, tH2, tz, tW2, 0.04, tD2, mWd);
  const hw = tW2 / 2 - 0.15, hd = tD2 / 2 - 0.12;
  [tx - hw, tx + hw].forEach(lx => { [tz - hd, tz + hd].forEach(lz => { cy(lx, tH2 / 2, lz, 0.022, tH2, mSt); }); });
  bx(tx, 0.18, tz - hd, tW2 - 0.3, 0.025, 0.025, mSt);
  bx(tx, 0.18, tz + hd, tW2 - 0.3, 0.025, 0.025, mSt);
  bx(tx - hw, 0.18, tz, 0.025, 0.025, tD2 - 0.24, mSt);
  bx(tx + hw, 0.18, tz, 0.025, 0.025, tD2 - 0.24, mSt);
  bx(tx, 0.1, tz, tW2 - 0.5, 0.015, tD2 - 0.3, mSt);
  bx(tx - 0.85, 0.55, tz, 0.3, 0.18, 0.35, mPk);
  bx(tx - 0.85, 0.55, tz + 0.18, 0.03, 0.02, 0.02, mSt2);

  const cz = tz + 1.9;
  bx(tx, 0.42, cz, 0.44, 0.04, 0.44, mBk);
  bx(tx, 0.68, cz + 0.2, 0.42, 0.5, 0.035, mBk);
  cy(tx, 0.22, cz, 0.028, 0.24, mSt);
  cy(tx, 0.035, cz, 0.24, 0.035, mSt);
  for (let w = 0; w < 5; w++) { const a2 = w * Math.PI * 2 / 5; sp(tx + Math.cos(a2) * 0.22, 0.035, cz + Math.sin(a2) * 0.22, 0.022, mRb); }

  const kx = tx - 0.9, kz = tz - 0.35;
  bx(kx, 0.79, kz, 0.5, 0.035, 0.32, mPk);
  bx(kx, 0.81, kz, 0.48, 0.008, 0.3, mBk);
  for (let s = 0; s < 8; s++) {
    bx(kx - 0.18 + s * 0.048, 0.83, kz - 0.1, 0.018, 0.018, 0.025, mPl);
    bx(kx - 0.18 + s * 0.048, 0.845, kz - 0.1, 0.012, 0.008, 0.012, [mR, mG, mR, mG, mBl, mY, mBl, mY][s]);
  }
  bx(kx + 0.1, 0.83, kz - 0.1, 0.1, 0.018, 0.035, mBk);
  for (let ix3 = 0; ix3 < 3; ix3++) for (let iz3 = 0; iz3 < 2; iz3++)
    bx(kx - 0.12 + ix3 * 0.07, 0.825, kz + 0.03 + iz3 * 0.05, 0.045, 0.006, 0.035, mBk);
  sp(kx + 0.18, 0.845, kz - 0.04, 0.012, mR);
  sp(kx + 0.22, 0.845, kz - 0.04, 0.012, mBl);
  sp(kx + 0.26, 0.845, kz - 0.04, 0.012, mY);

  const brx = tx + 0.1, brz = tz - 0.12;
  bx(brx, 0.78, brz, 0.34, 0.012, 0.16, mBrd);
  for (let w = 0; w < 8; w++)
    bx(brx - 0.12 + w * 0.03, 0.787, brz + (w % 3) * 0.035 - 0.035, 0.004, 0.004, 0.06, wireM[w]);
  bx(brx + 0.02, 0.79, brz, 0.045, 0.008, 0.018, mIC);
  for (let cw = 0; cw < 5; cw++)
    bx(brx - 0.08 + cw * 0.035, 0.787, brz + 0.04, 0.003, 0.003, 0.06, [mR, mBl, mG, mY, mW][cw]);

  const psx = tx + 0.75, psz = tz - 0.1;
  bx(psx, 0.81, psz, 0.16, 0.08, 0.22, mPl);
  bx(psx - 0.03, 0.86, psz, 0.04, 0.015, 0.05, mSc);
  bx(psx + 0.03, 0.86, psz, 0.04, 0.015, 0.05, mSc);
  cy(psx - 0.04, 0.85, psz - 0.09, 0.01, 0.012, mSt2, 6);
  cy(psx + 0.04, 0.85, psz - 0.09, 0.01, 0.012, mSt2, 6);
  cy(psx - 0.05, 0.84, psz + 0.09, 0.006, 0.015, mR, 5);
  cy(psx + 0.05, 0.84, psz + 0.09, 0.006, 0.015, mBl, 5);

  const mmx = tx + 0.75, mmz = tz + 0.15;
  bx(mmx, 0.78, mmz, 0.09, 0.02, 0.16, M(0xCC8800));
  bx(mmx, 0.795, mmz + 0.03, 0.05, 0.004, 0.04, mSc);
  cy(mmx + 0.04, 0.78, mmz - 0.06, 0.003, 0.14, mR, 4);
  cy(mmx - 0.04, 0.78, mmz - 0.06, 0.003, 0.14, mBl, 4);

  const osx = tx + 0.25, osz = tz + 0.35;
  bx(osx, 0.88, osz, 0.26, 0.15, 0.2, mPl);
  bx(osx, 0.95, osz + 0.05, 0.18, 0.11, 0.01, mSc);
  for (let wv = 0; wv < 10; wv++)
    bx(osx - 0.07 + wv * 0.014, 0.93 + Math.sin(wv * 0.65) * 0.025, osz + 0.055, 0.01, 0.004, 0.004, MB(0x22DD44));
  for (let bt = 0; bt < 7; bt++) bx(osx - 0.08 + bt * 0.024, 0.95, osz - 0.08, 0.018, 0.01, 0.012, mPl);
  for (let kn = 0; kn < 3; kn++) cy(osx + 0.08, 0.95, osz - 0.06 + kn * 0.03, 0.01, 0.012, mSt2, 6);

  bx(tx + 0.8, 0.81, tz + 0.3, 0.14, 0.07, 0.18, mPl);
  bx(tx + 0.8, 0.85, tz + 0.35, 0.08, 0.04, 0.01, mSc);
  cy(tx + 0.76, 0.84, tz + 0.22, 0.008, 0.012, mSt2, 6);
  cy(tx + 0.84, 0.84, tz + 0.22, 0.008, 0.012, mSt2, 6);

  bx(tx + 0.82, 0.785, tz + 0.05, 0.08, 0.012, 0.05, mBk);
  bx(tx + 0.87, 0.785, tz + 0.05, 0.008, 0.012, 0.03, mSt2);

  bx(tx - 0.3, 0.94, tz + 0.32, 0.46, 0.28, 0.018, mBk);
  bx(tx - 0.3, 0.94, tz + 0.33, 0.42, 0.24, 0.005, mScOn);
  cy(tx - 0.3, 0.8, tz + 0.26, 0.018, 0.12, mSt2);
  bx(tx - 0.3, 0.77, tz + 0.26, 0.14, 0.008, 0.08, mBk);
  bx(tx - 0.05, 0.775, tz + 0.05, 0.3, 0.008, 0.12, mPk);
  bx(tx + 0.22, 0.775, tz + 0.05, 0.04, 0.012, 0.065, mBk);
  bx(tx + 0.38, 0.85, tz + 0.12, 0.1, 0.24, 0.18, mBk);

  for (let wi = 0; wi < 5; wi++)
    cy(tx - 0.55 + wi * 0.015, 0.77, tz + 0.3, 0.002, 0.08, wireM[wi], 4);

  bx(tx - 0.6, 0.775, tz + 0.18, 0.1, 0.015, 0.08, mPl);
  for (let ic = 0; ic < 6; ic++)
    bx(tx - 0.63 + (ic % 3) * 0.022, 0.788, tz + 0.16 + (ic >> 1) * 0.022, 0.016, 0.005, 0.01, mIC);

  for (let pc = 0; pc < 3; pc++)
    cy(tx + 0.86 + pc * 0.008, 0.77, tz - 0.15 + pc * 0.04, 0.002, 0.12, [mR, mBl, mY][pc], 4);

  bx(tx + 0.45, 0.775, tz - 0.2, 0.07, 0.008, 0.12, mBk);
  bx(tx - 0.5, 0.77, tz + 0.05, 0.16, 0.008, 0.22, mBl);
  for (let nl = 0; nl < 4; nl++) bx(tx - 0.5, 0.777, tz - 0.04 + nl * 0.04, 0.13, 0.002, 0.008, MB(0xFFFFFF));
  cy(tx - 0.42, 0.775, tz + 0.15, 0.003, 0.12, mBk, 5);
  cy(tx - 0.4, 0.775, tz + 0.15, 0.003, 0.12, mBl, 5);
});

// ===================== INSTRUCTOR STATION =====================
const ix = RW / 4, iz = RD / 2 - 2;
bx(ix, 0.78, iz, 2.4, 0.045, 1.1, mWd2);
cy(ix - 1.05, 0.39, iz - 0.45, 0.025, 0.78, mSt);
cy(ix + 1.05, 0.39, iz - 0.45, 0.025, 0.78, mSt);
cy(ix - 1.05, 0.39, iz + 0.45, 0.025, 0.78, mSt);
cy(ix + 1.05, 0.39, iz + 0.45, 0.025, 0.78, mSt);
bx(ix, 0.18, iz - 0.45, 2.1, 0.025, 0.025, mSt);
bx(ix, 0.18, iz + 0.45, 2.1, 0.025, 0.025, mSt);
bx(ix + 0.85, 0.42, iz, 0.45, 0.65, 0.55, mWd2);
bx(ix + 0.85, 0.33, iz + 0.28, 0.4, 0.18, 0.01, mPk);
bx(ix + 0.85, 0.52, iz + 0.28, 0.4, 0.18, 0.01, mPk);

bx(ix - 0.55, 0.89, iz, 0.28, 0.16, 0.22, mPl);
bx(ix - 0.55, 0.97, iz + 0.06, 0.2, 0.12, 0.01, mSc);
for (let wv = 0; wv < 12; wv++)
  bx(ix - 0.67 + wv * 0.014, 0.95 + Math.sin(wv * 0.55) * 0.03, iz + 0.065, 0.01, 0.004, 0.004, MB(0x22DD44));
for (let bt = 0; bt < 8; bt++) bx(ix - 0.67 + bt * 0.022, 0.97, iz - 0.08, 0.018, 0.01, 0.012, mPl);

bx(ix + 0.15, 0.83, iz, 0.35, 0.035, 0.26, mPk);
bx(ix + 0.15, 0.85, iz, 0.33, 0.008, 0.24, mBk);
for (let s = 0; s < 10; s++) {
  bx(ix + 0.02 + s * 0.028, 0.865, iz - 0.08, 0.012, 0.016, 0.018, mPl);
  bx(ix + 0.02 + s * 0.028, 0.878, iz - 0.08, 0.008, 0.006, 0.008, [mR, mG, mR, mG, mBl, mY, mR, mG, mBl, mY][s]);
}

bx(ix - 0.15, 0.95, iz + 0.38, 0.48, 0.3, 0.018, mBk);
bx(ix - 0.15, 0.95, iz + 0.39, 0.44, 0.26, 0.005, mScOn);
cy(ix - 0.15, 0.81, iz + 0.32, 0.022, 0.14, mSt2);
bx(ix - 0.35, 0.8, iz + 0.1, 0.35, 0.008, 0.14, mPk);
bx(ix + 0.15, 0.8, iz + 0.1, 0.04, 0.015, 0.06, mBk);
bx(ix + 0.75, 0.85, iz + 0.28, 0.12, 0.28, 0.2, mBk);

cy(ix - 0.9, 0.8, iz + 0.28, 0.05, 0.008, mSt, 10);
cy(ix - 0.9, 0.96, iz + 0.28, 0.012, 0.32, mSt);
sp(ix - 0.9, 1.13, iz + 0.28, 0.025, mBk);

bx(ix, 0.45, iz + 0.75, 0.48, 0.045, 0.48, mBk);
bx(ix, 0.72, iz + 1, 0.46, 0.52, 0.035, mBk);
cy(ix, 0.22, iz + 0.75, 0.032, 0.26, mSt);
cy(ix, 0.035, iz + 0.75, 0.24, 0.035, mSt);

// ===================== PLANTS =====================
[[-RW / 2 + 0.8, -RD / 2 + 0.8], [RW / 2 - 0.8, -RD / 2 + 0.8], [-RW / 2 + 0.8, RD / 2 - 0.8], [RW / 2 - 0.8, RD / 2 - 0.8]].forEach(c => {
  bx(c[0], 0.3, c[1], 0.3, 0.6, 0.3, M(0x9E5B20));
  cy(c[0], 0.72, c[1], 0.12, 0.2, M(0x1E7A3A));
  sp(c[0], 0.95, c[1], 0.15, M(0x1D8B2E));
  sp(c[0] - 0.08, 1.08, c[1] + 0.06, 0.07, M(0x2DC842));
  sp(c[0] + 0.06, 1.1, c[1] - 0.05, 0.05, M(0x1D8B2E));
});

bx(-7, 0.12, -RD / 2 + 0.7, 0.28, 0.24, 0.45, MB(0xDD1111));
bx(-6.5, 0.08, -RD / 2 + 0.7, 0.22, 0.16, 0.35, mPk);

// ===================== EXPORT =====================
console.log(`Scene has ${scene.children.length} children. Exporting GLB...`);

const exporter = new GLTFExporter();
try {
  const result = await exporter.parseAsync(scene, { binary: true });
  const buffer = Buffer.from(result);
  fs.writeFileSync('public/dld-lab.glb', buffer);
  console.log(`GLB exported: public/dld-lab.glb (${(buffer.length / 1024 / 1024).toFixed(2)} MB)`);
} catch (error) {
  console.error('Export error:', error);
}
