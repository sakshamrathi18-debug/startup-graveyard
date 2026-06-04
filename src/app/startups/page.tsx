import { getPublishedStartups } from "@/data/startups";
import ArchiveClient from "./ArchiveClient";

export const metadata = {
  title: "Archive | Startup Graveyard",
  description: "Browse the complete database of failed AI startups.",
};

export default function ArchivePage() {
  const allStartups = getPublishedStartups();
  return <ArchiveClient allStartups={allStartups} />;
}
