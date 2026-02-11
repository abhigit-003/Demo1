import { useNavigate } from "react-router-dom";
import { ChevronLeft, TrendingUp, Users, ShoppingBag, BarChart3, ArrowUpRight } from "lucide-react";

const Analytics = () => {
    const navigate = useNavigate();

    const stats = [
        { label: "Acquisition", value: "+24%", color: "text-raffine-gold" },
        { label: "Retention", value: "82%", color: "text-raffine-pink" },
        { label: "Engagement", value: "4.8m", color: "text-white" },
    ];

    const chartData = [
        { label: "Mon", height: "40%" },
        { label: "Tue", height: "70%" },
        { label: "Wed", height: "55%" },
        { label: "Thu", height: "90%" },
        { label: "Fri", height: "65%" },
        { label: "Sat", height: "80%" },
        { label: "Sun", height: "45%" },
    ];

    return (
        <div className="pb-20">
            <div className="mx-auto max-w-6xl px-6 py-12">
                <button
                    onClick={() => navigate(-1)}
                    className="group mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
                >
                    <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Dashboard
                </button>

                <div className="mb-12">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-raffine-pink/10 text-raffine-pink mb-4">
                        <BarChart3 className="h-6 w-6" />
                    </div>
                    <h1 className="text-3xl font-bold text-white uppercase tracking-widest">Business Insights</h1>
                    <p className="mt-2 text-gray-400">Deep performance analytics for the Raffine brand</p>
                </div>

                <div className="grid gap-6 md:grid-cols-3 mb-10">
                    {stats.map((s) => (
                        <div key={s.label} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl relative overflow-hidden group">
                            <div className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{s.label}</div>
                            <div className={`text-4xl font-black ${s.color} transition-transform group-hover:scale-110 duration-500`}>{s.value}</div>
                            <ArrowUpRight className="absolute top-8 right-8 h-5 w-5 text-gray-600 opacity-50" />
                        </div>
                    ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                        <h3 className="text-raffine-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-10">Revenue Velocity</h3>
                        <div className="flex items-end justify-between h-64 gap-2">
                            {chartData.map((d) => (
                                <div key={d.label} className="flex flex-col items-center gap-4 flex-1">
                                    <div
                                        className="w-full bg-raffine-pink/20 border-t-2 border-raffine-pink rounded-t-lg transition-all duration-1000 group hover:bg-raffine-pink/40"
                                        style={{ height: d.height }}
                                    >
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-raffine-pink text-white text-[10px] font-bold py-1 px-2 rounded -mt-8 mx-auto w-fit">
                                            {d.height}
                                        </div>
                                    </div>
                                    <span className="text-[10px] text-gray-500 font-bold uppercase">{d.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl flex items-center justify-between">
                            <div>
                                <div className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Total Services</div>
                                <div className="text-2xl font-bold text-white tracking-widest">12 Active</div>
                            </div>
                            <TrendingUp className="h-8 w-8 text-raffine-gold opacity-30" />
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl flex items-center justify-between">
                            <div>
                                <div className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Total Products</div>
                                <div className="text-2xl font-bold text-white tracking-widest">48 Curated</div>
                            </div>
                            <ShoppingBag className="h-8 w-8 text-raffine-gold opacity-30" />
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl flex items-center justify-between">
                            <div>
                                <div className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Active Clients</div>
                                <div className="text-2xl font-bold text-white tracking-widest">1.2k Elite</div>
                            </div>
                            <Users className="h-8 w-8 text-raffine-gold opacity-30" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
