import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useAuth } from "@/hooks/useAuth";
import { Loading } from "./Loading";

export function Applayout() {
    const { loadingAuth } = useAuth()

    return (
        <>
            <Header />
            <div className="flex-grow flex flex-col">
                <div className="container px-4 md:px-8 flex-grow flex flex-col">
                    <div className="flex-grow flex flex-col max-w-3xl w-full mx-auto">
                        {loadingAuth ? <Loading /> : <Outlet />}
                    </div>
                </div>
            </div>
            <div className="container px-4 md:px-8">
                <Footer />
            </div>
        </>
    )
}
