import { UserProfileResponse } from "@/types/user/user";
import { getUser } from "./get";

const queryKeys = {
  User: () => ["user"] as const,
};

const queryOptions = {
  User: () => ({
    queryKey: queryKeys.User(),
    queryFn: (): Promise<UserProfileResponse> => getUser(),
    staleTime: 5 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  }),
};

export { queryKeys, queryOptions };
