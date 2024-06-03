import {
  IconArrowsRightLeft,
  IconBrandLinkedin,
  IconBrandTailwind,
  IconBrandTwitter,
  IconBulb,
  IconClock,
  IconComponents,
  IconListCheck,
  IconMail,
  IconMapPin,
  IconNotebook,
  IconPhoneCall,
  IconRocket,
  IconShirt,
} from '@tabler/icons-react';
import {
  ContactProps,
  ContentProps,
  FAQsProps,
  FeaturesProps,
  HeroProps,
  PricingProps,
  TeamProps,
  TestimonialsProps,
} from '../../types';
import homepage from '~/assets/images/homepage.png';
import homepage2 from '~/assets/images/homepage2.png';
import homepage3 from '~/assets/images/homepage3.png';

// Hero data on Home page *******************
export const heroHome: HeroProps = {
  title: <>Delivering Bespoke Content with the Aim to Expand Across Multiple Platforms</>,
  subtitle: (
    <>
      <span className="hidden md:inline">
        Explore AB Creative Labs for exclusive KDP books and custom-designed t-shirts, all available directly on Amazon.
        Dive into our unique collection and find your next favorite read or wardrobe addition with just a click!
      </span>
    </>
  ),
  callToAction: {
    text: 'Books',
    href: '/books',
    icon: IconNotebook,
    targetBlank: true,
  },
  callToAction2: {
    text: 'T-Shirts',
    href: '/tshirts',
    icon: IconShirt,
  },
  image: {
    src: homepage,
    alt: 'Hero TailNext',
  },
};

// Features data on Home page *******************
export const featuresHome: FeaturesProps = {
  id: 'features-on-home',
  hasBackground: false,
  columns: 3,
  header: {
    title: (
      <>
        What you get with <span className="whitespace-nowrap">TailNext</span>
      </>
    ),
    subtitle:
      "Elevating Your Digital Presence: Discover the Synergies Unleashed in Our Platform's Core Strengths, from Seamless Integration to Open Collaboration.",
    tagline: 'Features',
  },
  items: [
    {
      title: 'Next.Js + Tailwind CSS Integration',
      description:
        'A seamless integration between two great frameworks that offer high productivity, performance and versatility.',
      icon: IconBrandTailwind,
      callToAction: {
        text: 'Discover now',
        href: '/',
      },
    },
    {
      title: 'Ready-to-use Components',
      description:
        'Widgets made with Tailwind CSS ready to be used in Marketing Websites, SaaS, Blogs, Personal Profiles, Small Business...',
      icon: IconComponents,
      callToAction: {
        text: 'Discover now',
        href: '/',
      },
    },
    {
      title: 'Best Practices',
      description:
        'By prioritizing maintainability and scalability through coding standards and design principles, your website stays robust and efficient.',
      icon: IconListCheck,
      callToAction: {
        text: 'Discover now',
        href: '/',
      },
    },
    {
      title: 'Excellent Page Speed',
      description:
        'Having a good page speed impacts organic search ranking, improves user experience (UI/UX) and increase conversion rates.',
      icon: IconRocket,
      callToAction: {
        text: 'Discover now',
        href: '/',
      },
    },
    {
      title: 'Search Engine Optimization (SEO)',
      description:
        "Boost online visibility with our SEO-friendly website. Effective strategies and practices enhance your website's search engine ranking, making it easier for users to find your content.",
      icon: IconArrowsRightLeft,
      callToAction: {
        text: 'Discover now',
        href: '/',
      },
    },
    {
      title: 'Open to new ideas and contributions',
      description:
        'We welcome new ideas and contributions to our platform. Whether you have feature suggestions, want to contribute code, or share insights, our platform is open for collaboration.',
      icon: IconBulb,
      callToAction: {
        text: 'Discover now',
        href: '/',
      },
    },
  ],
};

// Content data on Home page *******************
export const contentHomeOne: ContentProps = {
  id: 'contentOne-on-home-one',
  hasBackground: true,
  header: {
    title: 'Our Product',
    subtitle: 'Why choose our content?',
  },
  content:
    'Whether you are looking to express yourself through fashion or seeking your next great read, we have something special just for you. Explore our growing collections and discover how our bespoke products can add a touch of personal flair to your everyday life.',
  items: [
    {
      title: 'Bespoke Designs',
      description:
        'Unleash your personal style with our Bespoke Designs. Each product is crafted to reflect unique tastes and interests, making every purchase a true expression of individuality.',
    },
    {
      title: 'Curated Selection',
      description:
        'Dive into our Curated Selection of books, meticulously chosen to cater to diverse tastes and interests. Find your next favorite read that speaks to your soul, all in one place.',
    },
    {
      title: 'High Quality and in Depth Research',
      description:
        'Experience the depth of our High Quality and In-Depth Research with every book you read and every t-shirt you wear. Our products are developed with meticulous attention to detail, ensuring a premium experience with rich, informed content.',
    },
  ],
  image: {
    src: homepage2,
    alt: 'Colorful Image',
  },
  isReversed: false,
  isAfterContent: false,
};

// Content data on Home page *******************
export const contentHomeTwo: ContentProps = {
  id: 'contentOne-on-home-two',
  hasBackground: true,
  content:
    'We are dedicated to providing you with an outstanding shopping experience by focusing on key aspects that matter most. Discover how we ensure satisfaction through every facet of our service.',
  items: [
    {
      title: 'Engaging with Customer feedback',
    },
    {
      title: 'High Quality Ratings',
    },
    {
      title: 'Continuous Product Development',
    },
    {
      title: 'Competitive Prices',
    },
  ],
  image: {
    src: homepage3,
    alt: 'Colorful Image',
  },
  isReversed: true,
  isAfterContent: true,
};

// Testimonials data on Home page *******************
export const testimonialsHome: TestimonialsProps = {
  id: 'testimonials-on-home',
  hasBackground: true,
  header: {
    title: 'What our customers say about us',
    subtitle:
      'Discover the impact of AB Creative Labs through the words of our satisfied customers. Read their testimonials to see how our unique KDP books and custom t-shirts have added value and joy to their lives.',
  },
  testimonials: [
    {
      name: 'Rutherford',
      platform: 'Amazon',
      testimonial: `From the first chapter, the book addresses the everyday anxieties and challenges fathers face today, offering reassurance and actionable advice. With a warm and engaging tone, the author invites fathers into a conversation about the pivotal role they play in their children’s lives, providing both inspiration and instruction on how to fulfill this role more effectively.`,
      image: {
        src: 'https://images.unsplash.com/photo-1572417884940-c24659be6068?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
        alt: 'Rutherford',
      },
      href: 'https://www.amazon.com/gp/customer-reviews/RXVD8BZF67246/ref=cm_cr_dp_d_rvw_ttl?ie=UTF8&ASIN=B0CQ6TCPJZ',
    },
    {
      name: 'Cathy Lynn Brooks',
      platform: 'Amazon',
      testimonial: `This is a comprehensive guide to good parenting. I liked the takeaway section at the end of each chapter, summarizing the key elements. There is plenty of good advice. Some dads might need this help, since many children grow up without father figures or with abusive parents. This book is for dads who want to break the cycle and learn new techniques.`,
      image: {
        src: 'https://images.unsplash.com/photo-1659057106920-da022cfbc0cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
        alt: 'Cathy Lynn Brooks',
      },
      href: 'https://www.amazon.com/gp/customer-reviews/R1FYIFI0ZSRP9H/ref=cm_cr_dp_d_rvw_ttl?ie=UTF8&ASIN=B0CQ6TCPJZ',
    },
    {
      name: 'Andreas Baku',
      platform: 'Amazon',
      testimonial: `I have learned a lot over the course of the last 2 months about the health of my gut or the gut in general. We must pay attention. This book only confirms all I 've learned and then some. I love how it's all broken down and explained how it all works. I am thrilled I found this book and keep it close to remind myself and what to do and what not to do. It's a must read. Read it! It might save your life.`,
      image: {
        src: 'https://images.unsplash.com/photo-1659057106920-da022cfbc0cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
        alt: 'Andreas Baku',
      },
      href: '/',
    },
    {
      name: 'Leroy Malloy',
      platform: 'goodreads',
      testimonial: `Dad's First Steps by Aiden Blake is nothing short of a beacon of light for new fathers embarking on the exhilarating journey of parenthood. This invaluable guide offers a comprehensive roadmap, brimming with practical advice, heartfelt anecdotes, and profound insights, to help fathers nurture strong bonds, reduce stress, and cultivate healthier relationships with their children.`,
      image: {
        src: 'https://images.unsplash.com/photo-1572417884940-c24659be6068?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
        alt: 'Leroy Malloy',
      },
      href: 'https://www.goodreads.com/review/show/6293652160',
    },
    {
      name: 'PWGee',
      platform: 'goodreads',
      testimonial: `Dad’s First Steps gives great advice for new fathers as they try to find their way with their new role. The book is full of practical wisdom interspersed with fun and heart-warming anecdotes that illustrate the advice.`,
      image: {
        src: 'https://images.unsplash.com/photo-1694287877106-ee22f764aef1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
        alt: 'PWGee',
      },
      href: 'https://www.goodreads.com/review/show/6461363353',
    },
    {
      name: 'LC',
      platform: 'Amazon',
      testimonial: `Impressed by the One Question a Day Journal for Kids. It offers a daily prompt to inspire imagination and self-reflection. It's a great tool for nurturing creativity and self-expression in children. Plus, it serves as a meaningful keepsake to cherish memories of their childhood journey. Would recommend as a thoughtful gift option.`,
      image: {
        src: 'https://images.unsplash.com/photo-1665984867752-6370ab5ae35e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
        alt: 'LC',
      },
      href: 'https://www.amazon.com/gp/customer-reviews/RTI9IHUDGBLUR/ref=cm_cr_dp_d_rvw_ttl?ie=UTF8&ASIN=B0CMZ6N45L',
    },
  ],
};

// FAQS data on Home page *******************
export const faqs2Home: FAQsProps = {
  id: 'faqsTwo-on-home',
  hasBackground: false,
  header: {
    title: 'Frequently Asked Questions',
    subtitle:
      'Duis turpis dui, fringilla mattis sem nec, fringilla euismod neque. Morbi tincidunt lacus nec tortor scelerisque pulvinar.',
    tagline: 'FAQS',
  },
  items: [
    {
      title: 'What do I need to start?',
      description: `Nunc mollis tempor quam, non fringilla elit sagittis in. Nullam vitae consectetur mi, a elementum arcu. Sed laoreet, ipsum et vehicula dignissim, leo orci pretium sem, ac condimentum tellus est quis ligula.`,
    },
    {
      title: 'How to install the NextJS + Tailwind CSS template?',
      description: `Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer eleifend vestibulum nisl in iaculis. Mauris dictum ac purus vestibulum auctor. Praesent imperdiet lectus et massa faucibus, quis viverra massa rhoncus.`,
    },
    {
      title: "What's something that you completely don't understand?",
      description: `Mauris vitae eros a dui varius luctus. Suspendisse rutrum, sapien nec blandit bibendum, justo sapien sollicitudin erat, id aliquam sapien purus quis leo. Aliquam vulputate vestibulum consectetur.`,
    },
    {
      title: "What's an example of when you changed your mind?",
      description: `Nunc dapibus lacinia ipsum ut elementum. Integer in pretium sapien. Ut pretium nisl mauris, ut rutrum justo condimentum id. Etiam aliquet, arcu at iaculis laoreet, est arcu egestas sapien, eget sollicitudin odio orci et nunc.`,
    },
    {
      title: 'What is something that you would really like to try again?',
      description: `Duis in maximus mauris, id eleifend mauris. Nam a fringilla arcu. Curabitur convallis, tellus non aliquet rhoncus, lacus massa auctor eros, in interdum lectus augue sed augue. Fusce tempor ex id faucibus efficitur.`,
    },
    {
      title: 'If you could only ask one question to each person you meet, what would that question be?',
      description: `Nullam imperdiet sapien tincidunt erat dapibus faucibus. Vestibulum a sem nec lorem imperdiet scelerisque non sed lacus. Ut pulvinar id diam vitae auctor. Nam tempus, neque et elementum consectetur, ex ipsum pulvinar risus, vel sodales ligula tortor eu eros.`,
    },
  ],
};

// Pricing data on Home page *******************
export const pricingHome: PricingProps = {
  id: 'pricing-on-home',
  hasBackground: true,
  header: {
    title: 'Prices for each plan',
    subtitle:
      'Proin eget vestibulum sem, vel ultrices ligula. Vestibulum in eleifend lectus, non mollis odio. Donec nibh ipsum, suscipit non pulvinar quis, lobortis ac lorem.',
    // tagline: 'Pricing',
  },
  prices: [
    {
      title: 'basic',
      price: 29,
      period: 'per month',
      items: [
        {
          description: 'Etiam in libero, et volutpat',
        },
        {
          description: 'Aenean ac nunc dolor tristique',
        },
        {
          description: 'Cras scelerisque accumsan lib',
        },
        {
          description: 'In hac habitasse',
        },
      ],
      callToAction: {
        targetBlank: true,
        text: 'Free 7-day trial',
        href: '/',
      },
      hasRibbon: false,
    },
    {
      title: 'standard',
      price: 69,
      period: 'per month',
      items: [
        {
          description: 'Proin vel laoreet',
        },
        {
          description: 'Ut efficitur egestas',
        },
        {
          description: 'Pellentesque ut nibh',
        },
        {
          description: 'Donec fringilla sem',
        },
      ],
      callToAction: {
        targetBlank: true,
        text: 'Free 15-day trial',
        href: '/',
      },
      hasRibbon: true,
      ribbonTitle: 'Popular',
    },
    {
      title: 'premium',
      price: 199,
      period: 'per month',
      items: [
        {
          description: 'Curabitur suscipit risus',
        },
        {
          description: 'Aliquam blandit malesuada',
        },
        {
          description: 'Suspendisse sit amet',
        },
        {
          description: 'Suspendisse auctor dui',
        },
      ],
      callToAction: {
        targetBlank: true,
        text: 'Free 30-day trial',
        href: '/',
      },
      hasRibbon: false,
    },
  ],
};

// Team data on Home page *******************
export const teamHome: TeamProps = {
  id: 'team-on-home',
  hasBackground: false,
  header: {
    title: 'Team Members',
    subtitle:
      'Suspendisse in dui nibh. Donec enim leo, sodales et egestas id, malesuada non diam. Sed dapibus velit et mauris condimentum, vel imperdiet erat egestas.',
    // tagline: 'Team',
  },
  teams: [
    {
      name: 'Cindy Belcher',
      occupation: 'SEO Consultant',
      image: {
        src: 'https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
        alt: 'Cindy Belcher',
      },
      items: [
        {
          title: 'Know more on Twitter',
          icon: IconBrandTwitter,
          href: '#',
        },
        {
          title: 'Know more on Linkedin',
          icon: IconBrandLinkedin,
          href: '#',
        },
        {
          title: 'Contact by email',
          icon: IconMail,
          href: '#',
        },
      ],
    },
    {
      name: 'Toby Foster',
      occupation: 'Marketing Tech',
      image: {
        src: 'https://images.unsplash.com/photo-1614583224978-f05ce51ef5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2172&q=80',
        alt: 'Toby Foster',
      },
      items: [
        {
          title: 'Know more on Twitter',
          icon: IconBrandTwitter,
          href: '#',
        },
        {
          title: 'Know more on Linkedin',
          icon: IconBrandLinkedin,
          href: '#',
        },
        {
          title: 'Contact by email',
          icon: IconMail,
          href: '#',
        },
      ],
    },
    {
      name: 'Clark Bourne',
      occupation: 'Content Manager',
      image: {
        src: 'https://images.unsplash.com/photo-1639628735078-ed2f038a193e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
        alt: 'Clark Bourne',
      },
      items: [
        {
          title: 'Know more on Twitter',
          icon: IconBrandTwitter,
          href: '#',
        },
        {
          title: 'Know more on Linkedin',
          icon: IconBrandLinkedin,
          href: '#',
        },
        {
          title: 'Contact by email',
          icon: IconMail,
          href: '#',
        },
      ],
    },
    {
      name: 'Bella Chase',
      occupation: 'UX Designer',
      image: {
        src: 'https://images.unsplash.com/photo-1628260412297-a3377e45006f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
        alt: 'Bella Chase',
      },
      items: [
        {
          title: 'Know more on Twitter',
          icon: IconBrandTwitter,
          href: '#',
        },
        {
          title: 'Know more on Linkedin',
          icon: IconBrandLinkedin,
          href: '#',
        },
        {
          title: 'Contact by email',
          icon: IconMail,
          href: '#',
        },
      ],
    },
  ],
};

// Contact data on Home page *******************
export const contactHome: ContactProps = {
  hasBackground: true,
  header: {
    title: 'Get in Touch',
    subtitle: 'In hac habitasse platea dictumst',
    tagline: 'Contact',
  },
  content:
    'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis nec ipsum orci. Ut scelerisque sagittis ante, ac tincidunt sem venenatis ut.',
  items: [
    {
      title: 'Our Address',
      description: ['1230 Maecenas Street Donec Road', 'New York, EEUU'],
      icon: IconMapPin,
    },
    {
      title: 'Contact',
      description: ['Mobile: +1 (123) 456-7890', 'Mail: tailnext@gmail.com'],
      icon: IconPhoneCall,
    },
    {
      title: 'Working hours',
      description: ['Monday - Friday: 08:00 - 17:00', 'Saturday & Sunday: 08:00 - 12:00'],
      icon: IconClock,
    },
  ],
  form: {
    id: 'subscribeForm',
    inputs: [
      {
        type: 'email',
        name: 'email',
        autocomplete: 'on',
        placeholder: 'Enter your email',
        className: 'w-md mb-0',
      },
    ],
    btn: {
      title: 'Subscribe',
      type: 'submit',
      className: 'ml-2 mt-0.5 px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
    },
  },
};