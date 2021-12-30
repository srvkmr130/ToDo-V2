import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IState, ITask } from "../type";
import { Link } from "react-router-dom";
import { FilterState, Priority, Tab } from "../enums/enums";
import { FormatDateToday } from "../utils/helper";

export default function Tasks() {
  const myTasks = useSelector((state: IState) => state.myTasks);
  const tabInfo = useSelector((state: IState) => state.tab);
  const [currentTasks, setcurrentTasks] = useState([...myTasks] as ITask[]);
  const [filterState, setfilterState] = useState(FilterState.ALL);

  function isSelectedFilterState(currentFilterState: string) {
    return filterState === currentFilterState;
  }

  function handleOnCompletedClick() {
    var filteredTasks = myTasks.filter((task) => task.isCompleted === true);
    setcurrentTasks(filteredTasks);
    setfilterState(FilterState.COMPLETED);
  }
  function handleOnAllClick() {
    setcurrentTasks(myTasks);
    setfilterState(FilterState.ALL);
  }
  function handleOnPendingClick() {
    var filteredTasks = myTasks.filter((task) => task.isCompleted === false);
    setcurrentTasks(filteredTasks);
    setfilterState(FilterState.PENDING);
  }

  useEffect(() => {
    setcurrentTasks(myTasks);
  }, [myTasks]);

  return (
    <div className="flex flex-col rounded-2xl mt-5 h-4/5 bg-slate-300">
      <div className="flex text-xl justify-between font-bold p-5 w-full">
        <div className="mt-0 w-6/12">
          <p>Tasks</p>
        </div>
        <div className="flex">
          <div className="flex items-center justify-center w-64 h-9 border rounded-2xl border-gray-200">
            <div className="margin-x-1px">
              <button
                onClick={handleOnAllClick}
                className={
                  isSelectedFilterState(FilterState.ALL)
                    ? "leading-3 py-2 w-full px-2 relative font-light rounded bg-blue-500 text-white transition mt-2px duration-300"
                    : "leading-3 py-2 w-full px-2 relative font-light text-slate-600 rounded hover:bg-blue-500 hover:text-white transition mt-2px duration-300"
                }
              >
                All
              </button>
            </div>
            <div className="margin-x-1px">
              <button
                onClick={handleOnCompletedClick}
                className={
                  isSelectedFilterState(FilterState.COMPLETED)
                    ? "leading-3 py-2 w-full px-2 relative font-light rounded text-white transition mt-2px bg-blue-500 duration-300"
                    : "leading-3 py-2 w-full px-2 relative font-light text-slate-600 rounded hover:bg-blue-500 hover:text-white transition mt-2px duration-300"
                }
              >
                Completed
              </button>
            </div>
            <div className="margin-x-1px">
              <button
                onClick={handleOnPendingClick}
                className={
                  isSelectedFilterState(FilterState.PENDING)
                    ? "leading-3 py-2 w-full px-2 relative font-light  rounded  text-white transition mt-2px bg-blue-500 duration-300"
                    : "leading-3 py-2 w-full px-2 relative font-light text-slate-600 rounded hover:bg-blue-500 hover:text-white transition mt-2px duration-300"
                }
              >
                Pending
              </button>
            </div>
          </div>
          <div className="w-12 ml-2 border rounded-2xl border-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 icon-center text-slate-600 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="container md:max-w-full sm:max-w-full">
        <div className="flex flex-col">
          <div className="w-full">
            <div className="border-b border-gray-200 shadow overflow-x-scroll">
              <table className="divide-y divide-gray-300 w-full ">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-xs-2 text-gray-500">Task</th>
                    <th className="px-4 py-2 text-xs-2 text-gray-500">
                      Category
                    </th>
                    <th className="px-4 py-2 text-xs-2 text-gray-500">Tags</th>
                    <th className="px-2 py-2 text-xs-2 text-gray-500">Time</th>
                    <th className="px-4 py-2 text-xs-2 text-gray-500">
                      Due Date
                    </th>
                    <th className="px-4 py-2 text-xs-2 text-gray-500">
                      Status
                    </th>
                    {tabInfo !== Tab.HISTORY ? (
                      <th className="px-4 py-2 text-xs-2 text-gray-500"></th>
                    ) : (
                      <th>{""}</th>
                    )}
                  </tr>
                </thead>
                {currentTasks.length > 0 && (
                  <tbody className="bg-white divide-y divide-gray-300">
                    {currentTasks.map((element, index) => (
                      <tr
                        key={index}
                        className="whitespace-nowrap hover:bg-slate-100"
                      >
                        <td className="w-3/12 relative px-6 py-4 text-sm text-gray-500">
                          {element.priority === Priority.URGENT ? (
                            <div className="absolute text-white top-1 left-2 text bg-orange-300 rounded-2xl px-4">
                              Urgent
                            </div>
                          ) : (
                            ""
                          )}
                          {element.task}
                        </td>
                        <td className="w-2/12 px-6 text-center py-4 text-sm text-gray-500">
                          {element.category}
                        </td>
                        <td className="w-2/12 px-6 text-center py-4 text-sm text-gray-500">
                          {" "}
                          Tag 1 , Tag 2
                        </td>
                        <td className="w-2/12 px-6 text-center py-4 text-sm text-gray-500">
                          {" "}
                          1 hr
                        </td>
                        <td className="w-2/12 px-6 py-4 text-center text-sm text-gray-500">
                          {" "}
                          {element.dueDate
                            ? element.dueDate
                            : FormatDateToday()}
                        </td>
                        <td className="w-2/12 px-6 text-center py-4 text-sm text-gray-500">
                          {" "}
                          {element.isCompleted ? (
                            <div className="block w-full text-sm py-2 px-4 rounded-full border-0 font-semibold completed-bg completed-text ">
                              <span className="">Completed</span>
                            </div>
                          ) : (
                            <div className="block w-full text-sm py-2 px-4 rounded-full border-0 font-semibold pending-bg pending-text ">
                              <span className="">Pending</span>
                            </div>
                          )}
                        </td>

                        {tabInfo !== Tab.HISTORY ? (
                          <td>
                            <Link to={`/task/${element._id}`}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 arrow-btn-center"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                              </svg>
                            </Link>
                          </td>
                        ) : (
                          <td>{""}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
