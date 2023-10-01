'use client'
import React,{
    useState,
    useEffect
} from 'react';
import axios from 'axios';
import { 
    Row,
    Col,
    Button,
    Card,
    Modal,
    Form,
    Input,
    InputNumber,
    message
} from 'antd';
import DataTable from './DataTable';


interface DataType {
    name: string;
    description: string;
    price:string,
    imageUrl:string,
    category:string
}
export default function PartialMain(){
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tableData,setTableData]=useState([]);

    useEffect(()=>{
        getTableData();
    },[])
    const getTableData=()=>{
        axios.get(`http://localhost:3000/api/blogs`)
        .then((response:any)=>{
            if(response.status===200){
                if(response.data?.posts?.length){
                    setTableData(response.data.posts)
                }else{
                    setTableData([]);
                }
            }
        }).catch(()=>{

        })
    }
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSubmit=(data:any)=>{
        const myData={
            name:data?.name?data.name:"",
            description:data?.description?data.description:"",
            price:data?.price?data.price.toString():"",
            imageUrl:data?.imageUrl?data.imageUrl:"",
            category:data?.category?data.category:""
        }

        axios.post(`http://localhost:3000/api/blogs`,JSON.stringify(myData))
        .then((response:any)=>{
            if(response?.status===201){
                message.success({
                    content:"Successfully Added."
                })
                form.resetFields();
                getTableData();
                handleCancel();
            }else{
                message.error({
                    content:"Added Failed."
                })
            }
        }).catch((error:any)=>{

        })
    }

    
    type FieldType = {
        name?: string;
        description?: string;
        price?: number;
        imageUrl?:string;
        category?:string;

    };

    return(
        <>
            <Row>
                <Col 
                span={24}
                style={{
                    padding:'20px 120px'
                }}
                >
                    <Card
                    style={{
                        minHeight:'90vh'
                    }}
                    >
                        <Row
                        style={{
                            marginBottom:"20px"
                        }}
                        >
                            <Col span={24}>
                                <Button 
                                type="primary"
                                onClick={showModal}
                                >
                                    Add New
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <DataTable
                                data={tableData}
                                />
                            </Col> 
                        </Row>
                    </Card>
                </Col>
            </Row>

            <Modal 
            title="Add New Products" 
            open={isModalOpen} 
            // onOk={handleOk} 
            footer={null}
            width={800}
            onCancel={handleCancel}
            >
                <Form
                form={form}
                onFinish={handleSubmit}
                >
                    <Row>
                        <Col span={12}>
                            <Form.Item
                            <FieldType>
                            colon={false}
                            tooltip={{
                                placement:'bottom',
                                title:'Product Name'
                            }}
                            rules={[
                                {
                                    required:true,
                                    message:"Product Name Is Required"
                                }
                            ]}
                            name={"name"}
                            labelAlign={'right'}
                            label="Name"
                            wrapperCol={{
                                span:16
                            }}
                            labelCol={{
                                span:8
                            }}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                            <FieldType>
                            colon={false}
                            tooltip={{
                                placement:'bottom',
                                title:'Product Description'
                            }}
                            rules={[
                                {
                                    required:true,
                                    message:"Product Description Is Required"
                                }
                            ]}
                            name={"description"}
                            labelAlign={'right'}
                            label="Description"
                            wrapperCol={{
                                span:16
                            }}
                            labelCol={{
                                span:8
                            }}
                            >
                                <Input.TextArea rows={2}/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}>
                            <Form.Item
                            <FieldType>
                            colon={false}
                            tooltip={{
                                placement:'bottom',
                                title:'Product Price'
                            }}
                            rules={[
                                {
                                    required:true,
                                    message:"Product Price Is Required"
                                }
                            ]}
                            name={"price"}
                            labelAlign={'right'}
                            label="Price"
                            wrapperCol={{
                                span:16
                            }}
                            labelCol={{
                                span:8
                            }}
                            >
                                <InputNumber
                                style={{
                                    width:'100%'
                                }}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                            <FieldType>
                            colon={false}
                            tooltip={{
                                placement:'bottom',
                                title:'Product Image Url'
                            }}
                            rules={[
                                {
                                    required:true,
                                    message:"Product Image Url Is Required"
                                }
                            ]}
                            name={"imageUrl"}
                            labelAlign={'right'}
                            label="Image Url"
                            wrapperCol={{
                                span:16
                            }}
                            labelCol={{
                                span:8
                            }}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}>
                            <Form.Item
                            <FieldType>
                            colon={false}
                            tooltip={{
                                placement:'bottom',
                                title:'Product Category'
                            }}
                            rules={[
                                {
                                    required:true,
                                    message:"Product Category Is Required"
                                }
                            ]}
                            name={"category"}
                            labelAlign={'right'}
                            label="Category"
                            wrapperCol={{
                                span:16
                            }}
                            labelCol={{
                                span:8
                            }}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>

                        <Col 
                        span={12}
                        style={{
                            textAlign:'right'
                        }}
                        >
                            <Button
                            type='primary'
                            danger
                            style={{
                                marginRight:'10px'
                            }}
                            onClick={()=>{
                                form.resetFields();
                            }}
                            >
                                Reset
                            </Button>
                            <Button 
                            type='primary'
                            htmlType='submit'
                            >
                                Save
                            </Button>    
                        </Col>
                    </Row>

                </Form>
            </Modal>
        </>
    )
}