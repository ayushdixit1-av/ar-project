/**
 * ICLabel.js
 *
 * Renders the part name (e.g. "7408") on top of a placed IC using a
 * canvas-texture plane that lies flat on the body top and faces upward,
 * so the part number is readable from the default (overhead) camera.
 *
 * Same technique as LabelGenerator: native 2D canvas rasterization applied
 * as a CanvasTexture - fully synchronous, nothing async to fail.
 */
import * as THREE from 'three';

const FONT_PX = 96;
const FONT_FAMILY = '"Segoe UI", Arial, sans-serif';
const FLAT_ROTATION = -Math.PI / 2;
const LABEL_Y = 2.7;          // just above the IC body top (body spans y 0..2.4)
const GLYPH_HEIGHT = 2.0;     // mm
const MAX_WIDTH_MARGIN = 2;   // mm left clear of the body edges

export class ICLabel {
  /**
   * @param {string} name   part number text, e.g. "7408"
   * @param {{centerX:number, centerY:number, width:number}} bounds IC.bounds()
   */
  static makeLabelMesh(name, bounds) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const font = `bold ${FONT_PX}px ${FONT_FAMILY}`;

    ctx.font = font;
    const textWidth = ctx.measureText(name).width;
    const pad = FONT_PX * 0.3;
    const canvasWidth = Math.ceil(textWidth + pad * 2);
    const canvasHeight = Math.ceil(FONT_PX * 1.25);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Setting canvas size resets the context state - re-apply font settings.
    ctx.font = font;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(name, canvasWidth / 2, canvasHeight / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;

    // Scale so glyph height ~= GLYPH_HEIGHT mm, shrinking to fit the body.
    let scale = GLYPH_HEIGHT / FONT_PX;
    const rawWidth = canvasWidth * scale;
    const maxWidth = Math.max(bounds.width - MAX_WIDTH_MARGIN, 4);
    if (rawWidth > maxWidth) scale *= maxWidth / rawWidth;

    const planeWidth = canvasWidth * scale;
    const planeHeight = canvasHeight * scale;

    const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(bounds.centerX, LABEL_Y, bounds.centerY);
    mesh.rotation.x = FLAT_ROTATION;
    mesh.renderOrder = 20;
    return mesh;
  }
}
