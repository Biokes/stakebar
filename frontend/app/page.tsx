"use client";
import { Button } from "@/components/ui/button";
import { Shield, TrendingUp, Users, Clock, Twitter, Github, MessageCircle } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import ModeToggle from "@/components/ui/modeToggle";


export default function Home() {

  const Navbar = () => (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" />
            </svg>
            <h1 className="text-2xl font-bold">YieldFi</h1>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {["About", "How it Works", "Features", "Roadmap"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg transition-colors">
              Launch App
            </button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
  const Hero = () => (
    <section className="relative rounded-xl overflow-hidden mb-16">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAg16A4S4UIuxDyEJQdbI-METzyEzn10R_IM48kPxkPZ97NZKo2Wo6-tkFdJKILQTAYkZbqOt0nmaMHnMuVJJKZs47I52RxGRJkUWroVSAgcSHZ8VbgRr8i1zXw0chEjjPfJUCTBIOAH9x5WIxo4YBUUTweLuPmC8aiHH77TJ8shg2ubKan5vt7QU_doHQkfrC2W-RMX-Ru2vmuolKKNS9cxOjPEwRKRRYI9YxbbRK6HWmyGeRIQ7zkruDL2UytCiz2YR3KijEmpCYb')",
        }}
      ></div>
      <div className="relative min-h-[480px] flex flex-col items-start justify-end p-8 md:p-12 text-white">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-2xl">
          Unlock the Power of Decentralized Yield
        </h1>
        <p className="mt-4 text-lg max-w-2xl text-gray-200">
          YieldFi empowers the unbanked to access high-yield opportunities through decentralized finance. Stake your digital assets and earn competitive returns.
        </p>
        <button className="mt-8 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors">
          Get Started
        </button>
      </div>
    </section>
  );

  const About = () => (
    <section className="py-16 text-center flex flex-col gap-8" id="about">
      <div>
        <h2 className="text-3xl font-bold mb-4">About YieldFi</h2>
        <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
          YieldFi is a decentralized platform designed to bridge the gap between traditional finance and DeFi. We provide a secure and user-friendly environment for individuals, particularly those underserved by traditional banking systems, to participate in yield farming and earn competitive returns on their digital assets.
        </p>
      </div>
      <div className="relative h-[400px] w-[90%] max-w-4xl mx-auto overflow-hidden rounded-md border border-border">
        <Image
          src="/about.jpeg"
          alt="staking"
          fill
          className="object-contain object-center transition-transform duration-500 scale-120 md:scale-150 md:hover:scale-155 hover:scale-125 "
        />
      </div>
    </section>
  );

  const HowItWorks = () => {
    const [activeTab, setActiveTab] = useState("unbanked");

    const tabContent = {
      unbanked: (
        <>
          <p>1. <strong>Create an Account:</strong> Sign up with your email and verify your identity.</p>
          <p>2. <strong>Deposit Assets:</strong> Transfer your digital assets to your YieldFi wallet.</p>
          <p>3. <strong>Stake and Earn:</strong> Choose from a variety of staking pools and start earning yield immediately.</p>
          <p>4. <strong>Withdraw Anytime:</strong> Access your staked assets and earned rewards whenever you need them.</p>
        </>
      ),
      crypto: (
        <>
          <p>1. <strong>Connect Wallet:</strong> Link your MetaMask, RainbowKit, or other wallet.</p>
          <p>2. <strong>Select Asset:</strong> Choose from USDC, ETH, or SUI to stake.</p>
          <p>3. <strong>Approve & Stake:</strong> Approve the transaction and stake on the Hedera network.</p>
          <p>4. <strong>Mint NFT & Track Rewards:</strong> Receive a yield-bearing NFT that shows real-time growth of your staked assets.</p>
        </>
      ),
    };

    return (
      <section className="py-16" id="how-it-works">
        <h2 className="text-3xl font-bold text-center mb-12">How it Works</h2>
        <div className="max-w-3xl mx-auto">
          <div className="flex border-b border-border mb-8">
            {["unbanked", "crypto"].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <p
                  key={tab}
                  className={`flex-1 py-3 text-lg font-bold border-b-2 transition-all bg-transparent text-center  hover:bg-transparent ${isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  style={{ transform: 'none' }}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "unbanked" ? "For the Unbanked" : "For Crypto Savvy"}
                </p>
              );
            })}
          </div>

          <div className="relative min-h-[150px]">
            <div
              key={activeTab}
              className="text-lg text-muted-foreground space-y-2"
              style={{
                animation: 'fadeIn 0.3s ease-in-out'
              }}
            >
              {tabContent[activeTab]}
            </div>
          </div>
        </div>
        <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      </section>
    );
  };

  const Features = () => {
    const keyFeatures = [
      { title: "Secure & Transparent", text: "Your assets are protected by audited smart contracts and transparent protocols.", icon: Shield },
      { title: "High Yield", text: "Access competitive returns by participating in curated, high-performing yield pools.", icon: TrendingUp },
      { title: "Community-Driven", text: "Our platform is governed by the community, ensuring fairness and transparency.", icon: Users },
      { title: "Instant Access", text: "Withdraw your assets and earned rewards at any time, without any lock-up periods.", icon: Clock },
    ];

    return (
      <section className="py-16 bg-muted/50 rounded-xl" id="features">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
          {keyFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex items-start gap-4 p-6 border border-border rounded-lg bg-background flex-col">
                <div className="text-primary mt-1">
                  <Icon size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  const Roadmap = () => {
    const roadmapItems = [
      { title: "Platform Launch", description: "Initial release of the YieldFi platform with core staking features." },
      { title: "Multi-Chain Support", description: "Expansion to support multiple blockchain networks for increased yield opportunities." },
      { title: "Governance Integration", description: "Implementation of a decentralized governance system allowing community participation in platform decisions." },
      { title: "USSD Support", description: "Implementation of a decentralized governance system allowing community participation in platform decisions." },
    ];

    return (
      <section className="py-16" id="roadmap">
        <h2 className="text-3xl font-bold text-center mb-12">Roadmap</h2>
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-5 top-0 h-full w-0.5 bg-border"></div>
          {roadmapItems.map((item, index) => (
            <div key={index} className={`relative pl-12 ${index < roadmapItems.length - 1 ? 'mb-12' : ''}`}>
              <div className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white">
                <span className="text-xl font-bold">{index + 1}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const ContactUs = () => (
    <div className="flex flex-col justify-center items-center bg-muted/50">
      <div className="flex flex-col justify-center rounded w-full border border-border py-4 max-w-5xl px-6">
        <h1 className="text-3xl font-bold text-center w-full py-6">Contact Us</h1>
        <div className="flex flex-col md:flex-row gap-6 px-3 justify-center items-center w-full">
          <aside className="relative min-h-[300px] max-h-[400px] mx-auto overflow-hidden rounded-md border border-border w-full max-w-[400px]">
            <Image
              src="/Messages.jpeg"
              alt="staking"
              fill
              className="object-contain object-cover transition-transform duration-500 md:hover:scale-115 hover:scale-105"
            />
          </aside>
          <div className="w-full max-w-[400px]">
            <p className="text-muted-foreground mb-4 text-center md:text-left">
              Have a question? Send us a message.
            </p>
            <form className="space-y-4">
              <Input type="email" placeholder="Your email@mail.com"
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              />
              <textarea
                className="resize-none w-full px-4 py-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary focus:border-primary transition-colors h-32"
                placeholder="Your message"
              ></textarea>
              <Button type="submit" >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>

  )
  const Footer = () => (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center md:items-end justify-center gap-4">
            <div className="flex gap-4 footerCard">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={24} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle size={24} />
              </a>
            </div>
            <p className="text-[12px] text-muted-foreground">&copy; {new Date().getFullYear()} YieldFi. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="relative w-full overflow-x-hidden">
      <div className="flex h-full min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Hero />
          <About />
          <HowItWorks />
          <Features />
          <Roadmap />
          <ContactUs />
        </main>
        <Footer />
      </div>
    </div>
  );
}
