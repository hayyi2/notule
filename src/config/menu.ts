import { Icons } from "@/components/icons"

interface NavItem {
    title: string
    to?: string
    href?: string
    disabled?: boolean
    external?: boolean
    icon?: keyof typeof Icons
    label?: string
}

interface NavItemWithChildren extends NavItem {
    items?: NavItemWithChildren[]
}

export const mainMenu: NavItemWithChildren[] = [
    /*
    {
        title: 'Notes',
        to: '/notes',
    },
    {
        title: 'Tags',
        to: '/tags',
    },
    */
]

export const sideMenu: NavItemWithChildren[] = []
