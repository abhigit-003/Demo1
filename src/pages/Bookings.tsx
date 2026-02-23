import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const Bookings = () => {
  const { user } = useAuth();
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const { data } = await api.get('/bookings');
      return data;
    }
  });

  if (isLoading) return <div className="text-white pt-20 text-center">Loading...</div>;

  return (
    <div className="pb-20 pt-12 px-6 max-w-7xl mx-auto">
        <Link to="/dashboard" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors mb-6">
        <ChevronLeft className="h-4 w-4" /> Back to Dashboard
      </Link>
      <h1 className="text-3xl font-bold text-white mb-8">My Bookings</h1>
      <div className="space-y-4">
        {bookings?.map((booking: any) => (
           <div key={booking.id} className="p-6 border border-white/10 rounded-xl bg-white/5 flex justify-between items-center">
              <div>
                  <p className="text-white font-bold text-lg">{booking.Service?.name || "Unknown Service"}</p>
                  <p className="text-gray-400 mt-1">{new Date(booking.date).toLocaleDateString()} at {new Date(booking.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
              </div>
              <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {booking.status}
                  </span>
              </div>
           </div>
        ))}
        {bookings?.length === 0 && (
            <div className="text-center py-12 border border-white/10 rounded-xl bg-white/5">
                <p className="text-gray-400 mb-4">You haven't made any bookings yet.</p>
                <Link to="/spa" className="text-raffine-pink font-bold uppercase tracking-widest text-sm hover:opacity-80">Browse Services</Link>
            </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
