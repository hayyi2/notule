import { deleteDoc, doc } from "firebase/firestore";

import { db } from "@/config/firebase";
import { useToast } from "@/components/ui/use-toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { NoteType } from "./notes.type";

type DeleteNoteProps = {
    note: NoteType | null
    open: boolean
    onOpenChange: (open: boolean) => void;
}

export function DeleteNote({ note, open, onOpenChange }: DeleteNoteProps) {
    const { toast } = useToast()

    const doDelete = async () => {
        if (!note?.id) return
        await deleteDoc(doc(db, 'notes', note.id))
        toast({ title: "Note deleted successfully", })
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure to delete?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => doDelete()}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}