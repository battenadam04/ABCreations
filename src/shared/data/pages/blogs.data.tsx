import forexTrading from '~/assets/images/trading-blog-banner.png';
import forexIndicators from '~/assets/images/forex-indicator-banner.png';

export const blogContent = {
  images: [
    {
      image: forexTrading,
      value: '/forexTrading',
    },
    {
      image: forexIndicators,
      value: '/forexIndicators',
    },
    {
      image: forexIndicators,
      value: '/movingAverages',
    },
  ],
};

// Comments form on blog pages *******************
export const commentsData = {
  id: 'comments',
  hasBackground: true,
  header: {
    title: 'Comments',
  },
  form: {
    inputs: [
      {
        type: 'text',
        label: 'username',
        name: 'username',
        autocomplete: 'off',
        placeholder: 'Username',
      },
    ],
    textarea: {
      cols: 30,
      rows: 5,
      label: 'Drop a comment',
      name: 'comment',
      placeholder: 'Drop a comment...',
    },
    btn: {
      title: 'Add comment',
      type: 'submit',
    },
  },
};
