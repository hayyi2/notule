import { createContext, useEffect, useState } from "react"
import { auth, provider } from "../config/firebase"
import { User, signInWithPopup } from "firebase/auth"
import { useToast } from "@/components/ui/use-toast"

type AuthProviderProps = {
    children: React.ReactNode
}

export type AuthProviderState = {
    user: User | null
    loadingAuth: boolean
    login: () => Promise<void>
    logout: () => Promise<void>
}

const initialState = {
    user: null,
    loadingAuth: true,
    login: async () => { },
    logout: async () => { },
}

export const AuthProviderContext = createContext<AuthProviderState>(initialState)

export function AuthProvider({ children, ...props }: AuthProviderProps) {
    const [user, setUser] = useState(auth.currentUser)
    const [loadingAuth, setLoadingAuth] = useState(true)
    const { toast } = useToast()

    useEffect(() => {
        const unsubscrbe = auth.onAuthStateChanged(user => {
            setLoadingAuth(false)
            setUser(user)
        })

        return () => unsubscrbe()
    }, [])

    const login = async () => {
        try {
            const { user } = await signInWithPopup(auth, provider)
            toast({ title: `Login successfully. Hello ${user.displayName} 😊`, })
        } catch (error) {
            console.error('error', error)
        }
    }

    const logout = async () => {
        auth.signOut()
    }

    return (
        <AuthProviderContext.Provider {...props} value={{
            user,
            loadingAuth,
            login,
            logout,
        }}>
            {children}
        </AuthProviderContext.Provider>
    )
}
