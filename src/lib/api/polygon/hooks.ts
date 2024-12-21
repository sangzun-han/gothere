import { useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "./queries";
import { Coordinate } from "@/types/coordinate/coordinate";

export function usePolygonCoordinates(dong: string) {
  return useSuspenseQuery<Coordinate[][]>(queryOptions.polygonByDong(dong));
}
