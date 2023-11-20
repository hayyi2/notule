import { useContext } from "react";
import { AuthProviderContext, AuthProviderState } from "../contexts/AuthContext";

export function useAuth(): AuthProviderState {
    const context = useContext(AuthProviderContext);

    if (context === undefined)
        throw new Error("useAuth must be used within a AuthProvider");

    return context;
}
