import { NumberedStrip } from "./primitives";
import { stages } from "@/data/work";

/**
 * The five stages every project runs through, five across. Shared by /work/
 * and /build-a-bot/ so a property build and a Build-a-Bot show the same
 * process. Padding tightens at the five-across breakpoint: the cells are
 * ~215px there and generous padding left the copy at twenty characters a
 * line, below where a measure reads as a paragraph at all.
 */
export default function ProcessStrip() {
  return (
    <NumberedStrip
      items={stages}
      numeral={(stage) => stage.step}
      cols="sm:grid-cols-2 lg:grid-cols-5"
      cellClass="p-6 sm:p-7 lg:px-5 lg:py-6"
    />
  );
}
