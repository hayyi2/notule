import { PageHeader, PageHeaderHeading } from "../page-header";
import { Skeleton } from "../ui/skeleton";

export function Loading() {
    return (
        <>
            <div className="pt-6 pb-4 flex items-center justify-between space-y-2">
                <Skeleton className="w-3/4 h-8 rounded-lg mt-2.5 mb-1" />
            </div>
            <Skeleton className="w-full h-20 rounded-lg" />
        </>
    )
}