import Hero from "@/component/home/Hero";
import Navbar from "@/component/home/Navbar";
import Categories from "@/component/home/Categories";
import SellProducts from "@/component/home/SellProducts";
import OfficialStore from "@/component/home/OfficialStore";
import Cta from "@/component/home/Cta";

export default function Home() {
  return (
<>
<Hero/>
<Navbar/>
<Categories/>
<SellProducts/>
<OfficialStore/>
<Cta/>
</>
  );
}
