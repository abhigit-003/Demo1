import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ChevronRight,
  Briefcase,
  Phone,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";

/* =========================
   Premium Reusable Input
========================= */
const PremiumInput = ({
  label,
  icon,
  value,
  onChange,
  placeholder,
  type = "text",
}: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-raffine-gold ml-1">
      {label}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
          {icon}
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border border-white/5 bg-white/5 ${
          icon ? "pl-12" : "pl-4"
        } pr-4 py-3.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-raffine-gold/50 focus:bg-white/10 transition-all`}
      />
    </div>
  </div>
);

const Register = () => {
  const navigate = useNavigate();
  const { user, register } = useAuth();

  const [role, setRole] = useState<"user" | "provider">("user");

  // Common
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Provider
  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState("Salon");
  const [phone, setPhone] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [city, setCity] = useState("");
  const [stateRegion, setStateRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all required fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (role === "provider") {
      if (
        !businessName ||
        !phone ||
        !city ||
        !address ||
        !agreeTerms
      ) {
        toast.error("Please complete required provider details");
        return;
      }
    }

    setIsLoading(true);

    const success = register({
      name,
      email,
      password,
      role,
      providerProfile:
        role === "provider"
          ? {
              businessName,
              category,
              phone,
              businessEmail,
              city,
              stateRegion,
              postalCode,
              address,
              experience,
              description,
              openingTime,
              closingTime,
              website,
              instagram,
              gstNumber,
            }
          : null,
    });

    if (success) {
      toast.success("Account created successfully!");
      navigate("/");
    } else {
      toast.error("Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen px-6 py-20 items-center justify-center bg-raffine-burgundy">
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white uppercase tracking-[0.2em]">
            Create Account
          </h1>
          <p className="mt-3 text-gray-400">
            Join the Raffine luxury network
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Role Toggle */}
            <div className="flex gap-4">
              {["user", "provider"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r as any)}
                  className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition ${
                    role === r
                      ? "bg-raffine-pink text-white"
                      : "bg-white/5 text-gray-400"
                  }`}
                >
                  {r === "user" ? "User" : "Service Provider"}
                </button>
              ))}
            </div>

            {/* Common Fields */}
            <PremiumInput
              label="Full Name"
              icon={<User size={18} />}
              value={name}
              onChange={setName}
              placeholder="Jane Doe"
            />

            <PremiumInput
              label="Email Address"
              icon={<Mail size={18} />}
              value={email}
              onChange={setEmail}
              placeholder="name@example.com"
            />

            <PremiumInput
              label="Password"
              icon={<Lock size={18} />}
              value={password}
              onChange={setPassword}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
            />

            <PremiumInput
              label="Confirm Password"
              icon={<Lock size={18} />}
              value={confirmPassword}
              onChange={setConfirmPassword}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
            />

            {/* Provider Section */}
            {role === "provider" && (
              <>
                <PremiumInput
                  label="Business Name"
                  icon={<Briefcase size={18} />}
                  value={businessName}
                  onChange={setBusinessName}
                  placeholder="Your Salon / Spa Name"
                />

                <PremiumInput
                  label="Business Phone"
                  icon={<Phone size={18} />}
                  value={phone}
                  onChange={setPhone}
                  placeholder="+91 9876543210"
                />

                <PremiumInput
                  label="City"
                  icon={<MapPin size={18} />}
                  value={city}
                  onChange={setCity}
                  placeholder="Mumbai"
                />

                <PremiumInput
                  label="Full Address"
                  value={address}
                  onChange={setAddress}
                  placeholder="Complete business address"
                />

                <PremiumInput
                  label="Years of Experience"
                  value={experience}
                  onChange={setExperience}
                  placeholder="5+ years"
                />

                <PremiumInput
                  label="Website (Optional)"
                  value={website}
                  onChange={setWebsite}
                  placeholder="https://yourbusiness.com"
                />

                <PremiumInput
                  label="Instagram (Optional)"
                  value={instagram}
                  onChange={setInstagram}
                  placeholder="@yourbrand"
                />

                <PremiumInput
                  label="GST Number (Optional)"
                  value={gstNumber}
                  onChange={setGstNumber}
                  placeholder="GSTIN"
                />

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="h-4 w-4 accent-raffine-primary"
                  />
                  <span className="text-xs text-gray-400">
                    I agree to Raffine service provider terms
                  </span>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-raffine-pink py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:shadow-[0_0_20px_rgba(233,61,104,0.4)]"
            >
              {isLoading ? "Creating..." : "Create Account"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-raffine-primary font-bold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
