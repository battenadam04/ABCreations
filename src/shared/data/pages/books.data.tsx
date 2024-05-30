import { HeroProps } from '~/shared/types';

// Hero data on Books page *******************
export const heroBooks: HeroProps = {
  title: 'Books',
  subtitle: (
    <>
      <span className="hidden md:inline">
        {`Here, you can explore all the captivating titles from our collection, available exclusively on Amazon. From insightful parenting and health guides to childrens entertainment, our selection aims to cater to every reader's taste. While Amazon is our current platform of choice, stay tuned for updates as we plan to expand our availability to other platforms in the future. Dive into our world of books and find your next great read!.`}
      </span>{' '}
      You can choose the plan that best suits your goals!
    </>
  ),
};
