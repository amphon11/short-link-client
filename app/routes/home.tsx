import type { Route } from "./+types/home";
import { ShortLink } from "../shortLink/shortLink";



export function meta({}: Route.MetaArgs) {
  return [
    { title: "ShortURL" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="grid w-full justify-center">
      <main className="flex items-center justify-center pt-5 pb-4">
        <ShortLink />
      </main>
      {/* <TopUrl/> */}
    </div>
  );
}
