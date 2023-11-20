import { Timestamp } from "firebase/firestore"
import * as z from "zod"

export const NoteInputSchema = z.object({
    title: z
        .string({
            required_error: "Title is required",
        })
        .min(1, {
            message: "Title is required"
        }),
    content: z
        .string(),
})

export type NoteInputType = z.infer<typeof NoteInputSchema>

export type NoteType = {
    id: string
    userId: string
    title: string
    content: string
    // createdAt: Timestamp
    // updatedAt: Timestamp
    createdAt: number
    updatedAt: number
}

export type NotesType = NoteType[]
