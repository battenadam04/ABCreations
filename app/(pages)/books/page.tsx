import type { Metadata } from 'next';

import Hero from '~/components/widgets/Hero';
import { heroBooks } from '~/shared/data/pages/books.data';
import Link from 'next/link';
import Image from 'next/image';
import { booksContent } from '~/content/books/books';

export const metadata: Metadata = {
  title: 'Books',
};

const Page = async () => {
  return (
    <section className="mx-auto max-w-3xl px-6 py-12 sm:px-6 sm:py-16 lg:py-20">
      <Hero {...heroBooks} />
      <div className="grid grid-cols-1 gap-6  p-4 md:p-0 lg:grid-cols-2">
        {booksContent?.map(({ url, title, image }: { url: string, title: string, image: string }) => (
          <div key={url} className="flex flex-col overflow-hidden rounded-xl border border-gray-200 shadow-lg">
            <Link href={url}>
              <Image width={650} height={340} alt={title} src={`${image}`} />
              <h2 className="p-4 font-bold">{title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Page;
