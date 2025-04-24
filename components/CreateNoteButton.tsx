'use client';

import { useRouter } from 'next/navigation';

type CreateNoteButtonProps = {
  text: string;
  route: string;
};

export function CreateNoteButton({ text, route }: CreateNoteButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(route)}
      className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
    >
      {text}
    </button>
  );
}
