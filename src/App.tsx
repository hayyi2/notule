import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { router } from "./Router";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
    return (
        <ThemeProvider storageKey="notule-ui">
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </ThemeProvider>
    )
}
