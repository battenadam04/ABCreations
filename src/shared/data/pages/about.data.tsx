import { ContactProps, FeaturesProps, HeroProps, StatsProps, StepsProps, TestimonialsProps } from '~/shared/types';
import aboutcompanypage from '~/assets/images/aboutcompanypage.png';
import {
  IconAdjustments,
  IconAward,
  IconBulb,
  IconHeartHandshake,
  IconHomeEco,
  IconNumber1,
  IconNumber2,
  IconNumber3,
  IconNumber4,
  IconNumber5,
  IconPhoneCall,
  IconThumbUp,
  IconUser,
} from '@tabler/icons-react';

// Hero2 data on About page *******************
export const hero2About: HeroProps = {
  title: 'Welcome to ABCreativeLabs',
  subtitle:
    'Your premier destination for unique books and custom-designed t-shirts. At ABCreativeLabs, we believe that creativity and expression should be accessible to everyone. Founded by a passionate team of artists and writers, our mission is to bring your interests and stories to life through high-quality products that you can treasure.',
  callToAction: {
    text: 'View Amazon Author Profile',
    href: 'https://www.linkedin.com/',
    targetBlank: true,
  },
  callToAction2: {
    text: 'View Amazon Merch Profile',
    href: 'https://www.linkedin.com/',
    targetBlank: true,
  },
  callToAction3: {
    text: 'Contact us',
    href: '/contact',
  },
  image: {
    src: aboutcompanypage,
    alt: 'Hero ABCreativeLabs',
  },
};

// Stats data on About page *******************
export const statsAbout: StatsProps = {
  id: 'stats-on-about',
  hasBackground: true,
  items: [
    {
      title: 300,
      description: 'Global Reviews',
    },
    {
      title: 4.8,
      description: 'Average Rating',
    },
    {
      title: 3,
      description: 'Published Books',
    },
    {
      title: 25,
      description: 'T-shirt designs',
    },
  ],
};

// FeaturesFour data on About page *******************
export const featuresFourAbout: FeaturesProps = {
  id: 'features-four-on-about',
  hasBackground: false,
  header: {
    title: 'Our Mission',
    subtitle:
      'At ABCreativeLabs, we strive to ignite creativity and inspire our customers by providing uniquely designed t-shirts and a diverse range of books. Our commitment is to deliver exceptional products that empower personal expression and enrich everyday lives.',
  },
};

// FeaturesFour data on About page (Two) *******************
export const featuresFourAboutTwo: FeaturesProps = {
  id: 'features-four-on-about-two',
  hasBackground: false,
  header: {
    title: 'Our Core Values',
    subtitle: 'Etiam tellus tortor, mattis id mauris et, lobortis ullamcorper nunc.',
  },
  isAfterContent: true,
  columns: 2,
  items: [
    {
      title: 'Championing Creativity',
      description:
        'We value innovation and originality, encouraging creative thinking that leads to unique and meaningful product designs.',
      icon: IconUser,
    },
    {
      title: 'Committed to Quality',
      description:
        'We are dedicated to maintaining the highest standards of quality in every product we offer, ensuring that our customers receive only the best.',
      icon: IconBulb,
    },
    {
      title: 'Prioritizing Our Customers',
      description:
        'We commit to understanding and meeting the needs and expectations of our customers, providing friendly service and exceptional experiences.',
      icon: IconThumbUp,
    },
    {
      title: ' Integrity in Every Action',
      description:
        'We uphold honesty, transparency, and ethics in all our business dealings, building trust with our customers and partners.',
      icon: IconAdjustments,
    },
    {
      title: 'Driven by Passion',
      description:
        "Our team's passion for what we do drives us to excel and innovate, ensuring we always deliver exciting and impactful products.",
      icon: IconHeartHandshake,
    },
    {
      title: ' Embracing Inclusivity',
      description:
        'We believe in fostering an inclusive environment where all ideas are welcomed and everyone feels valued, reflecting this ethos in our diverse product range.',
      icon: IconHomeEco,
    },
  ],
};
