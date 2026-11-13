import Link from "next/link";
import { Action } from "@/components/blocks/Action";
import { contactHref } from "@/lib/site";
import { PrintTable } from "./PrintTable";

/** The closing invitation stays on the table, alongside the movable artworks. */
export function PrintClosing() {
  return (
    <PrintTable>
      <div className="board__call">
        <p className="eyebrow">For work that carries your name</p>
        <h2 className="h-md">Send us your file</h2>
        <p className="board__intro">Tell us what you have in mind. We will consider the details with you.</p>
        <div className="board__actions">
          <Action href={contactHref()} label="Begin a conversation" />
          <Link className="text-link" href="/sample-packs">
            Explore sample packs<span aria-hidden="true">{"\u00a0\u00a0"}→</span>
          </Link>
        </div>
      </div>
    </PrintTable>
  );
}
