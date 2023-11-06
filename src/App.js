import './App.css';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiFillPicture } from "react-icons/ai"
import { useEffect, useState } from 'react';
import { getItems } from './utils/data';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';




function App() {
  const [items, setItems] = useState(getItems);
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [checkedItems, setCheckedItems] = useState([])


  useEffect(() => {
    const checkItem = items.filter(item => item.isChecked && item)
    setCheckedItems(checkItem)
  }, [items])


  const hangleSelectedItem = (item) => {
    setSelectedItem(item);
  };


  const handelDeleteItems = () => {
    const updatedItems = items.filter(item => !checkedItems.includes(item));
    setItems(updatedItems);
    setCheckedItems([]);
    setSelectedItem(updatedItems[0])
    console.log(updatedItems)
  }

  const handleSelectItems = (e, id) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        return { ...item, isChecked: e.target.checked };
      }
      return item;
    });

    setItems(updatedItems);

    console.log(updatedItems);
  };


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const d = new Date();
      let time = d.getTime();
      console.log('Adding new item:', { id: items.length + 1, img: imageUrl, views: 12, time: time });
      setItems((prevItems) => [...prevItems, { id: items.length + 1, img: imageUrl, views: 12, time: time }]);
    }
  };


  const handleSortByLatest = (info) => {
    console.log(info)
    if (info == 'popularity') {
      const sortedItems = [...items].sort((a, b) => b.views - a.views);
      setItems(sortedItems);
    } else if (info == 'latest') {
      const sortedItems = [...items].sort((a, b) => b.time - a.time);
      setItems(sortedItems);
    }
  };


  return (
    <div className='w-screen min-h-screen flex justify-center items-center bg-[#F7F5F2]' >
      <div className='border-[10px] border-[#EDF2F7] w-full mx-auto max-w-[860px]'>
        <div className='h-full w-full bg-white rounded-md'>
          <div className='flex items-center justify-between px-[28px] py-[16px] border-b '>
            <div className="form-control">
              <label className="text-[14px] sm:ext-[16px] font-semibold cursor-pointer flex items-center gap-[12px]">
                <input type="checkbox" checked={checkedItems.length} onChange={e => { }} className="checkbox checkbox-xs rounded-none checkbox-primary" />
                <span className=" text-[14px] sm:text-[16px] font-semibold">{checkedItems.length} Seleted Items</span>
              </label>
            </div>
            <div className='flex items-center short-delete-parent gap-[20px]'>
              <div className="form-control min-w-[130px] delete-item">
                <label onClick={() => handelDeleteItems()} className="text-[14px] sm:text-[16px] font-semibold cursor-pointer flex items-center gap-[12px]">
                  <span className="text-[14px] sm:text-[16px] font-semibold">Delete Items</span>
                  <RiDeleteBin6Line className='text-[20px] hover:text-primary' />
                </label>
              </div>
              <select className="select select-bordered w-full max-w-xs short-item" defaultValue="popularity" onChange={e => handleSortByLatest(e.target.value)}>
                <option disabled hidden>Sort by</option>
                <option value="popularity">popularity</option>
                <option value="latest">latest</option>
              </select>
            </div>
          </div>
          <div className='p-[28px]'>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
              <div className='col-span-2 row-span-2'>
                <div className='col-span-2 row-span-2'>
                  <figure className='rounded-md border relative item border-gray-100'>
                    <div className='absolute bg-animate bg-animate-1 w-full bg-[#8282824a]'></div>
                    <div className='absolute bg-animate bg-animate-2 w-full bg-[#8282824a]'></div>
                    <img src={selectedItem.img} className='rounded-md' style={{ objectFit: 'cover', objectPosition: 'center cener' }} alt="seleted item" />
                  </figure>
                </div>
              </div>
              {
                items.map((item, index) => {
                  return (
                    <figure className='border relative rounded-md cursor-pointer item border-gray-100' key={index} onClick={() => hangleSelectedItem(item)}>
                      <div className={`absolute bg-animate bg-animate-1 w-full bg-[#8282824a] ${item.isChecked ? 'checked' : ''}`}></div>
                      <div className={`absolute bg-animate bg-animate-1 w-full bg-[#8282824a] ${item.isChecked ? 'checked' : ''}`}></div>
                      <div className={`absolute left-[10px] top-[10px] hidden select-checkbox ${item.isChecked ? 'checked-box' : ''}`}>
                        <input type="checkbox" checked={item.isChecked} className={`checkbox checkbox-xs rounded-none checkbox-primary bg-white `}
                          onChange={e => { }} onClick={(e) => { e.stopPropagation(); handleSelectItems(e, item.id) }} />
                      </div>
                      <div className=' rounded-md'  >
                        <img src={item?.img} alt="item" style={{ objectFit: 'cover', objectPosition: 'center cener' }} />
                      </div>
                    </figure>
                  )
                })
              }
              <label htmlFor='upload-image' className='border rounded-md relative item cursor-pointer text-[16px] flex flex-col py-[40px] items-center justify-center gap-20px font-semibold  border-dashed border-gray-200'>
                <div className='absolute bg-animate bg-animate-1 w-full bg-[#8282824a]'></div>
                <div className='absolute bg-animate bg-animate-2 w-full bg-[#8282824a]'></div>
                <AiFillPicture />
                Add images
                <input type="file" onChange={(e) => handleImageUpload(e)} className='hidden' id='upload-image' />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
