import { HeroProps } from '~/shared/types';

// Hero data on T-shirts page *******************
export const heroTshirts: HeroProps = {
  title: 'Merch T-shirts',
  subtitle: (
    <>
      <span className="hidden md:inline">
        {`Welcome to the vibrant world of ABCreativeLabs t-shirts, exclusively available on Amazon Merch. Our collection features an array of categories designed to cater to every personality, passion, and style. Whether you're searching for something casual, statement-making, or uniquely artistic, we have a t-shirt for you.`}
      </span>{' '}
      You can choose the plan that best suits your goals!
    </>
  ),
};
