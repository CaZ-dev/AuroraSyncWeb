import { Dispatch, SetStateAction } from "react";
import { RoughNotation } from "react-rough-notation";
import {TrashIcon} from "@radix-ui/react-icons"


interface SideBarProps {
    chains: number;
    setChains: Dispatch<SetStateAction<number>>;
    selectedChain: number;
    setSelectedChain: Dispatch<SetStateAction<number>>;
    chainData: FormItems[]
    setChainData: Dispatch<SetStateAction<FormItems[]>>;
}

const SideBar = ({ chains,setChains, setSelectedChain, selectedChain, chainData, setChainData }: SideBarProps) => {

  const deleteChain = (index: any) => {
    let newChainData = [...chainData];
    newChainData.splice(index,1);
    setChainData(newChainData);
    setChains(chains - 1);
    if(selectedChain === index){
      setSelectedChain(0)
    } else {
      setSelectedChain(selectedChain - 1)
    }
  }

  return (
    <div className="absolute -top-20 left-0 w-full md:w-[25%] md:relative md:top-0 md:left-0 " >
      <nav className="py-5 text-slate-200 bg-neutral-900 h-full rounded-md border border-neutral-700 md:p-5 overflow-y-auto overflow-x-auto" style={{ maxHeight: '90vh', maxWidth: "90vw" }}>
        <ul className="flex justify-center gap-2 md:flex-col relative">
          {Array.from({ length: Number(chains) }, (_, index) => (
            <li className="flex items-start font-medium" key={index}>
              <RoughNotation type="highlight" show={(index)===(selectedChain)} color="#DA2877">
              <button
                tabIndex={0}
                onClick={() => {
                    setSelectedChain(index)
                }}
                className="text-sm text-white md:text-base mb-2 relative flex-1"
              >
                
                  Chain {index + 1}
               
              </button>
              </RoughNotation> 
              <div className="flex-grow"/> 
              {
                chainData.length == 1 ? "" : <div>
                  <TrashIcon className="h-4 w-4 mt-2 mr-3 text-gray-500 hover:text-red-500 hover:cursor-pointer" onClick={() => {
                  deleteChain(index)
                  }}/>
                  </div>
              }
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};



export default SideBar;