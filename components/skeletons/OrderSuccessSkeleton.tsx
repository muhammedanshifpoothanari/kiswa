import { Skeleton } from "@/components/ui/skeleton"

export function OrderSuccessSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl overflow-hidden p-8 text-center space-y-6">
                <div className="flex justify-center mb-4">
                    <Skeleton className="w-20 h-20 rounded-full" />
                </div>

                <div className="space-y-3">
                    <Skeleton className="h-8 w-48 mx-auto rounded" />
                    <Skeleton className="h-4 w-64 mx-auto rounded" />
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-4 text-left">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                        <Skeleton className="h-4 w-24 rounded" />
                        <Skeleton className="h-5 w-32 rounded" />
                    </div>

                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <Skeleton className="w-16 h-16 rounded-md" />
                            <div className="space-y-2 flex-1 pt-1">
                                <Skeleton className="h-4 w-3/4 rounded" />
                                <Skeleton className="h-3 w-1/2 rounded" />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Skeleton className="w-16 h-16 rounded-md" />
                            <div className="space-y-2 flex-1 pt-1">
                                <Skeleton className="h-4 w-3/4 rounded" />
                                <Skeleton className="h-3 w-1/2 rounded" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4 space-y-3">
                    <Skeleton className="h-12 w-full rounded-full" />
                    <Skeleton className="h-10 w-full rounded-full" />
                </div>
            </div>
        </div>
    )
}
