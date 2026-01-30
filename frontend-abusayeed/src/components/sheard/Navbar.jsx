"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BiMenu, BiX, BiSearch } from "react-icons/bi";
import {
  LuChevronDown, LuLogOut, LuLayoutDashboard, LuShoppingCart, LuMoon, LuSun, LuUser, LuSettings
} from "react-icons/lu";
import { useSelector } from "react-redux";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const { items = [] } = useSelector((state) => state.cart || {});
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsSticky(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsMobileMenuOpen(false);
    router.replace("/login");
  };

  const navLinks = [
    { href: "/", label: t("navbar.home") },
    { href: "/courses", label: t("navbar.courses") },
    { href: "/design-template", label: "Design" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: t("navbar.about") },
    { href: "/contact", label: t("navbar.contact") },
  ];

  if (!mounted) return null;

  const isDark = theme === 'dark';
  const primaryColor = "#003ECB";

  return (
    <>
      <motion.nav
        initial={false}
        animate={{
          backgroundColor: isSticky
            ? (isDark ? "rgba(10, 10, 10, 0.95)" : "rgba(255, 255, 255, 0.95)")
            : (isDark ? "transparent" : "transparent"),
          height: isSticky ? "70px" : "90px",
          boxShadow: isSticky ? "0 4px 30px rgba(0,0,0,0.1)" : "none",
          backdropFilter: isSticky ? "blur(10px)" : "none",
        }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isSticky ? (isDark ? "border-b border-white/5" : "border-b border-black/5") : ""
          }`}
      >
        <div className="container mx-auto h-full px-6 flex items-center justify-between gap-8">

          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Logo color={isDark ? "#ffffff" : primaryColor} size={isSticky ? "small" : "normal"} align="left" />
          </div>

          {/* Center: Search Bar (Premium Style) */}
          <div className="hidden lg:flex flex-1 max-w-xl group">
            <div className={`relative w-full flex items-center transition-all duration-300 rounded-2xl border ${isDark
              ? "bg-white/5 border-white/10 group-hover:bg-white/10 group-focus-within:border-[#003ECB]/50"
              : "bg-gray-100 border-transparent group-hover:bg-gray-200/50 group-focus-within:bg-white group-focus-within:border-[#003ECB]/30 group-focus-within:shadow-xl group-focus-within:shadow-[#003ECB]/5"
              }`}>
              <BiSearch className={`ml-4 text-xl ${isDark ? "text-gray-500" : "text-gray-400"}`} />
              <input
                type="text"
                placeholder="Search premium courses & templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full py-3 px-4 bg-transparent outline-none text-sm font-medium ${isDark ? "text-white placeholder-gray-500" : "text-gray-800 placeholder-gray-400"
                  }`}
              />
              <div className="mr-2 px-2 py-1 rounded-lg bg-black/5 dark:bg-white/5 text-[10px] font-bold text-gray-400 tracking-tighter">
                ESC
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">

            {/* Nav Links - Desktop */}
            <div className="hidden xl:flex items-center gap-6 mr-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[13px] font-body font-medium tracking-wide transition-all hover:text-[#003ECB] relative group ${pathname === link.href
                    ? "text-[#003ECB]"
                    : (isDark ? "text-gray-300" : "text-gray-900")
                    }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#003ECB] transition-all duration-300 ${pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                    }`} />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105 ${isDark ? "bg-white/5 text-yellow-400 border border-white/10" : "bg-gray-100 text-gray-600 border border-transparent"
                  }`}
              >
                {isDark ? <LuSun size={20} /> : <LuMoon size={20} />}
              </button>

              {/* Language Switch */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
                className={`h-10 px-3 rounded-xl text-xs font-black border transition-all hover:scale-105 hover:border-[#003ECB] hover:text-[#003ECB] ${isDark ? "bg-white/5 border-white/10 text-white" : "bg-gray-100 border-transparent text-gray-700"
                  }`}
              >
                {language === 'en' ? 'BN' : 'EN'}
              </button>

              {/* Cart */}
              <Link href="/cart" className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105 ${isDark ? "bg-white/5 text-gray-300 border border-white/10" : "bg-gray-100 text-gray-600 border border-transparent"
                }`}>
                <LuShoppingCart size={20} />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#003ECB] text-white text-[10px] font-bold flex items-center justify-center shadow-lg shadow-[#003ECB]/20">
                    {items.length}
                  </span>
                )}
              </Link>

              {/* User / Login */}
              <div className="ml-2">
                {user ? (
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-2 p-0.5 rounded-full border-2 border-transparent hover:border-[#003ECB] transition-all"
                  >
                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {user.image ? (
                        <img src={user.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <LuUser className="text-gray-500" size={20} />
                      )}
                    </div>
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="hidden sm:flex px-6 py-2.5 rounded-xl bg-[#003ECB] text-white text-sm font-bold hover:bg-[#002da3] hover:shadow-lg hover:shadow-[#003ECB]/20 transition-all active:scale-95"
                  >
                    Login
                  </Link>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100 dark:bg-white/5"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <BiMenu className={`text-2xl ${isDark ? "text-white" : "text-gray-800"}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Improved Dropdown */}
        <AnimatePresence>
          {isProfileDropdownOpen && user && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              className={`absolute right-6 top-full mt-4 w-60 rounded-2xl shadow-2xl border overflow-hidden p-2 ${isDark ? "bg-[#1a1a1a] border-white/10" : "bg-white border-black/5"
                }`}
            >
              <div className="px-4 py-3 mb-2 rounded-xl bg-gray-50 dark:bg-white/5">
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Authenticated</p>
                <p className={`text-sm font-bold truncate ${isDark ? "text-gray-200" : "text-gray-800"}`}>{user.name}</p>
              </div>
              <Link
                href={user.role === "admin" ? "/dashboard/admin" : "/dashboard/user"}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-colors ${isDark ? "text-gray-300 hover:bg-white/5" : "text-gray-600 hover:bg-gray-100"
                  }`}
                onClick={() => setIsProfileDropdownOpen(false)}
              >
                <LuLayoutDashboard size={18} className="text-[#003ECB]" />
                Dashboard
              </Link>
              <Link
                href="/settings"
                className={`flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-colors ${isDark ? "text-gray-300 hover:bg-white/5" : "text-gray-600 hover:bg-gray-100"
                  }`}
                onClick={() => setIsProfileDropdownOpen(false)}
              >
                <LuSettings size={18} className="text-[#003ECB]" />
                Settings
              </Link>
              <div className="h-[1px] bg-black/5 dark:bg-white/10 my-2" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
              >
                <LuLogOut size={18} />
                Log Out
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-[60] backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className={`fixed top-0 right-0 h-full w-[320px] z-[70] shadow-2xl flex flex-col ${isDark ? "bg-[#0a0a0a]" : "bg-white"
                  }`}
              >
                <div className="p-6 flex items-center justify-between border-b border-black/5 dark:border-white/5">
                  <Logo color={isDark ? "#ffffff" : primaryColor} size="small" />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/5"
                  >
                    <BiX size={28} className={isDark ? "text-white" : "text-gray-800"} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-2">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-3 mb-2">Navigation</p>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-lg font-body font-semibold p-4 rounded-2xl flex items-center justify-between group transition-all ${pathname === link.href
                        ? "bg-[#003ECB] text-white shadow-lg shadow-[#003ECB]/30"
                        : (isDark ? "text-gray-300 hover:bg-white/5" : "text-gray-700 hover:bg-gray-50")
                        }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                      <LuChevronDown className="-rotate-90 opacity-50 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ))}
                </div>

                <div className="p-6 border-t border-black/5 dark:border-white/5 space-y-4">
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="w-full py-4 rounded-2xl bg-red-500 text-white font-bold shadow-lg shadow-red-500/20"
                    >
                      SIGN OUT
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className="block w-full py-4 rounded-2xl bg-[#003ECB] text-white text-center font-bold shadow-lg shadow-[#003ECB]/30"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      GET STARTED
                    </Link>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
      {/* Spacer */}
      <div className={`${isSticky ? "h-[70px]" : "h-[90px]"} transition-all duration-300`} />
    </>
  );
};

export default Navbar;
