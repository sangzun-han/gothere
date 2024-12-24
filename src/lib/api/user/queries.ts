import { UserProfileResponse } from "@/types/user/user";
import { getUser } from "./get";
import { updateUser } from "./update";

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

const mutationOptions = {
  UpdateUser: () => ({
    mutationFn: updateUser,
  }),
};

export { queryKeys, queryOptions, mutationOptions };
