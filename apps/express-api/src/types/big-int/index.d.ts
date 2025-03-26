// src/types/big-int/index.d.ts
export {}; // Ensure this is treated as a module

declare global {
  interface BigInt {
    toJSON(): string | number;
  }
}