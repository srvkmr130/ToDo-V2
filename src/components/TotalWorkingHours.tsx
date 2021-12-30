import { useSelector } from "react-redux";
import { ChartDonut, ChartThemeColor } from "@patternfly/react-charts";
import { IState } from "../type";

export default function TotalWorkingHours() {
  const myTasks = useSelector((state: IState) => state.myTasks);
  console.log(myTasks);
  var _ = require("lodash");
  const category = myTasks.map((element) => element.category);
  var categoryList = _.groupBy(category);
  var new_result = Object.keys(categoryList).map((k) => {
    return categoryList[k];
  });
  var groupedCategory = new_result.map((i) => {
    return { x: i[0], y: i.length };
  });
  var legendDataForCategory = new_result.map((i) => {
    return { name: `${i[0]} : ${i.length} hr` };
  });
  var total = groupedCategory.reduce(function (a, b) {
    return a + b.y;
  }, 0);
  console.log(groupedCategory);
  return (
    <div className="shadow-lg bg-gray-100 relative rounded-2xl">
      <div className="pt-4 pl-5">Total Working Hours</div>
      <ChartDonut
        ariaDesc="Total Working Hours"
        ariaTitle="Total Working Hours"
        constrainToVisibleArea={true}
        data={groupedCategory}
        labels={({ datum }) => `${datum.x}: ${datum.y}%`}
        legendData={legendDataForCategory}
        legendOrientation="vertical"
        legendPosition="right"
        padding={{
          bottom: 20,
          left: 20,
          right: 140,
          top: 20,
        }}
        subTitle="hrs"
        title={`${total}`}
        themeColor={ChartThemeColor.multiOrdered}
        width={300}
        height={130}
      />
    </div>
  );
}
