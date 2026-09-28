'use client';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useLoginMutation } from '@/features/login/hooks/useLoginMutation';
import {
  LoginAdminRequest,
  loginSchema,
} from '@/features/login/validations/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function FormLogin() {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<LoginAdminRequest>({
    resolver: zodResolver(loginSchema),
  });

  const { loginAdminMutation, isPending } = useLoginMutation(getValues);
  return (
    <form onSubmit={handleSubmit(() => loginAdminMutation())}>
      <fieldset className='fieldset mt-5'>
        <legend className='fieldset-legend'>Email Address</legend>
        <label className='input w-full'>
          <HiOutlineMail />
          <input
            type='text'
            className='grow w-full'
            placeholder='admin@gmail.com'
            {...register('email')}
          />
        </label>
        <p className='label'>{errors?.email?.message}</p>
      </fieldset>
      <fieldset className='fieldset'>
        <legend className='fieldset-legend'>Password</legend>
        <label className='input w-full'>
          <RiLockPasswordLine />
          <input
            type='password'
            className='grow w-full'
            placeholder='abc12345'
            {...register('password')}
          />
        </label>
        <p className='label'>{errors?.password?.message}</p>
      </fieldset>
      <button
        disabled={isPending}
        className='btn bg-blue-800 text-white mt-4 w-full'
      >
        Login to Dashboard
      </button>
    </form>
  );
}
