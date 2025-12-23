"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ArrowUpRight, MapPin, Send, Menu, X } from "lucide-react";
import { Logo, Section } from "./ui";
// ... импорт server actions (об этом ниже)

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setIsDesktop(true);
    }
  }, []);
  return isDesktop;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

// --- HEADER ---
export const Header = ({
  setCursor,
  scrollTo,
}: {
  setCursor: any;
  scrollTo: (id: string) => void;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDesktop = useIsDesktop();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [1, 0.2]);

  return (
    <>
      <motion.header
        style={{ opacity }}
        className="fixed top-0 left-0 w-full px-6 md:px-10 py-6 md:py-8 flex justify-between items-center z-50 mix-blend-difference"
      >
        <div className="cursor-pointer" onClick={() => scrollTo("hero")}>
          <Logo />
        </div>

        <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex gap-12 uppercase text-sm font-semibold tracking-[0.2em] text-white">
          {[
            { name: "Отели", id: "hotels" },
            { name: "Вкусы", id: "restaurants" },
            { name: "События", id: "events" },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => scrollTo(item.id)}
              className="hover:text-taiga-gold transition-colors relative group"
              onMouseEnter={() => isDesktop && setCursor(false, "")}
              onMouseLeave={() => isDesktop && setCursor(false, "")}
            >
              {item.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-taiga-gold transition-all group-hover:w-full" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden md:block border border-white/40 text-white px-8 py-3 rounded-sm text-[10px] font-bold uppercase hover:bg-white hover:text-black transition-all duration-500 tracking-widest">
            Забронировать
          </button>
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween" }}
            className="fixed inset-0 bg-[#151C19] z-[100] flex flex-col items-center justify-center text-[#F2F5F3]"
          >
            <button
              className="absolute top-6 right-6"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <nav className="flex flex-col gap-8 text-2xl font-serif items-center">
              {[
                { name: "Отели", id: "hotels" },
                { name: "Вкусы", id: "restaurants" },
                { name: "Конференц-залы", id: "events" },
                { name: "Контакты", id: "footer" },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    scrollTo(item.id);
                    setIsMenuOpen(false);
                  }}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- HERO (ИСПРАВЛЕНО: Четкий текст) ---
export const Hero = ({ onEnter }: any) => {
  const { scrollY } = useScroll();
  const scrollRange = [0, 1000];
  const scale = useTransform(scrollY, scrollRange, [1, 1.15]);
  const opacity = useTransform(scrollY, [0, 700, 1000], [1, 1, 0]);

  const youtubeVideoId = "rV_ERKtNyNA";
  const videoUrl = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&modestbranding=1&rel=0&showinfo=0`;

  const [index, setIndex] = useState(0);
  const words = ["ДОВЕРИЯ", "КОМФОРТА", "СЕРВИСА", "ПРИРОДЫ"];

  useEffect(() => {
    const i = setInterval(
      () => setIndex((prev) => (prev + 1) % words.length),
      2500
    );
    return () => clearInterval(i);
  }, []);

  return (
    <Section
      id="hero"
      onEnter={onEnter}
      className="h-[100vh] md:h-[140vh] relative"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* ИЗМЕНЕНИЯ ЗДЕСЬ: Убран mix-blend-difference, добавлен drop-shadow и белый цвет */}
        <div className="text-center z-20 text-white px-4 mt-20 md:mt-0 drop-shadow-lg">
          <p className="text-[10px] md:text-[10px] uppercase tracking-[0.6em] mb-4 border-b border-white/50 pb-2 inline-block shadow-black/50">
            Сеть отелей и ресторанов
          </p>
          <h1 className="text-[13vw] md:text-[8vw] leading-[0.9] font-serif font-medium">
            ТЕРРИТОРИЯ <br />
            <span className="block h-[1.1em] overflow-hidden text-taiga-gold">
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[index]}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  className="block"
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
        </div>

        <motion.div
          style={{ scale, opacity }}
          className="absolute inset-0 w-full h-full z-10"
        >
          <motion.iframe
            src={videoUrl}
            title="Nature Video"
            frameBorder="0"
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[300%] md:min-w-[150%] min-h-[150%] pointer-events-none"
          />
          {/* ИЗМЕНЕНИЯ ЗДЕСЬ: bg-black/20 -> bg-black/50 для лучшего контраста */}
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </div>
    </Section>
  );
};

// ... Остальные компоненты (Hotels, Restaurants и т.д.) остаются без изменений ...
// ... Ниже только измененный компонент Career для обработки формы ...

export const Hotels = ({ onEnter, setCursor, setHoverBg, setTheme }: any) => {
  const isDesktop = useIsDesktop();
  const hotelsData = [
    {
      name: "АЗАТАЙ",
      themeId: "azatai",
      type: "Парк-отель",
      desc: "Загородный отдых на берегу Байкала",
      loc: "п. Большое Голоустное",
      img: "japanese-zen-hotel-room-white-sakura-minimalist-ba.jpg",
      themeBg: "#3A2226",
      link: "https://www.azatay.ru/",
    },
    {
      name: "ЯКОВЛЕВ",
      themeId: "yakovlev",
      type: "Исторический",
      desc: "Отель в доме купца Н.В. Яковлева",
      loc: "Центр города",
      img: "historical-wooden-noble-hotel-dark-brown-interior.jpg",
      themeBg: "#2F2520",
      link: "https://yakovlevhotel.ru/",
    },
    {
      name: "ВИКТОРИЯ",
      themeId: "victoria",
      type: "City Hotel",
      desc: "Стиль и комфорт в самом центре",
      loc: "Центр города",
      img: "/elegant-comfortable-hotel-in-historic-city-center.jpg",
      themeBg: "#3D3628",
      link: "https://victoryhotel.ru/",
    },
    {
      name: "АТЛАС",
      themeId: "atlas",
      type: "Бизнес",
      desc: "Уютный уголок недалеко от центра",
      loc: "Тихий центр",
      img: "modern-bright-hotel-lobby-blue-white-green-colors.jpg",
      themeBg: "#1D2530",
      link: "https://atlas-irk.ru/",
    },
    {
      name: "ТАЙГА",
      themeId: "taiga",
      type: "Дизайнерский",
      desc: "Любимое место проживания туристов",
      loc: "Иркутск",
      img: "forest-themed-hotel-green-nature-siberian-taiga.jpg",
      themeBg: "#151C19",
      link: "https://taigahotel.ru/",
    },
  ];

  return (
    <Section
      id="hotels"
      onEnter={onEnter}
      className="py-16 md:py-32 text-taiga-snow relative z-10"
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12 md:mb-24 border-b border-white/10 pb-8">
          <h2 className="text-4xl md:text-8xl font-serif">ОТЕЛИ</h2>
          <p className="text-[10px] md:text-xs uppercase tracking-widest max-w-xs opacity-60 text-right">
            Коллекция уникальных мест
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24"
        >
          {hotelsData.map((h, i) => (
            <motion.a
              href={h.link}
              target="_blank"
              rel="noopener noreferrer"
              key={i}
              variants={itemVariants}
              className={`group block relative ${
                i % 2 !== 0 ? "md:translate-y-32" : ""
              }`}
              onMouseEnter={() => {
                if (isDesktop) {
                  setHoverBg(h.themeBg);
                  setTheme(h.themeId);
                }
              }}
              onMouseLeave={() => {
                if (isDesktop) {
                  setHoverBg(null);
                  setTheme(null);
                }
              }}
            >
              <div className="h-[280px] md:h-[450px] rounded-sm overflow-hidden mb-6 relative bg-taiga-deep/50">
                <motion.img
                  src={h.img}
                  whileHover={isDesktop ? { scale: 1.05 } : {}}
                  transition={{ duration: 0.7 }}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-taiga-snow text-taiga-deep px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest shadow-lg z-10">
                  {h.type}
                </div>
              </div>
              <h3
                className={`text-2xl md:text-4xl font-serif mb-3 transition-colors ${
                  isDesktop ? "group-hover:text-taiga-gold" : "text-taiga-gold"
                }`}
              >
                {h.name}
              </h3>
              <p className="text-xs md:text-sm opacity-80 mb-2 font-light">
                {h.desc}
              </p>
              <div className="flex gap-2 text-[10px] opacity-50 uppercase tracking-widest">
                <MapPin size={14} /> {h.loc}
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

export const Restaurants = ({ onEnter, setCursor }: any) => {
  const isDesktop = useIsDesktop();
  const restaurantsData = [
    {
      name: "АЗАТАЙ",
      desc: "Панорамный вид на Байкал",
      img: "DSC03659.jpg",
      link: "https://azatai-rest.ru",
    },
    {
      name: "ТАЙГА",
      desc: "Сибирская душа у Ангары",
      img: "DSC_7380.png.webp",
      link: "#",
    },
  ];

  return (
    <Section
      id="restaurants"
      onEnter={onEnter}
      className="py-16 md:py-40 text-taiga-deep relative z-10"
    >
      <div className="container mx-auto px-6">
        <div className="border-b border-taiga-deep/10 pb-10 mb-12 md:mb-20 text-center">
          <p className="text-xs md:text-xl uppercase tracking-[0.3em] mb-4 opacity-60">
            Гастрономия
          </p>
          <h2 className="text-4xl md:text-8xl font-serif">ВКУСЫ ТАЙГИ</h2>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-12 md:gap-0"
        >
          {restaurantsData.map((item, i) => (
            <motion.a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              key={i}
              variants={itemVariants}
              className="md:border-t border-taiga-deep/10 py-0 md:py-20 flex flex-col md:flex-row justify-between items-center group md:hover:bg-taiga-deep md:hover:text-taiga-snow md:px-10 transition-all duration-500 cursor-pointer md:cursor-none rounded-lg"
              onMouseEnter={() => isDesktop && setCursor(false, "")}
              onMouseLeave={() => isDesktop && setCursor(false, "")}
            >
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-16 text-center md:text-left">
                <span className="text-xs font-bold opacity-30 md:group-hover:opacity-100 hidden md:block">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-4xl md:text-8xl font-serif md:group-hover:not-italic transition-all duration-500 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-[10px] md:text-xs uppercase tracking-widest opacity-80 md:group-hover:opacity-80 md:group-hover:text-taiga-gold">
                    {item.desc}
                  </p>
                </div>
              </div>
              <div className="w-full h-56 md:w-96 md:h-56 mt-6 md:mt-0 relative md:absolute md:left-1/2 md:-translate-x-1/2 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 rounded-sm overflow-hidden md:rotate-3 md:group-hover:rotate-0 shadow-2xl z-20 md:grayscale md:group-hover:grayscale-0 border-4 border-white/10 md:pointer-events-none">
                <img
                  src={item.img}
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
              <div className="flex items-center gap-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 mt-4 md:mt-0">
                <span className="text-[10px] uppercase tracking-widest border-b border-current pb-1">
                  Меню
                </span>
                <ArrowUpRight size={20} />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

export const Events = ({ onEnter, setCursor }: any) => {
  const isDesktop = useIsDesktop();
  return (
    <Section
      id="events"
      onEnter={onEnter}
      className="py-16 md:py-32 text-taiga-deep relative z-10"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 border-b border-taiga-deep/10 pb-8 gap-4">
          <h2 className="text-4xl md:text-7xl font-serif">
            ЗАЛЫ ДЛЯ <br />
            <span className="text-taiga-green italic">ТОРЖЕСТВ</span>
          </h2>
          <p className="text-[10px] md:text-xs uppercase tracking-widest opacity-60">
            Площадки для ваших событий
          </p>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
        >
          {[
            {
              name: "Банкет-Холл",
              cap: "до 200 персон",
              img: "DSC04009-HDR.jpg",
              link: "#",
            },
            {
              name: "Веранда у Реки",
              cap: "до 80 персон",
              img: "DSC04031.jpg",
              link: "#",
            },
            {
              name: "Зал Панорама",
              cap: "до 500 персон",
              img: "DSC04013-HDR.jpg",
              link: "#",
            },
            {
              name: "Лофт",
              cap: "до 100 персон",
              img: "DSC04003.jpg",
              link: "#",
            },
          ].map((h, i) => (
            <motion.a
              href={h.link}
              target="_blank"
              rel="noopener noreferrer"
              key={i}
              variants={itemVariants}
              whileHover={isDesktop ? { y: -10 } : {}}
              className={`group block relative ${
                i % 2 !== 0 ? "md:translate-y-20" : ""
              }`}
              onMouseEnter={() => isDesktop && setCursor(false, "")}
              onMouseLeave={() => isDesktop && setCursor(false, "")}
            >
              <div className="h-[220px] md:h-[400px] rounded-xl overflow-hidden mb-4 md:mb-6 relative shadow-sm group-hover:shadow-2xl transition-shadow duration-500">
                <img
                  src={h.img}
                  className="w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-1000 md:group-hover:grayscale-0"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 bg-white/90 backdrop-blur px-4 py-3 md:px-6 md:py-4 w-full flex justify-between items-center">
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-taiga-green">
                    {h.cap}
                  </span>
                  <ArrowUpRight size={16} />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif mb-1">{h.name}</h3>
              <p className="text-[10px] opacity-50 uppercase tracking-widest">
                Подробнее
              </p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

// --- CAREER (Обновлено под форму) ---
export const Career = ({ onEnter, setCursor }: any) => {
  const isDesktop = useIsDesktop();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    // Здесь должна быть логика отправки на сервер/админку
    // Для демо сделаем имитацию
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <Section onEnter={onEnter} className="py-16 md:py-32 text-taiga-snow">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 md:gap-24 items-start">
          <div className="flex-1">
            <span className="text-taiga-gold uppercase tracking-widest text-xs mb-4 md:mb-6 block">
              Команда
            </span>
            <h2 className="text-4xl md:text-6xl font-serif mb-6 md:mb-10">
              КАРЬЕРА <br />В ТАЙГЕ
            </h2>
            <p className="opacity-80 text-sm md:text-lg mb-6 md:mb-12 max-w-md leading-relaxed">
              Станьте частью нашей семьи. Мы ценим талант, страсть к
              гостеприимству и сибирский характер.
            </p>
          </div>
          <div className="flex-1 w-full bg-black/20 backdrop-blur-md p-6 md:p-12 rounded-lg border border-white/10 shadow-2xl">
            {status === "success" ? (
              <div className="text-center py-10">
                <h3 className="text-2xl font-serif text-taiga-gold mb-2">
                  Спасибо!
                </h3>
                <p>Ваша заявка принята. Мы свяжемся с вами.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                <input
                  name="name"
                  required
                  type="text"
                  className="w-full bg-transparent border-b border-white/20 py-2 focus:border-taiga-gold outline-none placeholder-white/20 text-sm"
                  placeholder="Ваше Имя"
                />
                <input
                  name="phone"
                  required
                  type="tel"
                  className="w-full bg-transparent border-b border-white/20 py-2 focus:border-taiga-gold outline-none placeholder-white/20 text-sm"
                  placeholder="+7 (___)"
                />
                <button
                  disabled={status === "loading"}
                  type="submit"
                  className="w-full bg-taiga-gold text-taiga-deep py-4 font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2 group text-xs md:text-sm disabled:opacity-50"
                  onMouseEnter={() => isDesktop && setCursor(false, "")}
                  onMouseLeave={() => isDesktop && setCursor(false, "")}
                >
                  {status === "loading" ? "Отправка..." : "Отправить"}
                  <Send
                    size={16}
                    className="group-hover:translate-x-2 transition-transform"
                  />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

export const News = ({ onEnter, setCursor }: any) => {
  const isDesktop = useIsDesktop();
  const constraintsRef = useRef(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const newsData = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600",
      title: "Новые гастрономические открытия сезона",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600",
      title: "Открытие дизайн-отеля 'ТАЙГА' в центре",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1519225421980-715cb0202128?w=600",
      title: "Бизнес-форум: успех на Байкале",
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600",
      title: "Мастер-класс от шефа ресторана 'АЗАТАЙ'",
    },
  ];

  useEffect(() => {
    if (constraintsRef.current) {
      const container = constraintsRef.current as HTMLElement;
      const content = container.querySelector(
        ".news-content-wrapper"
      ) as HTMLElement;

      if (content) {
        const totalContentWidth = content.scrollWidth;
        const viewportWidth = container.offsetWidth;
        if (totalContentWidth > viewportWidth) {
          setConstraints({ left: viewportWidth - totalContentWidth, right: 0 });
        } else {
          setConstraints({ left: 0, right: 0 });
        }
      }
    }
  }, [newsData.length, isDesktop]);

  return (
    <Section
      id="news"
      onEnter={onEnter}
      className="py-16 md:py-32 text-taiga-deep"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-serif mb-8 md:mb-12 border-b border-current pb-6">
          СОБЫТИЯ
        </h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          ref={constraintsRef}
          className="horizontal-scroll-snap -mx-6 md:mx-0 px-6 md:px-0 overflow-hidden"
        >
          <motion.div
            drag="x"
            dragConstraints={constraints}
            className="flex gap-6 md:gap-12 cursor-grab active:cursor-grabbing news-content-wrapper"
          >
            {newsData.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="group cursor-pointer min-w-[75%] md:min-w-[300px] flex-shrink-0"
                onMouseEnter={() => isDesktop && setCursor(true, "READ")}
                onMouseLeave={() => isDesktop && setCursor(false, "")}
              >
                <div className="h-[250px] md:h-[400px] overflow-hidden mb-6 relative bg-taiga-green rounded-lg">
                  <img
                    src={item.img}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="flex justify-between items-baseline mb-4 border-b border-black/10 pb-2">
                  <span className="text-xs opacity-50">12.10.2025</span>
                  <ArrowUpRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <h3 className="text-lg md:text-2xl font-serif leading-tight group-hover:text-taiga-green transition-colors">
                  {item.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
};

export const Footer = ({ onEnter, setCursor }: any) => {
  const isDesktop = true;
  const hotels = ["Гранд-отель", "Бутик-отель 'Кедр'", "Шале 'Ангара'"];
  const restaurants = ["Таёжный Вкус", "Хан Буз", "Байкальская Закуска"];
  const conferenceHalls = ["Таёжный", "Азатай", "Байкальский"];
  const socialLinks = [
    { name: "Telegram", href: "#" },
    { name: "VK", href: "#" },
    { name: "Instagram*", href: "#" },
    { name: "YouTube", href: "#" },
  ];

  return (
    <Section
      id="footer"
      onEnter={onEnter}
      viewportOverride={{ amount: 0.2 }}
      className="pt-16 md:pt-24 pb-12 bg-taiga-snow text-taiga-deep border-t border-taiga-deep/5 w-full"
    >
      <div
        className="px-6 md:px-10 lg:px-20"
        onMouseEnter={() => isDesktop && setCursor(false, "")}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 md:gap-16 mb-16 md:mb-24">
          <div>
            <h4 className="font-bold text-[10px] mb-4 md:mb-8 uppercase tracking-widest text-taiga-green">
              Отели
            </h4>
            <ul className="space-y-3 text-xs opacity-70 uppercase tracking-wider">
              {hotels.map((i) => (
                <li key={i}>
                  <a href="#" className="hover:text-taiga-deep">
                    {i}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[10px] mb-4 md:mb-8 uppercase tracking-widest text-taiga-green">
              Рестораны
            </h4>
            <ul className="space-y-3 text-xs opacity-70 uppercase tracking-wider">
              {restaurants.map((i) => (
                <li key={i}>
                  <a href="#" className="hover:text-taiga-deep">
                    {i}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[10px] mb-4 md:mb-8 uppercase tracking-widest text-taiga-green">
              Конференц-залы
            </h4>
            <ul className="space-y-3 text-xs opacity-70 uppercase tracking-wider">
              {conferenceHalls.map((i) => (
                <li key={i}>
                  <a href="#" className="hover:text-taiga-deep">
                    {i}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[10px] mb-4 md:mb-8 uppercase tracking-widest text-taiga-green">
              Соцсети
            </h4>
            <ul className="space-y-3 text-xs opacity-70 uppercase tracking-wider">
              {socialLinks.map((i) => (
                <li key={i.name}>
                  <a href={i.href} className="hover:text-taiga-deep">
                    {i.name}
                  </a>
                </li>
              ))}
            </ul>
            <h4 className="font-bold text-[10px] mt-8 mb-4 md:mb-8 uppercase tracking-widest text-taiga-green">
              Контакты
            </h4>
            <p className="text-lg md:text-xl font-serif mb-2">
              +7 (3952) 00-00-00
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end text-[9px] uppercase opacity-20 tracking-widest border-t border-taiga-deep/5 pt-8 gap-2">
          <p>Все права защищены.</p>
          <p>Made with Nature</p>
        </div>
      </div>
    </Section>
  );
};
