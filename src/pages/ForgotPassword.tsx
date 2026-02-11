import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">R</span>
            </div>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-foreground">Reset password</h1>
          <p className="mt-2 text-sm text-muted-foreground">We'll send you a reset link</p>
        </div>
        {sent ? (
          <div className="mt-8 rounded-xl border border-border bg-card p-6 text-center">
            <p className="text-foreground font-medium">Check your email</p>
            <p className="mt-2 text-sm text-muted-foreground">We've sent a password reset link to {email}</p>
            <Link to="/login" className="mt-4 inline-block text-sm text-primary hover:text-primary/80">Back to sign in</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary" placeholder="you@example.com" />
            </div>
            <button type="submit" className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]">
              Send Reset Link
            </button>
            <p className="text-center text-sm text-muted-foreground">
              <Link to="/login" className="text-primary hover:text-primary/80">Back to sign in</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
