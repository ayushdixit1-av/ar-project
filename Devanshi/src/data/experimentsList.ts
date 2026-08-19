import { ExperimentInfo } from '../types';

export const EXPERIMENTS_LIST: ExperimentInfo[] = [
  {
    id: 'exp-bin2gray',
    title: 'Binary to Gray Converter',
    shortName: 'Binary ➔ Gray',
    icPreset: '7486',
    defaultMode: 'bin2gray',
    description: '4-Bit Binary to Gray Code Conversion using IC 7486 Quad XOR Gate',
  },
  {
    id: 'exp-gray2bin',
    title: 'Gray to Binary Converter',
    shortName: 'Gray ➔ Binary',
    icPreset: '7486',
    defaultMode: 'gray2bin',
    description: '4-Bit Gray Code to Binary Conversion using IC 7486 Quad XOR Gate',
  },
  {
    id: 'exp-custom-sandbox',
    title: 'Custom Circuit Workbench',
    shortName: 'Custom Sandbox',
    icPreset: '7408',
    description: 'Freely mount any ICs, customize chip positions, switches, LEDs and wire connections',
  },
];
