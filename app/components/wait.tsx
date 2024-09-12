"use client"
export default function Wait({text}: { text: string }) {
    return (
        <div className="p-16 w-full">
          <p className="shiny text-4xl font-extralight text-center ">{text}</p>
         </div>
    );
}