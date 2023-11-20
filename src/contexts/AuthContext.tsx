import { createContext, useEffect, useState } from "react"
import { auth, provider } from "../config/firebase"
import { User, signInWithPopup } from "firebase/auth"

type AuthProviderProps = {
    children: React.ReactNode
}

export type AuthProviderState = {
    user: User | null
    login: () => Promise<void>
    logout: () => Promise<void>
}

const initialState = {
    user: null,
    login: async () => {},
    logout: async () => {},
}

export const AuthProviderContext = createContext<AuthProviderState>(initialState)

export function AuthProvider({ children, ...props }: AuthProviderProps) {
    const [user, setUser] = useState(auth.currentUser)

    useEffect(() => {
        const unsubscrbe = auth.onAuthStateChanged(user => {
            setUser(user)
        })

        return () => unsubscrbe()
    }, [])

    const login = async () => {
        try {
            await signInWithPopup(auth, provider)
        } catch (error) {
            console.error(error)
        }
    }

    const logout = async () => {
        auth.signOut()
    }

    return (
        <AuthProviderContext.Provider {...props} value={{
            user,
            login,
            logout,
        }}>
            {children}
        </AuthProviderContext.Provider>
    )
}
