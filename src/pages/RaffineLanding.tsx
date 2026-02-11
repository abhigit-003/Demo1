import RaffineHeader from "@/components/raffine/Header";
import Hero from "@/components/raffine/Hero";
import TrendingDestinations from "@/components/raffine/TrendingDestinations";
import Editorial from "@/components/raffine/Editorial";
import StaffPicks from "@/components/raffine/StaffPicks";

const RaffineLanding = () => {
    return (
        <div className="overflow-x-hidden">
            <Hero />
            <TrendingDestinations />
            <Editorial />
            <StaffPicks />
        </div>
    );
};

export default RaffineLanding;
