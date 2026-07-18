import { permanentRedirect } from "next/navigation";

export default function GamesPage() {
  permanentRedirect("/games/calculator");
}
