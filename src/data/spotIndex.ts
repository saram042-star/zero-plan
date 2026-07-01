import { mockSpots } from "./mockSpots";
import type { Spot } from "../types/spot";

export const spotById = new Map<string, Spot>(mockSpots.map((s) => [s.id, s]));

export function getSpotById(id: string): Spot | undefined {
  return spotById.get(id);
}
