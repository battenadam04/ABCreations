'use client';

import { announcementData } from '~/shared/data/global.data';
import Form from '../common/Form';
import { contactHome } from '~/shared/data/pages/home.data';
import { annoucementSchema } from '~/shared/formValidation/annoucement.schema';
const Announcement = () => {
  const { title, callToAction, callToAction2 } = announcementData;

  const onSubmit = (data: any) => {
    fetch('/api/saveUserDetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <div className=" hidden overflow-hidden text-ellipsis whitespace-nowrap border-b border-blue-900 bg-blue-900 px-3 py-4 text-sm md:block">
      <span className="bg-blue-800 py-0.5 px-1 text-lg font-semibold text-gray-200">{title}</span>{' '}
      {callToAction && callToAction.text && callToAction.href && (
        <a
          href={callToAction.href}
          rel="noreferrer noopened"
          className="cursor-pointer text-orange-100 hover:underline"
        >
          {callToAction.icon && <callToAction.icon className="mr-1 ml-1.5 h-5 w-5" />} {callToAction.text}
        </a>
      )}
      {callToAction2 && callToAction2.text && (
        <Form
          {...contactHome.form}
          containerClass="flex h-9 md:flex-row float-right"
          btnPosition="right"
          customErrorStyling="absolute w-md mb-0 w-fit rounded-md"
          customValidation={annoucementSchema}
          customSubmission={onSubmit}
        />
      )}
    </div>
  );
};

export default Announcement;
