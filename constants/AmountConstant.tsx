type RoomStatus = {
    [key:string]:JSX.Element
};
export const roomStatusConstant: RoomStatus = {
    available:<div className="text-xs text-green-500 bg-green-600/10 rounded-full w-fit py-[3px] px-2 font-semibold ">Available</div>,
    booked:<div className="text-xs text-blue-500 bg-blue-600/10 rounded-full w-fit py-[3px] px-2 font-semibold ">Booked</div>,
    pending:<div className="text-xs text-orange-500 bg-orange-600/10 rounded-full w-fit py-[3px] px-2 font-semibold ">Pending</div>
}
