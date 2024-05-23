import { HeroProps } from '~/shared/types';

// Hero data on Books page *******************
export const heroBooks: HeroProps = {
  title: 'Books',
  subtitle: (
    <>
      <span className="hidden md:inline">
        {`Here, you'll find a clear breakdown of our service plans and their respective features. Whether you're a small
        business or a large enterprise, we have options tailored to your needs.`}
      </span>{' '}
      You can choose the plan that best suits your goals!
    </>
  ),
};