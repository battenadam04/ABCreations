import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandTwitter,
  IconChevronDown,
  IconRss,
} from '@tabler/icons-react';
import { AnnouncementProps, FooterProps, HeaderProps } from '../types';

// Announcement data
export const announcementData: AnnouncementProps = {
  title: 'NEW',
  callToAction: {
    text: 'This template is made with Next.js 14 using the new App Router »',
    href: 'https://nextjs.org/blog/next-14',
  },
  callToAction2: {
    text: 'Follow @onWidget on Twitter',
    href: 'https://twitter.com/intent/user?screen_name=onwidget',
  },
};

// Header data
export const headerData: HeaderProps = {
  links: [
    {
      label: 'Products',
      icon: IconChevronDown,
      links: [
        {
          label: 'T-shirts',
          href: '/tshirts',
        },
        {
          label: 'Books',
          href: '/books',
        },
      ],
    },
    {
      label: 'About us',
      href: '/about',
    },
    {
      label: 'Blog',
      href: '/blog',
    },
    {
      label: 'Contact',
      href: '/contact',
    },
  ],
  actions: [
    // {
    //   text: 'Download',
    //   href: 'https://github.com/onwidget/tailnext',
    //   targetBlank: true,
    // },
  ],
  isSticky: true,
  showToggleTheme: true,
  showRssFeed: false,
  position: 'right',
};

// Footer data
export const footerData: FooterProps = {
  title: 'AB Creation Labs',
  links: [
    {
      label: 'Terms & Conditions',
      href: '/terms',
    },
    {
      label: 'Privacy Policy',
      href: '/privacy',
    },
  ],
  columns: [
    {
      title: 'Product',
      links: [
        {
          label: 'T-shirts',
          href: '/tshirts',
        },
        {
          label: 'Books',
          href: '/books',
        },
      ],
    },
    {
      title: 'Platform',
      links: [
        {
          label: 'Amazon',
          href: '/',
        },
        {
          label: 'goodreads',
          href: 'https://www.goodreads.com/author/show/30080857.Aiden_Blake',
        },
      ],
    },
    {
      title: 'Support',
      links: [
        {
          label: 'Contact',
          href: '/contact',
        },
      ],
    },
    {
      title: 'Company',
      links: [
        {
          label: 'About',
          href: '/about',
        },
        {
          label: 'Blog',
          href: '/blog',
        },
      ],
    },
  ],
  socials: [
    { label: 'Twitter', icon: IconBrandTwitter, href: '#' },
    // { label: 'Instagram', icon: IconBrandInstagram, href: '#' },
    { label: 'Facebook', icon: IconBrandFacebook, href: '#' },
    // { label: 'RSS', icon: IconRss, href: '#' },
  ],
  footNote: (
    <div className="mr-4 text-sm dark:text-slate-400">
      <span className="float-left mr-1.5 h-5 w-5 rounded-sm bg-[url(https://onwidget.com/favicon/favicon-32x32.png)] bg-cover md:-mt-0.5 md:h-6 md:w-6"></span>
      Made by{' '}
      <a
        className="text-blue-600 hover:underline dark:text-gray-200"
        href="https://www.linkedin.com/in/adam-batten-92850243/"
      >
        {' '}
        Adam Batten
      </a>{' '}
      · All rights reserved.
    </div>
  ),
};

// Footer2 data
export const footerData2: FooterProps = {
  links: [
    {
      label: 'Terms & Conditions',
      href: '/terms',
    },
    {
      label: 'Privacy Policy',
      href: '/privacy',
    },
  ],
  columns: [
    {
      title: 'Pages',
      texts: ['Office: info@example.com', 'Site: https://example.com'],
    },
  ],
  socials: [
    { label: 'Twitter', icon: IconBrandTwitter, href: '#' },
    { label: 'Instagram', icon: IconBrandInstagram, href: '#' },
    { label: 'Facebook', icon: IconBrandFacebook, href: '#' },
    { label: 'RSS', icon: IconRss, href: '#' },
    { label: 'Github', icon: IconBrandGithub, href: 'https://github.com/onwidget/tailnext' },
  ],
  footNote: (
    <div className="mr-4 text-sm">
      <span
        className="float-left mr-1.5 h-5 w-5 rounded-sm bg-[url(51 Phasellus Avenue Maecenas

)] bg-cover md:-mt-0.5 md:h-6 md:w-6"
      ></span>
      Made by{' '}
      <a
        className="font-semibold text-slate-900 dark:text-gray-200 hover:text-blue-600 hover:underline dark:hover:text-blue-600"
        href="https://onwidget.com/"
      >
        {' '}
        Adam Batten
      </a>{' '}
      · All rights reserved.
    </div>
  ),
};
