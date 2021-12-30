import React from "react";
import { useFormInput } from "../customHooks/hooks";
import { firestore } from "../config/firebase";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { addTaskActionCreator } from "../features/myTasks";
import { Tasks } from ".";
import { ITask } from "../type";
import { FormatDateToday } from "../utils/helper";
import { Priority, Repeat } from "../enums/enums";

export default function MyTasks() {
  const dispatch = useDispatch();
  const task = useFormInput("");
  const category = useFormInput("");

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var newId = uuid();
    if (task.value && category.value) {
      var _task: ITask = CreateNewTask();
      firestore.collection("tasks").add({ ..._task });
      dispatch(addTaskActionCreator({ ..._task }));

      task.onChange(null, true, "");
      category.onChange(null, true, " ");
    }
    function CreateNewTask() {
      return {
        id: newId,
        task: task.value,
        category: category.value,
        isCompleted: false,
        description: "Add Description...",
        dueDate: FormatDateToday(),
        priority: Priority.LOW,
        remind: FormatDateToday(),
        repeat: Repeat.MONTHLY,
        userId: localStorage.getItem("userId"),
        createdAt: new Date(),
      } as ITask;
    }
  };
  return (
    <div className="flex-1 lg:p-10 mt-12 text-2xl lg:absolute lg:width-80 right-0 sm:w-full sm:relative sm:p-5">
      <div className="pt-10 pl-6 rounded-2xl" id="task-bg">
        <p className="absolute lg:top-12 text-xl text-white font-medium sm:top-6 top-0">
          Add My Day Task
        </p>
        <form onSubmit={submitForm} className="flex">
          <div className="flex w-5/12 flex-col">
            <div className="mx-3 text-white font-light text-sm">
              <label>Task</label>
            </div>
            <div>
              <input
                className="rounded-md m-2 w-11/12 text-sm py-1 text-white bg-custom-violet px-3"
                {...task}
              />
            </div>
          </div>
          <div className="flex w-4/12 flex-col">
            <div className="mx-3 text-white font-light text-sm">
              <label>Category</label>
            </div>
            <input
              className="rounded-md m-2 text-white text-sm px-3 py-1 bg-custom-violet"
              {...category}
            />
            <div></div>
          </div>
          <div className="w-2/12 m-6">
            <button className="w-4/6 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 leading-4 mt-2px">
              Add
            </button>
          </div>
        </form>
      </div>
      <Tasks />
    </div>
  );
}
