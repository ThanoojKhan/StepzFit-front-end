import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import Text from "../atoms/Text";
import { Barbell, EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react";
import FooterTexts from "../particles/Data";
import List from "../atoms/List";

const Footer = () => {
  const renderIcon = useCallback((element) => {
    switch (element) {
      case 0:
        return <MapPin size={20} color="currentColor" />;
      case 1:
        return <EnvelopeSimple size={20} color="currentColor" />;
      case 2:
        return <Phone size={20} color="currentColor" />;
      default:
        return null;
    }
  }, []);

  return (
    <footer className="w-full bg-zinc-950 flex flex-col">
      <main className="w-full lg:pt-28 lg:pb-12 pt-20 pb-12 px-6 grid md:grid-cols-3 lg:gap-8 md:gap-5 gap-8 lg:px-32">
        <div className="flex flex-col gap-2">
          <Link to={`/`} className="font-extralight flex items-center relative md:text-3xl text-2xl">
            <Text as="span" className="text-amber-500 absolute -top-5 md:left-5 left-3">
            </Text>
            <Text as="span" className="text-white">Stepz</Text>
            <Text as="span" className="bg-gradient-to-r text-white bg-clip-text text-transparent">Fit</Text>
          </Link>
          <Text as="p" className="text-zinc-400 text-justify">logo textlkjnfga</Text>
        </div>

        {/* Quick Links  */}
        <div className="flex flex-col md:items-center md:mt-8 gap-4">
          <Text as="h1" className="text-zinc-300 text-2xl font-bold">;dfsjghnmldsngv;euh.dmv</Text>
          <ul className="flex flex-col gap-2">
            {[1,2,3,4,5].map((link, index) => (
              <List className="text-zinc-400" key={index}>
                <Link to={link.url} className="transition-all duration-200 hover:text-red-500">
                  {link.name}
                </Link>
              </List>
            ))}
          </ul>
        </div>

        {/* Quick contacts  */}
        <div className="flex flex-col md:mt-8 gap-6">
          <Text as="h1" className="text-zinc-300 text-2xl font-bold">lfihuae;ljfnads;fsdfedf</Text>
          <ul className="flex flex-col gap-4">
            {[1,2,3,4,5].map((name, index) => (
              <List className="text-zinc-400 flex items-start gap-2" key={index}>
                <Text as="span" className="text-amber-500 mt-1">
                  {renderIcon(index)}
                </Text>
                <Text as="span">{name.name}</Text>
              </List>
            ))}
          </ul>
        </div>
      </main>
      <div className="text-center py-3 bg-gradient-to-r from-black to-gray-900">
        <Text as="p" className="text-zinc-200 md:text-sm text-xs font-extralight">
        We are more than just a gym; we are a passionate and supportive fitness family dedicated to helping you achieve your health and wellness goals. Our mission is to create a positive and empowering environment that inspires you to challenge yourself, embrace a healthy lifestyle, and discover the best version of yourself.
        </Text>
      </div>
    </footer>
  );
};

export default Footer;
