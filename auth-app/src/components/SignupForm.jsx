import React from 'react';
import { useForm } from 'react-hook-form';

export default function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => alert(`Signup Details:\n${JSON.stringify(data, null, 2)}`);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Signup</h2>
      <input placeholder="Name" {...register('name', { required: true })} />
      {errors.name && <span>Name is required</span>}

      <input placeholder="Email" {...register('email', { required: true })} />
      {errors.email && <span>Email is required</span>}

      <input type="password" placeholder="Password" {...register('password', { required: true })} />
      {errors.password && <span>Password is required</span>}

      <button type="submit">Create Account</button>
    </form>
  );
}
