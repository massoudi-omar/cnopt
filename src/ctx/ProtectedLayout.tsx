import { Outlet, useMatches } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ProtectedHeader from "../components/ProtectedHeader";
import TitleHeader from "../components/TitleHeader";

type MatchWithTitle = {
  handle?: {
    title?: string;
    [key: string]: any;
  };
};


export default function ProtectedLayout() {
  const matches = useMatches() as MatchWithTitle[];

  // Get the deepest matched route that has a title
  const currentMatch = matches
    .filter(match => match.handle?.title)
    .pop();

  const title = currentMatch?.handle?.title || "";

  return (
    <div className="flex flex-col min-h-screen bg-[#f9fafb] ">
      <ProtectedHeader />

      <div className="flex flex-1 mt-8 justify-center p-0 sm:p-6">

        <div className="flex max-w-7xl w-full rounded-lg overflow-hidden">
          <Sidebar />

          <main className="flex-1 px-4 lg:px-6 xl:px-12 2xl:px-24">
            <TitleHeader title={title} />
            <Outlet />
          </main>

        </div>
      </div>
    </div>
  );
}
