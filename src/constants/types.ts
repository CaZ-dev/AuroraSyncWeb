type FormItems = {
    content_type: string;
    accept_encoding: string;
    global_auth: string
    requests: RequestData[]
    new_header_data: NewHeaderData[]
  };

type RequestData = {
  url: string;
  capture_key: string
  operation_name: string
  document_id: string
  document_content: string
  file_name: string
  content_type: string
  file_type: string
  document_account: string
  comments: string
  process_name: string
  load_requestid: string
  job_package_name: string
  job_def_name: string
  reqst_id: string
  request_status: string
  job_name: string
  parameter_list: string
  notification_code: string
  callback_url: string
  job_options: string
  status_code: string
  ess_parameters: string
  links: LinkData[]
  
}

type LinkData = {
  rel: string
  href: string
  name: string
  kind: string
}

type StepProps = FormItems & {
  chainCount: number;
  chainData: FormItems[]
  setChainData: (data: FormItems[]) => void;
  setChainCount: (count: number) => void;
  errors: Partial<FormItems>;
  selectedChain: number
};

type NewHeaderData = {
  name: string,
  value: string
}

type SingleChainData = {
  id: string
  chains: string[]
}

type ChainsData = {
  data: SingleChainData[]
}