import HadithsPage from "@/src/components/hadiths/HadithsPage";
import { getHadiths } from "@/app/_actions/hadiths.api";

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const response = await getHadiths(`${slug}&page=1`);

  return (
    <HadithsPage
      slug={slug}
      initialHadiths={response.hadiths.data || []}
      initialNext={response.hadiths.next_page_url || null}
      initialPrev={response.hadiths.prev_page_url || null}
    />
  );
}
