import Moment from "react-moment";

import { NoteType } from "./notes.type";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogHeader
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type DetailNoteProps = {
    note: NoteType | null
    updateNote: (note: NoteType | null) => void
    deleteNote: (note: NoteType | null) => void
    open: boolean
    onOpenChange: (open: boolean) => void;
}

export function DetailNote({ note, updateNote, deleteNote, open, onOpenChange }: DetailNoteProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Detail Note</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mb-4">
                    <div className="space-y-1">
                        <Label>Title</Label>
                        <h6 className="font-medium">{note?.title ?? '-'}</h6>
                    </div>
                    <div className="space-y-1">
                        <Label>Content</Label>
                        <p>{(note?.content ?? '-').split('\n').map(str => <p>{str}</p>)}</p>
                    </div>
                    <div className="space-y-1">
                        <Label>Updated</Label>
                        <p><Moment date={note?.updatedAt.toDate()} format="YYYY MMM DD HH:mm"></Moment></p>
                    </div>
                    <div className="space-y-1">
                        <Label>Created</Label>
                        <p><Moment date={note?.createdAt.toDate()} format="YYYY MMM DD HH:mm"></Moment></p>
                    </div>
                </div>
                <DialogFooter>
                    <div className="flex-grow flex flex-row-reverse">
                        <Button
                            onClick={() => updateNote(note)}
                            className="ml-2"
                            type="submit">Update Note</Button>
                        <Button
                            onClick={() => onOpenChange(false)}
                            variant="outline">Close</Button>
                        <Button
                            onClick={() => deleteNote(note)}
                            className="mr-auto"
                            variant="ghost">Delete</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}