import { Skeleton } from "@/components/ui/skeleton"

export function ProfileSkeleton() {
    return (
        <div className="min-h-screen bg-white pt-24 pb-20 px-4 md:px-6">
            <div className="max-w-[1200px] mx-auto">
                {/* Header Skeleton */}
                <div className="flex items-center justify-between mb-8">
                    <Skeleton className="h-10 w-48 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-full md:hidden" />
                </div>

                <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                    {/* Sidebar Skeleton */}
                    <div className="w-full md:w-64 flex-shrink-0 space-y-2 hidden md:block">
                        <Skeleton className="h-12 w-full rounded-lg" />
                        <Skeleton className="h-12 w-full rounded-lg" />
                        <Skeleton className="h-12 w-full rounded-lg" />
                        <hr className="my-4 border-gray-100" />
                        <Skeleton className="h-12 w-full rounded-lg" />
                    </div>
                    {/* Mobile Tabs Skeleton */}
                    <div className="flex md:hidden gap-2 overflow-x-auto pb-2">
                        <Skeleton className="h-10 w-24 rounded-full flex-shrink-0" />
                        <Skeleton className="h-10 w-24 rounded-full flex-shrink-0" />
                        <Skeleton className="h-10 w-24 rounded-full flex-shrink-0" />
                    </div>

                    {/* Content Skeleton */}
                    <div className="flex-1 space-y-8">
                        {/* Profile Card Skeleton */}
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-4 mb-6">
                                <Skeleton className="w-16 h-16 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-6 w-40 rounded" />
                                    <Skeleton className="h-4 w-32 rounded" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Skeleton className="h-20 w-full rounded-xl" />
                                <Skeleton className="h-20 w-full rounded-xl" />
                            </div>
                        </div>

                        {/* Recent Order Skeleton */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-5 w-32 rounded" />
                                <Skeleton className="h-4 w-16 rounded" />
                            </div>
                            <div className="border border-gray-200 rounded-2xl overflow-hidden p-6 space-y-4">
                                <div className="flex justify-between">
                                    <div className="space-y-2">
                                        <Skeleton className="h-3 w-20 rounded" />
                                        <Skeleton className="h-4 w-24 rounded" />
                                    </div>
                                    <Skeleton className="h-8 w-20 rounded" />
                                </div>
                                <div className="flex gap-4">
                                    <Skeleton className="w-16 h-16 rounded-md" />
                                    <div className="space-y-2 flex-1">
                                        <Skeleton className="h-5 w-3/4 rounded" />
                                        <Skeleton className="h-4 w-1/2 rounded" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
