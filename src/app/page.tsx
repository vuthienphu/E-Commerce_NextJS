import Image from "next/image";
import styles from "./page.module.css";
import Hero from "@/component/home/Hero";
import Navbar from "@/component/home/Navbar";
import Categories from "@/component/home/Categories";

export default function Home() {
  return (
<>
<Hero/>
<Navbar/>
<Categories/>
</>
  );
}
