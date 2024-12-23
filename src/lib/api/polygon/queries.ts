import { Coordinate } from "@/types/coordinate/coordinate";
import { getPolygonCoordinates } from "./get";

const queryKeys = {
  polygonByDong: (dong: string) => ["polygon", dong] as const,
};

const queryOptions = {
  polygonByDong: (dong: string) => ({
    queryKey: queryKeys.polygonByDong(dong),
    queryFn: (): Promise<Coordinate[][]> => getPolygonCoordinates(dong),
    staleTime: 5 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  }),
};

export { queryKeys, queryOptions };
