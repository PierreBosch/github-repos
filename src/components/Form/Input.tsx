import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
};

export function Input(props: InputProps) {
  const { register } = useFormContext();

  return (
    <input
      {...register(props.name)}
      {...props}
      className="bg-github border-2 border-zinc-700 py-2 px-5 rounded-md mb-6 focus:border-blue-400 focus:outline-none text-gray-400"
    />
  );
}
