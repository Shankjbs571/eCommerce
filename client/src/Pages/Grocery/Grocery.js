import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../Redux/Category/categoriesSlice";
import Navbar from "../../customer/Components/Navbar/Navbar";
import MobileNavbar from "../../customer/Components/Navbar/MobileNavbar";
import { fetchProducts } from "../../Redux/Product/productSlice";
import { useLocation } from 'react-router-dom';
import ProductCard  from "../../customer/Components/Products/Cards";

function SideBar({ showall,filteredProducts , setShowAll, sidebarDairy, title, setActiveTab,setActivel1Tab, activeTab, setActiveSubTab }) {
  const location = useLocation();
  const [toggleBar, setToggleBar] = useState(true);

  return (
    <div className='max-h-screen  sticky m-2 pr-2 py-2  top-0 w-fit border-2  shadow-lg border-orange-200  '>
      <div onClick={() => setToggleBar(!toggleBar)} className='bg-white/40 border-b-2 border-orange-900 h-10 ml-4  w-fit backdrop-blur-lg flex gap-2 items-center scale-110 px-4 py-2 rounded-full shadow-md'>
        <svg className='block md:block lg:hidden' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="21" x2="3" y1="6" y2="6" />
          <line x1="15" x2="3" y1="12" y2="12" />
          <line x1="17" x2="3" y1="18" y2="18" />
        </svg>
        <h2 onClick={() => {setActiveTab(""); setActiveSubTab(""); setActivel1Tab("")}}
          className=''>{title}</h2>
      </div>
      <div className={`${toggleBar ? 'hidden' : ''}  backdrop-blur-lg lg:static lg:block ml-4  lg:w-fit mt-3 text-sm space-y-3`}>
        {sidebarDairy.map((item) => (
          <div
            onClick={(e) => {
              setActiveTab(item.name);
              filteredProducts(e,item.name);
              setShowAll(showall);
      
            }}
            className='flex flex-col px-2 hover:bg-gray-50/95 transition-all py-1  max-w-fit cursor-pointer '
            key={item.name}
          >
            <h2 onClick={() => {setActivel1Tab(item.name)}} className={`${activeTab === item.name ? showall ? 'border-b-2 backdrop-blur-lg border-orange-700  p-2 cursor-pointer' : '' : ''}`}>{item.name}</h2>
            {activeTab === item.name && (
              <div className=' w-fit px-2 items-center  whitespace-nowrap  transition-all'>
                {item.subCatog.map((items, i) => (
                  <button key={i} onClick={(e) => {setActiveSubTab(items);
                    filteredProducts(e,items); setActivel1Tab("")
                          }} className='flex font-normal capitalize my-3 px-2 hover:text-orange-600 transition-all'>
                            <div className="w-full">{items} </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Grocery() {
  const { main, sub } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories) || [];
  const status = useSelector((state) => state.categories.status);
  const [filteredProduct,setFilteredProduct]=useState([])
  const [filteredlevel0Products,setfilteredlevel0Products]=useState([])
  const [filteredlevel1Products,setfilteredlevel1Products]=useState([])
  
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const [activeTab, setActiveTab] = useState("");
  const [activel1Tab, setActivel1Tab] = useState("");
  const [activeSubTab, setActiveSubTab] = useState("");
  const [showall, setShowAll] = useState(true);

  const [viewport, setViewport] = useState(false);
  useEffect(() => {
    const updateViewport = () => {
      setViewport(window.innerWidth < 620);
    };
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  const sidebarDairy = [];
  const parent = categories.find((e) => e._id === main);

  const { products, prodstatus } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    console.log("sidebarDairy: ",sidebarDairy)
    const filteredl0Products = [];
    sidebarDairy.forEach(item => {
      const filtered = products.filter(product =>
        item.subCatog.some(subcat => subcat.toLowerCase() == product.category?.name.toLowerCase())
      );
      filteredl0Products?.push(...filtered);
    });
    setfilteredlevel0Products(filteredl0Products);
    console.log("filteredlevel0Products: ",filteredlevel0Products)


  }, [parent])

  useEffect(() => {
    console.log("sidebarDairy: ",sidebarDairy)
    let filteredl1Products = []
    const activeElement = sidebarDairy?.find(item => item?.name.toLowerCase() === activel1Tab.toLowerCase());
    console.log("activeElement: ",activeElement)


    if (activeElement) {
      // Step 2: Filter products based on the subCatog of the activeElement
      filteredl1Products = products.filter(product =>
        activeElement.subCatog.some(subcat => subcat.toLowerCase() === product.category?.name.toLowerCase())
      );
    }
      
    setfilteredlevel1Products(filteredl1Products);
    console.log("filteredlevel1Products: ",filteredlevel1Products)

  }, [activel1Tab])

  if (prodstatus === "loading") {
    return <div>Loading...</div>;
  }

  if (prodstatus === "failed") {
    return <div>Error fetching products</div>;
  }

  




  const filteredProducts = (e,cate)=>{


    if(cate){
      e.stopPropagation();
      console.log("this is cate:",cate)
      const filtered = products.filter((product) =>
       product?.category?.name?.toLowerCase().includes(cate.toLowerCase())
   
    )
      setFilteredProduct(filtered);
    }else if(sub){
      const filtered = products.filter((product) => product.category._id===sub)
      setFilteredProduct(filtered);
    }
  
  
  };

  
  if (parent) {
    console.log("parent is: ",parent);
    const level1 = [parent];
    const level2 = level1.map((x) => categories.filter((e) => e.parentCategory && e.parentCategory._id === x._id));
    const level3 = level2[0] || [];
    level3.forEach((x) => {
      sidebarDairy.push({
        name: x.name,
        subCatog: categories.filter((e) => e.parentCategory && e.parentCategory._id === x._id).map((e) => e.name)
      });
    });
  }

  return (
    <div className="">
      {viewport ? <Navbar number={10} /> : <Navbar number={10} />}
      <div className="flex flex-col lg:flex-row font-semibold">
        {parent && (
          <SideBar
            showall={showall}
            setShowAll={setShowAll}
            setActiveSubTab={setActiveSubTab}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            title={parent.name}
            sidebarDairy={sidebarDairy}
            setActivel1Tab={setActivel1Tab}
            key={"2"}
            filteredProducts ={filteredProducts }
          />
        )}
        <div className="p-10 w-full overflow-hidden">
          { activeTab == ""
           &&
           <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              { console.log("inside activatb ==",filteredlevel0Products)}
              {filteredlevel0Products?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
              }
            </div>
          }
          { activel1Tab && 
           <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
           { console.log("inside activatb ==",filteredlevel1Products)}
           {filteredlevel1Products?.map((product) => (
             <ProductCard key={product._id} product={product} />
           ))
           }
         </div>
          }
          {sidebarDairy.some((e)=>e.name.toLowerCase()==activeTab.toLowerCase() )&& 

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              {filteredProduct.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
        
              }
      
          
          {/* {activeTab === "Dal" && (
            <Dryfruits showall={showall} activeSubTab={activeSubTab} setActiveTab={setActiveSubTab} />
          )} */}
        </div>
      </div>
    </div>
  );
}

export default Grocery;
