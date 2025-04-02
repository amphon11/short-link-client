import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { TopUrl } from "./topUrl";

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">History</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] ">
        <DialogHeader>
          <DialogTitle>History Shorten Url</DialogTitle>
          <DialogDescription>
          Show history of url and shorten entries and number of times.
          </DialogDescription>
        </DialogHeader>
        <TopUrl />
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
