import React, { useEffect, useState } from "react";
import { firestore } from "../config/firebase";
import { Link, useParams } from "react-router-dom";
import { MyTasks } from ".";
import { useFormInput } from "../customHooks/hooks";
import { ITask } from "../type";
import { Priority, Repeat } from "../enums/enums";

function TaskDetail() {
  const [task, setTask] = useState({} as ITask);
  const { taskId: id } = useParams();
  const description = useFormInput("");
  const dueDate = useFormInput("");
  const remind = useFormInput("");
  const category = useFormInput("");
  const priority = useFormInput(Priority.LOW);
  const repeat = useFormInput(Repeat.MONTHLY);
  const [completed, setCompleted] = useState(false);
  const [subTasks, setSubTasks] = useState([
    "Subtask1",
    "Subtask2",
  ] as string[]);

  const submitForm = (event: React.MouseEvent) => {
    event.preventDefault();
    const docRef = firestore.collection("tasks").doc(id);
    console.log(docRef);
    docRef
      .update({
        description: description.value,
        dueDate: dueDate.value,
        category: category.value,
        priority: priority.value,
        remind: remind.value,
        repeat: repeat.value,
        isCompleted: completed !== undefined ? completed : false,
      })
      .then(() => {
        console.log("Updated successfully");
      })
      .catch((error) => {
        console.log("Error", error);
      });
    // eslint-disable-next-line no-restricted-globals
    window.history.back();
  };

  useEffect(() => {
    firestore
      .collection("tasks")
      .doc(id)
      .onSnapshot((snapshot) => {
        const task = snapshot.data() as ITask;
        console.log("Snapshot data", task);
        setTask(task);
        UpdateInitialValue(task);
      });
  }, [id]);

  function UpdateInitialValue(task: any) {
    description.onChange(
      null,
      true,
      task?.description === "" ? "Add Description..." : task?.description
    );
    dueDate.onChange(null, true, task?.dueDate);
    category.onChange(null, true, task?.category);
    priority.onChange(null, true, task?.priority);
    remind.onChange(null, true, task?.remind);
    setCompleted(task?.isCompleted === "" ? false : task?.isCompleted);
  }

  function addSubTask(event: React.MouseEvent) {
    event.preventDefault();
    setSubTasks([...subTasks, "Subtask"]);
  }
  function removeSubTask(subTask: string) {
    console.log(subTask);
    setSubTasks(subTasks.filter((item) => item !== subTask));
  }
  function setStatus(event: React.MouseEvent, isCompleted: boolean) {
    event.preventDefault();
    setCompleted(isCompleted);
  }
  function deleteTask(event: React.MouseEvent) {
    event.preventDefault();
    const docRef = firestore.collection("tasks").doc(id);
    docRef
      .delete()
      .then(() => {
        console.log("Task deleted successfully");
      })
      .catch((error) => {
        console.log("Error in updating task", error);
      });
    // eslint-disable-next-line no-restricted-globals
    window.history.back();
  }
  return (
    <div className="flex-1 text-2xl">
      <MyTasks />
      <div className="fixed overflow-y-scroll no-scrollbar z-40 h-full shadow-lg p-4 w-3/12 top-0 right-0 task-detail-container rounded-3xl">
        <div className="relative grid grid-cols-1 divide-y">
          <div>
            <span className="font-bold font-sans not-italic text-lg leading-5 h-5 tracking-wide">
              TASK DETAILS
            </span>
            <Link
              to={`/myTasks`}
              className="absolute inline-block right-1 top-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Link>
            <div className="flex py-1 mt-2">
              <div className="font-size-15px">
                <i className="far fa-circle"></i>
              </div>
              <div className="ml-5 leading-6 text-gray-800 font-normal text-lg">
                {task?.task}
              </div>
            </div>
          </div>
          <div>
            <form className="grid grid-cols-1 divide-y">
              <div className="flex pt-1 pb-2">
                <div className="font-size-15px">
                  <i className="fas fa-th-large"></i>
                </div>
                <div className="flex flex-col ml-5 leading-6">
                  <div className="text-gray-400 font-light text-lg">
                    Category
                  </div>
                  <div>
                    <input
                      className="text-gray-800 font-light text-lg bg-transparent"
                      {...category}
                    />
                  </div>
                </div>
              </div>
              <div className="flex pt-1 pb-2">
                <div className="font-size-15px">
                  <i className="far fa-file-alt"></i>
                </div>
                <div className="flex flex-col ml-5 leading-6">
                  <div className="text-gray-400 font-light text-lg">
                    Description
                  </div>
                  <div>
                    <input
                      className="text-gray-800 font-light text-lg bg-transparent"
                      {...description}
                    />
                  </div>
                </div>
              </div>
              <div className="flex pt-1 pb-2">
                <div className="font-size-15px">
                  <i className="far fa-file-alt"></i>
                </div>
                <div className="flex flex-col ml-5 leading-6 w-full">
                  <div className="text-gray-400 font-light text-lg">Status</div>
                  {completed && (
                    <div className="flex justify-between">
                      <div>
                        <button
                          onClick={(e) => setStatus(e, false)}
                          className="ml-auto justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-slate-800 bg-white hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 leading-4 mt-2px"
                        >
                          Pending
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={(e) => setStatus(e, true)}
                          className="ml-auto justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-slate-800 bg-green-100 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 leading-4 mt-2px"
                        >
                          Completed
                        </button>
                      </div>
                    </div>
                  )}
                  {!completed && (
                    <div className="flex justify-between">
                      <div>
                        <button
                          onClick={(e) => setStatus(e, false)}
                          className="ml-auto justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-slate-800 bg-red-100 hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 leading-4 mt-2px"
                        >
                          Pending
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={(e) => setStatus(e, true)}
                          className="ml-auto justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-slate-800 bg-white hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 leading-4 mt-2px"
                        >
                          Completed
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex pt-1 pb-2">
                <div className="font-size-15px">
                  <i className="far fa-calendar-alt"></i>
                </div>
                <div className="flex flex-col ml-5 leading-6">
                  <div className="text-gray-400 font-light text-lg">
                    Due Date
                  </div>
                  <div>
                    <input
                      className="text-gray-800 font-light text-lg bg-transparent"
                      type="date"
                      {...dueDate}
                    />
                  </div>
                </div>
              </div>
              <div className="flex pt-1 pb-2">
                <div className="font-size-15px">
                  <i className="far fa-calendar-alt"></i>
                </div>
                <div className="flex flex-col ml-5 leading-6">
                  <div className="text-gray-400 font-light text-lg">
                    Remind me
                  </div>
                  <div>
                    <input
                      className="text-gray-800 font-light text-lg bg-transparent"
                      type="date"
                      {...remind}
                    />
                  </div>
                </div>
              </div>
              <div className="flex pt-1 pb-2">
                <div className="font-size-15px">
                  <i className="far fa-flag"></i>
                </div>
                <div className="flex flex-col ml-5 leading-6">
                  <div className="text-gray-400 font-light text-lg">
                    Priority
                  </div>
                  <div>
                    <select
                      className="text-gray-800 font-light text-lg bg-transparent"
                      {...priority}
                    >
                      <option value={Priority.URGENT}>{Priority.URGENT}</option>
                      <option value={Priority.LOW}>{Priority.LOW}</option>
                      <option value={Priority.MEDIUM}>{Priority.MEDIUM}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex pt-1 pb-2">
                <div className="font-size-15px">
                  <i className="far fa-calendar-alt"></i>
                </div>
                <div className="flex flex-col ml-5 leading-6">
                  <div className="text-gray-400 font-light text-lg">
                    SUBTASK
                  </div>
                  <div>
                    <button
                      className="font-size-15px text-blue-400 hover:text-blue-800"
                      onClick={addSubTask}
                    >
                      + Add Subtask
                    </button>
                    {subTasks.length > 0 && (
                      <div>
                        {subTasks.map((subTask: string, index) => (
                          <div className="flex pt-1 pb-2">
                            <div className="font-size-15px">
                              <i className="far fa-file-alt"></i>
                            </div>
                            <div className="ml-5 leading-6">
                              <div className="text-gray-800 font-light text-lg">
                                {subTask}
                              </div>
                            </div>
                            <div
                              className="absolute right-2 text-gray-400 cursor-pointer hover:text-gray-600"
                              onClick={() => {
                                removeSubTask(subTask);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex pt-1 pb-2 mb-20">
                <div className="font-size-15px">
                  <i className="fas fa-redo"></i>
                </div>
                <div className="flex flex-col ml-5 leading-6">
                  <div className="text-gray-400 font-light text-lg">Repeat</div>
                  <div>
                    <select
                      className="text-gray-800 font-light text-lg bg-transparent"
                      {...repeat}
                    >
                      <option value={Repeat.MONTHLY}>{Repeat.MONTHLY}</option>
                      <option value={Repeat.WEEKLY}>{Repeat.WEEKLY}</option>
                      <option value={Repeat.YEARLY}>{Repeat.YEARLY}</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="z-50 task-detail-save-delete bg-slate-200 rounded-xl fixed bottom-0 right-0 w-3/12">
        <div className="flex w-full justify-around py-6">
          <div className="w-2/5">
            <button
              onClick={deleteTask}
              className="flex justify-center py-1 px-4"
            >
              {" "}
              <i className="far fa-trash-alt text-red-400 hover:text-red-700"></i>
            </button>
          </div>
          <div className="w-3/5">
            <button
              onClick={submitForm}
              className="flex ml-auto text-white justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-blue-400 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 leading-4 mt-2px"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;
