import type { Metadata } from 'next';

import { SITE } from '~/config.js';

import Hero from '~/components/widgets/Hero';
import Content from '~/components/widgets/Content';
import Testimonials from '~/components/widgets/Testimonials';
import { contentHomeOne, contentHomeTwo, heroHome, testimonialsHome } from '~/shared/data/pages/home.data';

export const metadata: Metadata = {
  title: SITE.title,
};

export default function Page() {
  return (
    <>
      <Hero {...heroHome} />
      <Content {...contentHomeOne} />
      <Content {...contentHomeTwo} />
      <Testimonials {...testimonialsHome} />
    </>
  );
}
