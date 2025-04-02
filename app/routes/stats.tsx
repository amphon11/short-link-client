import { useParams } from "react-router";
import { TrackLink} from "../shortLink/trackLink"
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { DialogDemo } from "~/shortLink/dialog";
export default function Stats() {
  // const { slug } = useParams(); // ✅ รับค่าจาก URL

  return (
     <div className="grid w-full justify-center">
          <main className="flex items-center justify-center pt-16 pb-4">
            <TrackLink />
          </main>
        </div>
  );
}
