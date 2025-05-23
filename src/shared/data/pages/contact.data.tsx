import { IconPhoneCall } from '@tabler/icons-react';
import { ContactProps } from '~/shared/types';
import { HeroProps } from '~/shared/types';

// Hero data on Contact page *******************
export const heroContact: HeroProps = {
  title: 'Get in touch with us',
  subtitle: (
    <>
      <span className="hidden md:inline">{`Thank you for visiting AB Creative Labs! We're excited to hear from you.`}</span>{' '}
      {`Our team can assist you in any query you may have.`}
    </>
  ),
};

// Contact data on Contact page *******************
export const contact2Contact: ContactProps = {
  id: 'contactTwo-on-contact',
  hasBackground: true,
  header: {
    title: 'Contact us',
    subtitle: (
      <>
        Please take a moment to fill out this form.{' '}
        <span className="hidden md:inline">{`So we can better understand your needs and get the process started smoothly.`}</span>
      </>
    ),
  },
  items: [
    {
      title: 'Contact',
      description: ['Mail: aidenblakekdp@outlook.com'],
    },
  ],
  form: {
    inputs: [
      {
        type: 'text',
        label: 'First name',
        name: 'name',
        autocomplete: 'off',
        placeholder: 'First name',
      },
      {
        type: 'text',
        label: 'Last name',
        name: 'lastName',
        autocomplete: 'off',
        placeholder: 'Last name',
      },
      {
        type: 'email',
        label: 'Email address',
        name: 'email',
        autocomplete: 'on',
        placeholder: 'Email address',
      },
    ],
    radioBtns: {
      name: 'reason',
      label: 'What is the reason for your contact?',
      radios: [
        {
          label: 'General inquiries',
        },
        {
          label: 'Working together',
        },
        {
          label: 'Copyright',
        },
        {
          label: 'Other',
        },
      ],
    },
    textarea: {
      cols: 30,
      rows: 5,
      label: 'How can we help you?',
      name: 'message',
      placeholder: 'Write your message...',
    },
    checkboxes: [
      {
        label: 'Have you read our privacy policy?',
        name: 'policy',
        value: '',
      },
      // pause for now due to gov charges for data collection
      // {
      //   label: 'I do not want my email saved for future promotions/ product releases',
      //   name: 'doNotSaveEmail',
      //   value: '',
      // },
    ],
    checkboxLink: {
      label: 'Privacy Policy',
      href: '/privacy',
    },
    btn: {
      title: 'Send Message',
      type: 'submit',
    },
  },
};
