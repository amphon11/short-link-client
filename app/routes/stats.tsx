import { useParams } from "react-router";
import { TrackLink} from "../shortLink/trackLink"
import { Link } from "react-router";
import { Button } from "../components/ui/button";
export default function Stats() {
  // const { slug } = useParams(); // ✅ รับค่าจาก URL

  return (
     <div className="grid w-full justify-center">
          <main className="flex items-center justify-center pt-16 pb-4">
            <TrackLink />
          </main>
          <div className="flex justify-center">
            <Link to="/">
              <Button >Shorten another URL</Button>
            </Link>
          </div>
        </div>
  );
}
