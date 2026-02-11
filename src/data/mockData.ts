export interface Service {
  id: string;
  name: string;
  category: "spa" | "hair" | "fitness" | "wellness";
  rating: number;
  reviews: number;
  price: number;
  duration: string;
  description: string;
  location: string;
  specialist: string;
  amenities: string[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  shades?: string[];
  details: { label: string; content: string }[];
  rating: number;
  reviews: number;
}

export interface Item {
  id: string;
  name: string;
  category: string;
  description: string;
  price?: number;
}

export const services: Service[] = [
  { id: "s1", name: "Signature Deep Tissue Massage", category: "spa", rating: 4.9, reviews: 128, price: 145, duration: "60 min", description: "A full-body deep tissue experience targeting chronic tension and muscle knots with premium aromatherapy oils.", location: "Downtown Wellness Center", specialist: "Elena Rossi", amenities: ["Steam Room", "Shower Suite", "Herbal Tea", "Robe & Slippers"] },
  { id: "s2", name: "HydraFacial Glow Treatment", category: "spa", rating: 4.8, reviews: 96, price: 160, duration: "45 min", description: "Multi-step facial combining cleansing, exfoliation, extraction, hydration and antioxidant protection.", location: "Raffine Flagship Spa", specialist: "Sofia Laurent", amenities: ["Private Suite", "LED Therapy", "Complimentary Serum"] },
  { id: "s3", name: "Hot Stone Therapy", category: "spa", rating: 5.0, reviews: 74, price: 180, duration: "75 min", description: "Heated basalt stones combined with Swedish massage techniques for deep relaxation.", location: "Serenity Spa Lounge", specialist: "Maya Chen", amenities: ["Jacuzzi Access", "Aromatherapy", "Meditation Room"] },
  { id: "s4", name: "Precision Haircut & Styling", category: "hair", rating: 4.9, reviews: 210, price: 95, duration: "45 min", description: "Consultation-led precision cut with blow-dry styling by senior stylists.", location: "Raffine Hair Studio", specialist: "David Kim", amenities: ["Scalp Massage", "Premium Products", "Espresso Bar"] },
  { id: "s5", name: "Balayage Color Treatment", category: "hair", rating: 4.7, reviews: 87, price: 250, duration: "120 min", description: "Hand-painted highlights creating a natural, sun-kissed gradient using ammonia-free color.", location: "Studio Lumière", specialist: "Isabelle Moreau", amenities: ["Color Consultation", "Gloss Treatment", "Aftercare Kit"] },
  { id: "s6", name: "Keratin Smoothing Treatment", category: "hair", rating: 4.8, reviews: 63, price: 200, duration: "90 min", description: "Professional keratin treatment for frizz-free, silky smooth hair lasting up to 12 weeks.", location: "Raffine Hair Studio", specialist: "Nina Park", amenities: ["Heat Protectant", "Take-Home Shampoo", "Follow-up Consult"] },
  { id: "s7", name: "Personal Training Session", category: "fitness", rating: 4.9, reviews: 156, price: 120, duration: "60 min", description: "One-on-one session with a certified trainer tailored to your fitness goals.", location: "Raffine Fitness Lab", specialist: "Marcus Reid", amenities: ["Body Composition Scan", "Protein Shake", "Towel Service"] },
  { id: "s8", name: "Group HIIT Class", category: "fitness", rating: 4.6, reviews: 230, price: 35, duration: "45 min", description: "High-intensity interval training in a motivating group setting with heart-rate tracking.", location: "Raffine Fitness Lab", specialist: "Jade Torres", amenities: ["Heart Rate Monitor", "Post-Class Smoothie", "Locker Room"] },
  { id: "s9", name: "Reformer Pilates", category: "fitness", rating: 4.8, reviews: 102, price: 65, duration: "50 min", description: "Machine-based pilates focusing on core strength, flexibility and posture alignment.", location: "Core Studio", specialist: "Lena Voss", amenities: ["Grip Socks", "Mat Rental", "Recovery Lounge"] },
  { id: "s10", name: "Guided Meditation Session", category: "wellness", rating: 5.0, reviews: 89, price: 55, duration: "40 min", description: "Mindfulness meditation led by a certified practitioner in a sound-dampened studio.", location: "Mindful Space", specialist: "Aisha Patel", amenities: ["Sound Bath", "Herbal Tea", "Journal"] },
  { id: "s11", name: "Ayurvedic Consultation", category: "wellness", rating: 4.9, reviews: 47, price: 130, duration: "60 min", description: "Holistic health assessment with personalized dosha analysis and lifestyle recommendations.", location: "Vedic Wellness Center", specialist: "Dr. Raj Sharma", amenities: ["Herbal Prescription", "Diet Plan", "Follow-up Call"] },
  { id: "s12", name: "Infrared Sauna Therapy", category: "wellness", rating: 4.7, reviews: 134, price: 45, duration: "30 min", description: "Full-spectrum infrared sauna session for detoxification, pain relief and relaxation.", location: "Serenity Spa Lounge", specialist: "Self-Service", amenities: ["Private Pod", "Cold Plunge", "Eucalyptus Towel"] },
];

export const products: Product[] = [
  { id: "p1", name: "Midnight Radiance Oil", price: 85, description: "A luxurious blend of rosehip, jojoba, and vitamin E oils that deeply nourish while you sleep. Wake up to a luminous, dewy complexion.", rating: 4.9, reviews: 214, shades: ["Original", "Rose Gold", "Amber"], details: [{ label: "Ingredients", content: "Rosehip seed oil, jojoba oil, vitamin E, squalane, lavender essential oil." }, { label: "How to Use", content: "Apply 3-4 drops to clean skin before bed. Gently massage in upward motions." }, { label: "Shipping", content: "Free shipping on orders over ₹50. Arrives in 3-5 business days." }] },
  { id: "p2", name: "Velvet Moisture Cloud", price: 42, description: "Weightless hydrating cream that melts into skin providing 72-hour moisture with hyaluronic acid and ceramides.", rating: 4.8, reviews: 178, details: [{ label: "Ingredients", content: "Hyaluronic acid, ceramides, niacinamide, shea butter, aloe vera." }, { label: "How to Use", content: "Apply generously to face and neck morning and evening after serum." }, { label: "Shipping", content: "Free shipping on orders over ₹50. Arrives in 3-5 business days." }] },
  { id: "p3", name: "Sculpting Stone Roller", price: 34, description: "Premium jade facial roller designed to reduce puffiness, improve circulation, and enhance product absorption.", rating: 4.7, reviews: 96, details: [{ label: "Materials", content: "Grade-A Xiuyan jade, stainless steel frame, silicone grip." }, { label: "How to Use", content: "Roll outward from center of face. Store in refrigerator for extra de-puffing." }, { label: "Shipping", content: "Free shipping on orders over ₹50. Arrives in 3-5 business days." }] },
  { id: "p4", name: "Purifying Essence Toner", price: 48, description: "A pH-balancing toner infused with witch hazel and green tea to refine pores and prep skin for hydration.", rating: 4.6, reviews: 152, details: [{ label: "Ingredients", content: "Witch hazel, green tea extract, centella asiatica, glycerin." }, { label: "How to Use", content: "Saturate a cotton pad and sweep across face after cleansing." }, { label: "Shipping", content: "Free shipping on orders over ₹50. Arrives in 3-5 business days." }] },
];

export const items: Item[] = [
  { id: "i1", name: "Silk Eye Mask", category: "Accessories", description: "100% pure mulberry silk eye mask for the ultimate beauty sleep.", price: 25 },
  { id: "i2", name: "Aromatic Candle", category: "Home", description: "Hand-poured soy candle with notes of sandalwood and vanilla.", price: 30 },
  { id: "i3", name: "Linen Guest Towel", category: "Bath", description: "Ultra-soft, quick-drying linen towel for your luxury bathroom.", price: 15 },
];
