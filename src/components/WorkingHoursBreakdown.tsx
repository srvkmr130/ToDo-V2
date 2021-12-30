import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { IState, DataSet, DataItem } from "../type";
import { bgColors, getRandomColor, labels } from "../utils/helper";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export default function WorkingHoursBreakdown() {
  const myTasks = useSelector((state: IState) => state.myTasks);
  var dataItemList: DataItem[] = [];
  for (let task of myTasks) {
    let currentTaskInList = dataItemList.filter(
      (item) => item.categoryName === task.category
    );
    let month = +task.dueDate.toString().split("-")[1];
    if (currentTaskInList.length > 0) {
      currentTaskInList[0].months.push(month);
    } else {
      dataItemList.push({ categoryName: task.category, months: [month] });
    }
  }

  var datasets: DataSet[] = [];

  for (var item of dataItemList) {
    var _date: number[] = new Array(12);
    let count = 1;
    for (let month of item.months) {
      _date[+month - 1] = count++;
    }
    // let color = bgColors[Math.floor(Math.random() * bgColors.length)];
    let color = getRandomColor();
    datasets.push({
      label: item.categoryName,
      data: _date,
      backgroundColor: color,
    });
  }

  return (
    <div className="mt-12 shadow-lg bg-gray-100 relative rounded-2xl">
      <div className="pt-4 pl-5">Working Hours Breakdown</div>
      <Bar
        className="py-2"
        width={100}
        height={30}
        options={options}
        data={{
          labels,
          datasets,
        }}
      />
    </div>
  );
}
