import type { Route } from "./+types/home";

import { ShortLink } from "../shortLink/shortLink";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { TopUrl } from "~/shortLink/topUrl";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "ShortURL" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="grid w-full justify-center">
      <main className="flex items-center justify-center pt-16 pb-4">
        <ShortLink />
      </main>
      <div className="flex justify-center">
        <Link to="/stats">
          <Button>Track clicks from another short URL</Button>
        </Link>
      </div>
      <TopUrl/>
    </div>
  );
}
