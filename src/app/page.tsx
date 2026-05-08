"use client";
import Image from "next/image";
import dynamic from "next/dynamic";

function Home() {
  return (
    <main className="flex flex-1 w-full flex-col items-center py-32 px-16 bg-white dark:bg-neutral-800">
    </main>
  );
}

export default dynamic(() => Promise.resolve(Home), { ssr: false })
