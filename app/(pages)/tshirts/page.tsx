import type { Metadata } from 'next';

import Hero from '~/components/widgets/Hero';
import Link from 'next/link';
import Image from 'next/image';
import { heroTshirts } from '~/shared/data/pages/tShirts.data';
import { tshirtsContent } from '~/content/tshirts/tshirts';
import InfoAlert from '~/components/widgets/infoAlert';

export const metadata: Metadata = {
  title: 'Merch T-shirts',
  description: 'Amazon Merch T-shirt designs ranging from bespoke graphic designs aimed at Dads, Fathers Pa Pas and Grandads, with more to come.',
};

const Page = async () => {
  return (
    <section className="mx-auto max-w-3xl px-6 py-12 sm:px-6 sm:py-16 lg:py-20">

      <InfoAlert value='Some T-shirts may only be available via Amazon US, they will gradually become available for other countries.'/>
      <Hero {...heroTshirts} />
      <div className="grid grid-cols-1 gap-6  p-4 md:p-0 lg:grid-cols-2">

        {tshirtsContent.map(({ url, subTitle, title, image }: { url: string; subTitle: string, title: string; image: string }) => (
          <div key={url} className="flex flex-col overflow-hidden rounded-xl border border-gray-200 shadow-lg">
            <Link href={url}>
              <Image width={650} height={340} alt={subTitle} src={`${image}`} />
              <h2 className="p-4 font-bold text-center">{title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Page;
