"use client";
import { Button } from "@/components/ui/button"

export function ButtonSecondary() {
  return <Button variant="secondary">Secondary</Button>
}

import { useState } from "react";
import random from "random";
import Blue from "@/app/components/Blue";
import Cold, { LongCard, BaseCards } from "../../components/Card";

export default function Page() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState<string[]>(["12"]);

  return (
    <div className="h-screen w-screen p-10 overflow-scroll grid grid-cols-12 gap-4  ">
      {/* <button
        className="w-32 py-2 border-2 border-black hover:bg-zinc-300 rounded-lg"
        onClick={() => setCount(count - 1)}
      >
        minus
      </button>

      <p className="w-10  inline-block px-4">{count}</p>
      <button
        className=" py-2 border-2 w-32 border-black hover:bg-zinc-300 rounded-lg"
        onClick={() => setCount(count + 1)}
      >
        plus
      </button>
      <Blue />
      <Cold />
      <LongCard onClick={()=>setCount(count+1)} name="rajesh" age={21} /> */}

      <BaseCards
        onClick={() => {
          setData([...data, random.int(1, 100).toString()]);
        }}
        name="Add"
        item="Add"
      />
      {data.map((item, index) => (
        <BaseCards item={item} onClick={() => {}} name={index.toString()} />
      ))}
      <div className="flex flex-col gap-3">
    <Button  variant="default">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="outline">outline</Button>
    <Button variant="destructive">Destructive</Button>
    </div>
    </div>
  );
}
