import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { useState } from "react";
import { CreateNote } from "./CreateNote";
import { NotesType } from "./notes.type";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

const dummyNotes: NotesType = [
    {
        id: "asd",
        userId: "lore",
        title: "Notes Satu",
        content: "lorem ipsum akis mait",
        createdAt: (new Date()).getTime(),
        updatedAt: (new Date()).getTime(),
    },
    {
        id: "asd",
        userId: "lore",
        title: "Notes Dua",
        content: "lorem ipsum akis mait",
        createdAt: (new Date()).getTime(),
        updatedAt: (new Date()).getTime(),
    },
    {
        id: "asd",
        userId: "lore",
        title: "Notes Tiga",
        content: "lorem ipsum akis mait",
        createdAt: (new Date()).getTime(),
        updatedAt: (new Date()).getTime(),
    },
]

export default function Notes() {
    const { user } = useAuth()

    if (user === null) {
        return <Navigate to="/login" />
    }
    const [openCreateDialog, setOpenCreateDialog] = useState(false)
    const [openDetailSheet, setOpenDetailSheet] = useState(false)

    return (
        <>
            <CreateNote open={openCreateDialog} onOpenChange={setOpenCreateDialog} />
            <Sheet open={openDetailSheet} onOpenChange={setOpenDetailSheet}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Detail Note</SheetTitle>
                    </SheetHeader>
                    <div className="my-4 space-y-4">
                        <div className="space-y-1">
                            <Label className="text-muted-foreground text-sm">Title</Label>
                            <h6 className="font-medium">Lorem ips dum</h6>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-muted-foreground text-sm">Content</Label>
                            <p>Lorem ips dum</p>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-muted-foreground text-sm">Updated</Label>
                            <p>3131313</p>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-muted-foreground text-sm">Created</Label>
                            <p>3131313</p>
                        </div>
                        <div className="pt-4 space-x-2">
                            <Button>Edit</Button>
                            <Button variant="outline">Delete</Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
            <PageHeader>
                <PageHeaderHeading>Notes</PageHeaderHeading>
                <Button onClick={() => setOpenCreateDialog(true)}>Create Note</Button>
            </PageHeader>
            <div className="space-y-4">
                {dummyNotes.length === 0 ? (
                    <Button
                        onClick={() => setOpenCreateDialog(true)}
                        variant="outline"
                        className="py-20 w-full flex flex-col text-muted-foreground hover:bg-transparent">
                        <div className="h-20">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
                            </svg>
                        </div>
                        <span className="mt-2 block text-sm font-medium">
                            No data saved, click to create
                        </span>
                    </Button>
                ) : dummyNotes.map((note, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle
                                onClick={() => setOpenDetailSheet(true)}
                                className="cursor-pointer">{note.title}</CardTitle>
                            <CardDescription className="space-x-2 flex">
                                <span>{note.createdAt}</span>
                                <span className="flex items-center"><Pencil1Icon className="mr-1" />Edit</span>
                                <span className="flex items-center"><TrashIcon className="mr-1" />Delete</span>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </>
    )
}