import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { NoteInputSchema, NoteInputType } from "./notes.type";
import { InputNote } from "./InputNote";

type CreateNoteProps = {
    open: boolean
    onOpenChange: (open: boolean) => void;
}

export function CreateNote({ open, onOpenChange }: CreateNoteProps) {
    const form = useForm<NoteInputType>({
        resolver: zodResolver(NoteInputSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    })

    const onSubmit = (values: NoteInputType) => {
        console.log(values)
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
                            <Button type="submit">Create Note</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}