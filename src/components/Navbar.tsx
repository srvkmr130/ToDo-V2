import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../type";
import { Tab } from "../enums/enums";
import { updateTabActionCreator } from "../features/tab";
import { useLocation } from "react-router-dom";
import { useFormInput } from "../customHooks/hooks";

export default function Navbar() {
  const tabInfo = useSelector((state: IState) => state.tab);
  const dispatch = useDispatch();
  const myTasks = useSelector((state: IState) => state.myTasks);
  var _ = require("lodash");
  const category = myTasks.map((element) => element.category);
  var categoryList = _.groupBy(category);
  var new_result = Object.keys(categoryList).map((k) => {
    return categoryList[k];
  });
  var groupedCategory: string[] = new_result.map((i) => {
    return i[0];
  });
  const searchText = useFormInput("");
  const location = useLocation();

  function handleOnTabChange(tab: string) {
    dispatch(updateTabActionCreator(tab));
    localStorage.setItem("currentTab", tab);
  }

  return (
    <div
      className={
        location.pathname === `/login`
          ? "hidden"
          : "sidebar lg:block sm:hidden overflow-hidden fixed lg:width-20 bg-gray-200 text-slate-800 md:w-0  space-y-6 h-screen py-7 px-2 inset-y-0 left-0 transform -translate-x-full md:translate-x-0 transition duration-200 ease-in-out"
      }
    >
      <div className="divide-y mt-5 divide-zinc-900 > * + *">
        <div>
          <div className="text-slate-500  flex items-center space-x-2 px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-2xl font-extrabold">ToDo App</span>
          </div>

          {/* NavBar */}
          <nav className="my-6">
            <Link
              to="/"
              onClick={() => {
                handleOnTabChange(Tab.DASHBOARD);
              }}
              className={
                tabInfo === Tab.DASHBOARD
                  ? "block w-2/3 my-3 py-2.5 px-4 rounded-full transition duration-200 bg-blue-700 text-white"
                  : "block w-2/3 my-3 py-2.5 px-4 rounded-full transition duration-200 hover:bg-blue-700 hover:text-white"
              }
            >
              Dashboard
            </Link>
            <Link
              to="/myTasks"
              onClick={() => {
                handleOnTabChange(Tab.MY_TASKS);
              }}
              className={
                tabInfo === Tab.MY_TASKS
                  ? "block w-2/3 my-3 py-2.5 px-4 rounded-full transition duration-200 bg-blue-700 text-white"
                  : "block w-2/3 my-3 py-2.5 px-4 rounded-full transition duration-200 hover:bg-blue-700 hover:text-white"
              }
            >
              {" "}
              My Daily Tasks
            </Link>

            <Link
              to="/tasks"
              onClick={() => {
                handleOnTabChange(Tab.TASKS);
              }}
              className={
                tabInfo === Tab.TASKS
                  ? "block w-2/3 my-3 py-2.5 px-4 rounded-full transition duration-200 bg-blue-700 text-white"
                  : "block w-2/3 my-3 py-2.5 px-4 rounded-full transition duration-200 hover:bg-blue-700 hover:text-white"
              }
            >
              Tasks
            </Link>

            <Link
              to="/history"
              onClick={() => {
                handleOnTabChange(Tab.HISTORY);
              }}
              className={
                tabInfo === Tab.HISTORY
                  ? "block w-2/3 my-3 py-2.5 px-4 rounded-full transition duration-200 bg-blue-700 text-white"
                  : "block w-2/3 my-3 py-2.5 px-4 rounded-full transition duration-200 hover:bg-blue-700 hover:text-white"
              }
            >
              History
            </Link>
          </nav>
        </div>
        <div>
          <div className="flex">
            <div className="flex items-center justify-center w-64 h-9 border rounded-2xl border-gray-200">
              <div className="margin-x-1px">
                <button className="leading-3 py-2 w-full px-2 relative font-light text-slate-600 rounded hover:bg-blue-500 hover:text-white transition mt-2px duration-300">
                  Todo List
                </button>
              </div>
              <div className="margin-x-1px">
                <button className="py-2 px-2 w-full font-light relative text-slate-600 rounded hover:bg-blue-500 hover:text-white transition leading-3 mt-2px duration-300">
                  Category
                </button>
              </div>
              <div className="margin-x-1px">
                <button className="py-2 px-2 w-full font-light relative text-slate-600 rounded hover:bg-blue-500 hover:text-white leading-3 mt-2px transition duration-300">
                  Tags
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="container flex w-3/4 overflow-hidden ">
              <div className="flex border-2 rounded-2xl mt-5 overflow-hidden  ">
                <button className="flex items-center justify-center px-4 border-r bg-white">
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
                  </svg>
                </button>
                <input
                  type="text"
                  className="px-4 py-2"
                  placeholder="Search..."
                  {...searchText}
                />
              </div>
            </div>
            <div className="w-12 ml-2 border rounded-2xl bg-white add-icon">
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-col mt-2">
            {groupedCategory
              .filter((x) => x.includes(searchText.value))
              .map((x, index) => {
                return (
                  <div
                    key={index}
                    className="flex py-1 pl-8 mt-2 text-custom-violet"
                  >
                    <div className="font-size-15px">
                      <i className="fas fa-th-large"></i>
                    </div>
                    <div className="ml-5 leading-6 text-blue-600 cursor-pointer hover:text-blue-900 font-normal text-lg">
                      {x}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
