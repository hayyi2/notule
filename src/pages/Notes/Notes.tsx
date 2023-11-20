import { useEffect, useState } from "react";
import Moment from "react-moment";
import { Navigate } from "react-router-dom";
import {
    ClockIcon,
    Pencil1Icon,
    TrashIcon
} from "@radix-ui/react-icons";
import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where
} from "firebase/firestore";

import { db } from "@/config/firebase";
import { useAuth } from "@/hooks/useAuth";
import { NoteType, NotesType } from "./notes.type";

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { CreateNote } from "./CreateNote";
import { DeleteNote } from "./DeleteNote";
import { UpdateNote } from "./UpdateNote";
import { DetailNote } from "./DetailNote";

export default function Notes() {
    const { user } = useAuth()
    const [notes, setNotes] = useState<NotesType>([]);
    const [note, setNote] = useState<NoteType | null>(null);

    if (user === null) {
        return <Navigate to="/login" />
    }

    useEffect(() => {
        let unsubscrbe = () => { }
        if (!user?.uid) {
            setNotes([])
            return
        }
        const q = query(
            collection(db, 'notes'),
            where('author', '==', user?.uid ?? ""),
            orderBy('updatedAt', 'desc')
        )
        unsubscrbe = onSnapshot(q, (querySnapshot) => {
            setNotes(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NoteType)))
        })
        return () => unsubscrbe()
    }, [user?.uid])


    const [openCreateDialog, setOpenCreateDialog] = useState(false)
    const [openDetailDialog, setOpenDetailDialog] = useState(false)
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

    const createNote = () => {
        setOpenCreateDialog(true)
    }

    const detailNote = (note: NoteType) => {
        setNote(note)
        setOpenDetailDialog(true)
    }

    const updateNote = (note: NoteType | null) => {
        setNote(note)
        setOpenDetailDialog(false)
        setOpenUpdateDialog(true)
    }

    const deleteNote = (note: NoteType | null) => {
        setNote(note)
        setOpenDetailDialog(false)
        setOpenDeleteDialog(true)
    }

    return (
        <>
            <CreateNote open={openCreateDialog} onOpenChange={setOpenCreateDialog} />
            <DetailNote note={note} updateNote={updateNote} deleteNote={deleteNote} open={openDetailDialog} onOpenChange={setOpenDetailDialog} />
            <UpdateNote note={note} open={openUpdateDialog} onOpenChange={setOpenUpdateDialog} />
            <DeleteNote note={note} open={openDeleteDialog} onOpenChange={setOpenDeleteDialog} />
            <PageHeader>
                <PageHeaderHeading>Notes</PageHeaderHeading>
                <Button onClick={() => createNote()}>Create Note</Button>
            </PageHeader>
            <div className="space-y-4">
                {notes.length === 0 ? (
                    <Button
                        onClick={() => createNote()}
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
                ) : notes.map((note, index) => (
                    <Card key={index} className="group">
                        <CardHeader>
                            <CardTitle
                                onClick={() => detailNote(note)}
                                className="cursor-pointer hover:underline underline-offset-4">{note.title}</CardTitle>
                            <CardDescription className="flex items-center justify-between">
                                {note?.updatedAt ? (
                                    <span className="flex items-center">
                                        <ClockIcon className="mr-1" />
                                        <Moment date={note.updatedAt.toDate()} fromNow></Moment>
                                    </span>
                                ) : null}
                                <span className="hidden group-hover:flex items-center space-x-4 ml-auto">
                                    <Button
                                        onClick={() => updateNote(note)}
                                        variant="link"
                                        className="p-0 h-auto">
                                        <Pencil1Icon className="mr-1" />
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => deleteNote(note)}
                                        variant="link"
                                        className="p-0 h-auto">
                                        <TrashIcon className="mr-1" />
                                        Delete
                                    </Button>
                                </span>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </>
    )
}