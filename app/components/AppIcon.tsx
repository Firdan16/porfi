import type { LucideIcon } from "lucide-react";
import {
    ArrowRight,
    Cat,
    BookOpenText,
    BrainCircuit,
    BriefcaseBusiness,
    CalendarClock,
    CloudCheck,
    Compass,
    Eye,
    Home,
    Mail,
    Network,
    Paintbrush,
    Palette,
    RefreshCcw,
    Send,
    Shield,
    Sparkles,
    Users,
    WandSparkles,
    X,
    CreditCard,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
    home: Home,
    hub: Network,
    work: BriefcaseBusiness,
    alternate_email: Mail,
    send: Send,
    close: X,
    CreditCard,
    arrow_forward_ios: ArrowRight,
    explore: Compass,
    sync: RefreshCcw,
    schedule: CalendarClock,
    groups: Users,
    auto_fix_high: WandSparkles,
    cloud_done: CloudCheck,
    brush: Paintbrush,
    security: Shield,
    menu_book: BookOpenText,
    visibility: Eye,
    psychology: BrainCircuit,
    palette: Palette,
    revenuecat: CreditCard,
    sparkles: Sparkles,
};

interface AppIconProps {
    name: string;
    className?: string;
}

export default function AppIcon({ name, className = "" }: AppIconProps) {
    const Icon = ICONS[name] ?? Sparkles;

    return <Icon aria-hidden="true" className={className} />;
}