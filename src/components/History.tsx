import { DashboardDetail, Tasks } from ".";
export default function History() {
  return (
    <div className="flex-1 mt-12 p-10 text-2xl absolute lg:width-80 right-0 sm:w-full">
      <DashboardDetail />
      <Tasks />
    </div>
  );
}
