import PageHook from "@/app/pageHook";

import Features from "@/app/Features";
import Zigzag from "@/app/ZigZag";
import Hero from "@/app/Hero";
import Main from "@/app/Main";

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
