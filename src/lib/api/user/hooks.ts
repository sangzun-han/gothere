import { useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "./queries";
import { UserProfileResponse } from "@/types/user/user";

export function useGetUser() {
  return useSuspenseQuery<UserProfileResponse>(queryOptions.User());
}
