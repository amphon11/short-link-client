import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
type TrackClicksModalProps = {
  open: boolean;
  handleClose: () => void;
};

export function TrackClicksModal({ open, handleClose }: TrackClicksModalProps) {
  const [shortUrl, setShortUrl] = useState("");
  const [clickCount, setClickCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckClicks = async () => {
    if (!shortUrl) return;
    setLoading(true);
    setError("");

    try {
      const urlParts = shortUrl.trim().split("/");
      const slug = urlParts[urlParts.length - 1]; // เอาส่วนท้ายสุดของ URL (slug)
      const response = await axios.get(
        `http://localhost:8000/api/clicks/${slug}`
      );
      setClickCount(response.data.clicks);
    } catch (err) {
      setError("Failed to fetch click data");
      console.error("Error fetching clicks:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box sx={style}>
        <Typography id="modal-title" variant="h6">
          Check Clicks on Short URL
        </Typography>
        <Input
          placeholder="Enter short URL..."
          value={shortUrl}
          onChange={(e) => setShortUrl(e.target.value)}
          className="mt-2"
        />
        <Button onClick={handleCheckClicks} disabled={loading} className="mt-2">
          {loading ? "Checking..." : "Check Clicks"}
        </Button>
        {clickCount !== null && (
          <Typography sx={{ mt: 2 }}>Total Clicks: {clickCount}</Typography>
        )}
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Modal>
  );
}
