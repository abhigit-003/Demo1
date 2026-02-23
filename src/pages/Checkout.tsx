import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowRight, Shield, CreditCard, Calendar, Lock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import api from "@/lib/api";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const Checkout = () => {
    const { items, clearCart, totalPrice } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [cardName, setCardName] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    // Format Card Number
    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "").substring(0, 16);
        const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
        setCardNumber(formatted);
    };

    // Format Expiry
    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "").substring(0, 4);
        if (value.length >= 3) {
            setExpiry(`${value.substring(0, 2)}/${value.substring(2)}`);
        } else {
            setExpiry(value);
        }
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            toast.error("Please login to place an order");
            navigate('/login');
            return;
        }

        if (cardNumber.replace(/\s/g, "").length !== 16 || expiry.length !== 5 || cvc.length !== 3 || !cardName) {
            toast.error("Please check your payment details.");
            return;
        }

        setIsProcessing(true);

        try {
            // Simulate Payment Processing
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const services = items.filter(i => i.type === 'service');

            // Book services
            // Note: In a real app, we would send the whole cart to a /checkout endpoint
            // and handle products/services transactionally.
            for (const s of services) {
                await api.post('/bookings', {
                    serviceId: s.id,
                    date: s.date || new Date(Date.now() + 86400000).toISOString()
                });
            }

            // TODO: Handle product orders API if it existed

            clearCart();
            toast.success("Order confirmed! Thank you for choosing Raffine.");
            navigate('/my-bookings');
        } catch (error) {
            toast.error("Transaction failed. Please try again.");
            setIsProcessing(false);
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-2 items-start">

                {/* Left Column: Order Summary & Trust */}
                <div className="space-y-8">
                    <div>
                        <span className="text-raffine-gold text-xs font-bold tracking-[0.3em] uppercase block mb-4">Secure Gateway</span>
                        <h1 className="text-4xl md:text-5xl font-light text-white uppercase tracking-[0.1em] mb-6">
                            Checkout
                        </h1>
                        <p className="text-gray-400 font-light italic text-lg leading-relaxed max-w-md">
                            Complete your purchase securely. Your beauty journey begins here.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm">
                        <h3 className="text-lg font-bold text-white mb-4">Order Summary</h3>
                        <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                            {items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center text-sm">
                                    <span className="text-gray-300">{item.name} <span className="text-xs text-gray-500">x{item.quantity}</span></span>
                                    <span className="text-white font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                            <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Total</span>
                            <span className="text-2xl font-bold text-raffine-pink">₹{totalPrice.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                            <Shield className="size-4 text-raffine-gold" />
                            <span>256-bit SSL Encrypted</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="size-4 text-raffine-gold" />
                            <span>Verified Partner</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Payment Form */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-raffine-pink/5 blur-[80px] rounded-full pointer-events-none"></div>

                    <form onSubmit={handlePlaceOrder} className="space-y-6 relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-light text-white uppercase tracking-[0.2em]">Payment Details</h2>
                            <div className="flex gap-2">
                                {/* Card Icons Placeholder */}
                                <div className="h-6 w-10 bg-white/10 rounded"></div>
                                <div className="h-6 w-10 bg-white/10 rounded"></div>
                            </div>
                        </div>

                        {/* Card Name */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-raffine-gold ml-1">Cardholder Name</label>
                            <input
                                type="text"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                placeholder="JANE DOE"
                                className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-raffine-gold/50 focus:bg-white/10 transition-all uppercase"
                            />
                        </div>

                        {/* Card Number */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-raffine-gold ml-1">Card Number</label>
                            <div className="relative">
                                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-500" />
                                <input
                                    type="text"
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                    maxLength={19}
                                    placeholder="0000 0000 0000 0000"
                                    className="w-full rounded-xl border border-white/5 bg-white/5 pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-raffine-gold/50 focus:bg-white/10 transition-all font-mono"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {/* Expiry */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-raffine-gold ml-1">Expiry Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-500" />
                                    <input
                                        type="text"
                                        value={expiry}
                                        onChange={handleExpiryChange}
                                        maxLength={5}
                                        placeholder="MM/YY"
                                        className="w-full rounded-xl border border-white/5 bg-white/5 pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-raffine-gold/50 focus:bg-white/10 transition-all font-mono"
                                    />
                                </div>
                            </div>

                            {/* CVC */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-raffine-gold ml-1">CVC / CWW</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-500" />
                                    <input
                                        type="text"
                                        value={cvc}
                                        onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").substring(0, 4))}
                                        maxLength={4}
                                        placeholder="123"
                                        className="w-full rounded-xl border border-white/5 bg-white/5 pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-raffine-gold/50 focus:bg-white/10 transition-all font-mono"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isProcessing || items.length === 0}
                            className="w-full mt-6 group relative overflow-hidden rounded-xl bg-raffine-pink py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:shadow-[0_0_20px_rgba(233,61,104,0.4)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <span className="flex items-center justify-center gap-2">
                                {isProcessing ? "Processing..." : `Pay ₹${totalPrice.toLocaleString()}`}
                                {!isProcessing && <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />}
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
