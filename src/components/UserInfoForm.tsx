import FormWrapper from "./FormWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "./ui/button";
import {
  TrashIcon, PlusCircledIcon, MinusCircledIcon, CheckCircledIcon
} from "@radix-ui/react-icons"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import success from "../assets/success.gif"




const UserInfoForm = ({
  errors, chainCount, setChainCount, chainData, setChainData, selectedChain
}: StepProps) => {

  const { toast } = useToast()
  const [newHeader, setNewHeader] = useState("");
  const [newHeaderValue, setNewHeaderValue] = useState("");
  const [newHeaderData, setNewHeaderData] = useState<NewHeaderData[]>([]);
  const addChain = () => {
    setChainCount(chainCount + 1);
    setChainData([...chainData, { content_type: '', accept_encoding: '', global_auth: '', new_header_data:[],requests: [{url:"", capture_key:"", operation_name:"", document_id:"",document_content:"",file_name:"",content_type:"", file_type:"", document_account:"", comments:"", process_name:"",load_requestid:"", job_package_name:"", job_def_name:"",reqst_id:"",request_status:"",job_name:"",parameter_list:"",notification_code:"",callback_url:"",job_options:"",status_code:"",ess_parameters:"", links: [{rel:"",href:"",name:"",kind:""}]}]}]);
  };

  const addRequest = () => {
    let newChainData = [...chainData];
    newChainData[selectedChain].requests.push({url:"", capture_key:"", operation_name:"", document_id:"",document_content:"",file_name:"",content_type:"", file_type:"", document_account:"", comments:"", process_name:"",load_requestid:"", job_package_name:"", job_def_name:"",reqst_id:"",request_status:"",job_name:"",parameter_list:"",notification_code:"",callback_url:"",job_options:"",status_code:"",ess_parameters:"", links: [{rel:"",href:"",name:"",kind:""}] });
    setChainData(newChainData);
  };

  const addLink = (req_index: any) => {
    let newChainData = [...chainData];
    let newRequests = [...newChainData[selectedChain].requests];
    newRequests[req_index].links.push({rel:"",href:"",name:"",kind:""});
    newChainData[selectedChain].requests = newRequests;
    setChainData(newChainData);
  };
  
  const deleteRequest = (req_index: any) => {
    let newChainData = [...chainData];
    let newRequests = [...newChainData[selectedChain].requests];
    newRequests.splice(req_index, 1);
    newChainData[selectedChain].requests = newRequests;
    setChainData(newChainData);
  };

  const deleteLink = (req_index: any, link_index: any) => {
    let newChainData = [...chainData];
    let newRequests = [...newChainData[selectedChain].requests];
    newRequests[req_index].links.splice(link_index, 1);
    newChainData[selectedChain].requests = newRequests;
    setChainData(newChainData);
  };
  
  

    const generatePayload = () => {
    
    const res: any[] = [];
    let resObject: {[key: string]: any} = {};
    chainData.map((i: any,index: number) => {
      let jsonObject: {[key: string]: any} = {};
      jsonObject["Content-Type"] = i.content_type;
      jsonObject["Accept-Encoding"] = i.accept_encoding;
      if(newHeaderData.length > 0){
        newHeaderData.forEach(item => {
          jsonObject[item.name] = item.value;
      });
      }

     
       resObject[`chain${index+1}`] =  {
        "global_headers": jsonObject,
        'global_auth': i.global_auth,
        'requests': i.requests.map((j: any) => {
          return {
            "url": j.url,
            "capture_key": j.capture_key,
            "method": "POST",
            "json_data": {
                "OperationName": j.operation_name,
                "DocumentId": j.document_id,
                "DocumentContent": j.document_content,
                "FileName": j.file_name,
                "ContentType": j.content_type,
                "FileType": j.file_type,
                "DocumentAccount": j.document_account,
                "Comments": j.comments,
                "ProcessName": j.process_name,
                "LoadRequestId": j.load_requestid,
                "JobPackageName": j.job_package_name,
                "JobDefName": j.job_def_name,
                "ReqstId": j.reqst_id,
                "RequestStatus": j.request_status,
                "JobName": j.job_name,
                "ParameterList": j.parameter_list,
                "NotificationCode": j.notification_code,
                "CallbackURL": j.callback_url,
                "JobOptions": j.job_options,
                "StatusCode": j.status_code,
                "ESSParameters": j.ess_parameters,
                "links": j.links.map((k: any) => {
                  return {
                    rel: k.rel,
                    href: k.href,
                    name: k.name,
                    kind: k.kind
                  }
            })
            }
          }
        })
      }
    });
    console.log(resObject);
    navigator.clipboard.writeText(JSON.stringify(resObject))
    .then(() => {
      toast({
        title: <div className="flex animate-bounce text-slate-950">Success!<div className="flex-1 mt-[1.3px] ml-1"><img src={success} className="w-[20px] h-[20px]"/></div></div>,
        variant:"success",
        description: "Payload copied to clipboard",
      })
    })

  };


  const updateChainValue = (
    index: number,
    field: keyof (typeof chainData)[number],
    value: string
  ) => {
    const updatedChains = [...chainData];
    updatedChains[index][field] = value;
    setChainData(updatedChains);
  };

    const updateRequestValue = (
    chainIndex: number,
    reqIndex: number,
    field: keyof Omit<RequestData, "links">,
    value: string
  ) => {
    const updatedChains = [...chainData];
    updatedChains[chainIndex].requests[reqIndex][field] =
      value;
    setChainData(updatedChains);
  };


    const updateLinkValue = (
    chainIndex: number,
    reqIndex: number,
    linkIndex: number,
    field: keyof LinkData,
    value: string
  ) => {
    const updatedChains = [...chainData];
    updatedChains[chainIndex].requests[reqIndex].links[linkIndex][field] =
      value;
    setChainData(updatedChains);
  }



  return (
    <>
    <div className="flex flex-col gap-1 mb-3">
        <h1 className="text-3xl font-extrabold md:text-3xl animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
        Aurora Sync Flow
        </h1>
        <p className="text-sm text-neutral-300 md:text-base">Please provide information for each of the required chains</p>
      </div>
    <FormWrapper>
      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-2">
        <div className="flex">
        <p className="text-lg">Global Headers</p>
        <Dialog>
          <DialogTrigger onClick={() => {
            setNewHeader("")
            setNewHeaderValue("")
          }}><div className="hover:cursor-pointer ml-3 mt-1"><PlusCircledIcon className="h-4 w-4 hover:text-lime-300"/></div></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-2">Add Global Header</DialogTitle>
              <DialogDescription>
              <div>
              <div>
              <Input
                autoFocus
                type="text"
                name="extra_global_header_title"
                id="extra_global_header_title"
                placeholder="Input Header Name"
                value={newHeader}
                onChange={(e) => {setNewHeader(e.target.value)}}
                className="w-full"
                required
              />
              </div>
              <div className="mt-5">
                <Input
                autoFocus
                type="text"
                name="extra_global_header_value"
                id="extra_global_header_value"
                placeholder="Input Header Value"
                value={newHeaderValue}
                onChange={(e) => {setNewHeaderValue(e.target.value)}}
                className="w-full"
                required
              />
              </div>
              <DialogClose asChild>
              <Button className="mt-4 hover:bg-pink-700" onClick={() => {
                if(newHeader==""||newHeaderValue==""){
                  return;
                }
                let currentChainData = [...chainData];
                let newHeaderData = [...currentChainData[selectedChain].new_header_data];
                let data = [...newHeaderData]
                data.push({"name": newHeader, "value": newHeaderValue})
                currentChainData[selectedChain].new_header_data= data;
                setChainData(currentChainData);
              }}> Add </Button></DialogClose>
              </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        
        </div>
          <div className="flex flex-row gap-5 w-full overflow-x-auto">
          <div className="ml-1 mb-1">
          <Label htmlFor="content-type" className="inline-block mb-2">Content-Type</Label>
          <Input
            autoFocus
            type="text"
            name="content_type"
            id="content_type"
            placeholder="application/json"
            value={chainData[selectedChain]?.content_type}
            onChange={(e) => updateChainValue(selectedChain, 'content_type', e.target.value)}
            className="w-full"
            required
          />
          {errors.content_type && <p className="text-red-500 text-sm">{errors.content_type}</p>}
          </div>
          <div>
          <Label htmlFor="accept-encoding" className="inline-block mb-2">Accept Encoding</Label>
          <Input
            autoFocus
            type="text"
            name="accept_encoding"
            id="accept_encoding"
            placeholder="gzip, deflate, br"
            value={chainData[selectedChain]?.accept_encoding}
            onChange={(e) => updateChainValue(selectedChain, 'accept_encoding', e.target.value)}
            className="w-full"
            required
          />
          {errors.accept_encoding && <p className="text-red-500 text-sm">{errors.accept_encoding}</p>}
          </div>
          {
            chainData[selectedChain]?.new_header_data.map((i,index) => (
              <div className="ml-1 mb-1" key={index}>
              <Label htmlFor={i.name} className="inline-block mb-2"><div className="flex">{i.name} <MinusCircledIcon onClick={() => {
                let currentChainData = [...chainData];
                let newHeaderData = [...currentChainData[selectedChain]?.new_header_data];
                newHeaderData.splice(index, 1)
                currentChainData[selectedChain].new_header_data = newHeaderData
                setChainData(currentChainData)
              }} className="h-4 w-4 text-red-600 ml-2 hover:cursor-pointer hover:bg-red-600 rounded-lg hover:text-white"/></div></Label>
              <Input
                autoFocus
                type="text"
                name={i.value}
                id={i.value}
                placeholder=""
                value={i.value}
                onChange={(e) => {
                  let data = [...chainData]
                  let selData = data[selectedChain].new_header_data
                  selData[index].value = e.target.value;
                  data[selectedChain].new_header_data=selData
                  setChainData(data)
                }}
                className="w-full"
                required
              />
              </div>
            ))
          }
          </div>
          
        </div>
        <div className="flex flex-col gap-2">
        <p className="text-lg mb-1">Global Auth</p>
          <div className="flex flex-row gap-5 w-full">
          <div className="ml-1">
          <Input
            autoFocus
            type="text"
            name="global_auth"
            id="global_auth"
            placeholder="welcome123"
            value={chainData[selectedChain]?.global_auth}
            onChange={(e) => updateChainValue(selectedChain, 'global_auth', e.target.value)}
            className="w-full"
            required
          />
          {errors.global_auth && <p className="text-red-500 text-sm">{errors.global_auth}</p>}
          </div>  
          </div>        
        </div> 
        <div className="flex flex-col gap-2">
        <p className="text-lg mb-1">Requests</p>
        <Accordion type="single" collapsible >
      {chainData[selectedChain]?.requests.map((req, index) => (
      <div className="flex" key={index}>
        <div>
        <TrashIcon className="h-4 w-4 mt-4 mr-3 text-gray-500 hover:text-red-500 hover:cursor-pointer" onClick={() => {
          deleteRequest(index)
        }}/>
        </div>
        <div className="flex-1">
        <AccordionItem value={`req-${index + 1}`} key={index} >
        <AccordionTrigger><p className="text-lg">{`Request ${index+1}`} </p></AccordionTrigger>
        <AccordionContent className="accordion-content">
        <div className="flex flex-row gap-5 w-full">
          <div>
          <Label htmlFor="url" className="inline-block mb-2">URL</Label>
          <Input
            autoFocus
            type="text"
            name="url"
            id="url"
            placeholder="https://google.com"
            value={chainData[selectedChain].requests[index].url}
            onChange={(e) => updateRequestValue(selectedChain,index, 'url', e.target.value)}
            className="w-full"
            required
          />
          {errors.content_type && <p className="text-red-500 text-sm">{errors.content_type}</p>}
          </div>
          <div>
          <Label htmlFor="capture_key" className="inline-block mb-2">Capture Key</Label>
          <Input
            autoFocus
            type="text"
            name="capture_key"
            id="capture_key"
            placeholder="ReqstId"
            value={chainData[selectedChain].requests[index].capture_key}
            onChange={(e) => updateRequestValue(selectedChain,index,'capture_key', e.target.value)}
            className="w-full"
            required
          />
          {errors.accept_encoding && <p className="text-red-500 text-sm">{errors.accept_encoding}</p>}
          </div>
          <div>
          <Label htmlFor="operation_name" className="inline-block mb-2">Opeartion Name</Label>
          <Input
            autoFocus
            type="text"
            name="operation_name"
            id="operation_name"
            placeholder="submitESSJobRequest"
            value={chainData[selectedChain].requests[index].operation_name}
            onChange={(e) => updateRequestValue(selectedChain,index,'operation_name', e.target.value)}
            className="w-full"
            required
          />
          {errors.accept_encoding && <p className="text-red-500 text-sm">{errors.accept_encoding}</p>}
          </div>
          <div>
          <Label htmlFor="document_id" className="inline-block mb-2">Document ID</Label>
          <Input
            autoFocus
            type="text"
            name="document_id"
            id="document_id"
            placeholder=" "
            value={chainData[selectedChain].requests[index].document_id}
            onChange={(e) => updateRequestValue(selectedChain,index,'document_id', e.target.value)}
            className="w-full"
            required
          />
          {errors.accept_encoding && <p className="text-red-500 text-sm">{errors.accept_encoding}</p>}
          </div>
          </div>
          <div className="flex flex-row gap-5 w-full mt-2">
          <div>
          <Label htmlFor="document_content" className="inline-block mb-2">Document Content</Label>
          <Input
            autoFocus
            type="text"
            name="document_content"
            id="document_content"
            placeholder=" "
            value={chainData[selectedChain].requests[index].document_content}
            onChange={(e) => updateRequestValue(selectedChain,index, 'document_content', e.target.value)}
            className="w-full"
            required
          />
          {errors.content_type && <p className="text-red-500 text-sm">{errors.content_type}</p>}
          </div>
          <div>
          <Label htmlFor="file_name" className="inline-block mb-2">File Name</Label>
          <Input
            autoFocus
            type="text"
            name="file_name"
            id="file_name"
            placeholder=" "
            value={chainData[selectedChain].requests[index].file_name}
            onChange={(e) => updateRequestValue(selectedChain,index,'file_name', e.target.value)}
            className="w-full"
            required
          />
          {errors.accept_encoding && <p className="text-red-500 text-sm">{errors.accept_encoding}</p>}
          </div>
          <div>
          <Label htmlFor="content_type" className="inline-block mb-2">Content Type</Label>
          <Input
            autoFocus
            type="text"
            name="content_type"
            id="content_type"
            placeholder=" "
            value={chainData[selectedChain].requests[index].content_type}
            onChange={(e) => updateRequestValue(selectedChain,index,'content_type', e.target.value)}
            className="w-full"
            required
          />
          {errors.accept_encoding && <p className="text-red-500 text-sm">{errors.accept_encoding}</p>}
          </div>
          <div>
          <Label htmlFor="file_type" className="inline-block mb-2">File Type</Label>
          <Input
            autoFocus
            type="text"
            name="file_type"
            id="file_type"
            placeholder=" "
            value={chainData[selectedChain].requests[index].file_type}
            onChange={(e) => updateRequestValue(selectedChain,index,'file_type', e.target.value)}
            className="w-full"
            required
          />
          {errors.accept_encoding && <p className="text-red-500 text-sm">{errors.accept_encoding}</p>}
          </div>
          </div>
          <div className="flex flex-row gap-5 w-full mt-2">
          <div>
          <Label htmlFor="document_account" className="inline-block mb-2">Document Account</Label>
          <Input
            autoFocus
            type="text"
            name="document_account"
            id="document_account"
            placeholder=" "
            value={chainData[selectedChain].requests[index].document_account}
            onChange={(e) => updateRequestValue(selectedChain,index, 'document_account', e.target.value)}
            className="w-full"
            required
          />
          {errors.content_type && <p className="text-red-500 text-sm">{errors.content_type}</p>}
          </div>
          <div>
          <Label htmlFor="comments" className="inline-block mb-2">Comments</Label>
          <Input
            autoFocus
            type="text"
            name="comments"
            id="comments"
            placeholder=" "
            value={chainData[selectedChain].requests[index].comments}
            onChange={(e) => updateRequestValue(selectedChain,index,'comments', e.target.value)}
            className="w-full"
            required
          />
          {errors.accept_encoding && <p className="text-red-500 text-sm">{errors.accept_encoding}</p>}
          </div>
          <div>
          <Label htmlFor="process_name" className="inline-block mb-2">Process Name</Label>
          <Input
            autoFocus
            type="text"
            name="process_name"
            id="process_name"
            placeholder=" "
            value={chainData[selectedChain].requests[index].process_name}
            onChange={(e) => updateRequestValue(selectedChain,index,'process_name', e.target.value)}
            className="w-full"
            required
          />
          {errors.accept_encoding && <p className="text-red-500 text-sm">{errors.accept_encoding}</p>}
          </div>
          <div>
          <Label htmlFor="load_requestid" className="inline-block mb-2">Load Request ID</Label>
          <Input
            autoFocus
            type="text"
            name="load_requestid"
            id="load_requestid"
            placeholder=" "
            value={chainData[selectedChain].requests[index].load_requestid}
            onChange={(e) => updateRequestValue(selectedChain,index,'load_requestid', e.target.value)}
            className="w-full"
            required
          />
          {errors.accept_encoding && <p className="text-red-500 text-sm">{errors.accept_encoding}</p>}
          </div>
          </div>
          <div className="flex flex-row gap-5 w-full mt-2">
          <div>
          <Label htmlFor="job_package_name" className="inline-block mb-2">Job Package Name</Label>
          <Input
            autoFocus
            type="text"
            name="job_package_name"
            id="job_package_name"
            placeholder=" "
            value={chainData[selectedChain].requests[index].job_package_name}
            onChange={(e) => updateRequestValue(selectedChain,index, 'job_package_name', e.target.value)}
            className="w-full"
            required
          />
          {errors.content_type && <p className="text-red-500 text-sm">{errors.content_type}</p>}
          </div>
          <div>
          <Label htmlFor="job_def_name" className="inline-block mb-2">Job Def Name</Label>
          <Input
            autoFocus
            type="text"
            name="job_def_name"
            id="job_def_name"
            placeholder=" "
            value={chainData[selectedChain].requests[index].job_def_name}
            onChange={(e) => updateRequestValue(selectedChain,index,'job_def_name', e.target.value)}
            className="w-full"
            required
          />
          {errors.accept_encoding && <p className="text-red-500 text-sm">{errors.accept_encoding}</p>}
          </div>
          <div>
          <Label htmlFor="reqst_id" className="inline-block mb-2">Reqst ID</Label>
          <Input
            autoFocus
            type="text"
            name="reqst_id"
            id="reqst_id"
            placeholder=" "
            value={chainData[selectedChain].requests[index].reqst_id}
            onChange={(e) => updateRequestValue(selectedChain,index,'reqst_id', e.target.value)}
            className="w-full"
            required
          />
          {errors.accept_encoding && <p className="text-red-500 text-sm">{errors.accept_encoding}</p>}
          </div>
          <div>
          <Label htmlFor="request_status" className="inline-block mb-2">Request Status</Label>
          <Input
            autoFocus
            type="text"
            name="request_status"
            id="request_status"
            placeholder=" "
            value={chainData[selectedChain].requests[index].request_status}
            onChange={(e) => updateRequestValue(selectedChain,index,'request_status', e.target.value)}
            className="w-full"
            required
          />
          {errors.accept_encoding && <p className="text-red-500 text-sm">{errors.accept_encoding}</p>}
          </div>
          </div>
          <div className="flex flex-row gap-5 w-full mt-2">
          <div>
          <Label htmlFor="job_name" className="inline-block mb-2">Job Name</Label>
          <Input
            autoFocus
            type="text"
            name="job_name"
            id="job_name"
            placeholder=" "
            value={chainData[selectedChain].requests[index].job_name}
            onChange={(e) => updateRequestValue(selectedChain,index, 'job_name', e.target.value)}
            className="w-full"
            required
          />
          {errors.content_type && <p className="text-red-500 text-sm">{errors.content_type}</p>}
          </div>
          <div>
          <Label htmlFor="parameter_list" className="inline-block mb-2">Parameter List</Label>
          <Input
            autoFocus
            type="text"
            name="parameter_list"
            id="parameter_list"
            placeholder=" "
            value={chainData[selectedChain].requests[index].parameter_list}
            onChange={(e) => updateRequestValue(selectedChain,index,'parameter_list', e.target.value)}
            className="w-full"
            required
          />
          {errors.accept_encoding && <p className="text-red-500 text-sm">{errors.accept_encoding}</p>}
          </div>
          <div>
          <Label htmlFor="notification_code" className="inline-block mb-2">Notification Code</Label>
          <Input
            autoFocus
            type="text"
            name="notification_code"
            id="notification_code"
            placeholder=" "
            value={chainData[selectedChain].requests[index].notification_code}
            onChange={(e) => updateRequestValue(selectedChain,index,'notification_code', e.target.value)}
            className="w-full"
            required
          />
          {errors.accept_encoding && <p className="text-red-500 text-sm">{errors.accept_encoding}</p>}
          </div>
          <div>
          <Label htmlFor="callback_url" className="inline-block mb-2">Callback URL</Label>
          <Input
            autoFocus
            type="text"
            name="callback_url"
            id="callback_url"
            placeholder=" "
            value={chainData[selectedChain].requests[index].callback_url}
            onChange={(e) => updateRequestValue(selectedChain,index,'callback_url', e.target.value)}
            className="w-full"
            required
          />
          {errors.accept_encoding && <p className="text-red-500 text-sm">{errors.accept_encoding}</p>}
          </div>
          </div>
          <div className="flex flex-row gap-5 w-full mt-2">
          <div>
          <Label htmlFor="job_options" className="inline-block mb-2">Job Options</Label>
          <Input
            autoFocus
            type="text"
            name="job_options"
            id="job_options"
            placeholder=" "
            value={chainData[selectedChain].requests[index].job_options}
            onChange={(e) => updateRequestValue(selectedChain,index, 'job_options', e.target.value)}
            className="w-full"
            required
          />
          {errors.content_type && <p className="text-red-500 text-sm">{errors.content_type}</p>}
          </div>
          <div>
          <Label htmlFor="status_code" className="inline-block mb-2">Status Code</Label>
          <Input
            autoFocus
            type="text"
            name="status_code"
            id="status_code"
            placeholder=" "
            value={chainData[selectedChain].requests[index].status_code}
            onChange={(e) => updateRequestValue(selectedChain,index,'status_code', e.target.value)}
            className="w-full"
            required
          />
          {errors.accept_encoding && <p className="text-red-500 text-sm">{errors.accept_encoding}</p>}
          </div>
          <div>
          <Label htmlFor="ess_parameters" className="inline-block mb-2">ESS Parameters</Label>
          <Input
            autoFocus
            type="text"
            name="ess_parameters"
            id="ess_parameters"
            placeholder=" "
            value={chainData[selectedChain].requests[index].ess_parameters}
            onChange={(e) => updateRequestValue(selectedChain,index,'ess_parameters', e.target.value)}
            className="w-full"
            required
          />
          {errors.accept_encoding && <p className="text-red-500 text-sm">{errors.accept_encoding}</p>}
          </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <p className="text-lg mb-1">Links</p>
            <Accordion type="single" collapsible >
              {chainData[selectedChain].requests[index].links.map((link, link_index) => (
                <div className="flex" key={link_index}>
                  <div>
                  <TrashIcon className="h-4 w-4 mt-4 mr-3 text-gray-500 hover:text-red-500 hover:cursor-pointer" onClick={() => {
                    deleteLink(index,link_index)
                  }}/>
                  </div>
                  <div className="flex-1">
                  <AccordionItem value={`link-${link_index + 1}`} key={link_index} >
                  <AccordionTrigger><p className="text-lg">{`Link ${link_index+1}`} </p></AccordionTrigger>
                  <AccordionContent className="accordion-content">
                  <div className="flex flex-row gap-5 w-full mt-2">
                    <div>
                    <Label htmlFor="rel" className="inline-block mb-2">rel</Label>
                    <Input
                      autoFocus
                      type="rel"
                      name="rel"
                      id="rel"
                      placeholder=" "
                      value={chainData[selectedChain].requests[index].links[link_index].rel}
                      onChange={(e) => updateLinkValue(selectedChain,index,link_index, 'rel', e.target.value)}
                      className="w-full"
                      required
                    />
                    {errors.content_type && <p className="text-red-500 text-sm">{errors.content_type}</p>}
                    </div>
                    <div>
                    <Label htmlFor="href" className="inline-block mb-2">href</Label>
                    <Input
                      autoFocus
                      type="text"
                      name="href"
                      id="href"
                      placeholder=" "
                      value={chainData[selectedChain].requests[index].links[link_index].href}
                      onChange={(e) => updateLinkValue(selectedChain,index,link_index,'href', e.target.value)}
                      className="w-full"
                      required
                    />
                    {errors.accept_encoding && <p className="text-red-500 text-sm">{errors.accept_encoding}</p>}
                    </div>
                    <div>
                    <Label htmlFor="name" className="inline-block mb-2">name</Label>
                    <Input
                      autoFocus
                      type="text"
                      name="name"
                      id="name"
                      placeholder=" "
                      value={chainData[selectedChain].requests[index].links[link_index].name}
                      onChange={(e) => updateLinkValue(selectedChain,index,link_index,'name', e.target.value)}
                      className="w-full"
                      required
                    />
                    {errors.accept_encoding && <p className="text-red-500 text-sm">{errors.accept_encoding}</p>}
                    </div>
                    <div>
                    <Label htmlFor="kind" className="inline-block mb-2">kind</Label>
                    <Input
                      autoFocus
                      type="text"
                      name="kind"
                      id="kind"
                      placeholder=" "
                      value={chainData[selectedChain].requests[index].links[link_index].kind}
                      onChange={(e) => updateLinkValue(selectedChain,index,link_index,'kind', e.target.value)}
                      className="w-full"
                      required
                    />
                    {errors.accept_encoding && <p className="text-red-500 text-sm">{errors.accept_encoding}</p>}
                    </div>
                    </div>
                    </AccordionContent>
                  </AccordionItem>
                  </div>
                </div>
                        ))}
              </Accordion>
            </div>
          <Button type="button" className="mt-4 hover:bg-pink-700" onClick={() => {addLink(index)}}>Add Link</Button>  
        </AccordionContent>
      </AccordionItem>
        </div>
      </div>
       ))}
    </Accordion>
   <div>
   <Button type="button" onClick={addRequest} className="mt-3 hover:bg-pink-700">Add Request</Button>
   </div>
    </div>
    </div>
    </FormWrapper>
    <div className="flex-grow"></div>
    <Button type="button" onClick={addChain} variant="secondary" className="mt-3 ">Add Chain</Button>
    <Button type="button" onClick={generatePayload} variant="blue" className="mt-3 bg-pink-600 text-white hover:bg-pink-700">Generate Payload</Button>
    </>
  );
};

export default UserInfoForm;
