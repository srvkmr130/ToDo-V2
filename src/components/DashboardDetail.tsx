import { useSelector } from "react-redux";
import { IState } from "../type";
import { TotalWorkingHours } from ".";
import partyImg from "../resources/images/party.png";

export default function DashboardDetail() {
  const myTasks = useSelector((state: IState) => state.myTasks);
  var pendingTasksCount = 0;
  for (var task of myTasks) {
    if (task.isCompleted === false) pendingTasksCount++;
  }
  return (
    <div className="grid grid-rows-4 grid-flow-col gap-10">
      <div className="row-span-4 col-span-2">
        <TotalWorkingHours />
      </div>

      <div className="row-span-2 flex flex-col col-span-3 shadow-lg bg-gray-100 relative rounded-2xl">
        <div className="pt-4 pl-5 w-9/12">Overall Pending Task</div>
        <div className="absolute scrollInfo">{`${pendingTasksCount} / ${myTasks.length}`}</div>
        <div className="rounded-2xl relative bg-blue-200 m-auto h-3 w-11/12">
          <div
            className="bg-blue-500 rounded-2xl absolute left-0 bottom-0 mt-1 h-3"
            style={{ width: `${(pendingTasksCount / myTasks.length) * 100}%` }}
          ></div>
        </div>
      </div>
      <div className="row-span-2 col-span-3 relative shadow-lg bg-gray-100 rounded-2xl">
        <div className="relative">
          <div className="flex flex-col pt-4 pl-5">
            <div>Success Rate</div>
            <div>
              {myTasks.length > 0
                ? `${(
                    ((myTasks.length - pendingTasksCount) / myTasks.length) *
                    100
                  ).toFixed(1)}%`
                : "Not Available"}
            </div>
          </div>

          <div className="w-2/12 absolute top-2 right-4 m-auto">
            <div className="">
              <img alt="PartyImage" src={partyImg} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
