
'use client';

import Form from '../common/Form';
import Headline from '../common/Headline';
import { ContactProps } from '~/shared/types';
import WidgetWrapper from '../common/WidgetWrapper';
import { contactSchema } from '~/shared/formValidation/contact.schema';
import Spinner from './spinner';
import { useState } from 'react';

const Contact2 = ({ header, form, id, hasBackground = false }: ContactProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any, doNotSaveEmail: boolean | undefined) => {
    
    
    setIsLoading(true);
    await fetch('/api/sendmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // check if 'do not save email' checkbox is selected
    if (!doNotSaveEmail) {
      await fetch('/api/saveUserDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    }
    setIsLoading(false);
  };
  return (
    <>
   { isLoading ? <Spinner /> :
  <WidgetWrapper id={id ? id : ''} hasBackground={hasBackground} containerClass="max-w-7xl mx-auto">
    {header && <Headline header={header} titleClass="text-3xl sm:text-5xl" />}
    <div className="flex items-stretch justify-center">
      <Form {...form} containerClass="card h-fit max-w-2xl mx-auto p-5 md:p-12" btnPosition="right" customValidation={contactSchema} customSubmission={onSubmit} />
    </div>
  </WidgetWrapper>
}
  </>
)};

export default Contact2;
