import { DashboardDetail, WorkingHoursBreakdown } from ".";

export default function Dashboard() {
  return (
    <div className="flex-1 p-10 mt-12 text-2xl lg:absolute lg:width-80 right-0 sm:w-full sm:relative ">
      <DashboardDetail />
      <WorkingHoursBreakdown />
    </div>
  );
}
