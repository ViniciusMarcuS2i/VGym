import { AuthContext } from "@contexts/AuthContext";
import { useContext } from "react";

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export default useAuth;
