import * as THREE from 'three';

export const COL_COUNT = 30;
export const COL_SPACING = 0.32; // distance between columns in 3D units
export const ROW_SPACING = 0.28; // distance between rows

// Center X = 0
export function getColX(col: number): number {
  return (col - (COL_COUNT + 1) / 2) * COL_SPACING;
}

export function getRowZ(row: string): number {
  switch (row) {
    case 'A': return -1.2;
    case 'B': return -0.92;
    case 'C': return -0.64;
    case 'D': return -0.36;
    case 'E': return -0.12;
    case 'F': return 0.12;
    case 'G': return 0.36;
    case 'H': return 0.64;
    case 'I': return 0.92;
    case 'J': return 1.2;
    default: return 0;
  }
}

export function getRailZ(rail: 'TOP_POS' | 'TOP_NEG' | 'BOTTOM_POS' | 'BOTTOM_NEG'): number {
  switch (rail) {
    case 'TOP_POS': return -1.9;
    case 'TOP_NEG': return -1.6;
    case 'BOTTOM_POS': return 1.6;
    case 'BOTTOM_NEG': return 1.9;
  }
}

export function getHolePosition3D(holeKey: string): THREE.Vector3 {
  if (holeKey === 'supply_VCC') {
    return new THREE.Vector3(-6.9, 0.6, -1.0);
  }
  if (holeKey === 'supply_GND') {
    return new THREE.Vector3(-6.9, 1.0, -1.0);
  }
  if (holeKey.startsWith('rail_')) {
    const parts = holeKey.split('_'); // ['rail', 'TOP', 'POS', '10']
    const railType = `${parts[1]}_${parts[2]}` as 'TOP_POS' | 'TOP_NEG' | 'BOTTOM_POS' | 'BOTTOM_NEG';
    const col = parseInt(parts[3], 10) || 1;
    return new THREE.Vector3(getColX(col), 0.36, getRailZ(railType));
  }
  if (holeKey.startsWith('terminal_')) {
    const parts = holeKey.split('_'); // ['terminal', '15', 'A']
    const col = parseInt(parts[1], 10) || 1;
    const row = parts[2] || 'A';
    return new THREE.Vector3(getColX(col), 0.36, getRowZ(row));
  }
  return new THREE.Vector3(0, 0.36, 0);
}

// Map 3D position to nearest hole key
export function getNearestHoleKey(point: THREE.Vector3): { holeKey: string; distance: number } | null {
  let closestKey = '';
  let minDistance = Infinity;

  // Check power supply binding posts
  const vccDist = Math.hypot(point.x - (-6.9), point.z - (-1.0));
  if (vccDist < minDistance) {
    minDistance = vccDist;
    closestKey = 'supply_VCC';
  }

  const gndDist = Math.hypot(point.x - (-6.9), point.z - (-1.0));
  if (gndDist < minDistance) {
    minDistance = gndDist;
    closestKey = 'supply_GND';
  }

  // Check terminal holes
  for (let col = 1; col <= COL_COUNT; col++) {
    const x = getColX(col);
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].forEach((row) => {
      const z = getRowZ(row);
      const dist = Math.hypot(point.x - x, point.z - z);
      if (dist < minDistance) {
        minDistance = dist;
        closestKey = `terminal_${col}_${row}`;
      }
    });
  }

  // Check rail holes
  for (let col = 1; col <= COL_COUNT; col++) {
    const x = getColX(col);
    (['TOP_POS', 'TOP_NEG', 'BOTTOM_POS', 'BOTTOM_NEG'] as const).forEach((rail) => {
      const z = getRailZ(rail);
      const dist = Math.hypot(point.x - x, point.z - z);
      if (dist < minDistance) {
        minDistance = dist;
        closestKey = `rail_${rail}_${col}`;
      }
    });
  }

  if (minDistance > 0.55) return null; // Too far from any hole
  return { holeKey: closestKey, distance: minDistance };
}
