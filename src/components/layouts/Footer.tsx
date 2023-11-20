import { appConfig } from "@/config/app";

export function Footer() {
    return (
        <footer className="max-w-3xl mx-auto flex items-center justify-center h-16 py-2">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">Built by <a href={appConfig.author.url} target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">{appConfig.author.name}</a>. The source code is available on <a href={appConfig.github.url} target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">GitHub</a>.</p>
        </footer>
    )
}