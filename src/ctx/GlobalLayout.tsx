import Footer from "../components/Footer";
import Header from "../components/Header";
import type { ReactNode } from "react";

type GlobalLayoutProps = {
  children: ReactNode;
};

export default function GlobalLayout({ children }: GlobalLayoutProps) {
  return (
    <div className=" flex flex-col min-h-screen overflow-hidden ">
      <Header />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden ">{children}</div>
      <Footer />
    </div>
  );
}
