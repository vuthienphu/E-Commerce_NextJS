
import Search from '@/component/search/Search';

interface PageProps {
  searchParams: Promise<{
    keyword?: string;
  }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { keyword } = await searchParams;

  return (
    <div>
      {/* Truyền keyword vào component hiển thị */}
      <Search keyword={keyword ?? ""} />
    </div>
  );
}
