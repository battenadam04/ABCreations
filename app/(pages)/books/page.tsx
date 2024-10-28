import type { Metadata } from 'next';

import Hero from '~/components/widgets/Hero';
import { heroBooks } from '~/shared/data/pages/books.data';
import Link from 'next/link';
import Image from 'next/image';
import { booksContent } from '~/content/books/books';

export const metadata: Metadata = {
  title: 'Books',
  description:
    'Books including the popular and upcoming Dads First Steps: The Step-By-Step fathers Guide to Nurturing Bonds, Reducing Stress, and Building Healthier Relationships with their and Hack Your Gut: Simple Secrets to Digestive Harmony: The 10 step Guide to Stress-Free Digestion for Energy, Weight, and Emotional Well-being. Currently exclusively on Amazon market place but we plan to hit other platforms in the not so distant future.',
};

const Page = async () => {
  return (
    <section className="mx-auto max-w-3xl px-6 py-12 sm:px-6 sm:py-16 lg:py-20">
      <Hero {...heroBooks} />
      <div className="grid grid-cols-1 gap-6  p-4 md:p-0 lg:grid-cols-2">
        {booksContent?.map(
          ({ url, subTitle, title, image }: { url: string; subTitle: string; title: string; image: string }) => (
            <div key={url} className="flex flex-col overflow-hidden rounded-xl border border-gray-200 shadow-lg">
              <Link href={url}>
                <Image width={650} height={340} alt={title + ': ' + subTitle} src={`${image}`} />
                <h1 className="p-4 font-bold text-center">{title}</h1>
              </Link>
            </div>
          ),
        )}
      </div>
    </section>
  );
};

export default Page;
