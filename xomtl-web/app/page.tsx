export default async function Home() {
  // كنجيبو الداتا من Laravel
  // استعملنا 8000 حيت تما فين خدام Laravel عندك
  const res = await fetch('http://127.0.0.1:8000');
  const data = await res.json();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold text-red-500 mb-8">XOMTL Project Ready!</h1>

      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
        <h2 className="text-xl text-blue-400 mb-2">Message from Backend:</h2>
        <p className="text-3xl font-mono text-green-400">"{data.message}"</p>
        <p className="mt-4 text-gray-400 italic">Status: {data.status}</p>
      </div>
    </main>
  );
}