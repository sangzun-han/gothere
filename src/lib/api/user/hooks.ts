import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "./queries";
import { UserProfileResponse, UserStatsResponse } from "@/types/user/user";
import { updateUser } from "./update";

export function useGetUser() {
  return useSuspenseQuery<UserProfileResponse>(queryOptions.User());
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries(queryOptions.User());
    },
  });
}

export function useGetUserStats() {
  return useSuspenseQuery<UserStatsResponse>(queryOptions.UserStatus());
}
