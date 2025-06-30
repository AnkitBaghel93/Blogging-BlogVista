const BubblesBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-br from-indigo-400 via-blue-500 to-purple-500 opacity-30 rounded-full blur-3xl animate-float-1 left-[-200px] top-[300px]" />
      <div className="absolute w-[400px] h-[400px] bg-gradient-to-br from-pink-300 via-purple-400 to-indigo-400 opacity-25 rounded-full blur-2xl animate-float-2 right-[-100px] top-[100px]" />
      <div className="absolute w-[300px] h-[300px] bg-gradient-to-br from-teal-300 via-cyan-400 to-sky-300 opacity-20 rounded-full blur-2xl animate-float-3 bottom-[150px] left-[25%]" />
      <div className="absolute w-[150px] h-[150px] bg-gradient-to-br from-violet-300 to-pink-400 opacity-30 rounded-full blur-xl animate-float-4 bottom-[60px] right-[80px]" />
    </div>
  );
};

export default BubblesBackground;
