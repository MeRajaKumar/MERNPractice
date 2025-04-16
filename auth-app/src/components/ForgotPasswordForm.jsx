import React from 'react';
import { useForm } from 'react-hook-form';

export default function ForgotPasswordForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => alert(`Reset Link Sent To:\n${JSON.stringify(data, null, 2)}`);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Forgot Password</h2>
      <input placeholder="Email" {...register('email', { required: true })} />
      {errors.email && <span>Email is required</span>}

      <button type="submit">Send Reset Link</button>
    </form>
  );
}
