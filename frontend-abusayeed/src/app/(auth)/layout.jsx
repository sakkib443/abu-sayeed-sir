import Footer from "@/components/sheard/Footer";
import Navbar from "@/components/sheard/Navbar";
import TopHeader from "@/components/sheard/TopHeader";

export const metadata = {
  title: "Authentication | Abu Sayeed",
  description: "Login or Register to access your Abu Sayeed account.",
};

export default function AuthLayout({ children }) {
  return (
    <>
      <TopHeader />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
