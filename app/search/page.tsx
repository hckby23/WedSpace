import { Suspense } from "react";
import { SearchContent } from "@/components/search/search-content";
import { SearchLoading } from "@/components/search/search-loading";

export default function Page() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchContent />
    </Suspense>
  );
}
