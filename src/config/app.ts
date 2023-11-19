interface AppConfig {
    name: string,
    github: {
        title: string,
        url: string
    },
    author: {
        name: string,
        url: string
    },
}

export const appConfig: AppConfig = {
    name: "Notule App",
    github: {
        title: "Notule",
        url: "https://github.com/hayyi2/notule",
    },
    author: {
        name: "hayyi",
        url: "https://github.com/hayyi2/",
    }
}