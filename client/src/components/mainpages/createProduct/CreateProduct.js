import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import {GlobalState} from '../../../GlobalState';
import Loading from '../utils/loading/Loading';
import {useNavigate, useParams} from 'react-router-dom';
import {motion} from 'framer-motion';
import {fadeIn} from '../../../variants';

const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: 'description',
    content: 'content',
    category: '',
    _id: ''
}

function CreateProduct() {
    const state = useContext(GlobalState)
    const [product, setProduct] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)


    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    const navigate = useNavigate();
    const param = useParams()

    const [products] = state.productsAPI.products
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.productsAPI.callback

    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            products.forEach(product => {
                if(product._id === param.id) {
                    setProduct(product)
                    setImages(product.images)
                }
            })
        }else{
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }
    }, [param.id, products])

    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            const file = e.target.files[0]
            
            if(!file) return alert("File not exist.")

            if(file.size >  10 * 1024 * 1024) // 1mb
                return alert("Size too large!")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'application/pdf' && file.type !== 'application/zip' && file.type !== 'application/vnd.ms-excel' && file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            setLoading(false)
            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {
            if(!isAdmin) return alert("You're not an admin")
            setLoading(true)
            await axios.post('/api/destroy', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target;
        setProduct({...product, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            if(!images) return alert("No Image Upload")

            if(onEdit){
                await axios.put(`/api/products/${product._id}`, {...product, images}, {
                    headers: {Authorization: token}
                })
            }else{
                await axios.post('/api/products', {...product, images}, {
                    headers: {Authorization: token}
                })
            }
            setCallback(!callback)
            navigate("/")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    // const styleUpload = {
    //     display: images ? "block" : "none"
    // }
  return (
    <motion.div
      variants={fadeIn('right', 0.4)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
      className="bg-gray-500 bg-opacity-30 backdrop-filter backdrop-blur-lg p-4 rounded-lg max-w-5xl mx-auto mt-8 shadow-2xl gap-4"
    >
      <div className='text-center text-3xl text-white'> Add a assignment</div>
      <div className="">
        <label htmlFor="file_up" className="text-white">
          Choose File:
        </label>
        <div className=" mt-1">
          <label
            htmlFor="file_up"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg cursor-pointer hover:bg-gray-300"
          >
            Choose..
          </label>
          <input
            type="file"
            // accept=".pdf,.zip"
            name="file"
            id="file_up"
            className="hidden"
            onChange={handleUpload}
          />
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="ml-1 mt-4">
            {images && <img src={images.url} className='border rounded-lg' alt="" />}
            {images && (
              <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700" onClick={handleDestroy}>
                Delete
              </button>
            )}
          </div>
        )}
      </div>

      <form className="" onSubmit={handleSubmit}>
      <div className="mb-4">
          <label htmlFor="product_id" className="text-white">Assignment ID:</label>
          <input className='bg-gray-200 rounded-lg p-2 w-full text-slate-950' type="text" name="product_id" id="product_id" required
            value={product.product_id} onChange={handleChangeInput} />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="text-white">Description:</label>
          <textarea className='bg-gray-200 rounded-lg p-2 w-full h-24 text-slate-950' type="text" name="description" id="description" required
            value={product.description} rows="5" onChange={handleChangeInput} />
        </div>
        
        <div className='flex justify-center'>
        <button type="submit" className="bg-gray-500 w-32 text-white py-2 px-4 rounded-lg hover:bg-green-600">{onEdit ? "Update" : "Create"}</button>
        </div>
      </form>
    </motion.div>

  )
}

export default CreateProduct;
