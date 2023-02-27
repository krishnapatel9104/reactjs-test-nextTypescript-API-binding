import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';

export const ProtectedRoute = (props: any) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const checkUserToken = () => {
    const userData = localStorage.getItem("isLoggedIn");
    if (userData === null || userData === 'false') {
      setIsLoggedIn(false);
      return router.push("/login");
    }
    setIsLoggedIn(true);
  };
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);
  return isLoggedIn ? props.children : null;
};
