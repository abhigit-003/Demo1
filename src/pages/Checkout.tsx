import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Shield } from "lucide-react";

const Checkout = () => {
    return (
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
            <div className="flex flex-col items-center justify-center">
                <div className="size-20 bg-raffine-pink/10 rounded-full flex items-center justify-center mb-8 animate-pulse">
                    <Shield className="text-raffine-pink size-10" />
                </div>

                <span className="text-raffine-gold text-xs font-bold tracking-[0.3em] uppercase block mb-4">Secure Gateway</span>
                <h1 className="text-4xl md:text-5xl font-light text-white uppercase tracking-[0.1em] mb-6">
                    Secure Checkout
                </h1>

                <div className="max-w-xl mx-auto mb-12">
                    <p className="text-gray-400 font-light italic text-lg leading-relaxed">
                        This experience is currently being curated.
                        Our team is finalizing the secure payment architecture to ensure your transaction is as seamless as our services.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
                    {[
                        { title: "Personal Info", status: "Verified", icon: CheckCircle2 },
                        { title: "Shipping", status: "Curated", icon: CheckCircle2 },
                        { title: "Payment", status: "Finalizing", icon: ArrowRight }
                    ].map((step, i) => (
                        <div key={i} className="p-6 rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm">
                            <step.icon className={`size-6 mx-auto mb-4 ${i < 2 ? 'text-raffine-pink' : 'text-raffine-gold'}`} />
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{step.title}</p>
                            <p className="text-sm text-white font-medium">{step.status}</p>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link
                        to="/home"
                        className="rounded-xl bg-raffine-pink px-12 py-4 text-[11px] font-bold text-white uppercase tracking-[0.2em] transition-all hover:scale-[1.05] shadow-xl shadow-raffine-pink/20"
                    >
                        Back to Home
                    </Link>
                    <Link
                        to="/home/cart"
                        className="rounded-xl border border-white/10 bg-white/5 px-12 py-4 text-[11px] font-bold text-white uppercase tracking-[0.2em] transition-all hover:bg-white/10"
                    >
                        Review Bag
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
