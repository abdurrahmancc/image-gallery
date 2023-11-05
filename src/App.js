import './App.css';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiFillPicture } from "react-icons/ai"
import img2 from '../src/assets/image-2.webp';
import img11 from '../src/assets/image-1.webp';
import img3 from '../src/assets/image-3.webp';
import img4 from '../src/assets/image-4.webp';
import img5 from '../src/assets/image-5.webp';
import img6 from '../src/assets/image-6.webp';
import img7 from '../src/assets/image-7.webp';
import img8 from '../src/assets/image-8.webp';
import img9 from '../src/assets/image-9.webp';
import img10 from '../src/assets/image-10.jpeg';
import img1 from '../src/assets/image-11.jpeg';
import { useEffect, useState } from 'react';


function App() {
  const [selectedItem, setSelectedItem] = useState(img1);
  const [items, setItems] = useState([img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]);

  const hangleSelectedItem = (item) => {
    setSelectedItem(item);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setItems((prevItems) => [...prevItems, imageUrl]);
      console.log(items); // This will still show the previous value of items
    }
  };


  return (
    <div className='w-screen min-h-screen flex justify-center items-center bg-[#F7F5F2]' >
      <div className='border-[10px] border-[#EDF2F7] w-full mx-auto max-w-[860px] min-h-[600px]'>
        <div className='h-full w-full bg-white rounded-md'>
          <div className='flex items-center justify-between px-[28px] py-[16px] border-b '>
            <div className="form-control">
              <label className="text-[14px] sm:ext-[16px] font-semibold cursor-pointer flex items-center gap-[12px]">
                <input type="checkbox" className="checkbox checkbox-xs rounded-none checkbox-primary" />
                <span className=" text-[14px] sm:text-[16px] font-semibold">Seleted Items</span>
              </label>
            </div>
            <div className="form-control">
              <label className="text-[14px] sm:text-[16px] font-semibold cursor-pointer flex items-center gap-[12px]">
                <span className="text-[14px] sm:text-[16px] font-semibold">Delete Items</span>
                <RiDeleteBin6Line className='text-[20px] hover:text-primary' />
              </label>
            </div>
          </div>
          <div className='p-[28px]'>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
              <div className='col-span-2 row-span-2'>
                <div className='col-span-2 row-span-2'>
                  <figure className='rounded-md border relative item border-gray-100'>
                    <div className='absolute bg-animate bg-animate-1 w-full bg-[#8282824a]'></div>
                    <div className='absolute bg-animate bg-animate-2 w-full bg-[#8282824a]'></div>
                    <img src={selectedItem} className='rounded-md' style={{ objectFit: 'cover', objectPosition: 'center cener' }} alt="seleted item" />
                  </figure>
                </div>
              </div>
              {
                items.map((item, index) => <figure className='border relative rounded-md cursor-pointer item border-gray-100' key={index} onClick={() => hangleSelectedItem(item)}>
                  <div className='absolute bg-animate bg-animate-1 w-full bg-[#8282824a]'></div>
                  <div className='absolute bg-animate bg-animate-2 w-full bg-[#8282824a]'></div>
                  <div className='absolute left-[10px] top-[10px] hidden select-checkbox'>
                    <input type="checkbox" className="checkbox checkbox-xs rounded-none checkbox-primary bg-white" onClick={(e) => e.stopPropagation()} />
                  </div>
                  <div className=' rounded-md'  >
                    <img src={item} alt="item" style={{ objectFit: 'cover', objectPosition: 'center cener' }} />
                  </div>
                </figure>)
              }
              <label htmlFor='upload-image' className='border rounded-md relative item cursor-pointer text-[16px] flex flex-col py-[40px] items-center justify-center gap-20px font-semibold  border-dashed border-gray-200'>
                <div className='absolute bg-animate bg-animate-1 w-full bg-[#8282824a]'></div>
                <div className='absolute bg-animate bg-animate-2 w-full bg-[#8282824a]'></div>
                <AiFillPicture />
                Add images
                <input type="file" onChange={handleImageUpload} className='hidden' id='upload-image' />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
