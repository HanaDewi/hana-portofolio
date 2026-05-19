import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Project Tidak Ditemukan</h1>
      <Link to="/" className="text-primary hover:underline">
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFound;