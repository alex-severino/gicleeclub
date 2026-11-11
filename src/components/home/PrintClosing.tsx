import Link from "next/link";
import { Action } from "@/components/blocks/Action";
import { contactHref } from "@/lib/site";
import { PrintTable } from "./PrintTable";

/** The closing invitation stays on the table, alongside the movable artworks. */
export function PrintClosing() {
  return (
    <PrintTable>
      <div className="board__call">
        <p className="eyebrow">Whenever you are ready</p>
        <h2 className="h-md">Send us your file</h2>
        <div className="board__actions">
          <Action href={contactHref()} label="Contact us" />
          <Link className="text-link" href="/sample-packs">
            Explore sample packs<span aria-hidden="true">{"\u00a0\u00a0"}→</span>
          </Link>
        </div>
      </div>
    </PrintTable>
  );
}
