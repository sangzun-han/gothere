"use client";

import { useEffect, useState } from "react";
import browserClient from "@/utils/supabase/client";

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const {
      data: { subscription },
    } = browserClient.auth.onAuthStateChange((_, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { isLoggedIn };
}
