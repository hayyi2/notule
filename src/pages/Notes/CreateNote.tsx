import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    addDoc,
    collection,
    serverTimestamp
} from "firebase/firestore";

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
    NoteInputType
} from "./notes.type";
import { InputNote } from "./InputNote";

type CreateNoteProps = {
    open: boolean
    onOpenChange: (open: boolean) => void;
}

export function CreateNote({ open, onOpenChange }: CreateNoteProps) {
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

    const onSubmit = async (noteValues: NoteInputType) => {
        if (!user?.uid || submitLoading) {
            return
        }

        setSubmitLoading(true)
        const noteFormData: NoteFormType = {
            author: user.uid ?? "",
            ...noteValues,
            updatedAt: serverTimestamp(),
            createdAt: serverTimestamp(),
        }
        await addDoc(collection(db, "notes"), noteFormData)
        form.reset()
        toast({ title: "Note created successfully", })
        onOpenChange(false)
        setSubmitLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>Create Note</DialogTitle>
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
                                {submitLoading ? "Loading ..." : "Create Note"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}