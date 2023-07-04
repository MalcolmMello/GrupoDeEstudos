import { IMeet } from '../../types/Meet'

const MeetItemSkeleton = () => {
  return (
    <div className="bg-gray-600 animate-pulse rounded-xl flex flex-col justify-between gap-10 p-5">
      <div className="grid grid-cols-4 items-center justify-between ">
        <div className="flex col-span-3 gap-4">
          <div className="bg-gray-500 rounded-xl w-11 h-11 animate-pulse"></div>
          <div className="flex flex-col ">
            <span className="font-medium bg-gray-500 h-4 w-28 animate-pulse"></span>
            <span className="text-gray-500 text-sm bg-gray-500 h-3 w-16 animate-pulse"></span>
          </div>
        </div>
        <div className="flex justify-end rounded-full text-sm md:text-base bg-gray-500 h-8 w-22 animate-pulse"></div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-base md:text-lg bg-gray-500 h-6 w-40 animate-pulse"></span>
        <span className="text-gray-500 text-sm bg-gray-500 h-4 w-72 animate-pulse"></span>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="font-medium text-sm md:text-base bg-gray-500 h-4 w-32 animate-pulse"></p>
          <div className="bg-gray-500 h-10 rounded-lg w-24 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default MeetItemSkeleton
