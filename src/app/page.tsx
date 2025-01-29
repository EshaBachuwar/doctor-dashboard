
import { Button } from '@/components/shared/Button';
import Image from 'next/image';
import Link from 'next/link';


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Image src="/logo.png" alt="" width={64} height={32}/>
              <span className="text-2xl font-bold text-rose-600">
                Care Net
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900"
              >
                Sign In
              </Link>
              <Link href="/register">
                <Button variant="primary">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Modern Healthcare</span>
              <span className="block text-rose-600">Management Solution</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Streamline your medical practice with our comprehensive doctor&apos;s dashboard.
              Manage patients, prescriptions, and reports all in one place.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/login">
                <Button variant="outline" size="lg">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="lg">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}