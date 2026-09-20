import { ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/motion/MagneticButton";

const BOOKING_URL = "https://c-j-tutoring-2627.setmore.com";

export default function BookingLaunchButton({ className = "" }: { className?: string }) {
  return (
    <MagneticButton
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      variant="primary"
      className={className}
    >
      Launch Session Request Form
      <ArrowUpRight size={16} aria-hidden="true" />
    </MagneticButton>
  );
}
