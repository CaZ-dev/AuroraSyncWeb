import { useEffect, useState } from 'react'
import UserInfoForm from './components/UserInfoForm'
import SideBar from './components/SideBar';
import { Button } from './components/ui/button';
import { motion } from "framer-motion";
import success from "./assets/success.gif"
import { ApiService } from './constants/api';



function App() {
  function updateForm(fieldToUpdate: Partial<FormItems>) {
    // const { content_type, accept_encoding, global_auth } = fieldToUpdate;

    // if (name && name.trim().length < 3) {
    //   setErrors((prevState) => ({
    //     ...prevState,
    //     name: "Name should be at least 3 characters long",
    //   }));
    // } else if (name && name.trim().length > 15) {
    //   setErrors((prevState) => ({
    //     ...prevState,
    //     name: "Name should be no longer than 15 characters",
    //   }));
    // } else {
    //   setErrors((prevState) => ({
    //     ...prevState,
    //     name: "",
    //   }));
    // }

    // if (email && !/\S+@\S+\.\S+/.test(email)) {
    //   setErrors((prevState) => ({
    //     ...prevState,
    //     email: "Please enter a valid email address",
    //   }));
    // } else {
    //   setErrors((prevState) => ({
    //     ...prevState,
    //     email: "",
    //   }));
    // }

    // if (phone && !/^[0-9]{10}$/.test(phone)) {
    //   setErrors((prevState) => ({
    //     ...prevState,
    //     phone: "Please enter a valid 10-digit phone number",
    //   }));
    // } else {
    //   setErrors((prevState) => ({
    //     ...prevState,
    //     phone: "",
    //   }));
    // }

    setFormData({ ...formData, ...fieldToUpdate });
  }

  const formVariants = {
    hidden: {
      opacity: 0,
      y: -50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "linear",
        duration: 1,
        x: { duration: 1 }
      },
      
    },
    exit: {
      opacity: 0,
      x: 50,
      transition: {
        ease: "easeOut",
      },
    },
  };

  

  const initialValues: FormItems = {
    content_type: "",
    accept_encoding: "",
    global_auth: "",
    new_header_data:[],
    requests: [{url:"", capture_key:"", operation_name:"", document_id:"",document_content:"",file_name:"",content_type:"", file_type:"", document_account:"", comments:"", process_name:"",load_requestid:"", job_package_name:"", job_def_name:"",reqst_id:"",request_status:"",job_name:"",parameter_list:"",notification_code:"",callback_url:"",job_options:"",status_code:"",ess_parameters:"",links: [{rel:"",href:"",name:"",kind:""}]}],
    
  };
  const [formData, setFormData] = useState(initialValues);
  const [chains, setChains] = useState(1)
  const [responseData, setResponseData] = useState<ChainsData[]>([])
  const [chainData, setChainData] = useState<FormItems[]>([{ content_type: '', accept_encoding: '', global_auth: '', new_header_data:[], requests: [{url:"", capture_key:"", operation_name:"", document_id:"",document_content:"",file_name:"",content_type:"", file_type:"", document_account:"", comments:"", process_name:"",load_requestid:"", job_package_name:"", job_def_name:"",reqst_id:"",request_status:"",job_name:"",parameter_list:"",notification_code:"",callback_url:"",job_options:"",status_code:"",ess_parameters:"", links: [{rel:"",href:"",name:"",kind:""}]}] }])
  const [selctedChain, setSelectedChain] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const addChain = () => {
    setChains(chains + 1);
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
    try {
      const response1: ChainsData[] = await ApiService.getCases()
      console.log(response1)
      setResponseData(response1)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  fetchData()
  },[])

  return (
    <>
    <div className='flex justify-between w-11/12 max-w-4xl relative m-1 rounded-lg border border-neutral-700 bg-[#262626] p-4'>
      <SideBar chains={chains} setChains={setChains} selectedChain={selctedChain} setSelectedChain={setSelectedChain} chainData={chainData} setChainData={setChainData} />
      <main className='w-full ml-4'>
        <form className='w-full flex flex-col justify-between h-full'>
      <UserInfoForm 
      key="step1"
      {...formData}
      chainCount={chains}
      setChainCount={setChains}
      chainData={chainData} 
      setChainData={setChainData}
      selectedChain={selctedChain}
      errors={errors}
      />
      </form>
      </main>
      </div>
    </>
  )
}

export default App
