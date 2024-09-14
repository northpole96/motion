"use client";
import { motion } from "framer-motion";
export default function Page() {
  const data = Array(4).fill(0);

  return (
    <div className="h-screen w-screen flex justify-start items-start">
      <div className="flex gap-6">
        {data.map((temp) => (
          <motion.div className="h-10 w-10 rounded-full bg-yellow-700"></motion.div>
        ))}
      </div>
    </div>
  );
}
