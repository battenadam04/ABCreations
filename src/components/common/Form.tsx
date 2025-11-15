'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { FormProps } from '../../shared/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { contactFormValues } from '~/shared/interfaces/forms';
import Spinner from '../widgets/spinner';

const Form = ({
  id,
  title,
  description,
  inputs,
  radioBtns,
  textarea,
  checkboxes,
  btn,
  btnPosition,
  containerClass,
  customSubmission,
  customValidation,
  customErrorStyling,
}: FormProps) => {
  const [submitSuccessful, setSubmitSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitText, setSubmitText] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<contactFormValues>({
    defaultValues: {
      policy: false,
    },
    ...(customValidation && { resolver: yupResolver(customValidation) }),
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    if (customSubmission) {
      try {
        await customSubmission(data, getValues().doNotSaveEmail);
        setIsLoading(false);

        reset();
        setSubmitSuccessful(true);
        setSubmitText('Success');
        setTimeout(() => setSubmitSuccessful(false), 5000);
      } catch {
        setSubmitText('Error');
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <form id={id || 'contactForm'} className={twMerge('mb-50', containerClass)} onSubmit={handleSubmit(onSubmit)}>
          {title && <h2 className={`${description ? 'mb-2' : 'mb-4'} text-2xl font-bold`}>{title}</h2>}
          {description && <p className="mb-4">{description}</p>}
          {/* Inputs */}
          <div className="mx-0 mb-1 sm:mb-4">
            {inputs &&
              inputs.map(({ className, type, label, name, autocomplete, placeholder }, index) => (
                <div key={`item-input-${index}`} className="mx-0 mb-1 sm:mb-4">
                  <label htmlFor={name} className="pb-1 text-xs uppercase tracking-wider">
                    {label}
                  </label>
                  <input
                    type={type}
                    autoComplete={autocomplete}
                    placeholder={placeholder}
                    className={`${className || 'mb-2'} w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0`}
                    {...register(name)}
                  />
                  {errors[name]?.message && (
                    <div
                      className={`${customErrorStyling} z-50 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-2`}
                      role="alert"
                    >
                      <p className="font-bold">{errors[name]?.message as string}</p>
                    </div>
                  )}
                </div>
              ))}
          </div>
          {/* Radio buttons */}
          {radioBtns && (
            <div className="mx-0 mb-1 sm:mb-3">
              <span className="pb-1 text-xs uppercase tracking-wider">{radioBtns?.label}</span>
              <div className="flex flex-wrap">
                {radioBtns.radios.map(({ label }, index) => (
                  <div key={`radio-btn-${index}`} className="mr-4 items-baseline">
                    <input
                      id={label}
                      type="radio"
                      checked={getValues()[radioBtns.name] === `value${index}`}
                      className="cursor-pointer"
                      {...register(radioBtns.name)}
                    />
                    <label htmlFor={label} className="ml-2">
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Textarea */}
          {textarea && (
            <div className={`mx-0 mb-1 sm:mb-4`}>
              <label htmlFor={textarea.name} className="pb-1 text-xs uppercase tracking-wider">
                {textarea.label}
              </label>
              <textarea
                id={textarea.name}
                cols={textarea.cols}
                rows={textarea.rows}
                placeholder={textarea.placeholder}
                className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                {...register(textarea.name)}
              />
              {errors[textarea.name]?.message && (
                <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-2" role="alert">
                  <p className="font-bold">{errors[textarea.name]?.message as string}</p>
                </div>
              )}
            </div>
          )}
          {/* Checkboxes */}
          {checkboxes && (
            <div className="mx-0 mb-1 sm:mb-4">
              {checkboxes.map(({ label, name }, index) => (
                <div key={`checkbox-${index}`} className="mx-0 my-1 items-baseline">
                  <input id={label} type="checkbox" className="cursor-pointer" {...register(name)} />
                  <label htmlFor={label} className="ml-2">
                    {label}
                  </label>
                  {name === 'policy' && errors[name]?.message && (
                    <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-2" role="alert">
                      <p className="font-bold">{errors[name]?.message}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {btn && (
            <div
              className={`${btnPosition === 'left' ? 'text-left' : btnPosition === 'right' ? 'text-right' : 'text-center'}`}
            >
              <button
                type={btn.type || 'button'}
                className={twMerge(
                  btn.className,
                  `btn ${!submitSuccessful ? 'btn-primary' : 'bg-green-400 text-white-500'} sm:mb-20 float-right`,
                )}
              >
                {!submitSuccessful ? btn.title : submitText}
              </button>
            </div>
          )}
        </form>
      )}
    </>
  );
};

export default Form;
