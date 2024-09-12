"use client";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import Wait from "./components/wait";
import Highlighter from "react-highlight-words";
import AboutBtn from "./components/aboutBtn";
import { render } from "react-dom";
import { GitHubLogoIcon, IdCardIcon } from "@radix-ui/react-icons";

type SearchResult = {
  url: string;
  sentence: string;
  score: number;
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [url, setUrl] = useState("");

  const handleSearch = () => {
    // Logic for searching with the URL and query
    console.log("Searching for:", url, searchQuery);
  };

  const onSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:5000/search`, {
        method: "POST",
        body: JSON.stringify({ url: url, q: searchQuery }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      console.log("got the data ==> ", data);
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    setLoading(false);
  };

  const highlightWords = (text: string, wordsToHighlight: string[]) => {
    if (!wordsToHighlight.length) return text;

    const regex = new RegExp(`\\b(${wordsToHighlight.join("|")})\\b`, "gi");
    return text.replace(
      regex,
      (match) =>
        `<span class="bg-yellow-300 text-black font-bold">${match}</span>`
    );
  };

  // useEffect(() => {

  //   const highlightedResults = searchResults.map(result => ({
  //     ...result,
  //     sentence: highlightWords(result.sentence, searchQuery.split(' '))
  //   }));
  //   setSearchResults(highlightedResults);
  // }, [searchQuery, searchResults]);

  const renderSearchResults = () => {
    if (loading) {
      return <Wait text="Analyzing..." />;
    }
  
    if (!searchQuery && !url) {
      return (
        <div className="text-center">
          <p className="text-gray-400 text-lg">Enter a URL and search query to begin.</p>
          <p className="text-gray-500 mt-2">Your search results will appear here.</p>
        </div>
      );
    }
  
    if (searchResults.length === 0) {
      return (
        <div className="text-center">
          <p className="text-gray-400 text-lg">No results found.</p>
          <p className="text-gray-500 mt-2">Try a different search query or URL.</p>
        </div>
      );
    }
  
    return (
      <div className="flex flex-col gap-6 w-full">
        {searchResults.map((result, i) => (
          <div
            key={i}
            className="relative w-full rounded-xl p-6 bg-black border border-solid border-gray-900 shadow-lg text-white transition-transform transform hover:scale-[100.5%] cursor-pointer"
          >
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 text-sm absolute top-4 left-4 underline"
            >
              {result.url}
            </a>
            <p className="mt-8 text-sm">
              <Highlighter
                highlightClassName="SearchHighlight"
                searchWords={searchQuery.split(" ")}
                autoEscape={true}
                textToHighlight={result.sentence}
                highlightStyle={{
                  backgroundColor: "rgba(55,65,81,0.35)",
                  fontWeight: "bold",
                  color:"rgba(100,100,100)",
                  padding: "2px",
                  margin: "2px",
                }}
              />
            </p>
          </div>
        ))}
      </div>
    );
  };


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black text-white">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full px-24">
        {/* Search bar */}
        <div className="fixed  top-0 left-0 mg:h-[35vh] lg:h-[40vh] md:px-20 lg:px-24 pt-40  flex flex-col md:flex-row justify-between gap-4 items-center  w-full z-50 bg-black">
         <div className="absolute top-6 left-8 flex items-center gap-3">
          <div className="h-5 w-5 rounded-full bg-green-500/10 ease-in animate-ping"/>
          <h1 className=" font-extrabold text-xl text-stone-300">the-Anything-Search</h1>
         </div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            className="w-80 h-12 px-4 py-2 rounded-[15px] border border-solid bg-black border-gray-900 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-600 text-base sm:text-lg sm:px-5 text-white"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter Search Query"
            className="h-12 w-80 md:w-full px-4 py-2 rounded-[15px] border border-solid bg-black border-gray-900 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-600 text-base sm:text-lg sm:px-5 text-white"
          />
          <button
            onClick={onSearch}
            className="h-12 px-14 md:px-8 bg-gray-800 hover:bg-gray-900 rounded-[15px] text-white font-medium shadow-md hover:shadow-lg transition-transform transform hover:scale-[100.5%]"
          >
            Search
          </button>
        </div>

        <div className="flex flex-col gap-6 md:px-10 pt-60 md:pt-40 justify-center items-center w-full ">
          {
            renderSearchResults()
          }
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-400"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
         <GitHubLogoIcon/>
          Repository
        </a>
        <AboutBtn/>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-400"
          href="https://www.zeamani.com"
          target="_blank"
          rel="noopener noreferrer"
        >
         
          
         Me →
        </a>
      </footer>
    </div>
  );
}
