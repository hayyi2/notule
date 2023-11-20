import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

import { db } from "@/config/firebase";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogHeader
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
    NoteFormType,
    NoteInputSchema,
    NoteInputType,
    NoteType
} from "./notes.type";
import { InputNote } from "./InputNote";

type UpdateNoteProps = {
    note: NoteType | null
    open: boolean
    onOpenChange: (open: boolean) => void;
}

export function UpdateNote({ note, open, onOpenChange }: UpdateNoteProps) {
    const { user } = useAuth()
    const { toast } = useToast()
    const [submitLoading, setSubmitLoading] = useState(false)

    const form = useForm<NoteInputType>({
        resolver: zodResolver(NoteInputSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    })

    useEffect(() => {
        form.reset({
            title: note?.title,
            content: note?.content,
        })
    }, [note?.title, note?.content])

    const onSubmit = async (noteValues: NoteInputType) => {
        if (!user?.uid || !note?.id || submitLoading) {
            return
        }

        setSubmitLoading(true)
        const noteFormData: NoteFormType = {
            ...noteValues,
            updatedAt: serverTimestamp(),
        }
        console.log(noteFormData)
        await updateDoc(doc(db, 'notes', note.id), noteFormData)

        form.reset()
        toast({ title: "Note updated successfully", })
        onOpenChange(false)
        setSubmitLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>Update Note</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <InputNote form={form} />
                        </div>
                        <DialogFooter>
                            <Button
                                onClick={() => onOpenChange(false)}
                                variant="outline">Close</Button>
                            <Button
                                disabled={submitLoading}
                                type="submit">
                                {submitLoading ? "Loading ..." : "Save Change"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}