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

import { TopUrl } from "./topUrl";
import HistoryIcon from '@mui/icons-material/History';


export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"><HistoryIcon/></Button>
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
