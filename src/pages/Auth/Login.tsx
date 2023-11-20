import { NavLink } from "react-router-dom";
import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function Login() {
    return (
        <div className="flex-grow flex items-center">
            <Card className="w-96 mx-auto my-8">
                <CardHeader>
                    <CardTitle className="text-2xl">Login Account</CardTitle>
                    <CardDescription>Please log in to access our services.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Button className="w-full">
                        <Icons.gitHub className="h-4 w-4 mr-2.5" />
                        Login with Github
                    </Button>
                    <NavLink
                        to="/register"
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "w-full"
                        )}>or Create new Account!</NavLink>
                </CardContent>
            </Card>
        </div>
    )
}
