import PageHook from "@/app/pageHook";

import Features from "./Features";
import Zigzag from "@/Components/ZigZag";
import Hero from "@/Components/Hero";
import Main from "@/Components/Main";

function page() {
 return (
    <>
      <Hero />
      <Main/>
      <Features />
      <Zigzag />
    <PageHook/>
    </>
 )
}

export default page;
