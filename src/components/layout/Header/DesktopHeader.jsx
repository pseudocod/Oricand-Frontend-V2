import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../../context/UserContext";

export default function DesktopHeader({ isOpen, onMenuToggle, onCartOpen }) {
  const { user } = useAuth();

  return (
    <div className="fixed right-0 top-0 h-full z-[60] hidden md:flex flex-col justify-between items-center py-6 bg-white text-black w-[80px] border-l border-neutral-200">
      {/* Top - Menu Icon */}
      <button
        onClick={onMenuToggle}
        className="w-6 h-6 cursor-pointer relative group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <XMarkIcon />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <Bars3Icon />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Middle - Rotated Shipping Info */}
      <div className="transform rotate-90 text-xs text-center whitespace-pre w-[420px] leading-snug">
        <div className="font-semibold uppercase mb-1">Free Shipping</div>
        <span className="text-neutral-500">
          Bucharest 100 RON+ · Romania 150 RON+ · EU 250 RON+
        </span>
      </div>

      {/* Bottom - Icons */}
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={onCartOpen}
          className="w-5 h-5 hover:scale-110 transition-transform cursor-pointer"
        >
          <ShoppingBagIcon />
        </button>
        <Link
          to={user ? "/account" : "/login"}
          className="w-5 h-5 hover:scale-110 transition-transform cursor-pointer"
        >
          <UserIcon />
        </Link>
        <span className="text-xs font-medium">RO</span>
      </div>
    </div>
  );
}
