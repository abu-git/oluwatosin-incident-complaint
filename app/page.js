'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()

  const onSubmit = () => {
    router.push('/complaint-form/user-details')
  }

  return (
    <div className="bg-white">
      <h3 className="font-bold text-3xl mb-5">Incident Complaint Form</h3>

      <div className="flex justify-center">
        <Link href='/complaint-form/user-details'>
          <button className="py-2 px-3 bg-black text-white rounded-full transition-colors duration-200 hover:bg-gray-800 active:bg-gray-900">
            Incident Admin Login
          </button>
        </Link>
      </div>
      
    </div>
  );
}
