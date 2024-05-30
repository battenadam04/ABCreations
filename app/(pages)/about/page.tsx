import type { Metadata } from 'next';
import Features4 from '~/components/widgets/Features4';
import Hero2 from '~/components/widgets/Hero2';
import Stats from '~/components/widgets/Stats';
import { featuresFourAbout, featuresFourAboutTwo, hero2About, statsAbout } from '~/shared/data/pages/about.data';

export const metadata: Metadata = {
  title: `About us`,
  description: 'An independant company aimed at creating bespoke content. Currently we create t-shirt designs exclusively on Amazon and Books which come in a range of formats. Our books are currently exclusive to Amazon but we aim to branch out to other platforms in the future.'
};

const Page = () => {
  return (
    <>
      <Hero2 {...hero2About} />
      <Stats {...statsAbout} />
      <Features4 {...featuresFourAbout} />
      <Features4 {...featuresFourAboutTwo} />
    </>
  );
};

export default Page;
